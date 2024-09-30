<template>
    <div>
      <span class="choose-btn" @click="selectFile"><span class="material-symbols-outlined">
  add_photo_alternate
  </span></span>
      <input 
        name="file" 
        type="file" 
        ref="fileInput" 
        @change="onFileSelect" 
        style="display: none;" 
      />
  
      <div v-if="selectedImages.length > 0" class="image-container">
        <div v-for="(selectedImage, index) in selectedImages" :key="index" class="image-box">
          <img :src="selectedImage.url" class="preview-img" />
          <span class="remove-btn" @click="removeImage(index)">×</span>
        </div>
      </div>
      <div v-if="selectedImages.length === 0 && current" class="image-container">
        <div class="image-box">
          <img :src="current" class="preview-img" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    props: ['current'],
    setup(props, context) {
      const selectedImages = ref([]);
      const fileInput = ref(null);
  
      const selectFile = () => {
        fileInput.value.click();
      };
  
      const onFileSelect = (event) => {
        const files = event.target.files;
        if (files.length === 0) return;
        
        const file = files[0]; // Only take the first file
        if (file.type.split("/")[0] !== "image") return;
  
        selectedImages.value = [{ name: file.name, url: URL.createObjectURL(file),realFile: file }]; // Replace previous image
        context.emit('selectedImages', selectedImages.value); // Emit the updated array
      };
  
      const removeImage = (index) => {
        selectedImages.value.splice(index, 1);
        context.emit('selectedImages', selectedImages.value); // Emit updated empty array if image is removed
      };
  
      return {
        selectFile,
        onFileSelect,
        removeImage,
        selectedImages,
        fileInput,
      };
    },
  };
  </script>
  
  <style scoped>
    .choose-btn {
      background-color: #4CAF50;
      color: white;
      padding: 15px 20px 5px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s;
    }
  
    .choose-btn:hover {
      background-color: #45a049;
    }
  
    .image-container {
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
    }
  
    .image-box {
      width: 120px;
      height: 120px;
      margin: 10px;
      position: relative;
      border: 2px solid #ddd;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }
  
    .preview-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  
    .remove-btn {
      position: absolute;
      top: 5px;
      right: 5px;
      background-color: rgba(255, 0, 0, 0.7);
      color: white;
      border: none;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      text-align: center;
      font-size: 16px;
      cursor: pointer;
      line-height: 20px;
      transition: background-color 0.3s;
    }
  
    .remove-btn:hover {
      background-color: rgba(255, 0, 0, 1);
    }
  
    .material-symbols-outlined {
    font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24,
  }
  
    
  </style>