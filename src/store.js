import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state: {
    queue: [],
    visible: false, // 是否已经有弹窗展示
    order: ['sigin', 'tasksuccess'], // 权重
  },
  mutations: {
    /**
     * 新增要弹出的弹窗
     * @param {Object} info 组件的实例、类型等信息
     */
    add(state, info) {
      const queue = state.queue;
      queue.push(info)
    },

    pop(state) {
      const { queue } = state;
      if (queue.length > 0) {
        const { instance } = queue.pop();
        instance.show();
        state.visible = true;
      } else {
        state.visible = false;
      }
    }
  },
  actions: {
    // 往队列添加弹窗，并弹出队列的第一个弹窗
    addModal(ctx, instance) {
      ctx.commit('add', instance);
      if (!ctx.state.visible) {
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