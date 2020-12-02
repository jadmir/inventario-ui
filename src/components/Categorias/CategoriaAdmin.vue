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
            v-model="data.nom_categ"
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
            v-model="data.descri_categ"
            type="text"
            label="Descripción"
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
  actualizarCategoria,
  crearCategoria
} from 'src/services/CategoriaServices'
import { ExceptionError } from 'src/utils/ApiError'

export default {
  name: 'CategoriaAdmin',

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
        nom_categ: '',
        descri_categ: ''
      },
      text: ''
    }
  },

  methods: {
    async crear() {
      try {
        await crearCategoria(this.data)
        this.emitUpdate()
        this.emitClose()

        this.$q.notify({
          message: 'Categoría creada',
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
        await actualizarCategoria(this.data.id_categoria, this.data)

        this.emitUpdate()
        this.emitClose()
        this.$q.notify({
          message: 'Categoría actualizada',
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
