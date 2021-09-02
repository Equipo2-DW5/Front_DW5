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
          <input class="info__info" type="text" v-model="user_in.first_name">
        </div>
      </div>
      <div class="info__content">
        <div class="info__item">
          <p class ="info__last-name">APELLIDOS</p>
        </div>
        <div>
          <input class="info__info" type="text" v-model="user_in.last_name">
        </div>
      </div>
      <div class="info__content">
        <div class="info__item">
          <p class ="info__id">IDENTIFICACION</p>
        </div>
        <div>
          <input class="info__info" type="text">
        </div> 
      </div>
      <div class="info__content">
        <div class="info__item"> 
          <p class ="info__email">CORREO INSTITUCIONAL</p>
        </div>
        <div>
          <input class="info__info" type="text" v-model="user_in.email">
        </div>
      </div>
      <div class="info__content">
        <div class="info__item">
          <p class ="info__confirm">CONFIRMACION DE CORREO</p>
        </div>
        <div>
          <input class="info__info" type="text">
        </div> 
      </div>
      <div class="info__content">
        <div class="info__item">
          <p class ="info__confirm">CONTRASEÑA</p>
        </div>
        <div>
          <input class="info__info" type="password" v-model="user_in.password">
        </div> 
      </div>
      <div class="info__content">
        <div class="info__item">
          <p class ="info__confirm">ROL</p>
        </div>
        <div>
          <select class="select" name="" id="" v-model="user_in.role">
            <option value=""></option>
            <option value="Laboratorista">Laboratorista</option>
            <option value="Estudiante">Estudiante</option>
            <option value="Coordinador">Coordinador</option>
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
  import gql from "graphql-tag";
  export default {
  name: 'Register',
  data() {
    return {
      user_in:
      {
        email:"",
        password: "",
        first_name: "",
        last_name: "",
        role: ""
      }
    }
  },
  methods:{
    registro: async function(){
            await this.$apollo.mutate({
                mutation: gql`
                   mutation ($createUserInput: UserInput!) {
                    createUser(input: $createUserInput) {
                    output }     
                  }`, 
                variables: {
                    createUserInput: this.user_in
                }
  }).then((result) => {
    alert ("Usuario Creado")
                

            }).catch((error) => {
                alert("Usuario No Creado")
            });
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

