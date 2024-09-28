<template>
  <div>
    <h2>SignUp</h2>
    <form @submit.prevent="signUp">
      <input type="text" placeholder="username" v-model="username">
      <input type="email" placeholder="email" v-model="email">
      <input type="password" placeholder="password" v-model="password">
      <p v-if="err">{{ err }}</p>
      <button>
          Sign up
      </button>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup(){
        let username = ref(null);
        let email = ref(null);
        let password = ref(null);
        const router = useRouter();
        let err = ref(null);

        let signUp = async () => {
            const authStore = useAuthStore();
            console.log(email.value);
            console.log(username.value);
            console.log(password.value);
            try {
                await authStore.register({
                    username: username.value,
                    email: email.value,
                    password: password.value,
                })
                router.push("/");
            } catch (error) {
                err.value = error;
            }
        }
        return {username,email,password,signUp,err}
    }
}
</script>
<style>

</style>