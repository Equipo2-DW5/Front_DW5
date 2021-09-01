<template>
  <div class="login">
  <div class="container">
    <div class="logo">
      <img class="logo__img" src="../assets/logo.png" alt="Main Image">
      <h1 class="logo__title">Sign In</h1>
    </div>
    <div class="request">
      <div class="e-mail">
        <img class="e-mail__logo" src="../assets/email.png" alt="mail">
        <p class="e-mail__text">E-mail</p>
        <input class="e-mail__info" type="text">
      </div>
      <div class="password"> 
        <img class="password__logo" src="../assets/lock.png" alt="password">
        <p class="password__text">Password</p>
        <input class="password__info" type="password">
      </div>
    </div>
    <div class="btn">
      <button class="btn__login">LOGIN</button>
    </div>
    <br>
    <div class="register-content">
      <router-link class="register-content__text" to="/Register">¿No tienes una cuenta? ¡Registrate aquí!</router-link>
    </div>
  </div>  
</div>
</template>

<script>

</script>

<style>
  .login {
  background-color: gray;
}

.logo {
  display: flex;
  flex-direction: column;
  width: 15%;
  margin: auto;
}

.logo__img {
  display: block;
  margin-top: 1rem;
}

.logo__title {
  font-size: 3rem;
  text-align: center;
}

.request {
  display: flex;
  flex-direction: column;
  align-content: center;
}

.user {
  display: flex;
  margin-top: 3rem;
  justify-content: center;
  align-items: center;
}

.user__logo {
  display: block;
}

.user__text {
  margin-left: 0.5rem;
  font-size: 25px;
}

.user__info {
  margin-left: 0.5rem;
  width: 20%;
}

.e-mail {
  display: flex;
  justify-content: center;
  align-items: center;
}

.e-mail__logo {
  display: block;
  width: 2%;
  margin-right: 31px;
}

.e-mail__text {
  margin-left: -1.5rem;
  font-size: 25px;
}

.e-mail__info {
  margin-left: 2.5rem;
  width: 20%;
}

.password {
  display: flex;
  justify-content: center;
  align-items: center;
}

.password__logo {
  display: block;
}

.password__text {
  margin-left: 0.5rem;
  font-size: 25px;
}

.password__info {
  margin-left: 0.5rem;
  width: 20%;
}

.btn {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.btn__login {
  border: 1px solid darkgray;
  border-radius: 5px;
  background-color: gray;
  color: black;
  font-size: 23px;
  font-weight: bold;
  padding: 12px 37px;
  text-decoration: none;
  cursor: pointer;
}

.btn__login:hover {
  transition: all .3s ease-in-out;
  background-color: white;
  color: black;
}

.container {
  padding-bottom: 1.5rem;
}

.register-content__text {
  text-decoration: none;
  color: black;
}
</style>

