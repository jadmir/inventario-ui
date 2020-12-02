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
            v-model="data.nom_area"
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
            v-model="data.desc_area"
            type="text"
            label="Descripción"
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
import { actualizarArea, crearArea } from 'src/services/AreaServices'
import { cargarEmpleados } from 'src/services/EmpleadoServices'
import { ExceptionError } from 'src/utils/ApiError'

export default {
  name: 'AreaAdmin',

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
        nom_categ: '',
        descri_categ: '',
        dni_empleado: null
      },
      empleados: []
    }
  },

  methods: {
    async cargarEmpleados() {
      try {
        const { empleados } = await cargarEmpleados()
        this.empleados = empleados
      } catch (error) {
        this.empleados = []
        ExceptionError(error)
      }
    },

    async crear() {
      try {
        await crearArea(this.data)
        this.emitUpdate()
        this.emitClose()

        this.$q.notify({
          message: 'Area creada',
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
        await actualizarArea(this.data.id_area, this.data)

        this.emitUpdate()
        this.emitClose()
        this.$q.notify({
          message: 'Area actualizada',
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
