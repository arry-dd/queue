<template>
  <button @click="showModal1">展示弹窗1</button>
  <Modal1 ref="modal1"></Modal1>
  <Modal2 ref="modal2"></Modal2>
</template>

<script setup>
import { useStore } from "vuex";
import { ref } from 'vue'
import Modal1 from './components/modal1.vue';
import Modal2 from './components/modal2.vue';

const store = useStore();
const modal1 = ref(null)
const modal2 = ref(null)

function showModal1() {
  store.dispatch('addModal', { instance: modal1 })
  setTimeout(() => {
    store.dispatch('addModal', { instance: modal2 })
  }, 500);
}
</script>

<style scoped>
</style>
