<template>
  <NuxtApp>
    <div class="flex flex-col min-h-screen">
      <Header class="h-[65px]" />

      <main class="flex-1 bg-[#F3F4F6] ">
        <RouterView />
      </main>

      <Footer />
    </div>
  </NuxtApp>
</template>

<script setup>
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';

</script>