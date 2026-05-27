<template>
  <section id="how-it-works" class="py-16 sm:py-20 lg:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <section class="mb-16 text-center">
        <h2 class="text-base-content text-3xl font-bold tracking-tight sm:text-3xl lg:text-4xl">How CareerTrack Dashboard Works</h2>
        <p class="mx-auto mt-4 max-w-3xl sm:text-xl">Getting started is simple. Follow these easy steps to streamline and organize your job search effectively.</p>
      </section>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-3">
        <article v-for="(step, index) in steps" :key="index" class="card bg-base-100 shadow transition-shadow duration-300 hover:shadow-md">
          <section class="card-body items-center text-center">
            <div class="mb-4 flex justify-center">
              <div class="bg-primary flex h-16 w-16 items-center justify-center rounded-full">
                <Icon :name="step.iconName" class="text-primary-content text-3xl" />
              </div>
            </div>
            <h3 class="card-title justify-center">{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </section>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const steps = ref([
  {
    iconName: "heroicons:user-plus",
    title: "Create an Account",
    description: "Sign up for free and in seconds. Quick and easy registration.",
  },
  {
    iconName: "heroicons:document-plus",
    title: "Add Applications",
    description: "Log your job applications including company details, position title, application date, and more.",
  },
  {
    iconName: "heroicons:check-badge",
    title: "Stay Organized",
    description: "Track your application progress and update statuses as your search evolves.",
  },
]);
</script>

<style scoped></style>
