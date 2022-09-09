import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state: {
    queue: [],
    visible: false, // 是否已经有弹窗展示
    order: ['modal2', 'modal3' ,'modal1'], // 权重
  },
  mutations: {
    /**
     * 新增要弹出的弹窗
     * @param {Object} info 组件的实例、类型等信息
     */
    add(state, info) {
      const { queue, order } = state;
      const orderIndex = order.findIndex(ceil => ceil === info.type);
      // 找到合适的位置插入
      for (let i = 0; i < queue.length; i++) {
        const curModal = queue[i];
        const curOrderIndex = order.findIndex(ceil => ceil === curModal.type);
        if (curOrderIndex > orderIndex) {
          queue.splice(i - 1, 0, info);
          return;
        } else if (curModal.type === info.type) {
          queue.splice(i, 0, info);
          return;
        }
      }
      queue.push(info);
    },

    pop(state) {
      const queue = state.queue;
      if (queue.length > 0) {
        const { instance } = queue.shift();
        instance.show();
        state.visible = true;
      } else {
        state.visible = false;
      }
    }
  },
  actions: {
    // 往队列添加弹窗，并弹出队列的第一个弹窗
    addModal(ctx, info = {}) {
      ctx.commit('add', info);
      if (!ctx.state.visible && info.show) {
        ctx.commit('pop');
      }
    },
    // 下一个弹窗
    nextModal(ctx) {
      ctx.commit('pop');
    }
  }
})

export default store