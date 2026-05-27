<template>
  <NuxtLoadingIndicator :throttle="0" :color="getPath" />
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const route = useRoute();

const getPath = computed(() => {
  if (route.path === "/applications" || route.path === "/applications/profile") {
    return "#FFFFFF";
  } else {
    return "#000000";
  }
});
</script>
