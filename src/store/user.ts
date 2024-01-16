import { defineStore } from "pinia";
import { CategorysType, ClassificationType, HelpListType } from '@/interface';

export const userStore = defineStore('user', {
  state: () => {
    return {
      islogin: false,
      user_address: '',
      wWidth: 0,
      categorys: <CategorysType[]>[],
      classification: <ClassificationType[]>[],
      config: <any>null,
      helpList: <HelpListType[]>[],
      inviter_address: '',
      bdkInfo: <any>null
    }
  },
  getters: {

  },
  actions: {
    windowOpen(url: string) {
      if (url) {
        window.open(url)
      }
    }
  }
})