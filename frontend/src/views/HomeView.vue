<template>
  <div class="container">
    <input 
      type="text" 
      placeholder="Search blogs..." 
      v-model="search" 
      class="search-bar"
    />
    <div v-if="filteredBlogs.length" >
      <div v-for="blog in filteredBlogs" :key="blog._id" >
        <SingleBlog :blog="blog" />
      </div>
    </div>
    <div v-else class="no-results">
      No blogs found.
    </div>
  </div>
</template>

<script>
import SingleBlog from '../components/SingleBlog.vue';
import { onMounted, ref, computed } from 'vue';
import { useBlogStore } from '@/stores/blog';

export default {
  components: {
    SingleBlog,
  },
  setup() {
    const blogStore = useBlogStore();
    const blogs = ref([]);
    const search = ref('');

    // Load blogs on mount
    onMounted(async () => {
      blogs.value = await blogStore.getBlogs();
    });

    // Computed property to filter blogs based on search input
    const filteredBlogs = computed(() => {
      if (!search.value) {
        return blogs.value;
      }
      return blogs.value.filter((item) =>
        item.title.toLowerCase().includes(search.value.toLowerCase())
      );
    });

    return {
      blogs,
      search,
      filteredBlogs,
    };
  },
};
</script>

<style scoped>
/* Container for the entire layout */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

/* Search bar styling */
.search-bar {
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

/* Change the border color and shadow on focus */
.search-bar:focus {
  border-color: #007bff;
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.2);
  outline: none;
}


/* No results message */
.no-results {
  text-align: center;
  font-size: 18px;
  color: #888;
  margin-top: 20px;
}
</style>
