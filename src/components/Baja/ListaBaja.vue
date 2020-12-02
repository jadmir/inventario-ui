<template>
  <div>
    <div class="text-h5 text-center q-mb-md">LISTA</div>

    <div class="q-my-xs">
      <q-markup-table separator="cell" class="Table">
        <thead>
          <tr>
            <th class="text-center">#</th>
            <th class="text-center">Fecha</th>
            <th class="text-center">Motivo</th>
            <th class="text-center">Ubicacion</th>
            <th class="text-center">Encargado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(c, k) in items" :key="k">
            <td class="text-left">
              {{ c.id_baja_bien }}
            </td>
            <td class="text-left">
              {{ c.fecha_baja_bien }}
            </td>
            <td class="text-left">
              {{ c.mot_baja_bien }}
            </td>
            <td class="text-left">
              {{ c.ubicacion.nom_ubicacion }}
            </td>
            <td class="text-left">
              {{ c.encargado.nom_emple }}
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>

<script>
import { ExceptionError } from 'src/utils/ApiError'
import { cargarBajas } from 'src/services/BajasServices'
import MixinInit from 'src/mixin/MixinInit'
export default {
  name: 'ListaBaja',

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
        const data = await cargarBajas()

        this.items = data.bajas
      } catch (error) {
        this.items = []
        ExceptionError(error)
      }
    }
  }
}
</script>
