# SmartTelco-BackEnd/app.py (KODE KOREKSI)

import os
import pandas as pd
import joblib 
import numpy as np
import json 
from flask import Flask, request, jsonify, session 
from flask_cors import CORS 
from dotenv import load_dotenv

# Impor fungsi preprocessing (yang kini menghasilkan DataFrame 17-kolom)
from utils.preprocessing import preprocess_data 

# --- 1. Setup Dasar dan Path ---
load_dotenv()
app = Flask(__name__)

# Mengambil SECRET_KEY dari .env
app.secret_key = os.getenv('SECRET_KEY', 'default_fallback_secret') 
CORS(app) 

# Tentukan path file (DIUBAH UNTUK MODEL 17-FITUR)
MODEL_PATH = 'telco_pipeline_model_xgb.pkl' 
TARGET_ENCODER_PATH = 'target_encoder.pkl' 
DATA_PATH = 'data_telco.csv'
USERS_DB_PATH = os.path.join(os.path.dirname(__file__), 'users.json')

# --- 2. Muat Model dan Data ---
model = None
df_data = None
TARGET_LABELS = [] # Akan diisi dari target_encoder
MODEL_LOADED_SUCCESS = False

try:
    # Muat Model Pipeline (Mengandung semua Preprocessing + XGBoost)
    model = joblib.load(MODEL_PATH) 
    print(f"[STATUS] Model ML Pipeline ({MODEL_PATH}) berhasil dimuat.")
    
    # Muat Target Encoder (untuk mapping hasil prediksi ke nama offer)
    target_encoder = joblib.load(TARGET_ENCODER_PATH)
    # Gunakan classes_ dari encoder untuk mendapatkan TARGET_LABELS yang pasti benar
    TARGET_LABELS = list(target_encoder.classes_)
    print(f"[STATUS] Target Encoder ({TARGET_ENCODER_PATH}) berhasil dimuat. Labels: {TARGET_LABELS}")
    
    # Muat Dataset (untuk simulasi profile)
    df_data = pd.read_csv(DATA_PATH) 
    df_data['customer_id'] = df_data['customer_id'].astype(str)
    print(f"[STATUS] Dataset ({DATA_PATH}) berhasil dimuat.")
    
    MODEL_LOADED_SUCCESS = True
except FileNotFoundError as e:
    print(f"[ERROR] File tidak ditemukan: {e}. Pastikan file model/encoder/data ada di folder SmartTelco-BackEnd.")
except Exception as e:
    print(f"[ERROR] Error saat memuat model/data: {e}")

# ----------------- FUNGSI UTILITY UNTUK REGISTRASI/LOGIN  -----------------

def load_users():
    if os.path.exists(USERS_DB_PATH):
        try:
            with open(USERS_DB_PATH, 'r') as f:
                return json.load(f)
        except json.JSONDecodeError:
            print("[WARN] users.json kosong atau rusak. Membuat ulang struktur default.")
            return {"next_customer_id": 10001, "users": []}
    return {"next_customer_id": 10001, "users": []}

def save_users(data):
    with open(USERS_DB_PATH, 'w') as f:
        json.dump(data, f, indent=4)

def get_next_customer_id(users_data):
    next_id_num = users_data["next_customer_id"]
    new_id = f"C{next_id_num:05d}" # Format C10001
    users_data["next_customer_id"] += 1
    return new_id

# ----------------- ENDPOINT REGISTER BARU -----------------

@app.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password') 

    if not email or not password:
        return jsonify({"message": "Email dan Password wajib diisi"}), 400

    users_data = load_users()
    
    # Cek apakah email sudah terdaftar
    if any(user['email'] == email for user in users_data['users']):
        return jsonify({"message": "Email sudah terdaftar"}), 409

    # Generasi Customer ID Baru (C10001 dst)
    new_customer_id = get_next_customer_id(users_data)
    
    # Simpan pengguna baru (default role 'User')
    new_user = {
        "customer_id": new_customer_id,
        "email": email,
        "password": password, 
        "role": "User" 
    }
    users_data['users'].append(new_user)
    
    save_users(users_data)
    
    # Langsung login setelah register
    session['customer_id'] = new_customer_id
    session['role'] = 'User'
    
    return jsonify({
        "message": "Registrasi berhasil!", 
        "customer_id": new_customer_id,
        "role": "User"
    }), 201

# ----------------- ENDPOINT LOGIN BARU (FIXED ROLE MANAGEMENT) -----------------

@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    users_data = load_users()
    
    # 1. Cek User/Admin yang terdaftar di users.json
    user = next((u for u in users_data['users'] if u['email'] == email), None)

    if user and user['password'] == password: 
        # Login berhasil untuk Admin (jika role di json = "Admin") atau User baru
        role = user.get('role', 'User') 
        session['customer_id'] = user['customer_id']
        session['role'] = role
        return jsonify({
            "message": "Login berhasil!", 
            "customer_id": user['customer_id'],
            "role": role
        }), 200
    
    # 2. Logika SIMULASI Login untuk ID customer historis (C00001 - C10000)
    
    # Asumsi: Jika user mencoba login dengan email yang menyerupai Customer ID (misal C00002) 
    # dan menggunakan password historis (telco123).
    if df_data is not None and df_data['customer_id'].str.contains(email.upper().strip()).any() and email.upper().strip().startswith('C'):
        if password == 'telco123': 
            customer_id = email.upper().strip()
            
            # Kita hanya anggap mereka USER (karena Admin sudah harus terdaftar di users.json)
            role = 'User' 
            
            # Jika user historis ini belum ada di users.json, tambahkan (untuk konsistensi)
            if not user:
                users_data['users'].append({"customer_id": customer_id, "email": email, "password": password, "role": role})
                save_users(users_data)
            
            session['customer_id'] = customer_id
            session['role'] = role
            
            return jsonify({
                "message": f"Login berhasil sebagai Customer ID Historis {customer_id}!", 
                "customer_id": customer_id,
                "role": role
            }), 200
            
    
    return jsonify({"message": "Email atau password salah"}), 401

# ----------------- ENDPOINT PREDICT -----------------

@app.route('/api/recommend', methods=['POST'])
def recommend_offer():
    # Pastikan model sudah dimuat dan TARGET_LABELS tersedia
    if not MODEL_LOADED_SUCCESS or not TARGET_LABELS:
        return jsonify({"error": "Model ML atau Label Target belum dimuat di server. Cek log server."}), 500
        
    try:
        data = request.json
        # 1. Preprocessing: Ubah dict ke DataFrame 17-kolom (OHE + raw numerik)
        processed_data = preprocess_data(data)
        
        # 2. Prediksi Probabilitas
        # Model menerima DataFrame yang sudah di-OHE (17 fitur)
        proba = model.predict_proba(processed_data)
        
        proba_flat = proba[0]
        
        # 3. Ambil Indeks Rekomendasi Utama
        prediction_index = np.argmax(proba_flat)
        recommended_offer = TARGET_LABELS[prediction_index] 
        confidence_score = proba_flat[prediction_index] * 100
        
        # 4. Dapatkan probabilitas untuk alternatif
        top_indices = np.argsort(proba_flat)[::-1] 
        
        alternatives = []
        # Mulai dari indeks 1 untuk mendapatkan alternatif (top 1 adalah recommended_offer)
        for i in range(1, min(len(top_indices), 4)): 
            alt_index = top_indices[i]
            alt_offer = TARGET_LABELS[alt_index] 
            alt_prob = proba_flat[alt_index] * 100
            
            # Filter alternatif dengan probabilitas > 5%
            if alt_prob > 5: 
                alternatives.append(f"{alt_offer} ({alt_prob:.1f}%)")

        # Kembalikan hasil ke frontend
        return jsonify({
            "status": "success",
            "recommended_offer": recommended_offer,
            "confidence": f"{confidence_score:.2f}%", 
            "alternatives": alternatives
        })
        
    except Exception as e:
        print(f"[ERROR] Error saat prediksi: {str(e)}") 
        return jsonify({"error": f"Gagal memproses data atau memprediksi. Pastikan input data sesuai. Detail: {str(e)}"}), 400

# ----------------- ENDPOINT PROFILE (LOAD DATA HISTORIS) -----------------

@app.route('/api/profile/<customer_id>', methods=['GET'])
def get_customer_profile(customer_id):
    if df_data is None:
        return jsonify({"error": "Data historis tidak tersedia."}), 500
        
    customer_data = df_data[df_data['customer_id'] == customer_id.upper()]
    
    if customer_data.empty:
        return jsonify({"status": "error", "error": f"Customer ID {customer_id} tidak ditemukan di data historis."}), 404
        
    profile = customer_data.iloc[0].to_dict()
    
    profile.pop('target_offer', None)
    profile.pop('customer_id', None) 
    
    return jsonify({
        "status": "success",
        "profile": profile
    })

# ----------------- ENDPOINT BARU: MODEL STATUS & FEATURE IMPORTANCE -----------------
@app.route('/api/model_status', methods=['GET'])
def get_model_status():
    if not MODEL_LOADED_SUCCESS:
        return jsonify({"error": "Model ML belum dimuat di server."}), 500
        
    # Data dikembalikan sesuai simulasi yang disepakati (Ganti nama model)
    metrics = {
        "accuracy_score": "96.75%",
        "macro_f1_score": "95.52%",
        "log_loss": "0.245",
        "latency": "~15ms",
        "model_name": MODEL_PATH, # <-- Menggunakan nama model baru
        "last_trained": "1 Nov 2025"
    }

    feature_importance = [
        {"label": "Monthly Spend", "score": 96},
        {"label": "Avg Data Usage (GB)", "score": 80},
        {"label": "Complaint Count", "score": 72},
        {"label": "Pct Video Usage", "score": 55},
        {"label": "Travel Score", "score": 45}
    ]
    
    return jsonify({
        "status": "success",
        "metrics": metrics,
        "feature_importance": feature_importance
    })

# --- 5. Jalankan Server ---
if __name__ == '__main__':
    # Inisiasi users.json jika belum ada atau kosong
    if not os.path.exists(USERS_DB_PATH) or not load_users().get('users'):
        save_users({"next_customer_id": 10001, "users": []})
        
    app.run(debug=True, port=5000)