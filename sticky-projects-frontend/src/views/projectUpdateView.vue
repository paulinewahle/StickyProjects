<script>
import { routeLocationKey } from 'vue-router'

export default {
  props:{
    user: Object
  },
  data() {
    return {
        loadedProject: [],
        projectToBeUpdated: {
        title: "",
        description: "",
        client: "",
        expectedDeadline: "",
      },
      currentStatus: "",
			errors: [],
    }
  },
  methods:{
    ////NON-BLOCKING Async & Await
    async  updateProject(){
      this.currentStatus = "loading"
      const id = this.$route.params.id
      const bodyAsString = JSON.stringify(this.projectToBeUpdated)
      
      const response = await fetch("http://localhost:3000/projects/"+id, {
          method: 'PUT',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: bodyAsString
      })
      
      const statusCode = response.status

      if(statusCode == 200){
        this.currentStatus = "succeededUpdate"
      }else if (statusCode == 500){
        this.currentStatus = "failedUpdate"
      }else if (statusCode == 400){
        this.currentStatus = "failedUpdate"
        this.errors = await response.json()
      }
      
      
    },
    async  deleteProject(){
      this.currentStatus = "loading"
      const id = this.$route.params.id
      const response = await fetch("http://localhost:3000/projects/"+id, {
          method: 'DELETE',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
      })
      
      const statusCode = response.status

      if(statusCode == 204){
        this.currentStatus = "succeededDelete"
        console.log("deleted")
        this.$router.replace({ path: '/my-projects'})
      }else if (statusCode == 500){
        this.currentStatus = "failedDelete"
      }
      
      
    },
  },
  mounted() {

    const id = this.$route.params.id
    console.log(id)

    fetch("http://localhost:3000/projects/"+ id).then(response => {
      if(response.status == 200){
        response.json().then(project => {
          this.loadedProject = project
          this.projectToBeUpdated = project
        })
      }else if(response.status == 404){ 
        this.errors.push("Not Found")
        console.log(this.errors) 
      }
      else if(response.status == 500){
        this.errors.push("Server could send back accounts of this user")
        
      }
    })
  }

}

</script>
<template>
    

    <main>
    <div id="wrapper-wrapper" v-if="currentStatus == 'loading' || currentStatus == ''">
    <!--
    <div id="color-taps">
      <button class="color-tap green" v-on:click="addClassGreen"/> 
      <button class="color-tap blue" v-on:click="addClassBlue"/>
      <button class="color-tap red" v-on:click="addClassRed"/>
      <button class="color-tap purple" v-on:click="addClassPurple"/>
    </div>
    -->
    
      <div id="color-wrapper" :class="{'wrapper-green': isAddClassGreen, 'wrapper-blue': isAddClassBlue, 'wrapper-red': isAddClassRed, 'wrapper-purple': isAddClassPurple}">
      <RouterLink to="/my-projects" class="close"> </RouterLink>
      <form @submit.prevent="updateProject">
            <input type="text" placeholder="Title" v-model="projectToBeUpdated.title">
            <input type="text" placeholder="Description" v-model="projectToBeUpdated.description">
            <input type="text" placeholder="Client" v-model="projectToBeUpdated.clientName">
            <input type="text" placeholder="Expected Deadline" v-model="projectToBeUpdated.expectedDeadline">
            <div class="flexdiv">
            </div>
            <div class="flexdiv">
              <input type="submit" value="Update Project" class="basic_button"> 
              <button @click="deleteProject" class="basic_outlinebutton">Scrap project</button>
            </div>
        </form>
        <div id="feedback">
        <p v-if="this.currentStatus=='loading'"> Processing... </p>
        </div>
      </div>
    
    </div>

  <!-- if it was successfully updated -->
    <div id="wrapper-wrapper" v-if="currentStatus == 'succeededUpdate'">
    
   
    
      <div id="color-wrapper" :class="{'wrapper-green': isAddClassGreen, 'wrapper-blue': isAddClassBlue, 'wrapper-red': isAddClassRed, 'wrapper-purple': isAddClassPurple}">
      <RouterLink to="/my-projects" class="close"> </RouterLink>
      
        <h3>Success!</h3>
        <p>Project was successfully updated.</p>
        <RouterLink class="basic_button" to="/my-projects">Back to dashboard</RouterLink>
      </div>
    
    </div>

    <!-- if it was not updated -->
    <div id="wrapper-wrapper" v-if="currentStatus == 'failedUpdate'">
    
    
      <div id="color-wrapper" :class="{'wrapper-green': isAddClassGreen, 'wrapper-blue': isAddClassBlue, 'wrapper-red': isAddClassRed, 'wrapper-purple': isAddClassPurple}">
      <RouterLink to="/my-projects" class="close"> </RouterLink>
      
      <h3>Careful!</h3>
        <p> Project could not be updated because: <ul v-for="error in errors"><li>{{error}}</li></ul></p>
        <RouterLink class="basic_button" to="/my-projects">Back to dashboard</RouterLink>
      </div>
    
    </div>
  
  </main>
</template>
<style lang="scss" scoped>

  main{
    background-image: url("/src/assets/img/absurd1.png");
    background-size: 40%;
    background-position: bottom left;
    background-repeat: no-repeat;
    align-items: flex-end;
 
  }
  #wrapper-wrapper{
    display: flex;
    justify-content: flex-start;
    width: 50vw;
    margin: 5%;
    height: 70vh;
    margin-top: 15vh;
  }
  #color-wrapper{
    height: 70%;
    width: 100%;
    border: 2px solid black;
    padding: 5%;
  }
  form{
    width: 80%;
  }
  .wrapper-green{
    background-color: #E8EADA;
  }
  .wrapper-blue{
    background-color: #DAE8EA;
  }
  .wrapper-red{
    background-color: #EADADA;
  }
  .wrapper-purple{
    background-color: #DADCEA;
  }
  .basic_button{
    width: 50%;
  }
  .basic_button:hover{
    outline: none;
    border: none;
    cursor: pointer;
  }
  .basic_outlinebutton:hover {
    cursor: pointer;
  }
  .flexdiv{
    display: flex;
    justify-content: flex-start;
    align-items: center;;
  }
  
</style>