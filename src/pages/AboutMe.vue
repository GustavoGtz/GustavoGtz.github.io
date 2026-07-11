<script setup>
 import RegularLayout from '@/layouts/RegularLayout.vue'
 import Panel         from '@/components/Panel.vue'
</script>

<template>
  <RegularLayout>
    <template #content>
      <Panel
		title="Introduction"
		variant="normal">
		<div class="medium-div">
			<p>
				Hi, I'm Gustavo, a Software Developer and Digital Artist specializing in Game Development and 
				Artificial Intelligence.
				<br><br>
				I'm currently exploring new ways to apply AI models and computational techniques to create 
				interactive digital experiences that are only possible through digital media. I enjoy experimenting 
				with emerging technologies, prototyping new ideas, and collaborating with others on creative and 
				technical projects.
				<br><br>
				I enjoy all kinds of retro styles and low-budget aesthetics. I see them as the purest form of digital 
				expression, where the focus is on communicating ideas through simple, carefully crafted visuals rather 
				than graphical complexity (both in terms of time and budget).
			</p>
		</div>
		<div class="tiny-div">
			<img src="@/assets/imgs/Photo.png">
		</div>
		
		<div class="tiny-div">
			<p>
				I'm Mexican, from Hermosillo, Sonora, Mexico, and I hold a Bachelor's degree in Computer Science from the University of Sonora.
			</p>
		</div>

		<div class="small-div">
			<img src="@/assets/imgs/Photo2.png">
		</div>

		<div class="tiny-div">
			<p>
				I'm always open to collaborations and conversations with people who share similar interests, so feel free to check out my contact section below. :)
			</p>
		</div>
      </Panel>
      
      <Panel
		title="Contact"
			variant="retractable"
			icon="mars"
			:isOpen="false">
		<div class="centered large-div">
			<p>
				Feel free to get in touch for professional opportunities, collaborations, or any 
				questions. I'd be happy to hear from you!
			</p>
		</div>

		<div class="centered tiny-div">
			<p>
				<a href="mailto:gustavogtznav@gmail.com">gustavogtznav@gmail.com</a>
			</p>
		</div>

		<div class="centered tiny-div">
			<p>
				<a href="https://linkedin.com/in/gustavo-gtz/" target="_blank">Linkedin</a>
			</p>
		</div>

		<div class="centered tiny-div">
			<p>
				<a href="https://github.com/GustavoGtz" target="_blank">Github</a>
			</p>
		</div>
      </Panel>
    </template>
  </RegularLayout>
</template>
