<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white shadow-md rounded-xl p-6">
      <h2 class="text-2xl font-bold text-center mb-6">SmartTelco Login</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">

        <!-- Email atau Customer ID -->
        <div>
          <label class="block mb-1 font-medium">Email / Customer ID</label>
          <input
            v-model="identifier"
            type="text"
            class="w-full border rounded-lg px-3 py-2"
            placeholder="example@mail.com / C00001"
            required
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block mb-1 font-medium">Password</label>
          <input
            v-model="password"
            type="password"
            class="w-full border rounded-lg px-3 py-2"
            placeholder="Masukkan password"
            required
          />
        </div>

        <!-- Error Message -->
        <p v-if="errorMsg" class="text-red-600 text-sm">{{ errorMsg }}</p>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p class="text-sm text-center">
          Belum punya akun?
          <router-link to="/register" class="text-blue-600">Register di sini</router-link>
        </p>
      </form>
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

      if (res.role === "Admin") router.push("/admin");
      else router.push("/home");
    };

    return { identifier, password, errorMsg, handleLogin };
  },
};
</script>

