<template>
  <div class="blog-form-container">
    <h2>Create Blog</h2>
    <form class="blog-form">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" placeholder="Enter blog title" />
      </div>
      <div class="form-group">
        <label for="body">Body</label>
        <textarea id="body" rows="5" placeholder="Write your blog content here"></textarea>
      </div>
      <button type="submit" class="btn-submit">Create</button>
    </form>
  </div>
</template>

<script>
export default {
  
};
</script>

<style scoped>
.blog-form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.blog-form .form-group {
  margin-bottom: 15px;
}

.blog-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.blog-form input[type="text"],
.blog-form textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.blog-form textarea {
  resize: none;
}

.btn-submit {
  width: 100%;
  padding: 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #218838;
}
</style>
