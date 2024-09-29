<template>
    <div class="blog">
      <router-link :to="{name:'single-blog',params:{id: blog._id}}">
        <div>
          <h3>{{ blog._id }}</h3>
          <h4> {{ blog.title }} </h4>
          <p> {{ blog.body }} </p>
        </div>
      </router-link>
      <div v-if="owner">
        <router-link :to="{name:'edit-blog',params:{id: blog._id}}">
          <button>edit</button>
        </router-link>
        <button @click="deleteBlog">delete</button>
      </div>
    </div>
</template>

<script>
import { useBlogStore } from '@/stores/blog';
import { useRouter } from 'vue-router';

export default {
  props:['blog','owner'],
  setup(props){
    const router = useRouter();
    const blogStore = useBlogStore();
    const deleteBlog = async () =>{
      
      await blogStore.deleteBlog(props.blog._id);
      alert("deleted successfully!");
      router.push("/profile");
    }
    return {deleteBlog}
  }
}
</script>

<style>
    .blog{
        height: 230px;
        max-width: 80%;
        background-color: aqua;
        margin-bottom: 20px;
    }
</style>