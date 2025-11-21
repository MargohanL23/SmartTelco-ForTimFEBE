<template>
      <div class="min-h-screen flex items-center justify-center" >
      <div class="w-full max-w-md rounded-xl shadow-xl p-8 bg-white/60 backdrop-blur-md border border-white/20">

      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=rose&shade=500"
          alt="SmartTelco"
        />
        <h2 class="mt-8 text-center text-2xl font-bold tracking-tight" style="color:#842A3B;">
          SmartTelco Register
        </h2>
      </div>

      <form @submit.prevent="handleRegister" class="mt-10 space-y-6">

        <div>
          <label class="block text-sm font-medium" style="color:#842A3B;">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="block w-full rounded-md bg-white/60 px-3 py-2 text-gray-800 placeholder-gray-500 shadow-sm outline-none"
            placeholder="example@mail.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium" style="color:#842A3B;">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="block w-full rounded-md bg-white/60 px-3 py-2 text-gray-800 placeholder-gray-500 shadow-sm outline-none"
            placeholder="Minimal 6 karakter"
          />
        </div>

        <p v-if="errorMsg" class="text-red-700 text-sm text-center">{{ errorMsg }}</p>

        <button
          type="submit"
          class="w-full rounded-md px-3 py-2 text-white font-semibold shadow-md hover:opacity-90"
          style="background-color:#842A3B;"
        >
          Register
        </button>

        <p class="text-sm text-center mt-4" style="color:#842A3B;">
          Sudah punya akun?
          <router-link to="/login" class="font-semibold hover:underline" style="color:#842A3B;">
            Login di sini
          </router-link>
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