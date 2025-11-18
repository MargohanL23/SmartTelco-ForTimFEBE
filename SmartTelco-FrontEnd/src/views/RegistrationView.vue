<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white shadow-md rounded-xl p-6">
      <h2 class="text-2xl font-bold text-center mb-6">SmartTelco Register</h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        
        <div>
          <label class="block mb-1 font-medium">Email</label>
          <input
            v-model="email"
            type="email"
            class="w-full border rounded-lg px-3 py-2"
            placeholder="example@mail.com"
            required
          />
        </div>

        <div>
          <label class="block mb-1 font-medium">Password</label>
          <input
            v-model="password"
            type="password"
            class="w-full border rounded-lg px-3 py-2"
            placeholder="Minimal 6 karakter"
            required
          />
        </div>

        <p v-if="errorMsg" class="text-red-600 text-sm">{{ errorMsg }}</p>

        <button
          type="submit"
          class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Register
        </button>

        <p class="text-sm text-center">
          Sudah punya akun?
          <router-link to="/login" class="text-blue-600">Login di sini</router-link>
        </p>

      </form>
    </div>
  </div>
</template>

<script>
// --- PERBAIKAN ---
// 1. Impor 'ref' dari 'vue'
import { ref } from "vue"; 
import { apiPost } from "../utils/api";
import { saveUser } from "../utils/storage";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    // --- PERBAIKAN ---
    // 2. Gunakan ref() alih-alih Vue.ref()
    const email = ref("");
    const password = ref("");
    const errorMsg = ref("");

    const handleRegister = async () => {
      errorMsg.value = "";

      const payload = {
        email: email.value,
        password: password.value,
      };

      const res = await apiPost("/register", payload);

      // --- PERBAIKAN (Improvement) ---
      // Cek 'res.message' untuk error (sesuai app.py)
      if (res.message) {
        errorMsg.value = res.message;
        return;
      }

      // Simpan user baru ke localStorage
      saveUser({
        customer_id: res.customer_id,
        email: email.value, // Ambil dari input
        role: "User", // Role default dari backend
      });

      router.push("/home");
    };

    return { email, password, errorMsg, handleRegister };
  },
};
</script>