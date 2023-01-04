<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="container">
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.container{
  max-width: 100%;
  margin: 0 auto;
}

body{
  background: red;
}

@media (min-width: 1200px) {
  .container{
  max-width: 1200px;
  margin: 0 auto;
}
}
</style>
