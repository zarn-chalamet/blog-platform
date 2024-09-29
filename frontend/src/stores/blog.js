// stores/blog.js
import { defineStore } from 'pinia'
import { useApiPrivate } from '../composables/useApi'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    blogs: [],
    blog: {}
  }),

  actions: {
    // Fetch all blogs
    async getBlogs() {
      try {
        const { data } = await useApiPrivate().get('/api/blogs')
        this.blogs = data // Store blog list in state
        return data
      } catch (error) {
        console.error('Error fetching blogs:', error.message)
        throw error
      }
    },

    // Fetch a single blog by ID
    async getBlog(id) {
      try {
        const { data } = await useApiPrivate().get(`/api/blogs/${id}`)
        this.blog = data // Store blog data in state
        return data
      } catch (error) {
        console.error('Error fetching blog:', error.message)
        throw error
      }
    },

    // Create a new blog
    async createBlog(payload) {
      try {
        const { data } = await useApiPrivate().post('/api/blogs', payload)
        this.blogs.push(data) // Add the new blog to the blogs array
        return data
      } catch (error) {
        console.error('Error creating blog:', error.message)
        throw error
      }
    },

    // Update an existing blog
    async updateBlog(id, payload) {
      try {
        const { data } = await useApiPrivate().put(`/api/blogs/${id}`, payload)
        // Find the blog in the array and update it
        const index = this.blogs.findIndex((blog) => blog._id === id)
        if (index !== -1) this.blogs.splice(index, 1, data)
        return data
      } catch (error) {
        console.error('Error updating blog:', error.message)
        throw error
      }
    },

    // Delete a blog
    async deleteBlog(id) {
      try {
        await useApiPrivate().delete(`/api/blogs/${id}`)
        this.blogs = this.blogs.filter((blog) => blog._id !== id) // Remove from blogs array
      } catch (error) {
        console.error('Error deleting blog:', error.message)
        throw error
      }
    }
  }
})
