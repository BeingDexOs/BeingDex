<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { type MenuOption } from 'naive-ui'
import { useI18n } from 'vue-i18n';
import { getAccount, sign } from '@/utils/web3';
import { userStore } from '@/store/user';
import { useMessage } from 'naive-ui'
import { $post } from '@/request';
import i18n from '@/locals/i18n'

const { t } = i18n.global
const user_store = userStore()
const message = useMessage()
const { locale } = useI18n()
const router = useRouter()

const goPage = (to: string) => {
  router.push(to)
}

type ActiveType = 'swap' | 'nft' | 'dapp' | 'help' | 'blog'
const props = defineProps<{
  active?: ActiveType
}>()

const options = computed(() => {
  return [
    {
      label: 'IOS',
      key: "1"
    },
    {
      label: 'Android',
      key: "2"
    },
    {
      label: 'Chrome',
      key: "3"
    },
    {
      label: t('text.t49'),
      key: "4"
    }
  ]
})
const handleSelect = (key: string | number) => {
  console.log(key);
  if (key == '4') {
    goPage('/pluginwallet')
  } else {
    goPage('/wallet')
  }
}


const menuOptions = computed(() => {
  return [
    {
      label: t('text.t50'),
      key: 'wallet'
    },
    {
      label: t('text.t299'),
      key: 'swap',
    },
    // {
    //   label: 'NFT',
    //   key: 'nft',
    // },
    {
      label: t('text.t300'),
      key: 'dapp',
    },
    {
      label: t('text.t31'),
      key: 'help',
    },
    {
      label: t('text.t301'),
      key: 'blogList',
    },
    {
      label: t('text.t49'),
      key: 'pluginwallet',
    },
    {
      label: t('text.t51'),
      key: 'language',
      children: [
        {
          label: 'English',
          key: 'en',
        },
        {
          label: '简体中文',
          key: 'zh',
        },
        {
          label: '한국어',
          key: 'ko',
        },
        {
          label: 'العربية',
          key: 'ar',
        },
        {
          label: '日本語',
          key: 'ja',
        },
        {
          label: 'Tiếng Việt',
          key: 'vi',
        },
        {
          label: 'Русский',
          key: 'ru',
        },
        {
          label: 'español',
          key: 'es',
        },
        {
          label: 'Türkçe',
          key: 'tr',
        },
        {
          label: 'Italiano',
          key: 'it',
        },
        {
          label: 'Français',
          key: 'fr',
        },
        {
          label: 'Deutsch',
          key: 'ku',
        },
        {
          label: '繁體中文',
          key: 'zh_tw',
        },
        {
          label: 'bahasa Indonesia',
          key: 'id',
        },
        {
          label: 'ไทย',
          key: 'th',
        },
        {
          label: 'українська',
          key: 'uk',
        },
        {
          label: 'svenska',
          key: 'sv',
        },
        {
          label: 'Português',
          key: 'pt',
        },
        {
          label: "o'zbek",
          key: 'uz',
        },
      ]
    },
  ]
})
const menuChange = (key: string, item: MenuOption) => {
  console.log(key, item);
  menuActive.value = false
  const langItem = menuOptions.value.find(item => item.key === 'language')!.children!.find(ele => ele.key === key)
  if (langItem) {
    changeLang(key)
  } else if (key == 'nft') {
    user_store.windowOpen('https://www.trueshop.top/#/')
  } else {
    goPage(`/${key}`)
  }
}

const changeLang = (lang: string) => {
  locale.value = lang
  localStorage.setItem('beingdex:lang', lang)
  location.reload()
}

const menuActive = ref(false)
const changeDrawerStatus = () => {
  menuActive.value = !menuActive.value
}

const langOption = [
  {
    label: 'English',
    key: 'en',
  },
  {
    label: '简体中文',
    key: 'zh',
  },
  {
    label: '한국어',
    key: 'ko',
  },
  {
    label: 'العربية',
    key: 'ar',
  },
  {
    label: '日本語',
    key: 'ja',
  },
  {
    label: 'Tiếng Việt',
    key: 'vi',
  },
  {
    label: 'Русский',
    key: 'ru',
  },
  {
    label: 'español',
    key: 'es',
  },
  {
    label: 'Türkçe',
    key: 'tr',
  },
  {
    label: 'Italiano',
    key: 'it',
  },
  {
    label: 'Français',
    key: 'fr',
  },
  {
    label: 'Deutsch',
    key: 'ku',
  },
  {
    label: '繁體中文',
    key: 'zh_tw',
  },
  {
    label: 'bahasa Indonesia',
    key: 'id',
  },
  {
    label: 'ไทย',
    key: 'th',
  },
  {
    label: 'українська',
    key: 'uk',
  },
  {
    label: 'svenska',
    key: 'sv',
  },
  {
    label: 'Português',
    key: 'pt',
  },
  {
    label: "o'zbek",
    key: 'uz',
  },
]
const langSelect = (key: string) => {
  changeLang(key)
}

const connectWallet = async () => {
  try {
    const address = await getAccount()
    const addr = address as string
    await sign(addr)
    await $post('/index/loginRegister', {
      address: addr,
      invite: user_store.inviter_address
    })

    localStorage.setItem('beingdex:account', addr)
    user_store.user_address = addr
    user_store.islogin = true
  } catch (error) {

  }
}

const initLoginStatus = async () => {
  const user_account = localStorage.getItem('beingdex:account')
  if (user_account && user_account != 'undefined') {
    const address: any = await getAccount()
    if (address.toLowerCase() == user_account.toLowerCase()) {
      user_store.islogin = true
      user_store.user_address = user_account
    } else {
      loginOut()
    }
  }
}
initLoginStatus()

const loginoutOption = computed(() => {
  return [
    {
      label: t('text.t52'),
      key: 'loginout',
    }
  ]
})
const loginOutSelect = (key: string) => {
  if (key == 'loginout') {
    loginOut()
  }
}

const loginOut = () => {
  localStorage.removeItem('beingdex:account')
  user_store.user_address = ''
  user_store.islogin = false
}
</script>

<template>
  <div class="box-px header-style between-center">
    <img src="@/assets/img/img1.png" @click="router.replace('/')" class="img1 be_pointer" alt="">
    <div class="show1280">
      <div class="box2 start-center">
        <n-dropdown :options="options" @select="handleSelect">
          <div class="item center-center">
            <span>{{ $t('text.t298') }}</span>
            <svg class="arrdown-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              fill="currentColor" version="1.1" width="16" height="16" viewBox="0 0 16 16">
              <defs>
                <clipPath id="master_svg0_17_060089">
                  <rect x="0" y="0" width="16" height="16" rx="0" />
                </clipPath>
              </defs>
              <g clip-path="url(#master_svg0_17_060089)">
                <g>
                  <path
                    d="M8.6684775,11.856781250000001L14.2718375,5.59758125C14.4406375,5.40558125,14.4406375,5.09838125,14.2718375,4.94478125C14.1030375,4.75278125,13.8330375,4.75278125,13.6642375,4.94478125L8.3309275,10.89678125L3.0988595,5.02158125C2.9300835,4.82958145,2.6937965,4.82958145,2.5250195,5.02158125C2.3562434,5.21358125,2.3562434,5.4823812499999995,2.5250195,5.67438125L7.9933775,11.779981249999999C8.027127499999999,11.81838125,8.027127499999999,11.81838125,8.0608875,11.81838125Q8.0608875,11.856781250000001,8.094637500000001,11.856781250000001C8.2296575,12.048781250000001,8.4997075,12.048781250000001,8.6684775,11.856781250000001Z"
                    fill-opacity="1" />
                </g>
              </g>
            </svg>
          </div>
        </n-dropdown>
        <div :class="props.active == 'swap' ? 'acitem' : 'item'" @click="goPage('/swap')">{{ $t('text.t299') }}</div>
        <!-- <div :class="props.active == 'nft' ? 'acitem' : 'item'"
          @click="user_store.windowOpen('https://www.trueshop.top/#/')"> NFT</div> -->
        <div :class="props.active == 'dapp' ? 'acitem' : 'item'" @click="goPage('/dapp')">{{ $t('text.t300') }}</div>
        <div :class="props.active == 'help' ? 'acitem' : 'item'" @click="goPage('/help')">{{ $t('text.t31') }}</div>
        <div :class="props.active == 'blog' ? 'acitem' : 'item'" @click="goPage('/blogList')">{{ $t('text.t301') }}</div>
      </div>
    </div>
    <div class="end-center box1">
      <div class="center-center item be_pointer" @click="connectWallet" v-if="!user_store.islogin">
        <img src="@/assets/img/img2.png" class="img2" alt="">
        <span class="text1">{{ $t('text.t53') }}</span>
      </div>
      <n-dropdown :options="loginoutOption" @select="loginOutSelect" v-else>
        <van-button size="mini" round plain color="#0449E4">{{ user_store.user_address.slice(0, 4) }}...{{
          user_store.user_address.slice(user_store.user_address.length - 3) }}</van-button>
      </n-dropdown>
      <div class="show1280">
        <n-dropdown :options="langOption" @select="langSelect">
          <div class="center-center item be_pointer">
            <img src="@/assets/img/img3.png" class="img2" alt="">
            <span class="text1">{{ $t('text.t295') }}</span>
          </div>
        </n-dropdown>
      </div>
      <img src="@/assets/img/img4.png" class="img3 hide1280 be_pointer" @click="changeDrawerStatus" alt="">
    </div>
  </div>
  <n-drawer v-model:show="menuActive" placement="right">
    <div class="right-open-style">
      <div class="los-box1 between-center">
        <img src="@/assets/img/img39.png" class="los-img1 be_pointer" @click="changeDrawerStatus" alt="">
        <img src="@/assets/img/img1.png" class="los-img2" alt="">
      </div>
      <n-menu :value="props.active" :indent="20" accordion mode="vertical" :options="menuOptions"
        @update:value="menuChange" />
    </div>
  </n-drawer>
</template>

<style lang="less">
.right-open-style {
  .los-box1 {
    padding: 8Px 15Px;
    border-bottom: 1px solid @dex-color13;
    .los-img2 {
      width: 100Px;
    }
    .los-img1 {
      width: 20Px;
    }
  }
}
.header-style {
  padding-top: 30px;
  padding-bottom: 30px;
  gap: 80px;
  z-index: 999;
  background-color: @dex-color6;
  position: sticky;
  top: 0;

  .van-button--mini {
    padding: 0 10Px;
  }

  .img1 {
    width: 200px;
    height: auto;
  }
  .box1 {
    gap: 40px;
    .item {
      gap: 6px;
      color: @dex-color1;
      .img2 {
        width: 24px;
        height: auto;
      }
      .text1 {
        font-size: 16px;
      }
    }
    .img3 {
      width: 30px;
      height: auto;
    }
  }
  .box2 {
    flex: auto;
    gap: 40px;
    .item {
      font-size: 16px;
      color: @dex-color3;
      cursor: pointer;
      &:hover {
        color: @dex-color2;
      }
    }
    .acitem {
      color: @dex-color2;
      font-size: 16px;
      cursor: pointer;
    }
    .arrdown-icon {
      width: 16px;
      margin-left: 2px;
    }

  }
}
// .n-dropdown-menu .n-dropdown-option .n-dropdown-option-body {
//   font-size: 16px;
// }
</style>