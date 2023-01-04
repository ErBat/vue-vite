<script setup lang="ts">
import {ref, onMounted, onUpdated, computed} from 'vue'
import { RouterLink } from "vue-router";
import { usePostsStore } from "../stores/posts";
const store = usePostsStore();

const currentPage = ref(1)

const posts = computed(() => {
  return store.getPosts;
});

const isCurrent = (n:number) => {
  return n === currentPage.value
}

const page = computed(() => {
  return store.getPage(currentPage.value) || {};
});

const changePage = (n: number) =>{
  currentPage.value = n
}

const getPhotoById = store.getPhoto;

onMounted(() => {
  store.fetchAllPosts();
});

onUpdated(() => {
  if(!posts.value){
    store.fetchAllPosts();
  }
});
</script>

<template>
  <div class="blog">
    <h1>Анонсы</h1>
    <div 
      v-for="post in page" 
      :key="post?.id" 
      class="blog-item"
    >
      <RouterLink :to="`/post/` + post?.id">
        <div class="flex-row">
          <div class="thumbnail">
            <img :src="getPhotoById(post?.id)?.thumbnailUrl"/>
          </div>
          
          <div class="content">
            <h3 class="title">{{ post?.title }}</h3>
            <p class="description">{{ post?.body }}</p>
          </div>
        </div>
      </RouterLink>
    </div>
    <div class="pagination">
      <template v-for="n in Math.ceil(posts.length / 10)">
        <button :class="{active: isCurrent(n), btn: true}" :disabled="isCurrent(n)" @click="changePage(n)">{{ n }}</button>
      </template>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 30px;
}

h3 {
  font-size: 1.2rem;
}

.blog{
  display: flex;
  flex-direction: column;
  padding: 100px 0; 
}

.flex-row{
  display: flex;
  flex-direction: row;
}

.blog-item{
  position: relative;
  margin-bottom: 30px;
}

.blog-item .title{
  font-weight: 700;
  size: 16px;
}
.blog-item .content{
  color: #000;
  font-weight: 500;
  size: 14px;
}
.blog-item .thumbnail {
  margin-right: 20px;
}
.blog-item .thumbnail img{
  border-radius: 24px;
  max-width: 150px;
}
.btn{
  cursor: pointer;
}

.pagination{
  display: flex;
  flex-direction: row;
}

.pagination button{
  background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
  font-weight: 500;
  font-size: 16px;
  padding: 5px 15px;
  margin-right: 5px;
}

.pagination button.active{
  background: #D5FFFA;
  cursor: not-allowed;
}
</style>
