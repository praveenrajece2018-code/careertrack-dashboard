<template>
  <section id="features" class="bg-0 py-16">
    <div class="mx-auto max-w-7xl px-4">
      <section class="mb-12 text-center">
        <h2 class="text-base-content mb-4 text-3xl font-bold tracking-tight sm:text-3xl lg:text-4xl">Why Choose CareerTrack Dashboard?</h2>
        <p class="text-center sm:text-xl">A portfolio full-stack dashboard for tracking applications, companies, deadlines, and interview progress.</p>
      </section>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-3">
        <article v-for="(feature, index) in features" :key="index" class="card bg-base-100 shadow transition-shadow duration-300 hover:shadow-md">
          <div class="card-body">
            <div class="mb-4 flex justify-center">
              <div class="bg-primary flex h-16 w-16 items-center justify-center rounded-full">
                <Icon :name="feature.icon" class="text-primary-content text-3xl" />
              </div>
            </div>
            <h3 class="card-title justify-center">{{ feature.title }}</h3>
            <p class="text-center">{{ feature.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = ref([
  {
    title: "Track Applications",
    description: "Keep all your job applications in one place with statuses, dates, and more.",
    icon: "ph:magnifying-glass-bold",
  },
  {
    title: "Application Notes",
    description: "Store interview notes, recruiter details, deadlines, and follow-up actions in one place.",
    icon: "ph:file-bold",
  },
  {
    title: "Dashboard Insights",
    description: "View application status counts, upcoming deadlines, and job-search progress from one dashboard.",
    icon: "ph:confetti-bold",
  },
]);
</script>
