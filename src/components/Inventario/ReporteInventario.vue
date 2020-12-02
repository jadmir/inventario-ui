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
      <p>Periodo: {{ item.periodo_inv_bien }}</p>
      <p>Fecha y Hora: {{ item.created_at }}</p>
      <p>Ubicación: {{ item.ubicacion.nom_ubicacion }}</p>
      <p>Encargado: {{ item.encargado.nom_emple }}</p>
    </q-banner>

    <div class="q-my-xs">
      <q-markup-table separator="cell" class="Table">
        <thead>
          <tr>
            <th class="text-center">Código Bien</th>
            <th class="text-center">Bien</th>
            <th class="text-center">Ingreso</th>
            <th class="text-center">Salida</th>
            <th class="text-center">Diferencia</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(c, k) in items" :key="k">
            <td class="text-left">
              {{ c.codigo_bien }}
            </td>
            <td class="text-left">
              {{ c.nombre_bien }}
            </td>
            <td class="text-left">
              {{ c.ingreso }}
            </td>
            <td class="text-left">
              {{ c.salida }}
            </td>
            <td class="text-left">
              {{ c.ingreso - c.salida }}
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>

<script>
import { resumenInventario } from 'src/services/InventarioServices'
import { ExceptionError, formatDate } from 'src/utils/ApiError'
export default {
  name: 'ReporteInventario',

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
        const { resumen, inventario } = await resumenInventario(this.id)
        this.item = inventario
        this.item.created_at = formatDate(this.item.created_at)
        this.items = resumen
      } catch (error) {
        ExceptionError(error)
      }
    }
  }
}
</script>
