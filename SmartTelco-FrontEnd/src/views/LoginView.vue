<template>
    <div class="min-h-screen flex items-center justify-center" >
      <div class="w-full max-w-md rounded-xl shadow-xl p-8 bg-white/60 backdrop-blur-md border border-white/20">
        
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            class="mx-auto h-12 w-auto"
            src="/images/logo_smarttelcoo.png"
            alt="SmartTelco"
          />
          <h2 class="mt-8 text-center text-2xl font-bold tracking-tight" style="color:#842A3B;">
            SmartTelco Login
          </h2>
        </div>
  
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" @submit.prevent="handleLogin">
  
            <div>
              <label class="block text-sm font-medium" style="color:#842A3B;">Email / Customer ID</label>
              <input
                v-model="identifier"
                type="text"
                required
                class="block w-full rounded-md px-3 py-2 bg-white/60 outline-none text-gray-800 placeholder-gray-500 shadow-sm"
              />
            </div>
  
            <div>
              <label class="block text-sm font-medium" style="color:#842A3B;">Password</label>
              <input
                v-model="password"
                type="password"
                required
                class="block w-full rounded-md px-3 py-2 bg-white/60 outline-none text-gray-800 placeholder-gray-500 shadow-sm"
              />
            </div>
  
            <p v-if="errorMsg" class="text-red-700 text-sm text-center">{{ errorMsg }}</p>
  
            <button
              type="submit"
              class="w-full rounded-md px-3 py-2 text-white font-semibold shadow-md hover:opacity-90"
              style="background-color:#842A3B;"
            >
              Login
            </button>
          </form>
  
          <p class="mt-10 text-center text-sm" style="color:#842A3B;">
            Belum punya akun?
            <router-link to="/register" class="font-semibold hover:underline" style="color:#842A3B;">
              Register di sini
            </router-link>
          </p>
        </div>
  
      </div>
    </div>
  </template>
  
  
<script>
import { ref } from "vue";
import { apiPost } from "../utils/api";
import { saveUser } from "../utils/storage";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const identifier = ref("");
    const password = ref("");
    const errorMsg = ref("");

    const handleLogin = async () => {
      errorMsg.value = "";

      const data = {
        email: identifier.value,
        password: password.value,
      };

      const res = await apiPost("/login", data);

      if (res.error) {
        errorMsg.value = res.error;
        return;
      }

      saveUser(res);

      if (res.role === "Admin") router.push("/Admin");
      else router.push("/home");
    };

    return { identifier, password, errorMsg, handleLogin };
  },
};
</script>

