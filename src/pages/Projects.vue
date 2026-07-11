<script setup>
 import RegularLayout from '@/layouts/RegularLayout.vue'
 import Panel         from '@/components/Panel.vue'
</script>

<template>
  <RegularLayout>
    <template #content>
      <!-- Beavertale --------------------------------------- -->
      <Panel
		title="Beavertale"
		variant="retractable"
		icon="mercury"
		:isOpen="false">
		<div class="small-div">
			<p>
				<a href="https://store.steampowered.com/app/4568350/Beavertale/" target="_blank">Beavertale</a>
				is a 2D pixel-art platformer where players take control of a resourceful beaver whose greatest 
				strength isn't speed or jumping, but construction. Gather materials and use your construction 
				skills to overcome obstacles, defeat hostile machines, and save your home from an evil corporation.
			</p>
		</div>

		<div class="small-div">
			<img src="@/assets/imgs/beavertaleScreenTitle.gif">
		</div>

		<div class="medium-div">
			<p>
				Beavertale is our first commercial game and was developed in Unity by a two-person team. Inspired by the unique 
				behaviors of beavers, we designed the core gameplay around construction mechanics instead of traditional platforming 
				abilities.
				<br><br>
				I co-created the project and contributed to nearly every aspect of development, including gameplay programming, game design, 
				narrative, level design, pixel art, UI/UX, project management, and marketing.
			</p>
		</div>

		<div class="centered tiny-div">
			<p>
				Learn more about the project:
				<br>
				<a href="https://store.steampowered.com/app/4568350/Beavertale/" target="_blank">Steam</a>
				<br>
				<a href="https://gustavogtz.github.io/beavertale-html-page/" target="_blank">Web Page</a>
				<br>
				<a href="https://www.kickstarter.com/projects/gustavogtz/beavertale" target="_blank">Kickstarter</a>
				<br>
				<a href="https://www.instagram.com/beavertalegame/" target="_blank">Instagram</a>
			</p>
		</div>

		<div class="tiny-div">
			<img src="@/assets/imgs/beavertaleGameplay2.gif">
		</div>

		<div class="tiny-div">
			<img src="@/assets/imgs/beavertaleShowcase2.png">
		</div>

		<div class="tiny-div">
			<img src="@/assets/imgs/beavertaleGameplay1.gif">
		</div>

		<div class="tiny-div">
			<img src="@/assets/imgs/beavertaleShowcase4.png">
		</div>
      </Panel>
	  <!-- --------------------------------------------------------------- -->
	  <!-- Firmin In The City -------------------------------------------- -->
      <Panel
		title="Firmin In The City"
		variant="retractable"
		icon="venus"
		:isOpen="false">
		<div class="small-div">
			<img src="@/assets/imgs/firminClip.gif">
		</div>

		<div class="small-div">
			<p>
				<a href="https://gustavogtz.github.io/Firmin-In-The-City" target="_blank">Firmin in the City</a>
				is my interactive portfolio, designed as a retro-inspired experience. You can explore a 
				pixel-art city inspired by New York, discovering three main areas: Profile, Projects, and Art.
				<br><br>
				The entire project was designed and developed by me using Phaser 3. Its visual style draws 
				inspiration from the Commodore 64, featuring a limited color palette and retro aesthetics while 
				showcasing my work through an interactive game-like environment.
			</p>
		</div>

		<div class="centered large-div">
			<p>
				If you enjoy unique interactive experiences and retro-inspired design, I invite you to explore my 
				portfolio and discover the many small details hidden throughout the city.
				<a href="https://gustavogtz.github.io/Firmin-In-The-City" target="_blank">EXPLORE HERE</a>
			</p>
		</div>

		<div class="tiny-div">
			<img src="@/assets/imgs/firminSS1.png">
		</div>

		<div class="small-div">
			<img src="@/assets/imgs/firminClipGameplay.gif">
		</div>

		<div class="tiny-div">
			<img src="@/assets/imgs/firminSS2.png">
		</div>
      </Panel>
	  <!-- --------------------------------------------------------------- -->
	  <!-- Othello Q-Learning -------------------------------------------- -->
      <Panel
		title="Othello with Q-Learning"
		variant="retractable"
		icon="mars"
		:isOpen="false">
		<div class="tiny-div">
			<p>
				<a href="https://github.com/GustavoGtz/othello-c-qlearningtab" target="_blank">Othello with Q-Learning</a> is an 
				ongoing reinforcement learning project (currently paused) focused on developing an intelligent agent capable of playing 
				and learning the classic board game Othello (also known as Reversi).
			</p>
		</div>

		<div class="small-div">
			<img src="@/assets/imgs/othelloSS1.png">
		</div>

		<div class="tiny-div">
			<p>
				Developed entirely in C, the project uses the NCURSES library to provide a lightweight text-based user interface (TUI). The 
				AI is powered by a Tabular Q-Learning model, allowing the agent to build knowledge through interactions, evaluate game states, 
				and gradually improve its gameplay strategy.
			</p>
		</div>

		<div class="medium-div">
			<p>
				Originally created as a university research project, this project has the potential to evolve into a more ambitious experiment 
				combining game AI, reinforcement learning, and interactive storytelling.
				<br><br>
				Future improvements include replacing the current Tabular Q-Learning model with Deep Q-Learning to create a more advanced AI 
				capable of handling complex strategies and improving its gameplay, and also transforming the AI opponent into a character-driven 
				experience: a Shakespeare-inspired AI personality powered by text-to-speech, dialogue generation, and retro terminal visuals. 
			</p>
		</div>

		<div class="tiny-div">
			<img src="@/assets/imgs/othelloSS2.png">
		</div>

		<div class="centered large-div">
			<p>
				The goal is to recreate the classic sci-fi idea of humans facing a machine that learns, adapts, and challenges their intelligence.
			</p>
		</div>
      </Panel>
      <!-- --------------------------------------------------------------- -->
      <!-- rEVOLUTION ---------------------------------------------------- -->
      <Panel
		title="rEVOLUTION"
		variant="retractable"
		icon="jupiter"
		:isOpen="false">
		<div class="tiny-div">
			<p>
				<a href="https://gustabuu.itch.io/revolution" target="_blank">rEVOLUTION</a>
				is a 2D physics-based platformer prototype where players control a fish 
				attempting to escape its fishbowl. Using its tongue as a grappling hook, 
				the player swings, builds momentum, and navigates increasingly challenging obstacles.
			</p>
		</div>
		<div class="small-div">
			<img src="@/assets/imgs/rEvolutionLogo.png">
		</div>
		<div class="tiny-div">
			<p>
				The game was created in Unity during the 7-day The Very Serious Juniper Dev Game Jam, 
				with a strong focus on physics-driven movement and fast-paced gameplay.
			</p>
		</div>
		<div class="medium-div">
			<p>
				The project was developed by a two-person team. I was responsible for the game's 
				design, programming, and pixel art, contributing to both the core gameplay mechanics 
				and its visual identity.
			</p>
		</div>
		<div class="tiny-div">
			<img src="@/assets/imgs/rEvolutionSS.png">
		</div>
      </Panel>
    </template>
  </RegularLayout>
</template>
