<template>
  <button @click="testShow" style="margin-right: 10px;">展示弹窗</button>

  <button @click="testOrder">测试排序</button>
  <Modal1 ref="modal1"></Modal1>
  <Modal2 ref="modal2"></Modal2>
  <Modal3 ref="modal3"></Modal3>
</template>

<script setup>
import { useStore } from "vuex";
import { ref } from 'vue'
import Modal1 from './components/modal1.vue';
import Modal2 from './components/modal2.vue';
import Modal3 from './components/modal3.vue';

const store = useStore();
const modal1 = ref(null)
const modal2 = ref(null)
const modal3 = ref(null)

function testShow() {
  store.dispatch('addModal', {
    instance: modal1,
    type: 'modal1',
    show: true
  })
  setTimeout(() => {
    store.dispatch('addModal', {
      instance: modal2,
      type: 'modal2',
      show: true
    })
  }, 500);
  setTimeout(() => {
    store.dispatch('addModal', {
      instance: modal3,
      type: 'modal3',
      show: true
    })
  }, 1000);
}

function testOrder() {
  store.dispatch('addModal', {
    instance: modal3,
    type: 'modal3',
    show: false
  })

  store.dispatch('addModal', {
    instance: modal2,
    type: 'modal2',
    show: false
  })

  setTimeout(() => {
    store.dispatch('addModal', {
      instance: modal1,
      type: 'modal1',
      show: true
    })
  }, 300);
}
</script>

<style scoped>

</style>
