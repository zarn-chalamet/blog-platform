<template>
  <div v-if="blog" class="blog-container">
    <div v-if="blog.photo" class="blog-image">
      <img :src="blog.photo" alt="Blog Image" class="image" />
    </div>
    <div class="blog-content">
      <h4 class="blog-title">{{ blog.title }}</h4>
      <p class="blog-body">{{ blog.body }}</p>
    </div>

    <!-- Like and Comment Section -->
    <div class="blog-interactions">
      <button @click="handleLike" :class="{ liked: isLiked }">
        {{ blog.likes.length }} Likes
      </button>
      <button @click="toggleCommentSection">
        {{ blog.comments.length }} Comments
      </button>
    </div>

    <!-- Comment Section -->
    <div class="comment-section">
      <ul>
        <li v-for="comment in comments" :key="comment._id">
          <strong>{{ userNamesMap[comment.user_id]?.username || 'Unknown User' }}:</strong> {{ comment.comment }}
        </li>
      </ul>
      <input v-model="newComment" placeholder="Write a comment..." />
      <button @click="addComment">Submit</button>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { useBlogStore } from '@/stores/blog';
import { onMounted, ref } from 'vue';

export default {
  props: ['id'],
  setup(props) {
    let blog = ref(null);
    const blogStore = useBlogStore();
    const newComment = ref(''); // New comment input
    const isLiked = ref(false); // Track if user liked the blog
    let comments = ref(null);
    const userNamesMap = ref({});
    const authStore = useAuthStore();
    
    onMounted(async () => {
      blog.value = await blogStore.getBlog(props.id);
      console.log(blog.value);


      await authStore.getUser();
      const user = authStore.userDetail;
      if (blog.value.likes.some(like => like.user_id === user.id)) {
        console.log("User has already liked this blog");
        isLiked.value = true;
      }

      const userIdSet = new Set(blog.value.comments.map(comment => comment.user_id));
      for (const userId of userIdSet) {
        userNamesMap.value[userId] = await authStore.getUserById(userId);
      }

      comments.value = blog.value.comments;
    });

    const handleLike = async () => {
      try {
        await blogStore.toggleLike(blog.value._id); // Call toggleLike in store
        isLiked.value = !isLiked.value; // Toggle like state locally
      } catch (error) {
        console.error('Error liking blog:', error.message);
      }
    };

    const addComment = async () => {
      if (!newComment.value.trim()) return; // Prevent empty comment submission

      try {
        const newAddedComment = await blogStore.addComment(blog.value._id, newComment.value); 
        newComment.value = ''; 
        console.log(newAddedComment.comments)
        comments.value = newAddedComment.comments;
      } catch (error) {
        console.error('Error adding comment:', error.message);
      }
    };
    
    return { blog, newComment, isLiked, userNamesMap, comments,handleLike, addComment };
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

.blog-interactions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.blog-interactions button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}

.blog-interactions button.liked {
  background-color: #e74c3c; /* Change color when liked */
}

/* Comment Section */
.comment-section {
  margin-top: 10px;
}

.comment-section ul {
  list-style-type: none;
  padding: 0;
}

.comment-section input {
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
</style>
