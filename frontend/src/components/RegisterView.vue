<template>
  <div>
    <h2>SignUp</h2>
    <form @submit.prevent="signUp">
      <input type="text" placeholder="display name" v-model="displayName">
      <input type="email" placeholder="email" v-model="email">
      <input type="password" placeholder="password" v-model="password">
      <p v-if="error">{{ error }}</p>
      <button>
          Sign up
      </button>
    </form>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>