<template>
  <Mask v-model:visible="visible">
    <div class="container">
      我是弹窗3
    </div>
  </Mask>
</template>

<script setup>
import Mask from './mask.vue'
import { useModalVisible } from '../common/modalvisible'
const { visible, show } = useModalVisible()
defineExpose({
  show
})
</script>

<style lang="scss" scoped>
.container {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>