<template>
  <main class="page">
    <section class="hero">
      <h1>CareerTrack Dashboard</h1>
      <p>
        Track your job applications, companies, deadlines, interview dates, and
        progress updates from one dashboard.
      </p>
    </section>

    <section class="stats-grid">
      <div class="stat-card">
        <h3>Total Applications</h3>
        <p>{{ stats.total }}</p>
      </div>

      <div class="stat-card">
        <h3>Upcoming Deadlines</h3>
        <p>{{ stats.upcomingDeadlines }}</p>
      </div>

      <div
        v-for="item in stats.byStatus"
        :key="item.status"
        class="stat-card"
      >
        <h3>{{ item.status }}</h3>
        <p>{{ item.count }}</p>
      </div>
    </section>

    <section class="quick-links">
      <NuxtLink to="/companies">View Companies</NuxtLink>
      <NuxtLink to="/applications">View Applications</NuxtLink>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../../utils/api";

const stats = ref({
  total: 0,
  upcomingDeadlines: 0,
  byStatus: [],
});

const fetchStats = async () => {
  try {
    const response = await api.get("/dashboard/stats");
    stats.value = response.data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
  }
};

onMounted(() => {
  fetchStats();
});
</script>

<style scoped>
.page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 24px;
  font-family: Arial, sans-serif;
}

.hero {
  text-align: center;
  margin-bottom: 48px;
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.hero h1 {
  font-size: 42px;
  line-height: 1.2;
  margin: 0;
}

.hero p {
  color: #555;
  font-size: 18px;
  line-height: 1.6;
  max-width: 760px;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.stat-card h3 {
  margin: 0 0 12px;
  font-size: 15px;
  color: #555;
}

.stat-card p {
  margin: 0;
  font-size: 34px;
  font-weight: 700;
}

.quick-links {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.quick-links a {
  background: #111827;
  color: white;
  padding: 12px 18px;
  border-radius: 8px;
  text-decoration: none;
}
</style>