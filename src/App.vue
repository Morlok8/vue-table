<script setup>
import SearchComponent from './components/SearchComponent.vue'
import TableComponent from './components/Table.vue'
</script>

<template>
  <div class = "flex justify-center w-full">
    <main class = "flex flex-col gap-4">
      <SearchComponent/>
      <TableComponent/>
    </main>
  </div>
</template>

<style scoped>

#app{
        display: flex;
        justify-content: center;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
