# SmartTelco-BackEnd/utils/preprocessing.py

import pandas as pd
import numpy as np

# --- 1. Definisi Konstanta Fitur (17 FITUR) ---

# 7 Merek Perangkat yang diakui model 
ALLOWED_DEVICE_BRANDS = [
    'Apple', 'Huawei', 'Oppo', 'Realme', 'Samsung', 'Vivo', 'Xiaomi' 
] 


# DAFTAR AKHIR FITUR (WAJIB 17 KOLOM)
FEATURE_COLS = [
    'avg_data_usage_gb', 
    'pct_video_usage', 
    'avg_call_duration', 
    'sms_freq', 
    'monthly_spend', 
    'topup_freq', 
    'travel_score', 
    'complaint_count',
    'plan_type_Postpaid',   
    'plan_type_Prepaid',   
    'device_brand_Apple',   
    'device_brand_Huawei', 
    'device_brand_Oppo', 
    'device_brand_Realme', 
    'device_brand_Samsung', 
    'device_brand_Vivo', 
    'device_brand_Xiaomi'
]


def preprocess_data(input_data: dict) -> pd.DataFrame:
    """
    Mengubah input data pelanggan dari frontend (dict) menjadi format DataFrame
    yang siap dimasukkan ke dalam model ML, dengan memastikan 17 fitur OHE dan RAW.
    """
    
    # 1. Konversi dictionary input ke DataFrame satu baris
    df = pd.DataFrame([input_data])
    
    # 2. Penanganan Kategori Device Brand (PENTING!)
    # Jika inputan dari frontend tidak ada di ALLOWED_DEVICE_BRANDS, kita paksa kategorinya menjadi 'Lainnya'
    # Untuk model 17-fitur, kategori yang tidak terdaftar akan menghasilkan kolom brand_Lainnya (yang akan di-drop)
    df['device_brand'] = df['device_brand'].apply(
        lambda x: x if x in ALLOWED_DEVICE_BRANDS else 'Lainnya' # <-- Kita tetapkan kategori fallback 'Lainnya'
    )
    
    # 3. One-Hot Encoding (OHE) 
    
    # Plan Type (Menghasilkan 2 kolom: plan_type_Postpaid dan plan_type_Prepaid)
    df_plan = pd.get_dummies(df['plan_type'], prefix='plan_type', drop_first=False)
    df = pd.concat([df, df_plan], axis=1)
    df.drop('plan_type', axis=1, inplace=True)
    
    # Device Brand (Menghasilkan 7 kolom, termasuk Apple)
    df_brand = pd.get_dummies(df['device_brand'], prefix='device_brand', drop_first=False)
    df = pd.concat([df, df_brand], axis=1)
    df.drop('device_brand', axis=1, inplace=True)
    
    
    # 4. Menambahkan kolom OHE yang hilang dan menghapus kolom OHE ekstra
    
    # Hapus kolom OHE yang tidak ada di FEATURE_COLS (misal: device_brand_Lainnya)
    cols_to_drop = [col for col in df.columns if col.startswith(('plan_type_', 'device_brand_')) and col not in FEATURE_COLS]
    df.drop(columns=cols_to_drop, errors='ignore', inplace=True)
    
    # Tambahkan kolom OHE yang hilang (Ini menjamin 17 kolom selalu ada)
    for col in FEATURE_COLS:
        if col not in df.columns:
            df[col] = 0
            
    # 5. Memastikan urutan kolom SAMA PERSIS dengan FEATURE_COLS (KRUSIAL)
    final_features = df[FEATURE_COLS]
    
    # 6. Mengembalikan DataFrame 
    return final_features