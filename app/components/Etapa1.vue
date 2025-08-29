<!-- components/Etapa1.vue -->
<template>
  <NuxtCard class="p-4 sm:p-6 border-none rounded-xl">
    <h2 class="text-[#666666] font-semibold">
      <NuxtIcon
        name="i-lucide-circle-user-round"
        class="w-5 h-5 text-primary inline-block mr-2"
      /> INFORMAÇÕES PESSOAIS
    </h2>
    <p class="text-[#666666] inline-block mr-2 text-sm mt-2">
      Utilizaremos o seu e-mail para: Identificar o seu perfil, histórico de compras, notificação de pedidos e carrinho de compras.
    </p>
    
    <form v-if="showForm" class="space-y-6 mt-6" @submit.prevent="handleSubmit">
      <div>
        <Input 
          id="name"
          v-model="name" 
          label="Nome completo"
          class="w-full" 
        />
      </div>
      <div>
        <Input 
          id="email"
          v-model="email" 
          type="email" 
          label="E-mail"
          class="w-full" 
        />
      </div>
      <div>
        <Input 
          id="CPF"
          v-model="CPF" 
          type="numeric" 
          label="CPF"
          class="w-full" 
        />
      </div>
      <div>
        <Input 
          id="phone"
          v-model="phone" 
          type="tel" 
          label="Telemóvel/Whatsapp"
          class="w-full" 
        />
      </div>
      <NuxtButton 
        type="submit" 
        class="w-full font-sans font-semibold h-12 py-3 px-6 rounded-xl transition-all duration-300 ease-in-out flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm hover:shadow-md transform hover:-translate-y-px bg-primary text-light hover:bg-primary-hover focus:ring-primary"
        :disabled="!isFormValid"
      >
        CONTINUAR
        <NuxtIcon name="i-lucide-arrow-right" />
      </NuxtButton>
    </form>
    <div v-else class="mt-6">
      <NuxtButton 
        @click="handleEdit"
        class="w-full font-sans font-semibold h-12 py-3 px-6 rounded-xl transition-all duration-300 ease-in-out flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm hover:shadow-md transform hover:-translate-y-px bg-primary text-light hover:bg-primary-hover focus:ring-primary"
      >
        EDITAR INFORMAÇÕES
        <NuxtIcon name="i-lucide-edit" />
      </NuxtButton>
    </div>
  </NuxtCard>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue';
import Input from './ui/input.vue';

const props = defineProps({
  leadData: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['submit', 'edit']);

const name = ref('');
const email = ref('');
const CPF = ref('');
const phone = ref('');
const showForm = ref(true);

const isFormValid = computed(() => {
  return name.value.trim() && email.value.trim() && CPF.value.trim() && phone.value.trim();
});

watchEffect(() => {
  const lead = props.leadData;
  if (lead && Object.keys(lead).length > 0) {
    name.value = lead.name || '';
    email.value = lead.email || '';
    CPF.value = lead.cpf || '';
    phone.value = lead.phone || '';
  }
});

const handleSubmit = () => {
  if (isFormValid.value) {
    emit('submit', {
      name: name.value,
      email: email.value,
      cpf: CPF.value,
      phone: phone.value
    });
    showForm.value = false;
  }
};

const handleEdit = () => {
  showForm.value = true;
  emit('edit');
};
</script>