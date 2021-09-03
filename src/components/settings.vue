<template>
  <div class="settings">
    <header class="header">
      <div class="wrapper">
        <div class="header__flex">
          <div>
            <h1 class="header__title">CONFIGURACION</h1>
          </div>
        </div>
      </div>
    </header>

    <section class="user-management">
      <h2>Gestionar Usuarios</h2>

      <div class="row-field">
        <div class="input-field">
          <ui-textfield
            v-model="emailToUpdate"
            outlined
            required
            pattern=".{1,}"
            helper-text-id="pw-validation-duration"
          >
            Email
          </ui-textfield>
          <ui-textfield-helper id="pw-validation-duration" validDuration>
            Campo requerido
          </ui-textfield-helper>
        </div>
      </div>
      <div class="row-field">
        <div class="input-field">
          <ui-select
            required
            v-model="selectedRole"
            :options="options"
            @selected="onSelected($event)"
            outlined
          >
            Nuevo Rol
          </ui-select>
        </div>
      </div>
      <div class="row-field">
        <ui-button type="submit" @click="updateUser" raised>Asignar</ui-button>
      </div>
    </section>
    <section class="reservation-management">
      <h2>Gestionar Reservas</h2>

      <div class="row-field">
        <div class="input-field">
          <ui-textfield
            v-model="idReserva"
            outlined
            required
            pattern=".{1,}"
            helper-text-id="pw-validation-duration"
          >
            Id de la reserva
          </ui-textfield>
          <ui-textfield-helper id="pw-validation-duration" validId>
            Campo requerido
          </ui-textfield-helper>
        </div>
      </div>
      <div class="row-field">
        <ui-button type="submit" @click="approveReservation" raised
          >Aprobar</ui-button
        >
      </div>
    </section>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  data() {
    return {
      options: [
        {
          label: "Estudiante",
          value: "Estudiante",
        },
        {
          label: "Laboratorista",
          value: "Laboratorista",
        },
      ],
      selectedRole: "",
      idReserva: "",
      emailToUpdate: "",
      reservation: {},
    };
  },
  methods: {
    onSelected(selected) {
      this.selectedRole = selected.value;
    },
    approveReservation: function() {
      this.getReservationById();
    },
    getReservationById: async function() {
      await this.$apollo
        .query({
          query: gql`
            query Query($reservationByIdReservaByAnyId: ReservaByAnyId!) {
              reservationById(reservaByAnyId: $reservationByIdReservaByAnyId) {
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
            reservationByIdReservaByAnyId: {
              userId: `${this.$store.state.user.id}`,
              userRole: this.$store.state.user.role,
              userEmail: this.$store.state.user.email,
              id: `${this.idReserva}`,
            },
          },
        })
        .then((result) => {
          this.reservation = result.data.reservationById.data[0];
          this.updateReservation();
        })
        .catch(() => {
          alert("Ha ocurrido un error aprobando la solicitud");
        });
    },
    updateReservation: async function() {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation Mutation(
              $updateReservationReservationUpdateRequest: ReservaUpdateInput!
            ) {
              updateReservation(
                reservationUpdateRequest: $updateReservationReservationUpdateRequest
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
            updateReservationReservationUpdateRequest: {
              userId: `${this.$store.state.user.id}`,
              userRole: this.$store.state.user.role,
              userEmail: this.$store.state.user.email,
              reserva: {
                idReserva: this.reservation.idReserva,
                descripcion: this.reservation.descripcion,
                fechaSolicitud: this.reservation.fechaSolicitud,
                fechaFin: this.reservation.fechaFin,
                duracion: this.reservation.duracion,
                idUsuario: `${this.$store.state.user.id}`,
                idLaboratorio: this.reservation.idLaboratorio,
                estado: true,
              },
            },
          },
        })
        .then((result) => {
          console.log(result);
          alert("Se ha aprobado la solicitud exitosamente")
        })
        .catch(() => {
          alert("Ha ocurrido un error aprobando la solicitud");
        });
    },
    updateUser: async function() {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation Mutation($updateUserInput: UpdateUserInput!) {
              updateUser(input: $updateUserInput) {
                output
              }
            }
          `,
          variables: {
            updateUserInput: {
              email: this.emailToUpdate,
              role: this.selectedRole,
            },
          },
        })
        .then((result) => {
          alert("Se ha asignado el rol exitosamente")
          console.log(result);
        })
        .catch((error) => {
          alert("Ha ocurrido un error asigando el rol", error);
        });
    },
  },
};
</script>

<style>
.reservation-management {
  padding: 30px 0px;
}
.user-management {
  padding: 30px 0px;
}
</style>
