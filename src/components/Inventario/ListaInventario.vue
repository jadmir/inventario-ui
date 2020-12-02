<template>
  <div>
    <div class="text-h5 text-center q-mb-md">LISTA</div>

    <div class="q-my-xs">
      <q-markup-table separator="cell" class="Table">
        <thead>
          <tr>
            <th class="text-center">#</th>
            <th class="text-center">Periodo</th>
            <th class="text-center">Fecha</th>
            <th class="text-center">Encargado</th>
            <th class="text-center">Ubicacion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(c, k) in items" :key="k">
            <td class="text-left">
              {{ c.id_inv_bien }}
            </td>
            <td class="text-left">
              {{ c.periodo_inv_bien }}
            </td>
            <td class="text-left">
              {{ c.fecha_inv_bien }}
            </td>
            <td class="text-left">
              {{ c.encargado.nom_emple }}
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
import { cargarInventarios } from 'src/services/InventarioServices'
import { ExceptionError } from 'src/utils/ApiError'
import MixinInit from 'src/mixin/MixinInit'
export default {
  name: 'ListaInventario',

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
        const data = await cargarInventarios()

        this.items = data.inventarios
      } catch (error) {
        this.items = []
        ExceptionError(error)
      }
    }
  }
}
</script>
