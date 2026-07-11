<template>

  <div class="panel">

    <!-- HEADER -->
    <div
      v-if="variant === 'retractable'"
      class="panel-header"
      @click="togglePanel"
    >

      <div class="panel-icon">
	<div class="icon">
	  <Planet
	    :size="40"
	    :planetName="icon"/>
	</div>
      </div>

      <div class="panel-title text-area"
	   :class="{selected: isPanelOpen }">
        {{ title }}
      </div>

    </div>

    <!-- CONTENT -->
    <Transition name="expand">

      <div
        v-if="variant === 'normal' || isPanelOpen"
        class="bubble panel-content"
      >
        <slot />
      </div>

    </Transition>


  </div>

</template>


<script setup>

 import { ref } from 'vue'
 import Planet  from '@/components/Planet.vue'

 const props = defineProps({

   title:{
     type:String,
     default:''
   },

   variant:{
     type:String,
     default:'normal'
   },

   icon:{
     type:String,
     default:'default'
   },

   isOpen:{
     type:Boolean,
     default:true
   }

 })

 const isPanelOpen = ref(props.isOpen)


 function togglePanel(){

   if(props.variant === 'retractable'){
     isPanelOpen.value = !isPanelOpen.value
   }

 }

</script>
