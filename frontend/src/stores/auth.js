import { defineStore } from 'pinia'
import { useApi, useApiPrivate } from '../composables/useApi'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: {},
      accessToken: '',
      authReady: false
    }
  },

  getters: {
    userDetail: (state) => state.user,
    isAuthenticated: (state) => !!state.accessToken
  },

  actions: {
    async attempt() {
      try {
        await this.refresh()
        await this.getUser()
      } catch (error) {
        return
      }
    },

    async login(payload) {
      try {
        const { data } = await useApi().post(`/api/users/login`, payload)
        this.accessToken = data.accessToken
        localStorage.setItem('token', data.accessToken)
        console.log(this.accessToken)
        await this.getUser()
        return data
      } catch (error) {
        throw error.message
      }
    },

    async register(payload) {
      try {
        const { data } = await useApi().post(`/api/users/register`, payload)
        console.log(data)
        return data
      } catch (error) {
        throw error.message
      }
    },

    async getUser() {
      try {
        const { data } = await useApiPrivate().get(`/api/users/current`)
        this.user = data
        return data
      } catch (error) {
        throw error.message
      }
    },

    async getUserById(id) {
      try {
        const { data } = await useApi().get(`/api/users/${id}`)
        console.log('fetch from api')
        console.log(data)
        return data
      } catch (error) {
        throw error.message
      }
    }
  }
})
