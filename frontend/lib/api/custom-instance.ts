'use client'

import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

// Create custom axios instance
console.log(process.env.NEXT_PUBLIC_API_URL)
export const customInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  withCredentials: true, // Important for cookie authentication
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor to handle any request-specific logic
customInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // You can modify the request config here (add headers, etc.)
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Add a response interceptor to handle common response scenarios
customInstance.interceptors.response.use(
  response => {
    // Any status code within the range of 2xx will trigger this function
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

    // Handle 401 Unauthorized errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Try to refresh the token
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/auth/refresh`,
          {},
          {
            withCredentials: true, // Important for cookie authentication
          }
        )

        // Retry the original request
        return customInstance(originalRequest)
      } catch (refreshError) {
        // Don't automatically redirect to login page to avoid infinite loops
        // Only redirect for certain endpoints that truly require authentication
        if (originalRequest.url && !originalRequest.url.includes('/api/auth/me') && 
            !originalRequest.url.includes('/api/auth/refresh')) {
          console.error('Authentication failed and refresh token invalid')
          window.location.href = '/login'
        }
        return Promise.reject(refreshError)
      }
    }

    // For other errors, just reject the promise
    return Promise.reject(error)
  }
)

// Create a wrapper function for Orval to use
export const customInstanceFn = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = axios.CancelToken.source()
  const promise = customInstance({
    ...config,
    cancelToken: source.token,
  }).then(({ data }) => data)

  // Add a cancel method to the promise
  ;(promise as any).cancel = () => {
    source.cancel('Request was cancelled')
  }

  return promise as any
}
