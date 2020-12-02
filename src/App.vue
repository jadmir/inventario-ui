<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
h1,
h2,
h3,
h4 {
  margin: 0;
}
</style>

<style lang="scss">
.Table {
  max-height: 400px;

  thead tr:first-child th {
    background-color: #027be3;
    position: sticky;
    top: 0;
    opacity: 1;
    z-index: 1;
    color: white;
  }

  .q-table__top,
  .q-table__bottom {
    background-color: #027be3;
  }
}
</style>
