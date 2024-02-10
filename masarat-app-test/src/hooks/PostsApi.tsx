// src/api.ts
import axios from 'axios';

const BASE_URL = 'http://jsonplaceholder.typicode.com';

const getPosts = async (start: number, end: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts?_start=${start}&_end=${end}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching posts');
  }
};

const getCommentsByPostId = async (postId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/comments?postId=${postId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching comments');
  }
};

const deletePost = async (postId: number) => {
  try {
    await axios.delete(`${BASE_URL}/posts/${postId}`);
  } catch (error) {
    throw new Error('Error deleting post');
  }
};

const getPostById = async (postId: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/posts/${postId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching post with ID ${postId}`);
    }
  };



export { getPosts, getCommentsByPostId, deletePost ,getPostById  };
