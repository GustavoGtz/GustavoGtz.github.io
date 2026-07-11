<script setup>
 import Header from '@/components/Header.vue'
 import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="regular-layout">
    <div class="space"></div>
    <Header />

    <section class="regular-section">
      <slot name="content" />
    </section>
    
    <Footer />
  </div>
</template>

