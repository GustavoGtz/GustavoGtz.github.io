<template>
  <header>
    <div class="navbar-wrapper metalic">
      <RouterLink to="/" class="logo non-router">
      </RouterLink>

      <nav class="nav bubble">
	<div class="nav-option">
	  <RouterLink to="/AboutMe" class="non-router">About Me</RouterLink>
	</div>
	<div class="nav-option">
	  <RouterLink to="/Projects" class="non-router">Projects</RouterLink>
	</div>
	<div id="logo-placeholder" class="nav-option">
	  Hola
	</div>
	<div class="nav-option">
          <RouterLink to="/Experience" class="non-router">Experience</RouterLink>
	</div>
	<div class="nav-option">
	  <RouterLink to="/Gallery" class="non-router">Gallery</RouterLink>
	</div>
      </nav>
    </div>
  </header>
</template>
