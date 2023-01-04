import { defineStore } from 'pinia'
import type Post from '../types/post'
import type Photo from '../types/photo'

const POSTS_API_URL = 'https://jsonplaceholder.typicode.com/posts'
const POST_PHOTO_API_URL = 'https://jsonplaceholder.typicode.com/photos?id='

export const usePostsStore = defineStore('posts', {
  state: (): State => {
    return {
      postList: [],
      photoList: [],
      currentPost: null,
    }
  },
  getters: {
    getPosts(state){
      return state.postList
    },
    getPost(state){
      return (postId: string | number) => state.postList.find((post) => post.id == postId)
    },
    getPage(state){
      return (pageNumber: number) => {
        const maxLength = state.postList.length;
        const page:Post[] = [];
        let endIndex = pageNumber * 10 - 1;
        let startIndex = endIndex - 9;

        if(pageNumber < 1 || startIndex >= maxLength){
          startIndex = 0
          endIndex = 9
        }
        if(endIndex > maxLength) endIndex = maxLength;

        if(state.postList.length > 0){
          for(let i = startIndex; i <= endIndex; i++){
            page.push(state.postList[i]);
          }
        }

        return page;
      }
    },
    getPhotos(state){
      return state.photoList
    },
    getPhoto(state){
      return (postId: string | number) => state.photoList.find((photo) => photo.id == postId)
    }
  },
  actions: {
    async fetchAllPosts() {
      try {
        const posts = await (await fetch(POSTS_API_URL)).json()
        posts.forEach((p: Post) => {
          this.fetchPhoto(p.id)
        });
        this.postList = posts
        }
      catch (error) {
        console.log(error)
      }
    },
    async fetchPost(id: string | number) {
      try {
        const post = await (await fetch(POSTS_API_URL + '/' + id)).json()
        this.fetchPhoto(post.id)
        this.postList.push(post)
        }
      catch (error) {
        console.log(error)
      }
    },
    async fetchPhoto(id: string | number){
      try{
        const photo = await (await fetch(POST_PHOTO_API_URL + id)).json()
        this.photoList.push(photo[0]);
      }
      catch (error) {
        console.log(error)
      }
    }
  },
})

interface State {
  postList: Post[]
  photoList: Photo[]
  currentPost: Post | null
}
