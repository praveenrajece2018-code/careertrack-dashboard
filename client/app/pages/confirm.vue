<template>
  <section class="flex h-screen w-full items-center justify-center">
    <span class="loading loading-spinner loading-xl" />
  </section>
</template>

<script setup lang="ts">
// definePageMeta({
//   layout: "confirm",
// });

const user = useSupabaseUser();

watch(
  user,
  () => {
    if (user.value) {
      return setTimeout(() => {
        navigateTo("/applications");
      }, 1000);
    }
  },
  { immediate: true },
);
</script>

<style scoped></style>
