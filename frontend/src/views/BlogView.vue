<template>
  <div v-if="blog" class="blog-container">
    <div v-if="blog.photo" class="blog-image">
      <img :src="blog.photo" alt="Blog Image" class="image" />
    </div>
    <div class="blog-content">
      <h4 class="blog-title">{{ blog.title }}</h4>
      <p class="blog-body">{{ blog.body }}</p>
    </div>
  </div>
</template>

<script>
import { useBlogStore } from '@/stores/blog';
import { onMounted, ref } from 'vue';

export default {
  props: ['id'],
  setup(props) {
    let blog = ref(null);
    const blogStore = useBlogStore();
    
    onMounted(async () => {
      blog.value = await blogStore.getBlog(props.id);
      console.log(blog.value);
    });
    
    return { blog };
  }
}
</script>

<style scoped>
.blog-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.blog-container:hover {
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
}

.blog-image {
  width: 50%;
  max-height: 400px; /* Limit the height of the image */
  overflow: hidden;
  border-radius: 12px;
  margin-bottom: 20px;
}

.image {
  width: 100%; /* Ensures the image takes full width of the container */
  height: auto; /* Maintain aspect ratio */
  object-fit: cover; /* Ensures the image covers the container without distortion */
  border-radius: 12px; /* Matches the container's border radius */
}

.blog-content {
  text-align: center;
}

.blog-title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.blog-body {
  font-size: 18px;
  color: #555;
  line-height: 1.6;
  padding: 0 20px;
}
</style>
