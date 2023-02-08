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
            <h3 v-if="$route.path =='/my-projects'"> My Projects </h3>
            <h3 v-else-if="$route.path =='/my-account'"> My Account</h3>
            <h3 v-else-if="$route.path =='/new-project'"> New Project</h3>
            <h3 v-else-if="$route.path =='/update-project/'"> Update Project</h3>
        </div>    
        <div>
          <RouterLink to="/my-account">My Profile</RouterLink> 
          <button @click="signOut" class="basic_smallbutton">Sign Out</button> 
        </div>
      
    </header>

  
</template>

<style lang="scss" scoped>
@import "/src/assets/base.scss";
  header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 96%;
    margin: 0 2%;
    padding: 45px 1%;
    box-sizing: border-box;
    border-bottom: 2px solid black;
    position: fixed;
    z-index: 100;
    background-color: #fafafa;
    img{
      height: 100%;
      margin: 0 5px 0 0;
      }

      
      a{
        background: none;
        font-family: $fontFamily;
        border: none;
        font-size: 1em;
        margin: 0 50px ;
        border-bottom: 2px solid black;
        cursor: pointer;
        border: none;
        text-decoration: none;
      }
      
  }

</style>


