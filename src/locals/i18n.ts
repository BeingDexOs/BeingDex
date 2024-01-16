import { createI18n } from 'vue-i18n'
import messages from './index'
let lang = localStorage.getItem('beingdex:lang') || 'en'
localStorage.setItem('beingdex:lang', lang)

const i18n = createI18n({
  // silentTranslationWarn: true,  //
  // globalInjection: true,        //是否开启全局
  legacy: false, // you must specify 'legacy: false' option 组合式api使用必须false
  locale: lang,
  messages,
});

export default i18n


/*

阿拉伯语 ar
英语 en
日本语 ja
越南语 vi
俄语 ru
西班牙语 es
土耳其语 tr
意大利语 it
法语 fr
德语 ku
简体中文 zh
繁体中文 zh_tw
印度尼西亚语 id
泰语 th
乌克兰语 uk
瑞典语 sv
葡萄牙语 pt
乌兹别克语 uz
韩语 ko

*/