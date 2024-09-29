<template>
    <div class="blog-form-container">
      <h2>Edit Blog</h2>
      <form class="blog-form" @submit.prevent="updateBlog">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            id="title"
            v-model="title"
            :placeholder="title ? '' : 'Enter blog title'"
          />
        </div>
        <div class="form-group">
          <label for="body">Body</label>
          <textarea
            id="body"
            rows="5"
            v-model="textbody"
            :placeholder="textbody ? '' : 'Write your blog content here'"
          ></textarea>
        </div>
        <button type="submit" class="btn-submit">Update</button>
      </form>
    </div>
  </template>
  
  <script>
  import { useBlogStore } from '@/stores/blog';
  import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
  
  export default {
    props: ['id'],
    setup(props) {
        const router = useRouter();
      const title = ref('');
      const textbody = ref('');
      const blogStore = useBlogStore();
  
      onMounted(async () => {
        const blog = await blogStore.getBlog(props.id);
        if (blog) {
          title.value = blog.title || '';
          textbody.value = blog.body || '';
        }
      });

      const updateBlog = async () => {
        await blogStore.updateBlog(props.id,{
            title: title.value,
            body: textbody.value
        })
        alert("updated successfully")
        router.push("/profile")
      }
  
      return {
        title,
        textbody,
        updateBlog
      };
    },
  };
  </script>
  
  <style>
  
  </style>
  