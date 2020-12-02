<template>
  <div>
    <div class="text-h5 text-center q-mb-md">REPORTE</div>
    <div class="q-my-xs">
      <q-input
        v-model="id"
        dense
        hide-bottom-space
        type="test"
        label="ID"
        outlined
      />
    </div>
    <div class="text-center">
      <q-btn
        size="sm"
        label="Cargar"
        type="submit"
        color="primary"
        @click="cargarResumen"
      />
    </div>

    <q-banner v-if="item" class="bg-primary text-white q-my-sm">
      <p>Documento: {{ item.doc_sal_bien }}</p>
      <p>Fecha y Hora: {{ item.created_at }}</p>
      <p>Ubicación: {{ item.ubicacion.nom_ubicacion }}</p>
    </q-banner>

    <div class="q-my-xs">
      <q-markup-table separator="cell" class="Table">
        <thead>
          <tr>
            <th class="text-center">Código Bien</th>
            <th class="text-center">Bien</th>
            <th class="text-center">Sailda</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(c, k) in items" :key="k">
            <td class="text-left">
              {{ c.codigo_bien }}
            </td>
            <td class="text-left">
              {{ c.desc_bien }}
            </td>
            <td class="text-left">
              {{ c.cant_sal_bien_detalle }}
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>

<script>
import { ExceptionError, formatDate } from 'src/utils/ApiError'
import { cargarSalida } from 'src/services/SalidasServices'
export default {
  name: 'ResumenSalida',

  data() {
    return {
      id: '',
      item: null,
      items: []
    }
  },

  methods: {
    async cargarResumen() {
      try {
        const { salida } = await cargarSalida(this.id)
        this.item = salida
        this.item.created_at = formatDate(this.item.created_at)
        this.items = salida.detalles
      } catch (error) {
        ExceptionError(error)
      }
    }
  }
}
</script>
