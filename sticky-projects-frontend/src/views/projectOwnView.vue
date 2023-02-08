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
        this.errors.push("Server could send back projects of this user");
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
              
              <p> <b>Due</b> {{project.expectedDeadline}}</p>
              <div id="divider"></div>
              <div>

              <h4> {{project.title}}</h4>
              <h4> {{project.cardColor}}</h4>

              <p> {{project.description}}</p>
              </div>
              <p id="client">{{project.clientName}}</p>
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
  /* z-index: 1; */
}
#project-card{
  height: 300px;
  width: 200px;
  border: 2px solid black;
  background-color: #fafafa;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
  background-color: var(--card-background-color);
  cursor: move;

}
#divider{
  height: 2px;
  width: 100%;
  background-color: black;
}
#edit{
  display: block;
  background-color: black;
  color: white;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 400;
  text-align: left;
  padding: 7% 10%;
}
#client{
  text-align: end;
}
p, h4{
  margin: 10%;
}
#small{
  font-size: .7em;
}
</style>
