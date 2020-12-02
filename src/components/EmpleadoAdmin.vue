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
            v-model="data.dni_empleado"
            type="text"
            label="DNI"
            outlined
            :disable="isEdit"
          />
        </div>
        <div class="q-my-sm">
          <q-input
            dense
            hide-bottom-space
            v-model="data.nom_emple"
            type="text"
            label="Nombres"
            outlined
          />
        </div>
        <div class="q-my-sm">
          <q-input
            dense
            hide-bottom-space
            v-model="data.cargo_emple"
            type="text"
            label="Cargo"
            outlined
          />
        </div>
        <div class="q-my-sm">
          <q-input
            dense
            hide-bottom-space
            v-model="data.carac_emple"
            type="text"
            label="Características"
            outlined
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
import {
  actualizarEmpleado,
  crearEmpleado
} from 'src/services/EmpleadoServices'
import { ExceptionError } from 'src/utils/ApiError'

export default {
  name: 'EmpleadoAdmin',

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

  mounted() {
    if (this.isEdit) {
      this.data = { ...this.toEdit }
    }
  },

  data() {
    return {
      data: {
        dni_empleado: '',
        cargo_emple: '',
        nom_emple: '',
        carac_emple: ''
      },
      text: ''
    }
  },

  methods: {
    async crear() {
      try {
        await crearEmpleado(this.data)
        this.emitUpdate()
        this.emitClose()

        this.$q.notify({
          message: 'Empleado creado',
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
        await actualizarEmpleado(this.data.dni_empleado, this.data)

        this.emitUpdate()
        this.emitClose()
        this.$q.notify({
          message: 'Empleado actualizado',
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
