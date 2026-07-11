<script setup>
 import RegularLayout from '@/layouts/RegularLayout.vue'
 import Panel         from '@/components/Panel.vue'
</script>

<template>
  <RegularLayout>
    <template #content>
      <!-- Professional Experience --------------------------------------- -->
      <Panel
	title="Professional Experience"
	variant="retractable"
	icon="sun"
	:isOpen="false">
	<div class="large-div">
	  <p>
	    <h1>IT Support and Software Development at <a>Gemso</a></h1>
	    <h2>March 2026 - Present || Half-Time</h2>
	    <br>
		At Gemso, I provide technical support and contribute to the development of internal software solutions. 
		My work involves maintaining computer systems, troubleshooting hardware and software issues, assisting 
		with network-related tasks, and developing web applications to improve internal workflows.
		<br><br>
		I design, implement, and maintain business tools using PHP, Python, HTML, and CSS, focusing on improving 
		efficiency through digital solutions. I collaborate with different teams to understand their needs and 
		transform administrative processes into functional web-based systems.
	  </p>
	</div>
	<div class="large-div">
	  <p>
	    <h1>Data Science Intern at <a>Kolab Ventures</a></h1>
	    <h2>February 2026 - August 2025 || Half-Time</h2>
	    <br>
		As a Data Science Intern at Kolab Ventures, I researched and evaluated conversational AI technologies with a 
		focus on healthcare automation and emerging AI-driven solutions.
		<br><br>
		I developed an AI-powered virtual receptionist prototype using n8n, integrating automated conversations, appointment 
		scheduling, and workflow execution for clinical environments. I collaborated with software developers throughout 
		the development process, contributing to system design, technical decisions, testing, and continuous improvements.
	  </p>
	</div>
      </Panel>
      <!-- --------------------------------------------------------------- -->
      <!-- Academic Experience ------------------------------------------- -->
      <Panel
	title="Academic Experience"
	variant="retractable"
	icon="moon"
	:isOpen="false">
	<div class="large-div">
	  <p>
	    <h1>
	      B.Sc. in Computer Science at
	      <a href="https://www.unison.mx/" target="_blank">Universidad de Sonora</a>
	    </h1>
	    <h2>August 2021 - November 2025</h2>
	    <br>
	    Graduated with a <strong>97.23/100 GPA</strong>. During my studies, I
	    developed projects in artificial intelligence, software engineering,
	    databases, computer graphics, operating systems, and algorithms. My work
	    focused on building practical software solutions while strengthening my
	    foundations in computer science through both individual and collaborative
	    projects.
	  </p>
	</div>
	<div class="large-div">
	  <p>  
	    <h1>
	      Summer Research Internship Program at
	      <a href="https://www.buap.mx/" target="_blank">Benemérita Universidad Autónoma de Puebla</a>
	    </h1>
	    <h2>June 2025 – August 2025</h2>
	    <br>
	    Participated in the XXX Summer of Scientific and Technological Research in the Pacific
	    (<a href="https://programadelfin.org.mx/" target="_blank">DELFIN</a>).
	    I worked alongside other students to research and implement an optimized system to improve class scheduling
	    using AI models, databases, and UI design.
	    <br>
	    You can see the project on my GitHub at
	    <a href="https://github.com/GustavoGtz/optimizador_horarios" target="_blank">
	      Schedule Optimizer
	    </a>
	  </p>
	</div>
	<div class="large-div">
	  <p>
	    <h1>
	      Student Exchange at
	      <a href="https://www.usach.cl/" target="_blank">Universidad de Santiago de Chile</a>
	    </h1>
	    <h2>February 2024 – August 2024</h2>
	    <br>
	    Participated in a student exchange program in Santiago, Chile.
	    During this period, I studied topics in computer architecture and artificial intelligence.
	    I also developed a convolutional neural network (CNN) for bird species classification.
	  </p>
	</div>
      </Panel>
      <!-- --------------------------------------------------------------- -->
    </template>
  </RegularLayout>
</template>
