<template>
  <div class="reserva">
    <div class="demo-container">
      <!-- App bar -->
      <ui-top-app-bar
        class="demo-app-bar"
        content-selector=".demo-content"
        :nav-icon="false"
      >
        Bienvenido, {{ $store.state.user.first_name }} - [{{
          $store.state.user.role
        }}]
      </ui-top-app-bar>
      <!-- Content -->
      <div class="demo-content">
        <!-- Drawer -->
        <ui-drawer viewport-height>
          <ui-drawer-content>
            <ui-nav>
              <ui-nav-item @click="navigate('/reservation')" active>
                <ui-icon>home</ui-icon>
                Home
              </ui-nav-item>
              <ui-nav-item @click="navigate('/reservation/create')">
                <ui-icon>edit_calendar</ui-icon>
                Crear reserva
              </ui-nav-item>
              <ui-nav-item @click="navigate('/reservation/your-reservations')">
                <ui-icon>calendar_today</ui-icon>
                Consultar tus reservas
              </ui-nav-item>
              <ui-nav-item
                v-if="$store.state.user.role != 'Estudiante'"
                @click="navigate('/reservation/settings')"
              >
                <ui-icon>settings</ui-icon>
                Configuración
              </ui-nav-item>
              <ui-nav-item @click="logout">
                <ui-icon>calendar_today</ui-icon>
                Cerrar Sesión
              </ui-nav-item>
            </ui-nav>
          </ui-drawer-content>
        </ui-drawer>
        <!-- App content -->
        <div class="demo-app-content">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  el: "#reserva",
  methods: {
    navigate: function(route) {
      this.$router.push(route);
    },
    logout: function() {
      this.$store.commit("setUser", {});
      this.navigate("/");
    },
  },
  data() {
    return {
      usuario: this.$store.state.user,
    };
  },
};
</script>

<style>
.demo-app-content {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
