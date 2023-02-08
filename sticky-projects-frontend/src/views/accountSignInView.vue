<script>
import Header from '../components/Header.vue'
import jwtDecode from 'jwt-decode'
import router from '../router'

export default {
  components: {
    Header
  },
  props: {
    user: Object,
  },
  data() {
    return {
      username: "",
      password: "",
      currentStatus: "",
			errors: [],
    }
  },
  methods: {
    handleSubmission(){
      this.currentStatus = 'loading'
      const credentials = {
        username: this.username,
        password: this.password
      }

      fetch("http://localhost:3000/tokens",{
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(credentials)
      }).then(response => {
        if(response.status == 200){
          
          response.json().then(body => {
            this.user.isLoggedIn = true
            this.user.accessToken = body.accessToken

            const info = jwtDecode(body.idToken)

            this.user.accountId = info.accountId
            this.user.username = info.username
            console.log(this.user)

            router.replace( { path: '/my-projects'}) 
          })
          
          
        }else if(response.status == 400){
          this.currentStatus = "clientError"
        }else if(response.status == 500){
          this.currentStatus = "serverError"
        }
      })
    }
    
  }
}
</script>

<template>
  
  <main>
    
    <div id="wrapper">
      <div>
        <RouterLink to="/account-signup" id="signUpToggle">SignUp</RouterLink> /
        <RouterLink to="/account-signin" id="signInToggle">SignIn</RouterLink>
      </div>
      <div>
        <h2>Sign In</h2>
        <p>And make your projects to sticky notes</p>
      </div>
      <div>
        <form @submit.prevent="handleSubmission"><!-- @submit.prevent or not?  -->
          <input type="text" placeholder="Username" v-model="username">
          <input type="password" placeholder="Password" v-model="password">
          <input type="submit" value="Sign In" class="basic_button">
        </form>
        <div>
          <p v-if="this.currentStatus=='loading'"> Processing... </p>
          <p v-if="this.currentStatus=='clientError'"> Wrong credentials. Please try again.</p>
          <p v-if="this.currentStatus=='serverError'"> Failed sign in due to server error.</p>
        </div>
      </div>

      <RouterLink to="/account-signup"> No account yet? Sign Up  </RouterLink>

    </div>
  </main>
  
</template>

<style scoped>
  main{
    align-items: flex-start;
    background-image: url("/src/assets/img/absurd8.png");
    background-size: 50%;
    background-position: right center;
    background-repeat: no-repeat;
  }

  
  #signInToggle{
    font-weight: 700;
  }
  form {
    margin-bottom: 30px;
  }
  
</style>
