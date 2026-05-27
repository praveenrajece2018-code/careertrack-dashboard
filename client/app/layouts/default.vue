<template>
  <section>
    <NavBar />
    <slot />
    <FooterSection />
  </section>
</template>

<!-- <script setup>
const user = useSupabaseUser();

watch(
  user,
  () => {
    if (user.value) {
      return navigateTo("/applications");
    }
  },
  { immediate: true },
);
</script> -->
