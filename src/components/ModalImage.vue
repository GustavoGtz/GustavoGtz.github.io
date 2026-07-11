<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="modal"
      @click="$emit('close')"
    >
      <div class="modal-close">
        Click anywhere outside the image to close
      </div>

      <div class="modal-image">
        <img
          :src="src"
          :alt="alt"
          @click.stop
        >
      </div>

      <div class="modal-description">
        <p>
          {{ description }}
        </p>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
    defineProps({
        visible: Boolean,
        src: String,
        alt: String,
        description: String
    })

    defineEmits(['close'])
</script>