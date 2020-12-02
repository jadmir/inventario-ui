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
            v-model="data.nombre_user"
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
            v-model="data.pass_user"
            type="password"
            label="Contraseña"
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
import { actualizarUsuario, crearUsuario } from 'src/services/UsuarioService'
import { ExceptionError } from 'src/utils/ApiError'

export default {
  name: 'UsuarioAdmin',

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
  },

  data() {
    return {
      data: {
        nombre_user: '',
        pass_user: ''
      }
    }
  },

  methods: {
    async crear() {
      try {
        await crearUsuario(this.data)
        this.emitUpdate()
        this.emitClose()

        this.$q.notify({
          message: 'Usuario creada',
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
        await actualizarUsuario(this.data.id_user, this.data)

        this.emitUpdate()
        this.emitClose()
        this.$q.notify({
          message: 'Usuario actualizada',
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
