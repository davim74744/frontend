<!-- components/ResumoPedido.vue -->
<template>
  <div class="enterprise-card">
    <NuxtCard class="w-full rounded-lg bg-white">
      <div
        class="p-6 cursor-pointer rounded-t-lg transition-colors duration-200"
        @click="toggleExpand"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="text-gray-900">
              <h2 class="text-[#666666] font-semibold">
                <NuxtIcon
                  name="bitcoin-icons:cart-filled"
                  class="w-5 h-5 text-primary inline-block mr-2"
                />
                RESUMO DO PEDIDO
              </h2>
              <p class="text-[#666666] text-sm mt-2">
                {{ formatCurrency(leadData?.planValue || pedido.valor) }} • {{ formatPhone(leadData?.phone || pedido.telefone) }}
              </p>
            </div>
          </div>
          <div class="flex items-center">
            <NuxtIcon
              name="heroicons:chevron-down-20-solid"
              class="w-6 h-6 text-orange-600 rotate-icon"
              :class="{ 'rotated': isExpanded }"
            />
          </div>
        </div>
      </div>

      <div
        class="expand-content"
        :class="{ 'open': isExpanded }"
      >
        <div class="p-6 pt-0 space-y-6">
          <div
            class="fade-in"
            :class="{ 'show': isExpanded }"
            :style="{ 'transition-delay': '100ms' }"
          >
            <div class="bg-white rounded-lg p-4 space-y-4 mt-4 border border-gray-200">
              <div class="flex justify-between items-center">
                <span class="text-gray-600 text-sm">Operadora</span>
                <span class="font-medium text-gray-900">{{ leadData?.operator || pedido.operadora }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 text-sm">Valor</span>
                <span class="font-bold text-lg text-orange-600">{{ formatCurrency(leadData?.planValue || pedido.valor) }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 text-sm">Data/Hora</span>
                <span class="font-medium text-gray-900">{{ leadData?.createdAt ? new Date(leadData.createdAt).toLocaleDateString('pt-BR') : pedido.dataHora }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 text-sm">ID Transação</span>
                <span class="font-mono text-sm bg-orange-100 text-primary px-2 py-1 rounded">
                  #{{ leadData?.pixTransactionId || pedido.id }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtCard>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const props = defineProps({
  leadData: {
    type: Object,
    default: () => ({})
  }
});

const pedido = ref({
  valor: 20.00,
  telefone: '(11) 99999-8888',
  operadora: 'Vivo',
  dataHora: '22/08/2025',
  id: 'RC001234'
});

const isExpanded = ref(false);
let mediaQuery;

const checkScreenSize = () => {
  if (mediaQuery.matches) {
    isExpanded.value = true;
  }
};

onMounted(() => {
  mediaQuery = window.matchMedia('(min-width: 1024px)');
  checkScreenSize();
  mediaQuery.addEventListener('change', checkScreenSize);
});

onUnmounted(() => {
  mediaQuery.removeEventListener('change', checkScreenSize);
});

const toggleExpand = () => {
  if (!mediaQuery.matches) {
    isExpanded.value = !isExpanded.value;
  }
};

const formatCurrency = (value) => {
  if (typeof value !== 'number') return 'R$ 0,00';
  return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const formatPhone = (value) => {
  const clean = value.replace(/\D/g, '');
  if (clean.length === 11) {
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7, 11)}`;
  } else if (clean.length === 10) {
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 6)}-${clean.slice(6, 10)}`;
  }
  return value;
};
</script>

<style scoped>
.enterprise-card {
  max-width: 640px;
  margin: 0 auto;
}

.expand-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.expand-content.open {
  max-height: 1200px;
}

.rotate-icon {
  transition: transform 0.3s ease;
}

.rotate-icon.rotated {
  transform: rotate(180deg);
}

.fade-in {
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}

.fade-in.show {
  opacity: 1;
  transform: translateY(0);
}

/* Estilização para interatividade */
.bg-gray-50:hover {
  background-color: #f9fafb;
}

.bg-orange-50:hover {
  background-color: #fef5ef;
}

/* Tipografia refinada */
.text-gray-900 {
  color: #1a202c;
}

.text-gray-600 {
  color: #4b5563;
}

.font-semibold {
  font-weight: 600;
}

.font-medium {
  font-weight: 500;
}

/* Sombras e bordas sutis */
.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

/* Acessibilidade */
:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 2px;
}

/* Estilo para o fundo do cartão */
.bg-white {
  background-color: #ffffff;
}

/* Ajustes para o ícone de expansão */
.text-orange-600 {
  color: #f97316;
}

.bg-orange-100 {
  background-color: #fff7ed;
}

.text-orange-800 {
  color: #c2410c;
}
</style>