<template>
  <div class="mask" v-if="visible">
    <div class="content animate__bounceIn">
      <img src="../assets/关闭.png" class="close" alt="" @click="close">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
defineProps(['visible'])
const emit = defineEmits(['update:visible'])
const store = useStore();

function close() {
  // 关闭当前弹窗
  emit('update:visible', false)
  // 弹出下一个弹窗
  store.dispatch('nextModal')
}
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba($color: #000000, $alpha: 0.7);
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    padding: 20px;
    background-color: #fff;
    border-radius: 12px;
    position: relative;

    .close {
      position: absolute;
      right: 0;
      top: -40px;
      width: 30px;
      height: 30px;
    }
  }
}

.animate__bounceIn {
  animation-duration: calc(1s * 0.75);
  animation-name: bounceIn;
}

@keyframes bounceIn {
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}
</style>