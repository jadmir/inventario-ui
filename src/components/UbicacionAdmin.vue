<template>
  <q-card style="width: 340px">
    <q-card-section>
      <div class="text-h6 text-center">
        {{ isEdit ? 'EDITAR' : 'NUEVO' }}
      </div>
      <q-form class="q-my-xs">
        <div class="q-my-sm">
          <q-input
            autofocus
            dense
            hide-bottom-space
            v-model="data.nom_ubicacion"
            type="text"
            label="Nombre"
            outlined
            :disable="isEdit"
          />
        </div>
        <div class="q-my-sm">
          <q-input
            dense
            hide-bottom-space
            v-model="data.nro_piso"
            type="number"
            label="Nro Piso"
            outlined
          />
        </div>
        <div class="q-my-sm">
          <q-select
            v-model="data.id_area"
            :options="areas"
            label="Área"
            outlined
            dense
            hide-bottom-space
            map-options
            emit-value
            option-value="id_area"
            option-label="nom_area"
          />
        </div>
      </q-form>
    </q-card-section>

    <q-card-actions align="center">
      <q-btn
        v-if="!isEdit"
        size="sm"
        label="Registrar"
        type="submit"
        color="primary"
        @click.prevent="crear"
      />
      <q-btn
        v-else
        size="sm"
        label="Editar"
        type="submit"
        color="primary"
        @click.prevent="editar"
      />
      <q-btn
        size="sm"
        label="Cancelar"
        color="negative"
        class="q-ml-sm"
        @click="emitClose"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { cargarAreas } from 'src/services/AreaServices'
import {
  actualizarUbicacion,
  crearUbicacion
} from 'src/services/UbicacionServices'
import { ExceptionError } from 'src/utils/ApiError'

export default {
  name: 'UbicacionAdmin',

  props: {
    isEdit: {
      type: Boolean,
      default: false
    },

    toEdit: {
      type: Object,
      default: () => null
    }
  },

  async mounted() {
    if (this.isEdit) {
      this.data = { ...this.toEdit }
    }
    await this.cargarEmpleados()
  },

  data() {
    return {
      data: {
        nom_ubicacion: '',
        nro_piso: '',
        id_area: null
      },
      areas: []
    }
  },

  methods: {
    async cargarEmpleados() {
      try {
        const { areas } = await cargarAreas()
        this.areas = areas
      } catch (error) {
        this.areas = []
        ExceptionError(error)
      }
    },

    async crear() {
      try {
        await crearUbicacion(this.data)
        this.emitUpdate()
        this.emitClose()

        this.$q.notify({
          message: 'Ubicación creada',
          color: 'positive',
          icon: 'check_circle_outline',
          timeout: 2000
        })
      } catch (error) {
        ExceptionError(error)
      }
    },

    async editar() {
      try {
        await actualizarUbicacion(this.data.id_ubicacion, this.data)

        this.emitUpdate()
        this.emitClose()
        this.$q.notify({
          message: 'Ubicación actualizada',
          color: 'positive',
          icon: 'check_circle_outline',
          timeout: 2000
        })
      } catch (error) {
        ExceptionError(error)
      }
    },

    emitUpdate() {
      this.$emit('update')
    },

    emitClose() {
      this.$emit('close')
    }
  }
}
</script>
