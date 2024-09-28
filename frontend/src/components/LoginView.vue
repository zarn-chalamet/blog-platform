<template>
  <div>
    <h2>Log In</h2>
    <form @submit.prevent="loginFun">
        <input type="email" placeholder="email" v-model="email">
        <input type="password" placeholder="password" v-model="password">
        <p v-if="error">{{ error }}</p>
        <button>
            Login
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