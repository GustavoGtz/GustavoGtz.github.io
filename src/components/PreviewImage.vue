<template>
  <div class="preview-img">
    <img
      :src="src"
      :alt="alt"
      @click="show = true"
    >

    <p class="caption">
      {{ caption }}
    </p>

    <ModalImage
      :visible="show"
      :src="src"
      :alt="alt"
      :description="description"
      @close="show = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ModalImage from './ModalImage.vue'

defineProps({
  src: String,
  alt: String,
  caption: String,
  description: String
})

const show = ref(false)
</script>
