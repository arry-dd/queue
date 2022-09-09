import { ref } from 'vue'

export function useModalVisible() {
  const visible = ref(false)
  // 显示弹窗
  function show() {
    visible.value = true
  }
  return { visible, show }
}
