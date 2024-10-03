<template>
  <div>
    <div v-for="blog in blogs" :key="blog._id">
      <SingleBlog :blog="blog"></SingleBlog>
    </div>
  </div>
</template>
<script>
import SingleBlog from '../components/SingleBlog.vue'
import { onMounted, ref } from 'vue';

import { useBlogStore } from '@/stores/blog';

  export default{
    components: {
    SingleBlog,
      },
    setup(){
      const blogStore = useBlogStore();
      let blogs = ref(null);

      onMounted( async () => {
        blogs.value = await blogStore.getBlogs();
      });


      
      return {blogs};
    }
  }
</script>