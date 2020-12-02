<template>
  <q-card style="width: 350px">
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
            v-model="data.codigo_bien"
            type="text"
            label="Código"
            outlined
            :disable="isEdit"
          />
        </div>
        <div class="q-my-sm">
          <q-input
            dense
            hide-bottom-space
            v-model="data.nombre_bien"
            type="text"
            label="Nombre"
            outlined
          />
        </div>
        <div class="q-my-sm">
          <q-input
            dense
            hide-bottom-space
            v-model="data.modelo_bien"
            type="text"
            label="Modelo"
            outlined
          />
        </div>
        <div class="q-my-sm">
          <q-input
            dense
            hide-bottom-space
            v-model="data.marca_bien"
            type="text"
            label="Marca"
            outlined
          />
        </div>
        <div class="q-my-sm">
          <q-input
            dense
            hide-bottom-space
            v-model="data.serie_bien"
            type="text"
            label="Serie"
            outlined
          />
        </div>
        <div class="q-my-sm">
          <q-input
            dense
            hide-bottom-space
            v-model="data.color_bien"
            type="text"
            label="Color"
            outlined
          />
        </div>
        <div class="q-my-sm">
          <q-input
            dense
            hide-bottom-space
            v-model="data.carac_bien"
            type="text"
            label="Características"
            outlined
          />
        </div>
        <div class="q-my-sm">
          <q-input
            dense
            hide-bottom-space
            v-model="data.descr_bien"
            type="text"
            label="Descripción"
            outlined
          />
        </div>
        <div class="q-my-sm">
          <q-input
            dense
            v-model.number="data.importe_bien"
            type="number"
            label="Importe"
            outlined
          />
        </div>
        <div class="q-my-sm">
          <q-input
            dense
            hide-bottom-space
            v-model.number="data.depre_bien"
            type="number"
            label="Depreciacion"
            outlined
          />
        </div>
        <div class="q-my-sm">
          <q-select
            v-model="data.id_categoria"
            :options="categorias"
            label="Categoría"
            outlined
            dense
            hide-bottom-space
            map-options
            emit-value
            option-value="id_categoria"
            option-label="nom_categ"
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
            v-model="data.estado_bien"
            :options="[
              {
                id: 1,
                label: 'BUENO'
              },
              {
                id: 2,
                label: 'POR REPARAR'
              },
              {
                id: 3,
                label: 'DEFECTUOSO'
              }
            ]"
            label="Estado"
            outlined
            dense
            hide-bottom-space
            map-options
            emit-value
            option-value="id"
            option-label="label"
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
import { actualizarBien, crearBien } from 'src/services/BienServices'
import { cargarCategorias } from 'src/services/CategoriaServices'
import { ExceptionError } from 'src/utils/ApiError'
import { cargarEmpleados } from 'src/services/EmpleadoServices'
import MixinInit from 'src/mixin/MixinInit'

export default {
  name: 'AreaAdmin',

  mixins: [MixinInit],

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
    await this.cargarCategorias()
    await this.cargarEmpleados()
  },

  data() {
    return {
      data: {
        codigo_bien: '',
        nombre_bien: '',
        modelo_bien: '',
        marca_bien: '',
        serie_bien: '',
        color_bien: '',
        carac_bien: '',
        descr_bien: '',
        importe_bien: '',
        depre_bien: '',
        fech_ingr_bien: '',
        estado_bien: '',
        id_categoria: '',
        dni_empleado: ''
      },
      categorias: [],
      empleados: []
    }
  },

  methods: {
    async cargarCategorias() {
      try {
        const { categorias } = await cargarCategorias()
        this.categorias = categorias
      } catch (error) {
        this.categorias = []
        ExceptionError(error)
      }
    },

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
        this.data.fech_ingr_bien = this.getToday()
        await crearBien(this.data)
        this.emitUpdate()
        this.emitClose()

        this.$q.notify({
          message: 'Bien creado',
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
        await actualizarBien(this.data.id_bien, this.data)

        this.emitUpdate()
        this.emitClose()
        this.$q.notify({
          message: 'Bien actualizado',
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
