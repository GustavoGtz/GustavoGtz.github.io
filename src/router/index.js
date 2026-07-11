import { createRouter, createWebHashHistory } from 'vue-router'

import Main from "@/Main.vue"

import Projects   from "@/pages/Projects.vue"
import AboutMe    from "@/pages/AboutMe.vue"
import Experience from "@/pages/Experience.vue"
import Gallery    from "@/pages/Gallery.vue"

const routes = [
    { path: "/", component: Main},
    
    {
	path: "/Projects",
	component: Projects,
	meta: {
	    layout: 'regular'
	}
    },
    {
	path: "/AboutMe",
	component: AboutMe,
	meta: {
	    layout: 'regular'
	}
    },
    {
	path: "/Experience",
	component: Experience,
	meta: {
	    layout: 'regular'
	}
    },
    {
	path: "/Gallery",
	component: Gallery,
	meta: {
	    layout: 'regular'
	}
    }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
