<template>
  <div id="nav">
    <!--     <router-link to="/login">Login</router-link>
    <router-link to="/Register">Register</router-link>  -->
  </div>
  <router-view />
  <ui-button type="submit" @click="auth" raised>Crear</ui-button>
</template>

<script>
import gql from "graphql-tag";
import jwt_decode from "jwt-decode";

export default {
  methods: {
    auth: async function() {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation Mutation($authenticateCredentials: CredentialsInput!) {
              authenticate(credentials: $authenticateCredentials) {
                refresh
                access
              }
            }
          `,
          variables: {
            authenticateCredentials: {
              email: "superuser@hotmail.com",
              password: "superuser",
            },
          },
        })
        .then((result) => {
          let data = result.data.authenticate;
          data.user_id = jwt_decode(data.access)
            .user_id.toString()
            .padStart(3, "0");

          //this.$emit('log-in', data, this.user_in.username)
          this.$store.commit("setToken", data.access);
          this.getUserInfo()
        })
        .catch((error) => {
          alert("El usuario y/o contraseÃ±a son incorrectos", error);
        });
    },
    getUserInfo: async function() {
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
            userByEmailEmail: "superuser@hotmail.com"
          },
        })
        .then((result) => {
          let user = result.data.userByEmail;
          this.$store.commit("setUser", user);
        })
        .catch((error) => {
          alert("El usuario y/o contraseÃ±a son incorrectos", error);
        });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  /*  padding: 30px; */
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin-right: 1rem;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
