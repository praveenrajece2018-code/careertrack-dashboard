<template>
  <main class="page">
    <div class="page-header">
      <h1>Job Applications</h1>
      <NuxtLink to="/">Back to Dashboard</NuxtLink>
    </div>

    <!-- Add Application Form -->
    <form class="form-card" @submit.prevent="createApplication">
      <h2>Add Job Application</h2>

      <div class="form-grid">
        <select v-model="form.company_id">
          <option :value="null">Select company</option>
          <option
            v-for="company in companies"
            :key="company.id"
            :value="company.id"
          >
            {{ company.company_name }}
          </option>
        </select>

        <input
          v-model="form.role_title"
          type="text"
          placeholder="Role title"
          required
        />

        <input
          v-model="form.job_type"
          type="text"
          placeholder="Job type, e.g. Internship"
        />

        <select v-model="form.status">
          <option value="Saved">Saved</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Assessment">Assessment</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <div class="field">
          <label>Applied Date</label>
          <input v-model="form.applied_date" type="date" />
        </div>

        <div class="field">
          <label>Deadline</label>
          <input v-model="form.deadline" type="date" />
        </div>

        <div class="field">
          <label>Interview Date</label>
          <input v-model="form.interview_date" type="date" />
        </div>

        <input
          v-model="form.job_link"
          type="url"
          placeholder="Job link"
        />
      </div>

      <textarea
        v-model="form.notes"
        placeholder="Application notes"
      ></textarea>

      <button type="submit">Add Application</button>
    </form>

    <!-- Filter -->
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

    <!-- Applications Table -->
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
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="application in applications" :key="application.id">
            <td>{{ application.role_title }}</td>
            <td>{{ application.company_name || "Not assigned" }}</td>
            <td>{{ application.job_type || "-" }}</td>
            <td>
              <span class="status-badge">{{ application.status }}</span>
            </td>
            <td>{{ formatDate(application.applied_date) }}</td>
            <td>{{ formatDate(application.deadline) }}</td>
            <td>{{ formatDate(application.interview_date) }}</td>
            <td>
              <button
                class="delete-btn"
                @click="deleteApplication(application.id)"
              >
                Delete
              </button>
            </td>
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
import api from "../../../utils/api";

const applications = ref([]);
const companies = ref([]);
const selectedStatus = ref("");

const form = ref({
  company_id: null,
  role_title: "",
  job_type: "",
  status: "Saved",
  applied_date: "",
  deadline: "",
  interview_date: "",
  job_link: "",
  notes: "",
});

const fetchCompanies = async () => {
  try {
    const response = await api.get("/companies");
    companies.value = response.data;
  } catch (error) {
    console.error("Error fetching companies:", error);
  }
};

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

const createApplication = async () => {
  try {
    await api.post("/applications", form.value);

    form.value = {
      company_id: null,
      role_title: "",
      job_type: "",
      status: "Saved",
      applied_date: "",
      deadline: "",
      interview_date: "",
      job_link: "",
      notes: "",
    };

    selectedStatus.value = "";
    await fetchApplications();
  } catch (error) {
    console.error("Error creating application:", error);
  }
};

const deleteApplication = async (id) => {
  const confirmed = confirm("Are you sure you want to delete this application?");

  if (!confirmed) {
    return;
  }

  try {
    await api.delete(`/applications/${id}`);
    await fetchApplications();
  } catch (error) {
    console.error("Error deleting application:", error);
  }
};

const formatDate = (dateValue) => {
  if (!dateValue) {
    return "-";
  }

  return new Date(dateValue).toLocaleDateString("en-GB");
};

onMounted(async () => {
  await fetchCompanies();
  await fetchApplications();
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

.form-card,
.filter-card,
.table-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.form-card h2 {
  margin-top: 0;
  margin-bottom: 18px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 14px;
  margin-bottom: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label {
  font-size: 13px;
  color: #4b5563;
  font-weight: 600;
}

input,
select,
textarea {
  padding: 11px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}

textarea {
  width: 100%;
  min-height: 90px;
  margin-bottom: 16px;
  resize: vertical;
}

button {
  background: #111827;
  color: white;
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.delete-btn {
  background: #dc2626;
}

.filter-card {
  display: flex;
  gap: 16px;
  align-items: center;
}

.filter-card label {
  font-weight: 600;
}

.table-card {
  overflow-x: auto;
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