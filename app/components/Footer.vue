<template>
  <footer class="bg-white text-gray-800 p-6 sm:p-8 lg:p-10 shadow-lg">
    <div class="max-w-[140rem] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
      <!-- Company Info -->
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <h2 class="text-xl font-bold text-gray-900">
            RecargaFácil
          </h2>
        </div>
        <p class="text-sm text-gray-600 leading-relaxed">
          Simplificando suas recargas com segurança, rapidez e confiança. Estamos aqui para facilitar sua vida!
        </p>
        <div class="flex gap-3 mt-2">
          <NuxtLink
            to="#"
            aria-label="Facebook"
            class="text-orange-600 hover:text-orange-700 transition-colors"
          >
            <NuxtIcon
              name="i-mdi-facebook"
              class="text-2xl"
              filled
            />
          </NuxtLink>
          <NuxtLink
            to="#"
            aria-label="Instagram"
            class="text-orange-600 hover:text-orange-700 transition-colors"
          >
            <NuxtIcon
              name="i-mdi-instagram"
              class="text-2xl"
              filled
            />
          </NuxtLink>
          <NuxtLink
            to="#"
            aria-label="Twitter"
            class="text-orange-600 hover:text-orange-700 transition-colors"
          >
            <NuxtIcon
              name="i-mdi-twitter"
              class="text-2xl"
              filled
            />
          </NuxtLink>
          <NuxtLink
            to="#"
            aria-label="WhatsApp"
            class="text-orange-600 hover:text-orange-700 transition-colors"
          >
            <NuxtIcon
              name="iconoir:whatsapp-solid"
              class="text-2xl"
              filled
            />
          </NuxtLink>
        </div>
      </div>

      <!-- Navigation Links -->
      <div>
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          Navegação
        </h3>
        <ul class="flex flex-col gap-2">
          <li>
            <NuxtLink
              to="#"
              class="text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              Início
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="#"
              class="text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              Sobre Nós
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="#"
              class="text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              Contato
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="#"
              class="text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              Política de Privacidade
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="#"
              class="text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              Termos de Serviço
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Contact Info -->
      <div>
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          Contato
        </h3>
        <ul class="flex flex-col gap-3">
          <li class="flex items-center gap-2">
            <NuxtIcon
              name="i-mdi-mail"
              class="text-orange-600 text-xl"
              filled
            />
            <NuxtLink
              to="mailto:suporte@recargafacil.com"
              class="text-orange-600 hover:text-orange-700 font-medium"
            >
              suporte@recargafacil.com
            </NuxtLink>
          </li>
          <li class="flex items-center gap-2">
            <NuxtIcon
              name="i-mdi-phone"
              class="text-orange-600 text-xl"
              filled
            />
            <NuxtLink
              to="tel:+55112345678"
              class="text-orange-600 hover:text-orange-700 font-medium"
            >
              (11) 1234-5678
            </NuxtLink>
          </li>
          <li class="flex items-center gap-2">
            <NuxtIcon
              name="tabler:map-pin-filled"
              class="text-orange-600 text-xl"
              filled
            />
            <span class="text-gray-600">São Paulo, SP, Brasil</span>
          </li>
        </ul>
      </div>

      <!-- Trust Signals & Payment Methods -->
      <div>
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          Segurança e Pagamentos
        </h3>
        <div class="flex flex-col gap-4">
          <div class="flex gap-3">
            <NuxtIcon
              name="i-mdi-shield-check"
              class="text-orange-600 text-2xl"
              filled
            />
            <p class="text-sm text-gray-600">
              Compra 100% segura
            </p>
          </div>
          <div class="flex gap-3">
            <NuxtIcon
              name="i-mdi-lock"
              class="text-orange-600 text-2xl"
              filled
            />
            <p class="text-sm text-gray-600">
              Criptografia SSL
            </p>
          </div>
          <div class="flex gap-3 mt-2 flex-wrap">
            <NuxtIcon
              name="ic:baseline-pix"
              class="text-orange-600 text-2xl hover:scale-110 transition-transform"
              filled
            />
            <NuxtIcon
              name="i-cib-cc-diners-club"
              class="text-orange-600 text-2xl hover:scale-110 transition-transform"
              filled
            />
            <NuxtIcon
              name="cib:cc-discover"
              class="text-orange-600 text-2xl hover:scale-110 transition-transform"
              filled
            />
            <NuxtIcon
              name="i-cib-cc-amex"
              class="text-orange-600 text-2xl hover:scale-110 transition-transform"
              filled
            />
            <NuxtIcon
              name="i-cib-cc-mastercard"
              class="text-orange-600 text-2xl hover:scale-110 transition-transform"
              filled
            />
            <NuxtIcon
              name="i-cib-cc-visa"
              class="text-orange-600 text-2xl hover:scale-110 transition-transform"
              filled
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="mt-8 pt-6 border-t border-gray-200 text-center">
      <p class="text-sm text-gray-500">
        &copy; 2025 RecargaFácil. Todos os direitos reservados.
      </p>
    </div>
  </footer>
</template>

<script setup>
// No JavaScript logic needed for a static footer
</script>

<style scoped>
/* Smooth transitions for hover effects */
a {
  transition: color 0.2s ease-in-out;
}

/* Accessibility for focus states */
a:focus {
  outline: 2px solid #f97316; /* Orange-600 */
  outline-offset: 2px;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .grid {
    text-align: center;
  }
  .flex-col {
    align-items: center;
  }
  .flex {
    justify-content: center;
  }
}
</style>