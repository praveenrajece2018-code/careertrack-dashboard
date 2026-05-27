<template>
  <footer class="footer">
    <div class="footer-links">
      <NuxtLink to="/">Dashboard</NuxtLink>
      <NuxtLink to="/companies">Companies</NuxtLink>
      <NuxtLink to="/applications">Applications</NuxtLink>
    </div>

    <h2>CareerTrack Dashboard</h2>
    <p>Full-stack job application tracking dashboard</p>
    <p>Built with Nuxt/Vue, Express.js, and MySQL</p>
  </footer>
</template>

<style scoped>
.footer {
  background: #0b0b0b;
  color: white;
  text-align: center;
  padding: 36px 24px;
  margin-top: 48px;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 28px;
  margin-bottom: 24px;
}

.footer-links a {
  color: white;
  text-decoration: none;
  font-weight: 600;
}

.footer-links a:hover {
  text-decoration: underline;
}

.footer h2 {
  margin-bottom: 8px;
}

.footer p {
  margin: 4px 0;
  color: #d1d5db;
}
</style>