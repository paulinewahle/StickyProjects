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
	}
	
}

</script>

<template>
	 <div v-if="this.user.isLoggedIn == true">
		<Header :user="user"> </Header>
	</div>
	<body>
		<RouterView :user="user"></RouterView>
	</body>
	
</template>

<style scoped>
header{
	height: 10vh;
}


</style>
