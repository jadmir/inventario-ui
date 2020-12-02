<template>
  <div>
    <div class="text-h5 text-center q-mb-sm">REGISTRO</div>

    <div class="q-mb-lg text-center">
      <q-btn
        size="sm"
        label="Buscar Producto"
        color="primary"
        @click="find.show = true"
      />
    </div>

    <q-form class="q-gutter-md" @submit.prevent="registrarInventario">
      <div class="q-my-xs">
        <q-input
          v-model="baja.fecha_baja_bien"
          dense
          hide-bottom-space
          type="date"
          label="Fecha"
          outlined
        />
      </div>

      <div class="q-my-xs">
        <q-input
          v-model="baja.mot_baja_bien"
          dense
          hide-bottom-space
          type="text"
          label="Motivo"
          outlined
        />
      </div>

      <div class="q-my-sm">
        <q-select
          v-model="baja.dni_empleado"
          :options="empleados"
          label="Encargado"
          outlined
          dense
          hide-bottom-space
          map-options
          emit-value
          option-value="dni_empleado"
          option-label="nom_emple"
        />
      </div>

      <div class="q-my-sm">
        <q-select
          v-model="baja.id_ubicacion"
          :options="ubicaciones"
          label="Ubicación"
          outlined
          dense
          hide-bottom-space
          map-options
          emit-value
          option-value="id_ubicacion"
          option-label="nom_ubicacion"
        />
      </div>

      <div class="text-center">
        <q-btn size="sm" label="Registrar" type="submit" color="primary" />
        <q-btn
          size="sm"
          label="Resetear"
          type="reset"
          color="negative"
          flat
          class="q-ml-sm"
          @click="reset"
        />
      </div>
    </q-form>

    <div class="q-ma-sm">
      <q-markup-table separator="cell" class="Table">
        <thead>
          <tr>
            <th class="text-center">Código Bien</th>
            <th class="text-center">Bien</th>
            <th class="text-center">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(c, k) in detalles" :key="k">
            <td class="text-left">
              {{ c.codigo_bien }}
            </td>
            <td class="text-left">
              {{ c.desc_bien }}
            </td>
            <td class="text-left">
              <q-input
                v-model="c.cant_sal_bien_detalle"
                type="number"
                label="Cantidad"
              />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>

    <q-dialog v-model="find.show">
      <buscar-producto @select="addBien" @close="find.show = false" />
    </q-dialog>
  </div>
</template>

<script>
import MixinInit from 'src/mixin/MixinInit'
import { ExceptionError } from 'src/utils/ApiError'
import { cargarUbicaciones } from 'src/services/UbicacionServices'
import BuscarProducto from '../BuscarProducto.vue'
import { cargarEmpleados } from 'src/services/EmpleadoServices'
import { crearBaja } from 'src/services/BajasServices'

export default {
  name: 'RegistroIngreso',

  mixins: [MixinInit],

  components: { BuscarProducto },

  async mounted() {
    if (!this.isLogged) return
    await this.loadEmpleados()
    await this.loadUbicaciones()
    this.baja.fecha_baja_bien = this.getToday()
  },

  data() {
    return {
      baja: {
        fecha_baja_bien: '',
        id_ubicacion: null,
        mot_baja_bien: ''
      },
      detalles: [],
      ubicaciones: [],
      empleados: [],

      find: {
        show: false
      }
    }
  },

  methods: {
    async loadEmpleados() {
      try {
        const { empleados } = await cargarEmpleados()
        this.empleados = empleados
      } catch (error) {
        this.empleados = []
        ExceptionError(error)
      }
    },

    async loadUbicaciones() {
      try {
        const data = await cargarUbicaciones()

        this.ubicaciones = data.ubicaciones
      } catch (error) {
        this.ubicaciones = []
        ExceptionError(error)
      }
    },

    async registrarInventario() {
      const dataBaja = {
        ...this.baja,
        detalles: this.detalles
      }
      try {
        await crearBaja(dataBaja)
        this.reset()
        this.$q.notify({
          message: 'Ingreso registrado',
          color: 'positive',
          icon: 'check_circle_outline',
          timeout: 2000
        })
      } catch (error) {
        this.reset()
        ExceptionError(error)
      }
    },

    addBien(bien) {
      const exists = this.detalles.some(d => d.id_bien === bien.id_bien)
      if (exists) {
        return
      }

      const detalle = {
        codigo_bien: bien.codigo_bien,
        desc_bien: bien.nombre_bien,
        cant_sal_bien_detalle: 1
      }

      this.detalles = [detalle, ...this.detalles]
    },

    reset() {
      this.baja = {
        fecha_baja_bien: '',
        id_ubicacion: null,
        mot_baja_bien: '',
        doc_ingr_bien: ''
      }
      this.baja.fecha_baja_bien = this.getToday()
      this.detalles = []
    }
  }
}
</script>
