<template>
  <main class="page">
    <div class="page-header">
      <h1>Companies</h1>
      <NuxtLink to="/">Back to Dashboard</NuxtLink>
    </div>

    <form class="form-card" @submit.prevent="createCompany">
      <h2>Add Company</h2>

      <div class="form-grid">
        <input
          v-model="form.company_name"
          type="text"
          placeholder="Company name"
          required
        />

        <input
          v-model="form.location"
          type="text"
          placeholder="Location"
        />

        <input
          v-model="form.website"
          type="url"
          placeholder="Website"
        />
      </div>

      <button type="submit">Add Company</button>
    </form>

    <div class="table-card">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company</th>
            <th>Location</th>
            <th>Website</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="company in companies" :key="company.id">
            <td>{{ company.id }}</td>
            <td>{{ company.company_name }}</td>
            <td>{{ company.location || "-" }}</td>
            <td>
              <a v-if="company.website" :href="company.website" target="_blank">
                {{ company.website }}
              </a>
              <span v-else>-</span>
            </td>
            <td>
              <button class="delete-btn" @click="deleteCompany(company.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-if="companies.length === 0" class="empty-text">
        No companies found.
      </p>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../../utils/api";

const companies = ref([]);

const form = ref({
  company_name: "",
  location: "",
  website: "",
});

const fetchCompanies = async () => {
  try {
    const response = await api.get("/companies");
    companies.value = response.data;
  } catch (error) {
    console.error("Error fetching companies:", error);
  }
};

const createCompany = async () => {
  try {
    await api.post("/companies", form.value);

    form.value = {
      company_name: "",
      location: "",
      website: "",
    };

    await fetchCompanies();
  } catch (error) {
    console.error("Error creating company:", error);
  }
};

const deleteCompany = async (id) => {
  const confirmed = confirm("Are you sure you want to delete this company?");

  if (!confirmed) {
    return;
  }

  try {
    await api.delete(`/companies/${id}`);
    await fetchCompanies();
  } catch (error) {
    console.error("Error deleting company:", error);
  }
};

onMounted(() => {
  fetchCompanies();
});
</script>

<style scoped>
.page {
  max-width: 1100px;
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

input {
  padding: 11px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
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

.empty-text {
  color: #666;
  margin-top: 20px;
}
</style>