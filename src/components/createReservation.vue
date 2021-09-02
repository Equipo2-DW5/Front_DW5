<template>
  <div class="createReservation">
    <header class="header">
      <div class="wrapper">
        <div class="header__flex">
          <div>
            <h1 class="header__title">CREAR RESERVA</h1>
          </div>
        </div>
      </div>
    </header>

    <section class="wrapper">
      <div class="form-container">
        <form action="">
          <div class="row-field">
            <div class="input-field">
              <ui-textfield
                v-model="reservation.description"
                outlined
                required
                pattern=".{8,}"
                helper-text-id="pw-validation-msg"
              >
                Descripción
              </ui-textfield>
              <ui-textfield-helper id="pw-validation-msg" validMsg>
                Campo requerido
              </ui-textfield-helper>
            </div>
          </div>
          <div class="row-field">
            <div class="input-field date-input">
              <ui-datepicker
                v-model="reservation.initialDate"
                :config="configDate"
                placeholder="Fecha de reserva"
                required
                toggle
              ></ui-datepicker>
            </div>
          </div>
          <div class="row-field">
            <div class="input-field">
              <ui-textfield
                v-model="reservation.duration"
                outlined
                required
                pattern=".{1,}"
                helper-text-id="pw-validation-duration"
              >
                Duración
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
                v-model="selectedLab"
                :options="options"
                @selected="onSelected($event)"
                outlined
              >
                Laboratorio
              </ui-select>
            </div>
          </div>
          <div class="row-field">
            <ui-button type="submit" @click="checkForm" raised>Crear</ui-button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  el: "#createReservation",
  beforeMount() {
    this.getLaboratories();
  },
  methods: {
    checkForm: function() {
      if (this.$data.reservation.description === "") {
        alert("Por favor ingrese una descripción");
        return;
      }
      if (this.$data.reservation.initialDate === "") {
        alert("Por favor ingrese una fecha de solicitud");
        return;
      }
      if (this.$data.reservation.duration === "") {
        alert("Por favor ingrese el tiempo de duración de la reserva");
        return;
      }
      if (this.$data.selectedLab === "") {
        alert("Por favor ingrese el laboratorio a reservar");
        return;
      }
      let initialDate = new Date(this.$data.reservation.initialDate);
      let finalDate = new Date(this.$data.reservation.initialDate);
      finalDate.setHours(
        initialDate.getHours() + parseInt(this.$data.reservation.duration)
      );
      finalDate = new Date(finalDate);
      this.$data.reservation.initialDate = this.generateDate(initialDate);
      this.$data.reservation.finalDate = this.generateDate(finalDate);
      this.createReservation();
    },
    generateDate: function(dateToCovert) {
      return `${dateToCovert.getFullYear()}-${this.addZeros(
        dateToCovert.getMonth()
      )}-${this.addZeros(dateToCovert.getDate())}T${this.addZeros(
        dateToCovert.getHours()
      )}:${this.addZeros(dateToCovert.getMinutes())}`;
    },
    addZeros: function(value) {
      return value < 10 ? "0" + value : "" + value;
    },
    createReservation: async function() {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation Mutation(
              $createReservationReservationCreateRequest: ReservaCreateInput!
            ) {
              createReservation(
                reservationCreateRequest: $createReservationReservationCreateRequest
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
            createReservationReservationCreateRequest: {
              userId: `${this.$store.state.user.id}`,
              userRole: this.$store.state.user.role,
              userEmail: this.$store.state.user.email,
              reserva: {
                descripcion: this.$data.reservation.description,
                fechaSolicitud: this.$data.reservation.initialDate,
                fechaFin: this.$data.reservation.finalDate,
                duracion: this.$data.reservation.duration,
                idUsuario: `${this.$store.state.user.id}`,
                idLaboratorio: `${this.$data.selectedLab}`,
              },
            },
          },
        })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          alert("El usuario y/o contraseÃ±a son incorrectos", error);
        });
    },
    getLaboratories: async function() {
      await this.$apollo
        .query({
          query: gql`
            query Query {
              RetrieveLabList {
                lab_id
                categoria
                descripcion
                estado
                aforo
              }
            }
          `,
        })
        .then((result) => {
          let laboratories = result.data.RetrieveLabList;
          this.options = laboratories.map((lab) => {
            return { label: lab.descripcion, value: lab.lab_id };
          });

        })
        .catch((error) => {
          alert("error al consultar", error);
        });
    },
    onSelected(selected) {
      this.selectedLab = selected.value;
    },
  },
  data() {
    return {
      reservation: {
        description: "",
        initialDate: "",
        finalDate:"",
        duration: "",
      },
      configDate: {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
      },
      options: [],
      selectedLab: "",
    };
  },
};
</script>

<style>
.row-field {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
.input-field {
  display: flex;
  flex-direction: column;
  width: 40%;
  padding: 0px 15px;
}
.date-input {
  margin-bottom: 20px;
}
.form-container {
  padding: 0px 40px;
}
</style>
