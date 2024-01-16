import { createApp } from 'vue'
import './assets/styles/base.less'
import App from './App.vue'
import { flexible } from '@/utils/flexible';
flexible(window, document)

import pinia from '@/store/store';
import router from '@/router/index'
import i18n from './locals/i18n'
// import AOS from 'aos'
// import 'aos/dist/aos.css'
// AOS.init({
//   duration: 1000, //动画持续多长时间
//   offset: 0, //距离底部多少距离执行
//   delay: 200,
//   // once: true //是否只执行一次 默认会重复执行
// });

createApp(App).use(pinia).use(router).use(i18n).mount('#app')
