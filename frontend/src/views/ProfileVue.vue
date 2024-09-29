<template>
  <div>
    <h3>Profile</h3>
    <div v-if="user">
      <h4>Username: {{ user.username }}</h4>
      <h4>email: {{ user.email }}</h4>
      <button @click="logout">Logout</button>
    </div>
    <div v-for="blog in blogs" :key="blog._id">
      <SingleBlog :blog="blog" :owner="owner"></SingleBlog>
    </div>
  </div>
</template>

<script>
import SingleBlog from '../components/SingleBlog.vue'
import { useAuthStore } from '@/stores/auth';
import { useBlogStore } from '@/stores/blog';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: { SingleBlog },
    setup(){
        const authStore = useAuthStore();
        const blogStore = useBlogStore();
        const router = useRouter();
        let user = ref(null);
        let blogs = ref(null);
        let owner = ref(true);
        onMounted( async () => {
            await authStore.getUser();
            user.value = authStore.userDetail;
            console.log(user.value)

            blogs.value = await blogStore.getBlogs();

            blogs.value = blogs.value.filter((blog) => {
                console.log("blog.user_id:", blog.user_id, "Type:", typeof blog.user_id);
                console.log("user.value.id:", user.value.id, "Type:", typeof user.value.id);
                return blog.user_id === user.value.id;
            })
        });

        let logout = () => {
            console.log("clicked")
            localStorage.removeItem('token');
            router.push('/');
        }
        return { user,logout,blogs,owner }
    }
}
</script>

<style>

</style>