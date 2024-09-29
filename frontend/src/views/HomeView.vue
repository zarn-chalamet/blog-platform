<template>
  <div>
    <div>
      <MainNav></MainNav>
    </div>
    <div v-if="user">
      <h3>Home</h3>
      <h4>Username: {{ user.username }}</h4>
      <h4>email: {{ user.email }}</h4>
      <button @click="logout">Logout</button>
    </div>
    <div v-for="blog in blogs" :key="blog._id">
      <SingleBlog :blog="blog"></SingleBlog>
    </div>
  </div>
</template>
<script>
import SingleBlog from '../components/SingleBlog.vue'
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import MainNav from '../components/MainNav.vue';
import { useBlogStore } from '@/stores/blog';

  export default{
    components: {
    SingleBlog,
      MainNav },
    setup(){
      const authStore = useAuthStore();
      const router = useRouter();
      let user = ref(null);
      const blogStore = useBlogStore();
      let blogs = ref(null);

      onMounted( async () => {

        // After login, extract access token from URL query parameters
        const accessToken = new URLSearchParams(window.location.search).get("access_token");

        if (accessToken) {
          // Store the access token (localStorage, Vuex, Pinia, or cookies)
          localStorage.setItem('token', accessToken);
          console.log(accessToken)
          // Redirect the user to the home page or desired page
          router.push('/home');
        }

        await authStore.getUser();
        user.value = authStore.userDetail;
        console.log(user.value)
        blogs.value = await blogStore.getBlogs();
      });


      let logout = () => {
        console.log("clicked")
        localStorage.removeItem('token');
        router.push('/');
      }
      return {user,logout,blogs};
    }
  }
</script>