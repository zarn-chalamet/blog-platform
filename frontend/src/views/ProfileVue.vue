<template>
  <div>
    <h3>Profile</h3>
    <button @click="logout">Logout</button>
    <div v-if="user">
      <h4>Username: {{ user.username }}</h4>
      <h4>email: {{ user.email }}</h4>
      
    </div>
    <div v-for="blog in blogs" :key="blog._id">
      <SingleBlog :blog="blog" :owner="owner" @blog-deleted="removeBlog"></SingleBlog>
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
                return blog.user_id === user.value.id;
            })
        });

        let logout = () => {
            console.log("clicked")
            localStorage.removeItem('token');
            router.push('/');
        }

        let removeBlog = (deletdBlogId) => {
          blogs.value = blogs.value.filter(blog => blog._id != deletdBlogId)
        }
        return { user,logout,blogs,owner,removeBlog }
    }
}
</script>

<style>

</style>