<template>
  <div class="login">
    <div class="container">
      <section class="login-section">
        <div class="logo">
          <ui-icon :size="48" class="logo__img">account_circle</ui-icon>
          <!--  <img class="logo__img" src="../assets/logo.png" alt="Main Image" /> -->
          <h1 class="logo__title">Sign In</h1>
        </div>
        <div class="request">
          <div class="e-mail">
            <ui-textfield v-model="user_in.email" outlined required>
              E-mail
            </ui-textfield>
          </div>
          <div class="password">
            <ui-textfield
              input-type="password"
              v-model="user_in.password"
              outlined
              required
            >
              Password
            </ui-textfield>
          </div>
        </div>
        <div class="btn">
          <button class="btn__login" @click="login">LOGIN</button>
        </div>
        <br />
        <div class="register-content">
          <router-link class="register-content__text" to="/Register"
            >¿No tienes una cuenta? ¡Registrate aquí!</router-link
          >
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import jwt_decode from "jwt-decode";
export default {
  name: "Login",
  data: function() {
    return {
      user_in: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login: async function() {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation($authenticateCredentials: CredentialsInput!) {
              authenticate(credentials: $authenticateCredentials) {
                refresh
                access
              }
            }
          `,
          variables: {
            authenticateCredentials: this.user_in,
          },
        })
        .then((result) => {
          let data = result.data.authenticate;
          data.user_id = jwt_decode(data.access).email.toString();
          this.$emit("log-in", data, this.user_in.email);
          this.$store.commit("setToken", data.access);
          this.getUserInfo();
        })
        .catch(() => {
          alert("El usuario y/o contraseña son incorrectos");
        });
    },
    getUserInfo: async function() {
      let email = jwt_decode(this.$store.state.token).email.toString();
      console.log(email);
      await this.$apollo
        .query({
          query: gql`
            query Query($userByEmailEmail: String!) {
              userByEmail(email: $userByEmailEmail) {
                id
                first_name
                last_name
                email
                role
                state
              }
            }
          `,
          variables: {
            userByEmailEmail: email,
          },
        })
        .then((result) => {
          let user = result.data.userByEmail;
          console.log(user);
          this.$store.commit("setUser", user);
          localStorage.setItem("LoggedUser",true)
          this.$router.push('/reservation')
        })
        .catch((error) => {
          alert("El usuario y/o contraseÃ±a son incorrectos", error);
        });
    },
  },
};
</script>

<style>
.login {
  background-color: gray;
}
.logo {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
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
  padding: 30px 0px;
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
  transition: all 0.3s ease-in-out;
  background-color: white;
  color: black;
}
.container {
  height: 100vh;
  padding-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.register-content__text {
  text-decoration: none;
  color: black;
}
.login-section {
  width: 100vh;
}
</style>
