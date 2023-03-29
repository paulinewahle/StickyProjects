<script>
import DashboardFooter from '../components/DashboardFooter.vue'
  
import jwtDecode from 'jwt-decode'

export default {
	components: {
    DashboardFooter,
  },

  props:{
    user: Object,

  },

  data(){
    return{
      errors: [],
      loadedProjects: []
    }
  },

  mounted() {
    
    console.log(this.user.accountId)
    fetch("http://localhost:3000/projects?accountId="+this.user.accountId, {
      method: "GET",
      headers: new Headers({
        "Authorization": this.user.accessToken, 
        "Accept": "application/json",
      }),
    }).then((response) => {
      if (response.status == 200) {
        response.json().then((projects) => {
          this.loadedProjects = projects;
        });
      } else if (response.status == 500) {
        this.errors.push("Server could not send back projects of this user");
      }
    });
    console.log(this.loadedProjects)
  },
  computed: {
    cssProps() {
      return {
        '--card-background-color': "white",
      }
    }
  }
  
}
</script>

<template>

  
  
  <main>
    
    
    <div v-if="errors.length == 0" id="card-wrapper">
      <ul v-for="project in loadedProjects">
        <li id="project-card" :style="cssProps" v-drag>
              
             
              
              <div>
              <p class="date"> Due {{project.expectedDeadline}}</p>
              <p id="client">{{project.clientName}}</p>
              <h4 class="title"> {{project.title}}</h4>
              <h4 class="description"> {{project.cardColor}}</h4>
              <p> {{project.description}}</p>
              </div>
              
              <RouterLink :to="`/update-project/${project.id}`" id="edit">Edit</RouterLink>
          
        </li>
      </ul>
    </div>
    <div v-else-if="loadedProjects.length == 0">
    <h3>There are no projects yet</h3>
    </div>
    <div v-else>
      <h3>Sorry something went wrong...</h3>
      <ul>
        <li v-for="error in errors">
          {{error}}
        </li>
      </ul>
    </div>
  </main>
  <DashboardFooter />
</template>
<style scoped>

#card-wrapper{
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  margin-top: 15vh; 
}
#project-card{
  height: 300px;
  width: 200px;
  border: 2px solid black;
  border-radius: 30px;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
  background-color: var(--card-background-color);
  background-color: #E0FF9D;
  z-index: 100;
  padding: 10%;
  box-sizing: border-box;
}
.date{
  text-align: center;
  margin-bottom: 20%;
}

#edit{
  display: block;
  color: black;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 700;
  text-align: left;
  padding: 7% 10%;
  border: 2px solid black;
  border-radius: 20px;
  width: 40px;
}
p {
  margin: 0;
}
h4{
  margin: 2% 0  10% 0;
  font-size: 25px;
}

</style>
