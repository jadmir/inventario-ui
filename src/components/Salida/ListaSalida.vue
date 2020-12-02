<template>
  <div>
    <div class="text-h5 text-center q-mb-md">LISTA</div>

    <div class="q-my-xs">
      <q-markup-table separator="cell" class="Table">
        <thead>
          <tr>
            <th class="text-center">#</th>
            <th class="text-center">Documento</th>
            <th class="text-center">Fecha</th>
            <th class="text-center">Comentario</th>
            <th class="text-center">Ubicacion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(c, k) in items" :key="k">
            <td class="text-left">
              {{ c.id_sal_bien }}
            </td>
            <td class="text-left">
              {{ c.doc_sal_bien }}
            </td>
            <td class="text-left">
              {{ c.fecha_sal_bien }}
            </td>
            <td class="text-left">
              {{ c.comen_sal_bien }}
            </td>
            <td class="text-left">
              {{ c.ubicacion.nom_ubicacion }}
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>

<script>
import { ExceptionError } from 'src/utils/ApiError'
import { cargarSalidas } from 'src/services/SalidasServices'
import MixinInit from 'src/mixin/MixinInit'
export default {
  name: 'ListaSalida',

  mixins: [MixinInit],

  async mounted() {
    if (!this.isLogged) return
    await this.cargarLista()
  },

  data() {
    return {
      items: []
    }
  },

  methods: {
    async cargarLista() {
      try {
        const data = await cargarSalidas()

        this.items = data.salidas
      } catch (error) {
        this.items = []
        ExceptionError(error)
      }
    }
  }
}
</script>
