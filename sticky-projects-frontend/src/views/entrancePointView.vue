<script>

</script>

<template>



  <main>
    <div id="wrapper">
      <div>
        <h3>Welcome To</h3>
        <h1>STICKY PROJECTS</h1>
        <p> The platform to organize and overview your <br>upcoming projects as digital sticky notes...</p>
        <br> <br> <br> <br>
      </div>
      <div>
        <RouterLink to="/account-signup" class="basic_button">Get Started</RouterLink>
      </div>
    </div>
  </main>
</template>
<style scoped>

main{
  align-items: flex-start;
  background-image: url("/src/assets/img/absurd2.png");
  background-size: 50%;
  background-position: right bottom;
  background-repeat: no-repeat;
}

#wrapper{
  background-color: #fafafa;
  border: 3px solid black;
  width: 40vw;
  margin: 5%;
  padding: 5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
