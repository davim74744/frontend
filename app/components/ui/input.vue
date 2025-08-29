<template>
  <div class="relative">
    <!-- Input HTML nativo com classe peer -->
    <input
      v-bind="$attrs"
      v-model="inputValue"
      :placeholder="placeholder || ' '"
      class="peer w-full h-14 px-4 pt-6 pb-2 border border-gray-300 rounded-lg bg-white text-base placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary rounded-xl focus:border-primary transition-all duration-200"
    />
    
    <!-- Label flutuante -->
    <label
      :for="$attrs.id"
      class="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ' '
  }
});

// v-model
const inputValue = defineModel();
</script>
