<template>
  <div v-if="blog">
    <h4>Single Blog {{ id }}</h4>
    <h4>{{ blog.title }}</h4>
    <h5>{{ blog.body }}</h5>
  </div>
</template>

<script>
import { useBlogStore } from '@/stores/blog';
import { onMounted, ref } from 'vue';

export default {
  props: ['id'],
  setup(props){
    let blog = ref(null);
    const blogStore = useBlogStore();
    onMounted( async () => {
      blog.value = await blogStore.getBlog(props.id);
      console.log(blog.value)
    })
    return { blog };
  }
}
</script>

<style>

</style>