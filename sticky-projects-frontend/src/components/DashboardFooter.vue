<script setup>

</script>

<template>
  <footer>
      <RouterLink to="/new-project" class="basic_button">New Project</RouterLink> 
  </footer>
</template>

<style lang="scss" scoped>
    footer{
      position: fixed;
      top: 80vh;
      display: flex;
      justify-content: center;
      width: 98%;
      padding: 1%;
      align-items: baseline;
      .basic_button{
        width: 30%;
      }
    }
</style>
