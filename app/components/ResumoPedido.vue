<template>
  <NuxtCard class="w-full max-w-2xl mx-auto">
    <NuxtAccordion
      :items="items"
      :ui="{
        wrapper: 'flex flex-col w-full',
        item: {
          padding: 'p-0',
        },
      }"
      default-open
    >
      <template #default="{ item, open }">
        <div class="p-6">
          <NuxtButton
            color="gray"
            variant="ghost"
            class="w-full flex justify-between items-center"
            :class="[
              open ? 'mb-0' : 'mb-4',
            ]"
          >
            <div class="flex items-center">
              <NuxtIcon
                name="i-heroicons-shopping-cart"
                class="w-8 h-8 text-primary -mt-2 mr-4"
              />
              <h2 class="text-gray-600 font-semibold text-lg">Resumo do Pedido</h2>
            </div>
          </NuxtButton>
        </div>
      </template>
      <template #details>
        <div
          class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 space-y-4 mx-6 mb-6"
        >
          <div class="flex justify-between items-center">
            <span class="text-gray-600 text-sm">Operadora</span>
            <span class="font-medium text-gray-900 dark:text-gray-100">{{
              leadData?.operator
            }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600 text-sm">Telefone</span>
            <span class="font-medium text-gray-900 dark:text-gray-100">{{
              formatPhone(leadData?.phone)
            }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600 text-sm">Valor</span>
            <span class="font-bold text-lg text-orange-600">{{
              formatCurrency(leadData?.planValue)
            }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600 text-sm">Data/Hora</span>
            <span class="font-medium text-gray-900 dark:text-gray-100">
              {{
                leadData?.createdAt
                  ? new Date(leadData.createdAt).toLocaleDateString("pt-BR")
                  : ""
              }}
            </span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600 text-sm">ID Transação</span>
            <span
              class="font-mono text-sm bg-orange-100 text-primary px-2 py-1 rounded"
            >
              #{{ leadData?.pixTransactionId }}
            </span>
          </div>
        </div>
      </template>
    </NuxtAccordion>
  </NuxtCard>
</template>

<script setup>
const props = defineProps({
  leadData: {
    type: Object,
    default: () => ({}),
  },
});

const items = [
  {
    label: "Resumo do Pedido",
    slot: "details",
  },
];
</script>