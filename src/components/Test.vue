<template>
  <div>
    <h1>Hola desde el test</h1>
    <slot :info="info" :otra="otra"></slot>
  </div>
</template>

<script>
export default {
  name: 'Test',

  data() {
    return {
      info: 'hola mudno',
      otra: 'cosa'
    }
  }
}
</script>
