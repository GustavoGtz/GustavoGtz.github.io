<script setup>
 /* DEPENDENCIES --------------------------------------------*/
 import { ref, useTemplateRef, onMounted,
	  onUnmounted }                   from 'vue'
 import { RouterLink }                    from "vue-router";

 import Planet  from '@/components/Planet.vue'
 
 /* CONST AND VARIABLES -------------------------------------*/
 const facesPath = 'assets/face-test/'
 const faces = {
   base:      facesPath + 'face.png',
   left:      facesPath + 'face-left.png',
   right:     facesPath + 'face-right.png',
   up:        facesPath + 'face-up.png',
   down:      facesPath + 'face-down.png',
   leftUp:    facesPath + 'face-left-up.png',
   leftDown:  facesPath + 'face-left-down.png',
   rightUp:   facesPath + 'face-right-up.png',
   rightDown: facesPath + 'face-right-down.png'
 }
 const faceDirections = {
   up: {
     left:  faces.leftUp,
     none:  faces.up,
     right: faces.rightUp
   },

   none: {
     left:  faces.left,
     none:  faces.base,
     right: faces.right
   },

   down: {
     left:  faces.leftDown,
     none:  faces.down,
     right: faces.rightDown
   }
 }
 const currentFace = ref(new URL(faces.base, import.meta.url).href)
 const digitalFace = useTemplateRef('digital-face')
 
 const optionsRefs = {
   aboutMe    : useTemplateRef('about-me'),
   projects   : useTemplateRef('projects'),
   experience : useTemplateRef('experience'),
   gallery    : useTemplateRef('gallery')
 }
 
 /* FUNCTIONS -----------------------------------------------*/
 

 function getFaceDirection(mouseX, mouseY, imgRect){
   const imgWidth  = imgRect.width;
   const imgHeight = imgRect.height;

   const imgCenterX = Math.floor(imgRect.x + imgWidth/2);
   const imgCenterY = Math.floor(imgRect.y + imgHeight/2);

   /* Compare the mousePos with the imagePos */
   const isRight = mouseX > imgCenterX + imgWidth/2;
   const isLeft  = mouseX < imgCenterX - imgWidth/2;

   const isDown  = mouseY > imgCenterY + imgHeight/2;
   const isUp    = mouseY < imgCenterY - imgHeight/2;

   /* Finally get the direction */
   let horizontalDir = 'none'
   let verticalDir   = 'none'

   if (isRight) horizontalDir = 'right'
   if (isLeft)  horizontalDir = 'left'

   if (isDown) verticalDir = 'down'
   if (isUp)   verticalDir = 'up'

   return {
     horizontal: horizontalDir,
     vertical: verticalDir
   }
 }
 
 function updateFace(mouseX, mouseY){
   const imgRect = digitalFace.value.getBoundingClientRect();

   const { horizontal, vertical } = getFaceDirection(mouseX, mouseY, imgRect)

   const newFace = faceDirections[vertical][horizontal]

   currentFace.value = new URL(newFace, import.meta.url).href
 }
 
 function trackMouseMovement(e){
   updateFace(e.clientX, e.clientY)
 }

 function updateOptionPosition(option, strength){
   const computedObject = getComputedStyle(option.value)
   const actualPosition = computedObject.getPropertyValue('offset-distance')

   let newPosition = parseFloat(actualPosition) + strength
   newPosition = ((newPosition % 100) + 100) % 100
   newPosition = `${newPosition}%`

   option.value.style.setProperty('offset-distance', newPosition)
 }

 function handleScroll(e){
   /* +strength : down
      -strength : up   */
   const strength = e.deltaY * 0.05 /* Smooth Factor */

   for (const option of Object.values(optionsRefs)) {
     updateOptionPosition(option, strength)
   }
 }
 
 /* LISTENERS  ----------------------------------------------*/
 onMounted(() => {
   digitalFace.value.focus()
   
   window.addEventListener(
     'mousemove',
     trackMouseMovement
   )

   window.addEventListener(
     'wheel',
     handleScroll)
 })

 onUnmounted(() => {
   window.removeEventListener(
     'mousemove',
     trackMouseMovement
   )

   window.removeEventListener(
     'wheel',
     handleScroll)
 })
</script>

<template>
  <div class="main-page">
    <div class="space">
    </div>
    <header class="bubble">
      <div class="text-area">
        Gustavo Gutierrez, Mexican Software Developer and Digital Artist
        specializing in Game Development and Artificial Intelligence.
      </div>
    </header>
    <div id="circular-menu">
      <div id="digital-face">
	<img :src="currentFace" ref="digital-face">
      </div>

      <div class="circular-path"></div>
      <div class="circular-option"
	   id="aboutme-circular-option"
	   ref="about-me">
	<RouterLink to="/AboutMe" class="link non-router metalic">
	  <div class="decoration"></div>
	  <div class="decoration"></div>
	  <div class="option-icon metalic">
	  </div>
	  <div class="option-text bubble">
	    ABOUT ME
	  </div>
	</RouterLink>
      </div>

      <div class="circular-option"
	   id="projects-circular-option"
	   ref="projects">
	<RouterLink to="/Projects" class="link non-router metalic">
	  <div class="decoration"></div>
	  <div class="decoration"></div>
	  <div class="option-icon metalic"></div>
	  <div class="option-text bubble"">
	    PROJECTS
	  </div>
	</RouterLink>
      </div>

      <div class="circular-option"
	   id="experience-circular-option"
	   ref="experience">
	<RouterLink to="/Experience" class="link non-router metalic">
	  <div class="decoration"></div>
	  <div class="decoration"></div>
	  <div class="option-icon metalic"></div>
	  <div class="option-text bubble">
	    EXPERIENCE
	  </div>
	</RouterLink>
      </div>

      <div class="circular-option"
	   id="gallery-circular-option"
	   ref="gallery">
	<RouterLink to="/Gallery" class="link non-router metalic">
	  <div class="decoration"></div>
	  <div class="decoration"></div>
	  <div class="option-icon metalic"></div>
	  <div class="option-text bubble"">
	    GALLERY
	  </div>
	</RouterLink>
      </div>  
    </div>
    <footer class="bubble">
      <div class="text-area">
        I'm currently looking for opportunities in the video game industry and collaborations on digital creative projects.
      </div>
    </footer>
  </div>
</template>
