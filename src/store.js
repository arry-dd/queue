import { createStore } from 'vuex'

const store = createStore({
  state: {
    queue: [], // 弹窗队列
    visible: false, // 是否已经有弹窗展示
    order: ['modal2', 'modal3' ,'modal1'], // 权重
  },
  mutations: {
    /**
     * 新增要弹出的弹窗
     * @param {Object} info 组件的实例、类型等信息
     * @param {Object} info.instance 组件的实例
     * @param {String} info.type 组件的权重名，对应order
     * @param {Boolean} info.show 是否立即展示
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

    // 弹出第一个弹窗
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
    /**
     * 往队列添加弹窗，并弹出队列的第一个弹窗
     * @param {Object} info 组件的实例、类型等信息
     * @param {Object} info.instance 组件的实例
     * @param {String} info.type 组件的权重名，对应order
     * @param {Boolean} info.show 是否立即展示
     */
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