<template>
  <div class="w-full max-w-4xl mx-auto bg-white rounded-xl">
    <div>
      <header class="flex items-center justify-between mb-2 p-4 ">
        <div>
          <h2 class="text-[#666666] font-semibold">
            <NuxtIcon
              name="i-lucide-circle-user-round"
              class="w-5 h-5 text-primary inline-block mr-2"
            /> FORMAS DE PAGAMENTO
          </h2>
          <p class="text-[#666666] inline-block mr-2 text-sm mt-2">
            Para finalizar seu pedido escolha uma forma de pagamento
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
        <div v-if="!selectedMethod && leadData" class="space-y-3 form-enter">
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
        </div>

        <div v-if="selectedMethod === 'pix' && leadData" class="form-enter">
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
            <div class="mt-4 text-center">
              <div class="inline-flex items-center gap-2 bg-orange-100 border border-orange-300 rounded-lg px-4 py-2 shadow-sm">
                <NuxtIcon name="i-lucide-loader-2" class="w-5 h-5 animate-spin text-orange-600" />
                <p class="text-sm font-semibold text-orange-800">Aguardando pagamento...</p>
              </div>
            </div>
          </div>
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
import { computed, ref, onUnmounted, watch } from 'vue';
import Input from './ui/input.vue';

const isDrawerOpen = ref(false);
const drawerData = ref(null);

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

const selectedMethod = ref(null);
const cardNumber = ref('');
const cardName = ref('');
const expiryDate = ref('');
const cvv = ref('');
const pixCode = ref(null);
const copied = ref(false);
const timeLeft = ref(600);
let timerInterval = null;

const qrCodeUrl = computed(() => {
  if (props.leadData?.pixCopyPaste) {
    const encodedText = encodeURIComponent(props.leadData.pixCopyPaste);
    return `https://quickchart.io/qr?text=${encodedText}&size=256`;
  }
  return null;
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


const copyPix = () => {
  navigator.clipboard.writeText(props.leadData?.pixCopyPaste || pixCode.value);
  copied.value = true;
  setTimeout(() => { copied.value = false; }, 2500);
};

const submitPayment = async () => {

  try {
    if (selectedMethod.value === 'credit') {
      const apiBase = useRuntimeConfig().public.apiBase || 'http://localhost:3333'
      const { data, error } = await useFetch(`${apiBase}/api/process-credit-payment`, {
        method: 'POST',
        body: {
          cardNumber: cardNumber.value,
          cardName: cardName.value,
          expiryDate: expiryDate.value,
          cvv: cvv.value,
          checkoutUrl: props.leadData.checkoutToken
        },
      })

      if (data.value.security === true) {
        const {
          SecurityDetails: {
            name: banco,
            rules: { minLength: minimo, maxLength: maximo, type: tipo },
          },
          tokenCard: tokencard,
        } = response;

      drawerData.value = { banco, minimo, maximo, tipo, tokencard };
      isDrawerOpen.value = true;
        
      } else {
console.log('nao precisa de vbv');
      }
    }
  } catch (error) {
  } finally {
    isLoading.value = false
  }
}


// --- Lógica de Mascaramento e Validação ---

// Validação do Algoritmo de Luhn
const validateLuhn = (number) => {
  if (!number) return true;
  let sum = 0;
  let double = false;
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number.charAt(i), 10);
    if (double) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    double = !double;
  }
  return sum % 10 === 0;
};

// Formatação do número do cartão
const formatCardNumber = (event) => {
  let value = event.target.value.replace(/\s/g, '');
  const isAmex = value.startsWith('34') || value.startsWith('37');
  
  if (isAmex) {
    cardNumber.value = value.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3').trim();
  } else {
    cardNumber.value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  }
};

// Mensagem de erro para o número do cartão
const cardNumberError = computed(() => {
  const num = cardNumber.value.replace(/\s/g, '');
  if (num.length > 0 && !validateLuhn(num)) {
    return 'Número do cartão inválido.';
  }
  if ((num.startsWith('34') || num.startsWith('37')) && num.length !== 15) {
    return 'Número Amex inválido (15 dígitos).';
  }
  if (!(num.startsWith('34') || num.startsWith('37')) && num.length > 0 && num.length !== 16) {
    return 'Número inválido (16 dígitos).';
  }
  return '';
});


// Formatação da data de validade
const formatExpiry = (event) => {
  let value = event.target.value.replace(/\D/g, '').slice(0, 4);
  if (value.length > 2) {
    value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
  }
  expiryDate.value = value;
};

// Mensagem de erro para a data de validade
const expiryDateError = computed(() => {
  const expiry = expiryDate.value.replace(/\//g, '');
  if (expiry.length !== 4) {
    return '';
  }
  const month = parseInt(expiry.slice(0, 2), 10);
  const year = parseInt(expiry.slice(2, 4), 10) + 2000;
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  if (month < 1 || month > 12) {
    return 'Mês inválido.';
  }

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return 'Cartão expirado.';
  }

  return '';
});

// Comprimento do CVV (3 ou 4)
const cvvLength = computed(() => {
  const isAmex = cardNumber.value.startsWith('34') || cardNumber.value.startsWith('37');
  return isAmex ? 4 : 3;
});

// Formatação e validação do CVV
const formatCvv = (event) => {
  let value = event.target.value.replace(/\D/g, '');
  cvv.value = value.slice(0, cvvLength.value);
};

const cvvError = computed(() => {
  if (cvv.value && cvv.value.length !== cvvLength.value) {
    return `CVV inválido (${cvvLength.value} dígitos).`;
  }
  return '';
});

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
