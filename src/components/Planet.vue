<template>
  <div 
    class="poly-planet" 
    :style="{
      '--size': size + 'px',
      '--bg-image': `url(${texture})`}"
  >
    <div class="face -no1"></div>
    <div class="face -no2"></div>
    <div class="face -no3"></div>
    <div class="face -no4"></div>
    <div class="face -no5"></div>
    <div class="face -no6"></div>
  </div>
</template>

<script setup>
 import ceresTexture   from "@/assets/textures/ceres.jpg"
 import deimosTexture  from "@/assets/textures/deimos.jpg"
 import erisTexture    from "@/assets/textures/eris.jpg"
 import jupiterTexture from "@/assets/textures/jupiter.jpg"
 import marsTexture    from "@/assets/textures/mars.jpg"
 import mercuryTexture from "@/assets/textures/mercury.jpg"
 import moonTexture    from "@/assets/textures/moon.jpg"
 import neptuneTexture from "@/assets/textures/neptune.jpg"
 import saturnTexture  from "@/assets/textures/saturn.jpg"
 import sunTexture     from "@/assets/textures/sun.jpg"
 import uranusTexture  from "@/assets/textures/uranus.jpg"
 import venusTexture   from "@/assets/textures/venus.jpg"
 import defaultTexture from "@/assets/textures/default.jpg"

 const props = defineProps({
   size: {
     type: Number,
     default: 64
   },
   planetName: {
     type: String,
     default: "default"
   }
 })

 const textures = {
   ceres:   ceresTexture,
   deimos:  deimosTexture,
   eris:    erisTexture,
   jupiter: jupiterTexture,
   mars:    marsTexture,
   mercury: mercuryTexture,
   moon:    moonTexture,
   neptune: neptuneTexture,
   saturn:  saturnTexture,
   sun:     sunTexture,
   uranus:  uranusTexture,
   venus:   venusTexture,
 }

 const texture = textures[props.planetName] ?? defaultTexture
</script>
