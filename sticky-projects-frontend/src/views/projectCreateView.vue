<script>
//The as colorAttributes commented out code is
export default {
  props:{
    user: Object
  },
  data() {
    return {
        projectToBeCreated: {
        title: "",
        description: "",
        client: "",
        expectedDeadline: "",
        accountId: this.user.accountId,
        // cardColor: "green" 
      },
      currentStatus: "",
			errors: [],
      isAddClassGreen: false,
      isAddClassBlue: false,
      isAddClassRed: false,
      isAddClassPurple: false,
    }
  },
  methods:{
    ////NON-BLOCKING Async & Await
    async  createProject(){
      //just declaring:
      this.currentStatus = "loading"
      const bodyAsString = JSON.stringify(this.projectToBeCreated)
      
      const response = await fetch("http://localhost:3000/projects", {
          method: 'POST',
          headers: new Headers({
            "Authorization": this.user.accessToken,
            'Content-Type': 'application/json'
          }),
          body: bodyAsString
      })
      
      const statusCode = response.status

      if(statusCode == 201){
        this.currentStatus = "succeededCreating"
        
      } else if(statusCode == 400){
        this.currentStatus = "failedCreating"
        this.errors = await response.json()
      }else if (statusCode == 500){
        this.currentStatus = "failedCreating"
      }
      
      
    },
    addClassGreen: function() {
      this.isAddClassGreen = true;
      this.isAddClassBlue = false;
      this.isAddClassRed = false;
      this.isAddClassPurple = false;
      this.project.cardColor = '';
    },
    addClassBlue: function() {
      this.isAddClassBlue = true;
      this.isAddClassGreen = false;
      this.isAddClassRed = false;
      this.isAddClassPurple = false;
      this.project.cardColor = '';
    },
    addClassRed: function() {
      this.isAddClassRed = true;
      this.isAddClassGreen = false;
      this.isAddClassBlue = false;
      this.isAddClassPurple = false;
      this.project.cardColor = '';
    },
    addClassPurple: function() {
      
      this.isAddClassPurple = true;
      this.isAddClassGreen = false;
      this.isAddClassRed = false;
      this.isAddClassBlue = false;
      this.project.cardColor = '';
    }
  }
}

</script>
<template>
  <main>
    <div id="wrapper-wrapper" v-if="this.currentStatus == '' || this.currentStatus == 'loading'">
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
        <form @submit.prevent="createProject">

            <input type="text" placeholder="Title" maxlength="10" v-model="projectToBeCreated.title">
            <input type="text" placeholder="Description" maxlength="40" v-model="projectToBeCreated.description">


            <input type="text" placeholder="Client" v-model="projectToBeCreated.clientName">
            <input type="text" placeholder="Expected Deadline" v-model="projectToBeCreated.expectedDeadline">
            <input type="submit" value="Post Project" class="basic_button">

        </form>
        <div id="feedback">
        <p v-if="this.currentStatus=='loading'"> Processing... </p>
        </div>
      </div>
    </div>


    <div id="wrapper-wrapper" v-if="this.currentStatus == 'succeededCreating'">
    
   
    <!-- if the project was successfully created -->
      <div id="color-wrapper" :class="{'wrapper-green': isAddClassGreen, 'wrapper-blue': isAddClassBlue, 'wrapper-red': isAddClassRed, 'wrapper-purple': isAddClassPurple}">
      <RouterLink to="/my-projects" class="close"> </RouterLink>
        <h3>Success!</h3>
        <p>Project has been created.</p>
        <RouterLink class="basic_button" to="/my-projects">Back to dashboard</RouterLink>
      </div>
    </div>

    <!-- if the project was not created -->
    <div id="wrapper-wrapper" v-if="this.currentStatus == 'failedCreating'">
    
   

      <div id="color-wrapper" :class="{'wrapper-green': isAddClassGreen, 'wrapper-blue': isAddClassBlue, 'wrapper-red': isAddClassRed, 'wrapper-purple': isAddClassPurple}">
      <RouterLink to="/my-projects" class="close"> </RouterLink>
        <h3>Careful!</h3>
        <p> Project could not be created because: <ul v-for="error in errors"><li>{{error}}</li></ul></p>
        <RouterLink class="basic_button" to="/my-projects">Back to dashboard</RouterLink>
      </div>
    </div>
  </main>
</template>
<style lang="scss" scoped>


main{
  background-image: url("/src/assets/img/absurd3.png");
  background-size: 40%;
  background-position: left bottom;
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

</style>