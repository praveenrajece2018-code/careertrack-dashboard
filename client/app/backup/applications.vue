<template>
  <main class="page">
    <div class="page-header">
      <h1>Job Applications</h1>
      <NuxtLink to="/">Back to Dashboard</NuxtLink>
    </div>

    <div class="filter-card">
      <label>Filter by status</label>

      <select v-model="selectedStatus" @change="fetchApplications">
        <option value="">All Statuses</option>
        <option value="Saved">Saved</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Assessment">Assessment</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>

    <div class="table-card">
      <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>Company</th>
            <th>Type</th>
            <th>Status</th>
            <th>Applied</th>
            <th>Deadline</th>
            <th>Interview</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="application in applications" :key="application.id">
            <td>{{ application.role_title }}</td>
            <td>{{ application.company_name }}</td>
            <td>{{ application.job_type }}</td>
            <td>
              <span class="status-badge">{{ application.status }}</span>
            </td>
            <td>{{ formatDate(application.applied_date) }}</td>
            <td>{{ formatDate(application.deadline) }}</td>
            <td>{{ formatDate(application.interview_date) }}</td>
          </tr>
        </tbody>
      </table>

      <p v-if="applications.length === 0" class="empty-text">
        No applications found.
      </p>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../../utils/api";

const applications = ref([]);
const selectedStatus = ref("");

const fetchApplications = async () => {
  try {
    const url = selectedStatus.value
      ? `/applications?status=${selectedStatus.value}`
      : "/applications";

    const response = await api.get(url);
    applications.value = response.data;
  } catch (error) {
    console.error("Error fetching applications:", error);
  }
};

const formatDate = (dateValue) => {
  if (!dateValue) return "-";
  return new Date(dateValue).toLocaleDateString("en-GB");
};

onMounted(() => {
  fetchApplications();
});
</script>

<style scoped>
.page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
  font-family: Arial, sans-serif;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 34px;
  margin: 0;
}

.page-header a {
  background: #111827;
  color: white;
  padding: 10px 14px;
  border-radius: 8px;
  text-decoration: none;
}

.filter-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 20px;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  align-items: center;
}

.filter-card label {
  font-weight: 600;
}

.filter-card select {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}

.table-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 24px;
  overflow-x: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 14px;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
}

th {
  background: #f9fafb;
}

.status-badge {
  background: #e0f2fe;
  color: #0369a1;
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
}

.empty-text {
  color: #666;
  margin-top: 20px;
}
</style>