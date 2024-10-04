<template>
  <div>
    <input type="text" placeholder="Search" v-model="search" />
    <div v-for="blog in filteredBlogs" :key="blog._id">
      <SingleBlog :blog="blog" />
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
