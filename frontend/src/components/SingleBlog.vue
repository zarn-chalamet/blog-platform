<template>
  <div class="blog">
    <router-link :to="{ name: 'single-blog', params: { id: blog._id } }">
      <div class="blog-content">
        <div class="blog-text">
          <h3>{{ blog.title }}</h3>
          <p v-if="!expanded">{{ truncatedBody }} <span>...See More</span></p>
          <p v-else>{{ blog.body }} <span @click.stop="toggleExpand" class="see-less">See Less</span></p>
        </div>
        <div v-if="blog.photo" class="blog-image">
          <img :src="blog.photo" alt="Blog Image" class="photo" />
        </div>
      </div>
    </router-link>
    <div v-if="owner" class="actions">
      <router-link :to="{ name: 'edit-blog', params: { id: blog._id } }">
        <button class="edit-btn">Edit</button>
      </router-link>
      <button @click="deleteBlog" class="delete-btn">Delete</button>
    </div>
  </div>
</template>

<script>
import { useBlogStore } from '@/stores/blog';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';

export default {
  props: ['blog', 'owner'],
  setup(props, context) {
    const router = useRouter();
    const blogStore = useBlogStore();
    const expanded = ref(false); // state to track if text is expanded

    // Computed property to get truncated body text
    const truncatedBody = computed(() => {
      const maxWords = 3; // Number of sentences to display initially
      const sentences = props.blog.body.split('.'); // Split into sentences
      if (sentences.length <= maxWords) {
        return props.blog.body;
      }
      return sentences.slice(0, maxWords).join('.') + '.';
    });
    const deleteBlog = async () => {
      await blogStore.deleteBlog(props.blog._id);
      alert('Deleted successfully!');
      context.emit('blog-deleted', props.blog._id);
      router.push('/profile');
    };

    return { expanded, truncatedBody, deleteBlog };
  },
};
</script>

<style scoped>
.blog {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: box-shadow 0.3s ease;
  max-width: 600px;
  margin-bottom: 20px;
}

.blog:hover {
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
}

.blog-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.blog-text {
  flex: 1;
  padding-right: 15px;
}

h3 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}

p {
  color: #666;
  font-size: 16px;
  line-height: 1.6;
}

.blog-image {
  flex-shrink: 0;
}

.photo {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
}

.actions {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.edit-btn,
.delete-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-btn {
  background-color: #e74c3c;
}

.edit-btn:hover {
  background-color: #2980b9;
}

.delete-btn:hover {
  background-color: #c0392b;
}

/* Styles for See More/See Less */
.see-more,
.see-less {
  color: #3498db;
  cursor: pointer;
  font-weight: bold;
  margin-left: 5px;
}

.see-more:hover,
.see-less:hover {
  text-decoration: underline;
}
</style>
