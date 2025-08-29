<!-- components/Etapa2.vue -->
<template>
  <div class="w-full max-w-4xl mx-auto bg-white rounded-xl">
    <div>
      <header class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-[#666666] font-semibold text-center">
            {{ headerContent.title }}
          </h2>
          <p class="text-[#666666] inline-block mr-2 text-sm mt-2">
            {{ headerContent.subtitle }}
          </p>
        </div>
        <NuxtButton
          v-if="selectedMethod && leadData"
          variant="link"
          class="text-sm font-semibold text-orange-600 hover:text-orange-700"
          @click="resetMethod"
        >
          Trocar
        </NuxtButton>
      </header>

      <div>
        <div v-if="!selectedMethod && isStep1Complete && leadData" class="space-y-3 form-enter">
          <button
            class="group w-full flex items-center justify-between p-4 border border-primary rounded-xl text-left transition-colors duration-200 hover:border-orange-500 hover:bg-orange-50"
            @click="selectMethod('pix')"
          >
            <div class="flex items-center gap-4">
              <NuxtIcon name="ic:baseline-pix" class="w-7 h-7 text-primary" />
              <span class="text-[#666666] font-semibold">Pagar com Pix</span>
            </div>
            <NuxtIcon name="i-lucide-chevron-right" class="w-5 h-5 text-primary group-hover:text-primary" />
          </button>

          <button
            class="group w-full flex items-center justify-between p-4 border border-primary rounded-xl text-left transition-colors duration-200 hover:border-orange-500 hover:bg-orange-50"
            @click="selectMethod('credit')"
          >
            <div class="flex items-center gap-4">
              <NuxtIcon name="i-lucide-credit-card" class="w-7 h-7 text-primary" />
              <span class="text-[#666666] font-semibold">Cartão de Crédito</span>
            </div>
            <NuxtIcon name="i-lucide-chevron-right" class="w-5 h-5 text-primary group-hover:text-primary" />
          </button>
        </div>

        <div v-if="selectedMethod === 'pix' && isStep1Complete && leadData" class="form-enter">
          <div class="border text-primary rounded-lg p-4 sm:p-6">
            <div class="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center">
              <div class="flex-shrink-0 text-center">
                <div class="p-2 bg-white border rounded-md text-primary inline-block">
                  <ClientOnly>
                    <img
                      :src="qrCodeUrl"
                      alt="QR Code Pix da transação"
                      loading="lazy"
                      width="256"
                      height="256"
                      class="self-center bg-muted/40"
                      v-if="qrCodeUrl"
                    />
                    <NuxtIcon v-else name="i-lucide-qr-code" class="w-40 h-40 text-gray-900" />
                  </ClientOnly>
                </div>
                <p class="mt-2 text-xs text-red-600">
                  Expira em <span class="font-bold">{{ timerDisplay }}</span>
                </p>
              </div>

              <div class="w-full">
                <p class="text-sm font-semibold text-gray-800">
                  1. Abra o app do seu banco e escaneie
                </p>
                <p class="text-sm text-gray-600 mb-4">
                  2. Confirme o pagamento e pronto!
                </p>

                <div class="relative my-4 sm:my-5">
                  <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200"></div></div>
                  <div class="relative flex justify-center text-sm"><span class="px-2 bg-white text-gray-500">ou</span></div>
                </div>

                <label class="block text-sm font-medium text-gray-700 mb-1">Copie o código Pix:</label>
                <div class="flex rounded-md border overflow-hidden focus-within:ring-2 focus-within:ring-orange-400">
                  <input :value="leadData?.pixCopyPaste || pixCode" readonly class="bg-gray-50 w-full p-2 text-sm text-gray-600 font-mono focus:outline-none truncate" />
                  <button class="bg-primary hover:bg-gray-300 text-gray-800 p-2.5 transition-colors" @click="copyPix" aria-label="Copiar código Pix">
                    <NuxtIcon v-if="!copied" name="i-lucide-copy" class="w-5 h-5 text-white" />
                    <NuxtIcon v-else name="i-lucide-check" class="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <NuxtButton
            v-if="isStep1Complete && leadData"
            color="primary"
            class="w-full mt-6 font-sans font-semibold h-12 py-3 px-6 rounded-xl transition-all duration-300 ease-in-out flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm hover:shadow-md transform hover:-translate-y-px bg-primary text-light hover:bg-primary-hover focus:ring-primary"
            @click="submitPayment"
          >
            Confirmar Pagamento Pix
          </NuxtButton>
        </div>


        <div v-if="selectedMethod === 'credit' && isStep1Complete && leadData" class="form-enter">
          <div class="space-y-4">
            <div class="relative">
              <Input v-model="cardNumber" label="Número do Cartão" placeholder="0000 0000 0000 0000" maxlength="19" @input="formatCardNumber" />
            </div>
            <Input v-model="cardName" label="Nome do Titular" placeholder="Como está gravado no cartão" />
            <div class="grid grid-cols-2 gap-4">
              <Input v-model="expiryDate" label="Validade (MM/AA)" placeholder="MM/AA" maxlength="5" @input="formatExpiry" />
              <Input v-model="cvv" label="CVV" placeholder="123" maxlength="4" />
            </div>
          </div>
          <NuxtButton
            v-if="isStep1Complete && leadData"
            color="primary"
            class="w-full mt-6 font-sans font-semibold h-12 py-3 px-6 rounded-xl transition-all duration-300 ease-in-out flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm hover:shadow-md transform hover:-translate-y-px bg-primary text-light hover:bg-primary-hover focus:ring-primary"
            :disabled="isLoading"
            @click="submitPayment"
          >
            <span v-if="isLoading">Processando...</span>
            <span v-else>Pagar com Cartão</span>
          </NuxtButton>
          <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>
          <p v-if="successMessage" class="text-green-500 text-sm mt-2">{{ successMessage }}</p>
        </div>
        <slot name="skeleton" v-if="!leadData">
          <div class="animate-pulse space-y-6">
            <div class="h-6 bg-gray-200 rounded w-1/2"></div>
            <div class="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div class="h-40 bg-gray-200 rounded w-full"></div>
            <div class="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>


const props = defineProps({
  leadData: {
    type: Object,
    default: () => ({})
  },
  isStep1Complete: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['submit-payment']);

const selectedMethod = ref(null);
const cardNumber = ref('');
const cardName = ref('');
const expiryDate = ref('');
const cvv = ref('');
const isLoading = ref(false) // Adicionado
const errorMessage = ref('') // Adicionado
const successMessage = ref('') // Adicionado
const pixCode = ref('00020126580014br.gov.bcb.pix0136abc-1234...');
const copied = ref(false);
const timeLeft = ref(600);
let timerInterval = null;

const qrCodeUrl = computed(() => {
  if (props.leadData?.pixCopyPaste) {
    // Encode o texto para URL e gere a URL da QuickChart
    const encodedText = encodeURIComponent(props.leadData.pixCopyPaste);
    return `https://quickchart.io/qr?text=${encodedText}&size=256`;
  }
  return null;
});

const headerContent = computed(() => {
  if (selectedMethod.value === 'pix') return { title: 'Pague com Pix', subtitle: 'Aponte seu celular para o QR Code.' };
  if (selectedMethod.value === 'credit') return { title: 'Dados do Cartão', subtitle: 'Informações protegidas.' };
  return { title: 'Escolha como pagar', subtitle: 'Selecione uma opção abaixo.' };
});

const timerDisplay = computed(() => {
  const m = Math.floor(timeLeft.value / 60);
  const s = timeLeft.value % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
});

const startTimer = () => {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) timeLeft.value--;
    else clearInterval(timerInterval);
  }, 1000);
};

const selectMethod = (method) => {
  selectedMethod.value = method;
  if (method === 'pix') {
    timeLeft.value = 600;
    startTimer();
  }
};

const resetMethod = () => {
  selectedMethod.value = null;
  if (timerInterval) clearInterval(timerInterval);
};

const formatCardNumber = () => {
  const value = cardNumber.value.replace(/\D/g, '').substring(0, 16);
  cardNumber.value = value.match(/.{1,4}/g)?.join(' ') || value;
};

const formatExpiry = () => {
  const value = expiryDate.value.replace(/\D/g, '').substring(0, 4);
  expiryDate.value = value.length > 2 ? `${value.substring(0, 2)}/${value.substring(2)}` : value;
};

const copyPix = () => {
  navigator.clipboard.writeText(props.leadData?.pixCopyPaste || pixCode.value);
  copied.value = true;
  setTimeout(() => { copied.value = false; }, 2500);
};

const submitPayment = async () => {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    if (selectedMethod.value === 'pix') {
      emit('submit-payment', { method: 'pix', pixCode: props.leadData?.pixCopyPaste })
    } else if (selectedMethod.value === 'credit') {
      const apiBase = useRuntimeConfig().public.apiBase || 'http://localhost:3333'
      const response = await useFetch(`${apiBase}/api/process-credit-payment`, {
        method: 'POST',
        body: {
          cardNumber: cardNumber.value,
          cardName: cardName.value,
          expiryDate: expiryDate.value,
          cvv: cvv.value,
        },
      })

      if (response.error.value) {
        errorMessage.value = 'Erro ao processar o pagamento. Tente novamente.'
        console.error('Erro na requisição:', response.error.value)
      } else {
        successMessage.value = 'Pagamento enviado para processamento com sucesso!'
        console.log('Pagamento enviado com sucesso:', response.data.value)
        // Opcional: Limpar os campos após sucesso
        cardNumber.value = ''
        cardName.value = ''
        expiryDate.value = ''
        cvv.value = ''
      }
    }
  } catch (error) {
    errorMessage.value = 'Erro ao conectar com o servidor.'
    console.error('Erro na requisição:', error)
  } finally {
    isLoading.value = false
  }
}

watch(() => props.leadData, (newLeadData) => {
  if (newLeadData?.pixCopyPaste) {
    pixCode.value = newLeadData.pixCopyPaste;
  }
}, { immediate: true });

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});
</script>

<style scoped>
@keyframes form-enter-animation {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.form-enter {
  animation: form-enter-animation 0.3s ease-out forwards;
}

.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
</style>