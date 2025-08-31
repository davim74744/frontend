<template>
  <div class="max-w-[95rem] mx-auto px-4 sm:px-20 md:px-20 lg:px-20 py-11 sm:py-20 md:py-20 lg:py-20 rounded-xl">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-6">
      <div class="md:col-span-5 order-first md:order-last">
        <ResumoPedido 
          class="sm:p-4 md:p-4 lg:p-4 w-full min-w-0" 
          :lead-data="processedLeadData"
        />
      </div>
      <div class="md:col-span-7 space-y-6 order-last md:order-first">
        <Etapa1 
          class="p-4 sm:p-4 md:p-4 lg:p-4 w-full min-w-0" 
          :lead-data="processedLeadData"
          v-if="processedLeadData"
        />
        <Etapa2 
          class="p-4 sm:p-4 md:p-4 lg:p-4 w-full min-w-0" 
          :lead-data="processedLeadData"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ResumoPedido from '~/components/ResumoPedido.vue'
import Etapa1 from '~/components/Etapa1.vue'
import Etapa2 from '~/components/Etapa2.vue'

const route = useRoute()
const tokenCheckout = route.params.id
const apiBase = useRuntimeConfig().public.apiBase || 'http://localhost:3333';
const isStep1Complete = ref(false)

const { data: leadData, pending, error } = await useAsyncData(
  'leadData',
  async () => {
    // Sua lógica para buscar dados da API
    await $fetch(`${apiBase}/api/leads/generatepix/${tokenCheckout}`, { method: 'GET' });
    const response = await $fetch(`${apiBase}/api/leads/${tokenCheckout}`, { method: 'GET' });
    return response;
  },
);

const processedLeadData = computed(() => {
  if (!leadData.value) return null;
  return {
    ...leadData.value,
  };
});
</script>