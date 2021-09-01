<template>
  <div id="register">
  <div class="container">
    <div class="title">
      <h1 class="title__main">REGISTRO DE USUARIO</h1>
    </div>
    <div class ="info">
      <div class="info__content">
        <div class="info__item">
          <p class ="info__name">NOMBRES</p>
        </div>
        <div>
          <input class="info__info" type="text" v-model="nombres">
        </div>
      </div>
      <div class="info__content">
        <div class="info__item">
          <p class ="info__last-name">APELLIDOS</p>
        </div>
        <div>
          <input class="info__info" type="text" v-model="apellidos">
        </div>
      </div>
      <div class="info__content">
        <div class="info__item">
          <p class ="info__id">IDENTIFICACION</p>
        </div>
        <div>
          <input class="info__info" type="text" v-model="identificacion">
        </div> 
      </div>
      <div class="info__content">
        <div class="info__item"> 
          <p class ="info__email">CORREO INSTITUCIONAL</p>
        </div>
        <div>
          <input class="info__info" type="text" v-model="email">
        </div>
      </div>
      <div class="info__content">
        <div class="info__item">
          <p class ="info__confirm">CONFIRMACION DE CORREO</p>
        </div>
        <div>
          <input class="info__info" type="text" v-model="confirmacionDeCorreo">
        </div> 
      </div>
      <div class="info__content">
        <div class="info__item">
          <p class ="info__confirm">CONTRASEÑA</p>
        </div>
        <div>
          <input class="info__info" type="password" v-model="password">
        </div> 
      </div>
      <div class="info__content">
        <div class="info__item">
          <p class ="info__confirm">SEXO</p>
        </div>
        <div>
          <select class="select" name="" id="" v-model="sexo">
            <option value=""></option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>
      </div>
    </div>
    <div class="btn">
      <button class="btn__login" @click="registro">Register</button>
    </div>
  </div>
    
  </div>
</template>

<script>
  export default {
  el: '#register',
  data() {
    return {
      email: null,
      password: null,
      nombres: null,
      apellidos: null,
      identificacion: null,
      correoInstitucional: null,
      confirmacionDeCorreo: null,
      contrasena: null,
      sexo:null
    };
  },
  methods:{
    registro (){
      let information = {
        email: this.email, 
        password: this.password,
        first_name: this.nombres,
        last_name: this.apellidos,
        role: "estudiante"
      }
      console.log (information)
      fetch("https://users-ms-dw5t2.herokuapp.com/create", {
        method:"POST", body: information
      }).then(response => response.json())
  .then(data => console.log(data));
      
    }
  }
}
</script>

<style>

.container {
  background: gray;
}

.info {
  display: flex;
  flex-direction: column;
}

.info__content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.info__item {
  display: flex;
  align-items: flex-start;
  width: 17rem;
}

.select {
  width: 9.5rem;
}

  
</style>

