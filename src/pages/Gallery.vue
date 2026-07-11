<script setup>
 import RegularLayout from '@/layouts/RegularLayout.vue'
 import Panel         from '@/components/Panel.vue'
 import PreviewImage  from '@/components/PreviewImage.vue'

 // Images
 import spikeFullart from '@/assets/imgs/gallery/spikeFullart.png'

</script>

<template>
  <RegularLayout>
    <template #content>
      <Panel
      title="Introduction"
      variant="normal">
      <div class="centered tiny-div">
        <PreviewImage
          :src="spikeFullart"
          alt="spikeFullart"
          caption="Spike Full Art"
          description="Spike is the protagonist of The Goblins (currently in the concept phase), 
          a game that follows the story of a group of goblins who, after being marginalized and 
          confined by the London authorities, decide to fight injustice in their own anarchic way, 
          using the power of punk and music.
          
          Armed with his bass guitar, Spike leads the group. This illustration showcases his full 
          character artwork, intended for a potential character selection screen, along with his 
          in-game sprite design and the color palette used throughout the game."
        />
		  </div>
    </Panel>
    </template>
  </RegularLayout>
</template>
