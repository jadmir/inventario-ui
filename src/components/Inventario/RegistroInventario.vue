<template>
  <div>
    <div class="text-h5 text-center q-mb-md">REGISTRO</div>

    <q-form class="q-gutter-md" @submit.prevent="registrarInventario">
      <div class="q-my-xs">
        <q-input
          v-model="data.fecha_inv_bien"
          dense
          hide-bottom-space
          type="date"
          label="Fecha"
          outlined
        />
      </div>

      <div class="q-my-xs">
        <q-input
          v-model="data.periodo_inv_bien"
          dense
          hide-bottom-space
          type="test"
          label="Periodo"
          outlined
        />
      </div>

      <div class="q-my-sm">
        <q-select
          v-model="data.dni_empleado"
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
          v-model="data.id_ubicacion"
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

      <q-file
        outlined
        dense
        bottom-slots
        v-model="data.file"
        label="Archivo de inventario (xlsx)"
        counter
        max-files="1"
      >
        <template v-slot:before>
          <q-icon name="attachment" />
        </template>

        <template v-slot:append>
          <q-icon
            v-if="data.file !== null"
            name="close"
            @click.stop="data.file = null"
            class="cursor-pointer"
          />
          <q-icon name="search" @click.stop />
        </template>

        <template v-slot:hint>
          Archivo cargado
        </template>
      </q-file>

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
        <q-btn
          flat
          href="ejemplo.xlsx"
          download
          color="primary"
          type="a"
          label="Estructura Inventario"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import MixinInit from 'src/mixin/MixinInit'
import { cargarEmpleados } from 'src/services/EmpleadoServices'
import { ExceptionError } from 'src/utils/ApiError'
import { cargarUbicaciones } from 'src/services/UbicacionServices'
import { crearInventario } from 'src/services/InventarioServices'

export default {
  name: 'RegistroInventario',

  mixins: [MixinInit],

  async mounted() {
    if (!this.isLogged) return
    await this.loadEmpleados()
    await this.loadUbicaciones()
    this.data.fecha_inv_bien = this.getToday()
  },

  data() {
    return {
      data: {
        fecha_inv_bien: '',
        id_ubicacion: null,
        periodo_inv_bien: '',
        dni_empleado: null,
        file: null
      },
      empleados: [],
      ubicaciones: []
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
      const formData = new FormData()
      formData.append('dni_empleado', this.data.dni_empleado)
      formData.append('fecha_inv_bien', this.data.fecha_inv_bien)
      formData.append('periodo_inv_bien', this.data.periodo_inv_bien)
      formData.append('file', this.data.file)
      formData.append('id_ubicacion', this.data.id_ubicacion)
      try {
        await crearInventario(formData)
        this.reset()
        this.$q.notify({
          message: 'Inventario registrado',
          color: 'positive',
          icon: 'check_circle_outline',
          timeout: 2000
        })
      } catch (error) {
        ExceptionError(error)
      }
    },

    reset() {
      this.data = {
        fecha_inv_bien: '',
        id_ubicacion: null,
        periodo_inv_bien: '',
        dni_empleado: null,
        file: null
      }
      this.data.fecha_inv_bien = this.getToday()
    }
  }
}
</script>
