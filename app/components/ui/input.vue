<template>
  <div class="relative">
    <input
      v-bind="$attrs"
      v-model="inputValue"
      :placeholder="placeholder || ' '"
      class="peer w-full h-14 px-4 pt-6 pb-2 border rounded-lg bg-white text-base placeholder-transparent focus:outline-none focus:ring-2 rounded-xl transition-all duration-200"
      :class="{
        'border-red-500 focus:border-red-500 focus:ring-red-500': hasError,
        'border-gray-300 focus:border-primary focus:ring-primary': !hasError,
      }"
    />
    
    <label
      :for="$attrs.id"
      class="absolute left-4 top-2 font-medium text-xs transition-all duration-200 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs"
      :class="{
        'text-red-500 peer-focus:text-red-500': hasError,
        'text-gray-500 peer-focus:text-primary': !hasError,
      }"
    >
      {{ label }}
    </label>

    <p v-if="hasError" class="mt-1 ml-1 text-sm text-red-500">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

// Props
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: ' ',
  },
  errorMessage: {
    type: String,
    default: '',
  },
});

// v-model
const inputValue = defineModel();

// Prop computada para verificar se há erro
const hasError = computed(() => !!props.errorMessage);
</script>