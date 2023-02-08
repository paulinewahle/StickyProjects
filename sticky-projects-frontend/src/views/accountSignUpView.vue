<script>
import Header from '../components/Header.vue'
import router from '../router'
export default {
  components: {
    Header
  },
  data() {
    return {
      creatorAccountToBeCreated: {
        username: "",
        password: "",
      },
      currentStatus: "",
			errors: [],
    }
  },
  methods: {
    //// CHAINED PROMISES
    // createCreatorAccount() {
    //   this.currentStatus = 'loading'
    //   fetch('http://localhost:3000/creator_accounts', { 
    //     method: 'POST',
    //     headers: new Headers({
    //         'Content-Type': 'application/json'
    //     }),
    //     // body:  JSON.stringify({
    //     //   username: this.creatorAccountToBeCreated.username, //? difference or better?
    //     //   password: this.creatorAccountToBeCreated.password, 
    //     // })
    //     body: JSON.stringify(this.creatorAccountToBeCreated)
    //   }).then(response => {
				
		// 		if(response.status == 201){
    //       this.currentStatus = 'succeededCreating'

		// 		}else if(response.status == 400){
		// 			this.currentStatus = 'failedCreating'
		// 			response.json().then(errors => {
		// 				this.errors = errors
    //         console.log(errors)
		// 			})
					
		// 		}else if(response.status == 500){
		// 			this.errors.push("Server is not working as it should")
    //       console.log(errors)
		// 		}
		// 	})
    // }

    ////NON-BLOCKING Async & Await
    async  createCreatorAccount(){
      //just declaring:
      this.currentStatus = "loading"
      const bodyAsString = JSON.stringify(this.creatorAccountToBeCreated)
      
      const response = await fetch("http://localhost:3000/accounts", {
          method: 'POST',
          headers: new Headers({
              'Content-Type': 'application/json'
          }),
          body: bodyAsString
      })
      
      const statusCode = response.status

      if(statusCode == 201){
        this.currentStatus = "succeededCreating"
        //router.replace( { path: '/account-signin'})
      } else if(statusCode == 400){
        this.currentStatus = "failedCreating"
        this.errors = await response.json()
      }else if(statusCode == 409){
        this.currentStatus = "failedCreating"
        this.errors = await response.json()
      }else if (statusCode == 500){
        this.currentStatus = "failedCreating"
      }
      
    },
    
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
        <h2>Sign Up</h2>
        <p>And make your projects to sticky notes</p>
      </div>
      <div>
        <form @submit.prevent="createCreatorAccount"><!-- @submit.prevent or not?  -->
          <input type="text" placeholder="Username" v-model="creatorAccountToBeCreated.username">
          <input type="password" placeholder="Password" v-model="creatorAccountToBeCreated.password">
          <input type="submit" value="Sign Up" class="basic_button">
        </form>
        <div id="feedback">
          <p v-if="this.currentStatus=='loading'"> Processing... </p>
          <p v-if="this.currentStatus=='succeededCreating'"> Account has been created</p>
          <p v-if="this.currentStatus=='failedCreating'"> Careful! Account could not be created because: <ul v-for="error in errors"><li>{{error}}</li></ul></p>
        </div>
      </div>
      <RouterLink to="/account-signin">Already Signed Up? Login to your Account</RouterLink>
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

  
  #signUpToggle{
    font-weight: 700;
  }
  #feedback{
    margin: 30px 0;
  }
</style>
