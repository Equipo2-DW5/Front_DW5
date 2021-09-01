<template>
  <div class="reserva">
    <div class="demo-container">
  <!-- App bar -->
  <ui-top-app-bar
    class="demo-app-bar"
    content-selector=".demo-content"
    :nav-icon="false"
  >
    Title
  </ui-top-app-bar>
  <!-- Content -->
  <div class="demo-content">
    <!-- Drawer -->
    <ui-drawer viewport-height>
      <ui-drawer-content>
        <ui-nav>
          <ui-nav-item active>
            <router-link to="/reservation"><ui-icon>home</ui-icon></router-link>
            Home
          </ui-nav-item>
          <ui-nav-item >
            <router-link to="/reservation/create"><ui-icon>edit_calendar</ui-icon></router-link>
            Crear reserva
          </ui-nav-item>
          <ui-nav-item  >
            <router-link to="/reservation/your-reservations"><ui-icon>calendar_today</ui-icon></router-link>
            Consultar tus reservas
          </ui-nav-item>
          
        </ui-nav>
      </ui-drawer-content>
    </ui-drawer>
    <!-- App content -->
    <div class="demo-app-content">
      <router-view/>
    </div>
  </div>
</div>
  </div>
</template>

<style>
.demo-app-content {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
