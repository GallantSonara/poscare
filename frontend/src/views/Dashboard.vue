<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <div>
    <Header />
    <div class="w-full min-h-screen">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>
