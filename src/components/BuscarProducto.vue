<template>
  <q-card style="width: 340px">
    <q-card-section>
      <div class="text-h6 text-center">
        BUSCAR BIEN
      </div>

      <div class="q-my-xs">
        <q-input
          autofocus
          v-model="q"
          dense
          hide-bottom-space
          type="text"
          label="Buscar"
          outlined
        />
      </div>

      <div class="text-center">
        <q-btn
          size="sm"
          label="Buscar"
          type="submit"
          color="primary"
          @click="cargarBusqueda"
        />
      </div>
    </q-card-section>

    <div class="q-ma-sm">
      <q-markup-table separator="cell" class="Table">
        <thead>
          <tr>
            <th class="text-center">Código Bien</th>
            <th class="text-center">Bien</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(c, k) in items" :key="k" @click="emitSelect(c)">
            <td class="text-left">
              {{ c.codigo_bien }}
            </td>
            <td class="text-left">
              {{ c.nombre_bien }}
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </q-card>
</template>

<script>
import { buscarBien } from 'src/services/BienServices'
import { ExceptionError } from 'src/utils/ApiError'
export default {
  name: 'BuscarProducto',

  data() {
    return {
      q: '',
      items: []
    }
  },

  methods: {
    async cargarBusqueda() {
      try {
        const { bienes } = await buscarBien(this.q)
        this.items = bienes
      } catch (error) {
        this.items = []
        ExceptionError(error)
      }
    },

    emitClose() {
      this.$emit('close')
    },

    emitSelect(bien) {
      this.$emit('select', bien)
      this.emitClose()
    }
  }
}
</script>
