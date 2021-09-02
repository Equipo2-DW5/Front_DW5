<template>
  <div id="register">
    <div class="register-container">
      <div class="title">
        <h1 class="title__main">REGISTRO DE USUARIO</h1>
      </div>
      <div class="info">
        <div class="info__content">
  
          <div>
            <ui-textfield v-model="user_in.first_name" outlined required>
              Nombre
            </ui-textfield>
          </div>
              
        </div>
        <div class="info__content">
          <div>
            <ui-textfield v-model="user_in.last_name" outlined required>
              Apellido
            </ui-textfield>
          </div>
        </div>
        <div class="info__content">
          
          <div>
            <ui-textfield v-model="user_in.email" outlined required>
              Correo Insitucional
            </ui-textfield>
          </div>
        </div>
        <div class="info__content">
        
          <div>
           <ui-textfield outlined required>
              Confirmación de correo
            </ui-textfield>
          </div>
        </div>
        <div class="info__content">
          
          <div>
            <ui-textfield input-type="password" v-model="user_in.password" outlined required>
              Contraseña
            </ui-textfield>
            
          </div>
        </div>
        <div class="info__content">
          
          <div>
            <ui-select
                required
                v-model="user_in.role"
                :options="options"
                @selected="onSelected($event)"
                outlined
              >
                Laboratorio
              </ui-select>
          </div>
        </div>
      </div>
      <div class="btn"><!-- 
        <button class="btn__login back" @click="registro">Inicia Sesión</button> -->
        <button class="btn__login" @click="registro">Registrate</button>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "Register",
  data() {
    return {
      options: [
        {
          label: "Estudiante",
          value: "Estudiante",
        }
      ],
      user_in: {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        role: "",
      },
    };
  },
  methods: {
    onSelected(selected) {
      this.user_in.role = selected.value;
    },
    registro: async function() {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation($createUserInput: UserInput!) {
              createUser(input: $createUserInput) {
                output
              }
            }
          `,
          variables: {
            createUserInput: this.user_in,
          },
        })
        .then((result) => {
          console.log(result);
          alert("Usuario Creado");
          this.$router.push('/')
        })
        .catch(() => {
          alert("Usuario No Creado");
        });
    },
  },
};
</script>

<style>
.register-container{
  display: flex;
  flex-direction: column;
  background: gray;
  height: 100vh;
  padding-bottom: 1.5rem;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.container {
}
.info {
  display: flex;
  flex-direction: column;
}
.info__content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
}
.info__item {
  display: flex;
  align-items: flex-start;
  width: 17rem;
}
.select {
  width: 9.5rem;
}
.back{
  margin-right: 30px;
}
</style>
