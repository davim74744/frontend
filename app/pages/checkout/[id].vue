<!-- pages/[id].vue -->
<template>
  <div class="max-w-[95rem] mx-auto px-4 sm:px-20 md:px-20 lg:px-20 py-11 sm:py-20 md:py-20 lg:py-20 rounded-xl">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-6">
      <div class="md:col-span-5 order-first md:order-last">
        <ResumoPedido 
          class="sm:p-4 md:p-4 lg:p-4 w-full min-w-0" 
          :lead-data="processedLeadData"
          v-if="processedLeadData && !pending && !error"
        />
      </div>
      <div class="md:col-span-7 space-y-6 order-last md:order-first">
        <Etapa1 
          class="p-4 sm:p-4 md:p-4 lg:p-4 w-full min-w-0" 
          :lead-data="processedLeadData"
          v-if="processedLeadData && !pending && !error"
          @submit="handleStep1Submit"
          @edit="handleEdit"
        />
        <Etapa2 
          class="p-4 sm:p-4 md:p-4 lg:p-4 w-full min-w-0" 
          :lead-data="processedLeadData"
          :is-step1-complete="isStep1Complete"
          @submit-payment="handlePaymentSubmit"
        />
      </div>
      <div v-if="pending" class="text-center">A carregar...</div>
      <div v-if="error" class="text-center text-red-500">Erro ao carregar dados: {{ error.message }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue'
import Etapa1 from '~/components/Etapa1.vue'
import Etapa2 from '~/components/Etapa2.vue'
import ResumoPedido from '~/components/ResumoPedido.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const tokenCheckout = route.params.id

const leadData = ref(null)
const error = ref(null)
const pending = ref(true)
const isStep1Complete = ref(false)

const { data, error: fetchError, pending: fetchPending } = await useAsyncData(
  `lead-${tokenCheckout}`,
  async () => {
    try {
      // Passo 1: Gerar o Pix
      await $fetch(`http://localhost:3333/api/leads/generatepix/${tokenCheckout}`, {
        method: 'GET',
      })

      // Passo 2: Buscar os dados atualizados do lead
      const leadResponse = await $fetch(`http://localhost:3333/api/leads/${tokenCheckout}`, {
        method: 'GET',
      })
      console.log('Dados do lead:', leadResponse)
      return leadResponse
    } catch (err) {
      error.value = err
      console.error('Erro ao buscar dados do lead:', err)
    }
  }
)

const processedLeadData = computed(() => {
  if (!leadData.value) return null
  return {
    ...leadData.value,
    planValue: parseFloat(leadData.value.planValue) || 0 // Converte para número
  }
})

watchEffect(() => {
  leadData.value = data.value
  error.value = fetchError.value || error.value
  pending.value = fetchPending.value
})

const handleStep1Submit = (data) => {
  console.log('Dados submetidos do Etapa1:', data)
  isStep1Complete.value = true
}

const handleEdit = () => {
  isStep1Complete.value = false
}

const handlePaymentSubmit = async (paymentData) => {
  console.log('Pagamento submetido:', paymentData)
  if (paymentData.method === 'pix') {
    try {
      const generatePixResponse = await $fetch(`http://localhost:3333/api/leads/generatepix/${tokenCheckout}`, {
        method: 'GET',
      })
      const updatedLead = await $fetch(`http://localhost:3333/api/leads/${tokenCheckout}`, {
        method: 'GET',
      })
      leadData.value = updatedLead
      console.log('Pix gerado e lead atualizado:', updatedLead)
    } catch (err) {
      error.value = err
      console.error('Erro ao gerar Pix:', err)
    }
  }
}
</script>