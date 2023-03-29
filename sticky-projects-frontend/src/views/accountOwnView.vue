<script>
import { RouterLink } from 'vue-router'

export default {
	components: {

  },

  props:{
    user: Object
  },

  data(){
    return{
      errors: [],
      loadedAccount: [],
      accountToBeUpdated:{
        username: "",
        password: ""
      },
      currentStatus: ""
    }    
  },

  methods: {
    async updateAccount() {
      this.currentStatus = 'loading'
      const bodyAsString = JSON.stringify(this.accountToBeUpdated)

      const response = await fetch("http://localhost:3000/accounts/"+this.user.accountId, { 
        method: "PUT",
          headers: new Headers({
              "Content-Type": "application/json"
          }),
          body: bodyAsString
      })
      
      const statusCode = response.status

      if(statusCode == 200){
        this.currentStatus = "succeededUpdate"
        console.log("account updated !!")
      }
      else if(statusCode == 500){
        this.currentStatus = 'failedUpdate'
      }
      else if(statusCode == 400){
        this.currentStatus = 'failedUpdate'
        this.errors = await response.json()
        console.log(this.errors)
      }
    },
    //redid this to be an async function but didn't want to delete it completely just in case 
    // updateAccount() {
    //   this.currentStatus = 'loading'
    //   const bodyAsString = JSON.stringify(this.accountToBeUpdated)
    // fetch("http://localhost:3000/accounts/"+this.user.accountId, { 
    //   method: "PUT",
		// 		headers: new Headers({
		// 		    "Content-Type": "application/json"
		// 		}),
    //     body: bodyAsString
    // }).then(response => {
    //   if(response.status == 200){
    //     this.currentStatus = "succeededUpdate"
    //     response.json().then(account => {
    //       this.loadedAccount = account
    //       this.accountToBeUpdated = account
    //     })
    //   }
    //   else if(response.status == 500){
    //     this.currentStatus = 'failedUpdate'
    //   }
    //   else if(response.status == 400){
    //     this.currentStatus = 'failedUpdate'
    //     this.errors = response.json()
    //     console.log(this.errors)
    //   }
    // })
    // },
    deleteAccount() {
      this.currentStatus = "loading"
    fetch("http://localhost:3000/accounts/"+this.user.accountId, { 
      method: "DELETE",
				headers: new Headers({
				    "Accept": "application/json"
				}),
    }).then(response => {
      if(response.status == 204){
        this.currentStatus = "succeededDelete"
        console.log("account deleted")
        this.$router.replace({path: '/'})
      }
      else if(response.status == 500){
        this.errors.push("Server could send back accounts of this user")
        this.currentStatus = "failedDelete"
        console.log(this.user.accountId)
      }
    })
    }
  },

  mounted() {
    fetch("http://localhost:3000/accounts/"+this.user.accountId, { 
      method: "GET",
				headers: new Headers({
            "Authorization": this.user.accessToken,
				    "Accept": "application/json"
				}),
    }).then(response => {
      if(response.status == 200){
        
        response.json().then(account => {
          this.loadedAccount = account
          this.accountToBeUpdated = account
          console.log("user in accountOwnView" + this.user.accountId)
          console.log("loadedAccounts"+account.username)
        })
      }
      else if(response.status == 500){
        this.errors.push("Server could send back accounts of this user")
        
      }
    })
  },
  unmounted(){
    //when you update the account and come back to this site you should see the new account details in the input fields. Tried this so that it would reload the next time you enter /my-account. seems like its working but you have to wait for like 20 seconds before it shows up and i dont know why. its as if the second fetch takes forever.
  }

}
</script>

<template>
  <main>
    <div id="wrapper">
      <RouterLink to="/my-projects"> <div class="close"></div> </RouterLink>
      <h2>
          Edit Account
      </h2>
      <p>Account Number # {{this.loadedAccount.id}}</p>
      <div v-if="errors.length == 0">
        <form @submit.prevent="updateAccount">
          <label>Edit Username</label>
          <input v-model="accountToBeUpdated.username" type="text"> 
          <label>Edit Password</label>
          <input v-model="accountToBeUpdated.password" type="text">
          <input type="submit" value="Update Account" class="basic_button">
        </form>

        
        <button class="basic_smallbutton" @click="deleteAccount">Delete Account</button>

        <div id="feedback">
          <p v-if="this.currentStatus=='succeededUpdate'"> Account Details Updated</p>
          <p v-if="this.currentStatus=='succeededDelete'"> Account has been deleted</p>
          <p v-if="this.currentStatus=='failedUpdate'"> Account could not be updated because: {{errors}}</p>
          <p v-if="this.currentStatus=='failedDelete'"> Account could not be deleted</p>
          <p v-if="this.currentStatus=='loading'"> Processing...</p>
        </div>

      </div>
      <div v-else>
        <h3>Sorry something went wrong...</h3>
        <ul>
          <li v-for="error in errors">
            {{error}}
          </li>
        </ul>
        <RouterLink class="basic_button" to="/my-projects">Back to dashboard</RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>

input{
  margin: 0% 0;
}
label{
  font-weight: 700;
}
#feedback{
  height: 2em;
  margin: 0% 0 ;
}
h2{
  margin: 0;
}
#wrapper{
  width: 50vw;
}
</style>