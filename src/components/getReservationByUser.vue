<template>
  <div class="getReservasByUser">
    <header class="header">
      <div class="wrapper">
        <div class="header__flex">
          <div>
            <h1 class="header__title">TUS RESERVAS</h1>
          </div>
        </div>
      </div>
    </header>
    <div v-if="data.length > 0" class="wrapper reservations-user">
      <ui-table :data="data" :thead="thead" :tbody="tbody"></ui-table>
    </div>
    <div v-if="data.length == 0" class="wrapper reservations-user">
      <ui-table :data="data" :thead="thead" :tbody="tbody"></ui-table>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  el: "#getReservasByUser",
  beforeMount() {
    this.getReservationsByUser()
  },
  methods: {
    getReservationsByUser: async function() {
      await this.$apollo
        .query({
          query: gql`
            query Query($reservationByUserIdReservaByAnyId: ReservaByAnyId!) {
              reservationByUserId(
                reservaByAnyId: $reservationByUserIdReservaByAnyId
              ) {
                timestamp
                id
                message
                data {
                  idReserva
                  descripcion
                  fechaSolicitud
                  fechaFin
                  duracion
                  idUsuario
                  idLaboratorio
                  estado
                }
              }
            }
          `,
          variables: {
            reservationByUserIdReservaByAnyId: {
              userId: `${this.$store.state.user.id}`,
              userRole: this.$store.state.user.role,
              userEmail: this.$store.state.user.email,
              id: `${this.$store.state.user.id}`,
            },
          },
        })
        .then((result) => {
          this.$data.data = result.data.reservationByUserId.data
        })
        .catch((error) => {
          alert("No se encontraron reservas", error);
        });
    },
  },
  data() {
    return {
      data: [
      ],
      thead: [
        "ID",
        "Descripción",
        "Fecha de Solicitud",
        "Fecha Fin",
        "Duración(Horas)",
        "Laboratorio",
        "Estado",
      ],
      tbody: [
        "idReserva",
        "descripcion",
        {
          field: "fechaSolicitud",
          fn: (data) => {
            return `${data.fechaSolicitud.substring(
              0,
              10
            )} ${data.fechaSolicitud.substring(11, 16)}`;
          },
        },
        {
          field: "fechaFin",
          fn: (data) => {
            return `${data.fechaFin.substring(0, 10)} ${data.fechaFin.substring(
              11,
              16
            )}`;
          },
        },
        "duracion",
        "idLaboratorio",
        {
          field: "estado",
          fn: (data) => {
            return data.estado ? "Aprobada" : "En espera";
          },
          class: (data) => {
            return data.estado ? "aproved" : "waiting";
          },
        },
      ],
    };
  },
};
</script>

<style>
/* header */
.header {
  padding-bottom: 2em;
  border-radius: 0 0 15px 15px;
  padding-top: 2em;
}
.header__title {
  font-size: 3.5em;
}

.full-width {
  min-width: 100%;
}
.wrapper {
  padding: 0 20px;
}
/* Table */
.aproved {
  color: green !important;
}
.waiting {
  color: goldenrod !important;
}
</style>
