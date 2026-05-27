<template>
  <nav class="navbar">
    <NuxtLink to="/" class="logo">
      CareerTrack Dashboard
    </NuxtLink>

    <div class="nav-links">
      <NuxtLink to="/">Dashboard</NuxtLink>
      <NuxtLink to="/companies">Companies</NuxtLink>
      <NuxtLink to="/applications">Applications</NuxtLink>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: #0b0b0b;
  color: white;
  padding: 24px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: white;
  font-size: 22px;
  font-weight: 700;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 32px;
  align-items: center;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 600;
}

.nav-links a:hover {
  text-decoration: underline;
}
</style>