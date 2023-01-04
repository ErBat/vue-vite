<script setup lang="ts">
import {ref, onMounted, onUpdated, computed} from 'vue'
import { usePostsStore } from "../stores/posts";
import { useRoute, useRouter, RouterLink } from 'vue-router'
import type { Ref } from 'vue'
const store = usePostsStore();
const route = useRoute()
const router = useRouter()
let postId: Ref<number> = ref(parseInt(route.params.id.toString()))
const getPostById = store.getPost;
const getPhotoById = store.getPhoto;

const postInfo = computed(() => {
  return getPostById(postId.value);
});

const nextPost = () => {
  router.push('/post/' + ++postId.value)
}

const prevPost = () => {
  router.push('/post/' + --postId.value)
}

onMounted(() => {
  if(!postInfo.value){
    store.fetchPost(postId.value)
  }
});

onUpdated(() => {
  if(!postInfo.value){
    store.fetchPost(postId.value)
  }
});

</script>

<template>
  <div class="blogpost">
    <div class="breadcrumps">
      <RouterLink :to="`/`">Блог</RouterLink>
      /
      <span class="current-link">{{ postInfo?.title }}</span>
    </div>
    <h1 class="title">{{ postInfo?.title }}</h1>
    <div class="featured-image">
      <img :src="getPhotoById(postId)?.url"/>
    </div>
    <p class="content">{{ postInfo?.body }}</p>
    <button class="navigation-button nav-prev" @click="prevPost()" v-if="postId - 1 > 0">Предыдущий пост</button>
    <button class="navigation-button nav-next" @click="nextPost()" v-if="postId + 1 < 100">Следующий пост</button>
  </div>
</template>

<style scoped>
.breadcrumps{
  position: absolute;
  left: 0;
  top: 50px;
}
.breadcrumps a{
  color: var(--color-text);
}
.breadcrumps .current-link{
  color: var(--color-text);
  font-weight: 500;
}
.blogpost{
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 100px 0;
}
.blogpost .title{
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 20px;
  color: var(--color-heading);
}
.blogpost .content{
  color: var(--color-text);
}
.blogpost .featured-image img{
  border-radius: 24px;
  margin-bottom: 20px;
}

.navigation-button{
  background: none;
	color: var(--color-link);
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
  position: absolute;
  bottom: 50px;
}

.navigation-button.nav-next{
  right: 0;
}

.navigation-button.nav-prev{
  left: 0;
}
</style>
