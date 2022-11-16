import Vue from 'vue'
import App from './App.vue'
import ViewUI from 'view-design';

Vue.config.productionTip = false
Vue.use(ViewUI);
new Vue({
  render: h => h(App),
}).$mount('#app')
