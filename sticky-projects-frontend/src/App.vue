<script>
import { RouterLink, RouterView } from 'vue-router'
import './assets/main.scss'
import './assets/base.scss'
import DashboardHeader from './components/Header.vue'
import Header from './components/Header.vue'
import router from '/src/router'

export default {
	components: {
    Header
},
	data(){
		return {
			user: {
				isLoggedIn: false,
				accessToken: "",
				username: "",
				accountId: 0,
			}

			
		}
	},
	mounted(){
		console.log(this.user)
		console.log(this.project)

		let mouseCursor = document.querySelector(".cursor");
		let cursorCircle = document.querySelector(".cursor-circle");
		let navLinks = document.querySelectorAll(".nav-links");

		window.addEventListener("mousemove", mouseFollow);

		function mouseFollow(e) {
		mouseCursor.style.left = e.clientX + "px";
		mouseCursor.style.top = e.clientY + "px";
		}

		navLinks.forEach((link) => {
		link.addEventListener("mouseleave", () => {
			cursorCircle.classList.remove("cursor-hover");
		});
		link.addEventListener("mouseover", () => {
			cursorCircle.classList.add("cursor-hover");
		});
		});

	}
	
}

</script>

<template>

	<div class="cursor"></div>
  		
	 <div v-if="this.user.isLoggedIn == true">
		<Header :user="user"> Sticky Projects </Header>
	</div>
	<body>
		<RouterView :user="user">  </RouterView>
		<img id="illustration" src="src/assets/img/illustration.png" alt="giraffe illustration">
	</body>
	
</template>

<style scoped>
header{
	height: 10vh;
}
#illustration{
	position: fixed;
	height: 70vh;
	top: 30vh;
	left: 60vw;
}



</style>
