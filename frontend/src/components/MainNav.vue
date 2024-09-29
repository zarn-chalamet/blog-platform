<template>
    <header>
      <nav>
        <div class="logo">
          <router-link :to="{ name: 'home'}">BLOG PLATFORM</router-link>
        </div>
        <div class="nav-actions">
            <div class="nav-item">
                <router-link to="/create-blog">Create</router-link>
            </div>
            <div class="nav-item">
                Profile
            </div>
        </div>
      </nav>
    </header>
  </template>
  

<script>
export default {

}
</script>

<style scoped>
/* Reset some basic styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

header {
  background-color: #333;
  padding: 15px 20px;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.logo a {
  color: white;
  text-decoration: none;
}

.nav-actions {
  display: flex;
  gap: 20px;
}

.nav-item {
  color: white;
  cursor: pointer;
  font-size: 18px;
  padding: 8px 16px;
  transition: background-color 0.3s ease;
}

.nav-item:hover {
  background-color: #555;
  border-radius: 4px;
}
</style>