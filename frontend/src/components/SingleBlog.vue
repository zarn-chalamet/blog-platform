<template>
  <div class="blog">
    <h4> {{ blog.title }} </h4>
    <p> {{ blog.body }} </p>
  </div>
</template>

<script>
export default {
  props:['blog'],
}
</script>

<style>
    .blog{
        height: 200px;
        max-width: 80%;
        background-color: aqua;
    }
</style>