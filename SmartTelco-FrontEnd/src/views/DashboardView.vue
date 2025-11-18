<template>
  <div class="space-y-6 pb-10">

    <h2 class="text-2xl font-bold">Dashboard Pengguna</h2>

    <div class="bg-white p-4 rounded shadow space-y-2">
      <h3 class="font-semibold">Selamat datang, {{ user.name }}</h3>
      <p>Email: {{ user.email }}</p>
    </div>

    <div class="space-y-3">
      <button @click="goToInput" class="bg-blue-600 text-white p-3 rounded w-full">
        Isi Data Manual
      </button>

      <button @click="goToHasil" class="bg-green-600 text-white p-3 rounded w-full">
        Lihat Rekomendasi Terakhir
      </button>

      <button @click="logout" class="bg-red-600 text-white p-3 rounded w-full">
        Logout
      </button>
    </div>

  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const user = reactive({ name: "", email: "" });

onMounted(() => {
  const data = JSON.parse(localStorage.getItem("user"));
  if (data) {
    user.name = data.name;
    user.email = data.email;
  } else {
    router.push("/login");
  }
});

function goToInput() {
  router.push("/home");
}

function goToHasil() {
  router.push("/hasil");
}

function logout() {
  localStorage.removeItem("user");
  router.push("/login");
}
</script>
