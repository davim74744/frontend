<template>
  <header class="header">
    <div class="bg-[#FFFFFF] border-b border-neutral-100 border-opacity-80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center">
          <NuxtImg
            src="/logo.png"
            alt="RecargaFácil Logo"
            width="130"
            height="40"
          />
        </div>
        <div class="flex items-center text-sm font-medium text-primary gap-1">
          <ClientOnly
            fallback-tag="span"
            fallback=""
          >
            <NuxtIcon
              name="i-lucide-shield-check"
              class="w-5 h-5"
            />
          </ClientOnly>
          Compra 100% Segura
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ClientOnly } from '#components';
</script>