<template>
  <header class="bg-primary">
    <nav class="flex items-center justify-between px-4 py-5 sm:px-6">
      <p class="text-primary-content text-xl font-bold">JobNest</p>
      <div class="flex items-center gap-12">
        <ul class="hidden items-center gap-8 lg:flex">
          <li v-for="link in navLinks" :key="link.name" class="inline-block">
            <NuxtLink :to="link.href" class="text-primary-content font-medium hover:underline hover:underline-offset-4">{{ link.name }}</NuxtLink>
          </li>
        </ul>
        <div class="hidden items-center gap-3 lg:flex">
          <div class="avatar avatar-placeholder">
            <div class="bg-base-100 w-11 rounded-full">
              <span>{{ user?.user_metadata?.name?.[0] || "" }}</span>
            </div>
          </div>
          <div class="text-primary-content flex flex-col items-start">
            <p>{{ user?.user_metadata.name }}</p>
            <span class="text-xs">{{ user?.email }}</span>
          </div>
          <button class="ml-2 flex cursor-pointer items-center" @click="clickSignOut">
            <Icon name="ph:sign-out" class="text-primary-content" size="24" />
          </button>
        </div>
      </div>
      <div class="lg:hidden">
        <button class="btn btn-primary btn-ghost p-0" @click="isMobileMenuOpen = !isMobileMenuOpen">
          <Icon :name="isMobileMenuOpen ? 'heroicons:x-mark-solid' : 'heroicons:bars-3'" class="text-primary-content" size="24" />
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <nav v-if="isMobileMenuOpen" class="lg:hidden">
      <section class="bg-primary px-4 pb-6 sm:px-6">
        <ul class="flex flex-col gap-4">
          <li v-for="link in navLinks" :key="link.name">
            <NuxtLink :to="link.href" class="text-primary-content text-sm font-medium hover:underline hover:underline-offset-4" @click="isMobileMenuOpen = false">
              {{ link.name }}
            </NuxtLink>
          </li>
        </ul>
        <article class="border-primary-content/20 mt-4 flex items-center justify-between gap-3 border-t pt-4">
          <div class="flex items-center gap-3">
            <div class="avatar avatar-placeholder">
              <div class="bg-base-100 w-11 rounded-full">
                <span>{{ user?.user_metadata?.name?.[0] || "" }}</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="text-primary-content flex flex-col items-start gap-1">
                <p>{{ user?.user_metadata.name }}</p>
                <span class="text-xs">{{ user?.email }}</span>
              </div>
            </div>
          </div>
          <button class="ml-2 flex cursor-pointer items-center" @click="clickSignOut">
            <Icon name="ph:sign-out" class="text-primary-content" size="24" />
          </button>
        </article>
      </section>
    </nav>
  </header>
</template>

<script setup lang="ts">
const emit = defineEmits(["signOut"]);

const user = useSupabaseUser();
const isMobileMenuOpen = ref(false);

const navLinks = ref([
  { name: "My Applications", href: "/applications" },
  { name: "CV Writer", href: "/applications/cv-writer" },
  { name: "Profile", href: "/applications/profile" },
]);

const clickSignOut = () => {
  emit("signOut");
};
</script>

<style scoped></style>
