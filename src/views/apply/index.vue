<script setup lang="ts">
import { ref, computed } from 'vue';
import headers from '@/components/header/index.vue';
import { type UploadFileInfo, useMessage } from 'naive-ui'
import { $post } from '@/request';
import { userStore } from '@/store/user';
import i18n from '@/locals/i18n'

const { t } = i18n.global
const user_store = userStore()
const message = useMessage()

const projectName = ref('')
const TokenAbbreviation = ref('')
const contractAddress = ref('')
const issueNumber = ref('')
const officialWebsiteLink = ref('')
const mail = ref('')
const tokenInformation = ref('')
const PublicChain = ref(null)
const radioList = ref([
  {
    value: '0',
    lable: 'ETH'
  },
  // {
  //   value: '1',
  //   lable: 'OMP'
  // },
  {
    value: '2',
    lable: 'AVAX'
  },
  {
    value: '3',
    lable: 'TRON'
  }
])

const fileList = ref<Array<UploadFileInfo>>([])
const uploadUrl = computed(() => {
  return `${import.meta.env.VITE_API_BASE_URL}/common/upload`
})
const fileFinishedList = ref<any[]>([])
const handleFinish = ({ file, event }: {
  file: UploadFileInfo,
  event?: ProgressEvent
}) => {
  message.success(t('text.t90'))
  const res = JSON.parse((event?.target as XMLHttpRequest).response)
  console.log(file.batchId, res.data.url)
  fileFinishedList.value.push({ batchId: file.batchId, url: res.data.url })
}
const handleError = ({ file, event }: {
  file: UploadFileInfo,
  event?: ProgressEvent
}) => {
  message.error(t('text.t91'))
}

const uploadList = computed(() => {
  let arr = []
  for (let i = 0; i < fileList.value.length; i++) {
    const element = fileList.value[i];
    let res = fileFinishedList.value.find(e => e.batchId == element['batchId'])
    arr.push(res.url)
  }
  return arr.join(',')
})

const isloading = ref(false)

const submit = () => {
  if (!user_store.islogin) return
  if (!PublicChain.value) {
    message.error(t('text.t92'))
    return
  }
  if (!projectName.value) {
    message.error(t('text.t93'))
    return
  }
  if (!uploadList.value) {
    message.error(t('text.t94'))
    return
  }
  if (!TokenAbbreviation.value) {
    message.error(t('text.t95'))
    return
  }
  if (!contractAddress.value) {
    message.error(t('text.t96'))
    return
  }
  if (!issueNumber.value) {
    message.error(t('text.t97'))
    return
  }
  if (!officialWebsiteLink.value) {
    message.error(t('text.t98'))
    return
  }
  if (!mail.value) {
    message.error(t('text.t99'))
    return
  }
  if (!tokenInformation.value) {
    message.error(t('text.t100'))
    return
  }
  isloading.value = true
  $post('/feedback/coinApplication', {
    flag: PublicChain.value,
    address: user_store.user_address,
    name: projectName.value,
    image: uploadList.value,
    symbol: TokenAbbreviation.value,
    contract: contractAddress.value,
    number: issueNumber.value,
    url: officialWebsiteLink.value,
    email: mail.value,
    content: tokenInformation.value
  }).then(res => {
    message.success(t('text.t101'))
    clearInfo()
  }).finally(() => {
    setTimeout(() => {
      isloading.value = false
    }, 1000);
  })
}

const clearInfo = () => {
  PublicChain.value = null
  projectName.value = ''
  fileList.value = []
  TokenAbbreviation.value = ''
  contractAddress.value = ''
  issueNumber.value = ''
  officialWebsiteLink.value = ''
  mail.value = ''
  tokenInformation.value = ''
}
</script>

<template>
  <headers />
  <div class="apply-style box-px">
    <div class="box1">
      <div class="b1-row1">
        <div class="b1r1-text1">{{ $t('text.t102') }}</div>
        <div class="b1r1-text2">{{ $t('text.t103') }}</div>
      </div>
      <div class="b1-row2"><span>* </span>{{ $t('text.t104') }}</div>
    </div>
    <div class="box2">
      <div class="b2-text1">{{ $t('text.t105') }} <span>*</span></div>
      <div class="b2-inp">
        <n-radio-group v-model:value="PublicChain" name="radiogroup">
          <n-space>
            <n-radio v-for="item in radioList" :key="item.value" :value="item.value">
              {{ item.lable }}
            </n-radio>
          </n-space>
        </n-radio-group>
      </div>
      <div class="b2-text1">{{ $t('text.t106') }} <span>*</span></div>
      <div class="b2-inp">
        <n-input v-model:value="projectName" type="text" :placeholder="$t('text.t93')" />
      </div>
      <div class="b2-text1">Logo <span>*</span></div>
      <div class="b2-inp">
        <n-upload :action="uploadUrl" list-type="image-card" :max="1" v-model:file-list="fileList" @finish="handleFinish"
          @error="handleError" />
      </div>
      <div class="b2-text1">{{ $t('text.t107') }} <span>*</span></div>
      <div class="b2-inp">
        <n-input v-model:value="TokenAbbreviation" type="text" :placeholder="$t('text.t95')" />
      </div>
      <div class="b2-text1">{{ $t('text.t108') }} <span>*</span></div>
      <div class="b2-inp">
        <n-input v-model:value="contractAddress" type="text" :placeholder="$t('text.t96')" />
      </div>
      <div class="b2-text1">{{ $t('text.t109') }} <span>*</span></div>
      <div class="b2-inp">
        <n-input v-model:value="issueNumber" type="number" :placeholder="$t('text.t97')" />
      </div>
      <div class="b2-text1">{{ $t('text.t110') }} <span>*</span></div>
      <div class="b2-inp">
        <n-input v-model:value="officialWebsiteLink" type="text" :placeholder="$t('text.t98')" />
      </div>
      <div class="b2-text1">{{ $t('text.t111') }} <span>*</span></div>
      <div class="b2-inp">
        <n-input v-model:value="mail" type="text" :placeholder="$t('text.t99')" />
      </div>
      <div class="b2-text1">{{ $t('text.t112') }} <span>*</span></div>
      <div class="b2-inp">
        <n-input v-model:value="tokenInformation" maxlength="120" show-count type="textarea"
          :placeholder="$t('text.t113')" />
      </div>
      <div class="b2-btn">
        <van-button block color="#0449E4" :loading="isloading" @click="submit">{{ user_store.islogin ? $t('text.t114') :
          $t('text.t115') }}</van-button>
      </div>
      <!-- <div class="b2-tip be_pointer" @click="clearInfo">{{ $t('text.t116') }}</div> -->
    </div>
  </div>
</template>

<style lang="less">
.apply-style {
  padding-top: 100px;
  padding-bottom: 100px;
  background: @dex-color7;
  .box1 {
    margin-bottom: 50px;
    background: @dex-color6;
    color: @dex-color1;
    border-radius: 10px;
    .b1-row1 {
      padding: 50px 50px 30px;
      border-bottom: 1px solid @dex-color12;
      .b1r1-text1 {
        font-size: 48px;
        font-weight: 500;
        margin-bottom: 20px;
      }
      .b1r1-text2 {
        font-size: 24px;
      }
    }
    .b1-row2 {
      padding: 20px 50px 30px;
      font-size: 24px;
      span {
        color: @dex-color9;
      }
    }
  }
  .box2 {
    padding: 50px;
    background: @dex-color6;
    border-radius: 10px;
    .b2-text1 {
      font-size: 24px;
      color: @dex-color1;
      margin-bottom: 10px;
      span {
        color: @dex-color9;
      }
    }
    .b2-inp {
      margin-bottom: 30px;
    }
    .b2-btn {
      padding-top: 20px;
      padding-bottom: 20px;
      .van-button {
        border-radius: 10px;
      }
    }
    .b2-tip {
      font-size: 16px;
      color: #06061A;
      color: @dex-color1;
      text-align: center;
    }
  }
  @media (max-width: 768px) {
    padding-top: 25Px;
    padding-bottom: 25Px;
    .box1 {
      margin-bottom: 15Px;
      .b1-row1 {
        padding: 15Px;
        .b1r1-text1 {
          font-size: 18Px;
          margin-bottom: 10Px;
          font-weight: 600;
        }
        .b1r1-text2 {
          font-size: 13Px;
        }
      }
      .b1-row2 {
        padding: 15Px;
        font-size: 14Px;
      }
    }
    .box2 {
      padding: 15Px;
      .b2-text1 {
        font-size: 14Px;
        margin-bottom: 5Px;
      }
      .b2-inp {
        margin-bottom: 15Px;
      }
    }
  }
}
</style>