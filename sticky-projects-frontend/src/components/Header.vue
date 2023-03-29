<script>

 export default {
  props: {
    user: Object,
  },
  methods: {
      signOut(){
        this.user.isLoggedIn = false
        this.user.username = ""
        this.user.id = ""
        this.user.accessToken = null
        this.$router.replace({path: '/'})
        console.log(this.user)
      }
      
  }
}
</script>

<template>
 
    <header>
        <div>
          <h2>Sticky Projects</h2>
        </div>
        <div>
            
            <h3 v-if="$route.path =='/my-projects'"> My Projects </h3>
            <h3 v-else-if="$route.path =='/my-account'"> My Account</h3>
            <h3 v-else-if="$route.path =='/new-project'"> New Project</h3>
            <h3 v-else-if="$route.path =='/update-project/'"> Update Project</h3>
        </div>    
        <div>
          <RouterLink to="/my-account">My Profile</RouterLink> 
          <button @click="signOut">Sign Out</button> 
        </div>
      
    </header>

  
</template>

<style lang="scss" scoped>
@import "/src/assets/base.scss";
  header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80vw;
    margin: 0 10vw;
    padding: 45px 1%;
    box-sizing: border-box;
    position: fixed;
    z-index: 100;

      button, a{
        background: none;
        font-family: $bodyText;
        border: none;
        font-size: 1em;
        margin: 0 50px ;
        text-decoration: none;
      }

      h2{
        display: inline-block;
        font-size: 2rem;
        margin: 0;
      }
  }

</style>


