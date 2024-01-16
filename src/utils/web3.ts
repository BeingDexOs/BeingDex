import Web3 from 'web3/dist/web3.min.js';
import BigNumber from "bignumber.js";
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css'
import pinia from '@/store/store';
import { userStore } from '@/store/user';

const user_store = userStore(pinia)

const initMonitor = async () => {
  // 监听账号切换
  window.ethereum.on('accountsChanged', () => {
    ElMessage.success('Account switched');
    setTimeout(() => {
      location.reload();
    }, 100)
  });
  // 监听网络切换
  window.ethereum.on('chainChanged', () => {
    ElMessage.success('Network switched');
    setTimeout(() => {
      location.reload();
    }, 100)
  });
  // 切换网络、创建网络
  // try {
  //   await window.ethereum.request({
  //     method: 'wallet_switchEthereumChain',
  //     params: [{
  //       chainId: web3.utils.numberToHex(118898) // 目标链ID
  //     }]
  //   })
  // } catch (e: any) {
  //   if (e.code === 4902) {
  //     try {
  //       await window.ethereum.request({
  //         method: 'wallet_addEthereumChain',
  //         params: [
  //           {
  //             chainId: web3.utils.numberToHex(118898), // 目标链ID
  //             chainName: 'TMT Chain',
  //             nativeCurrency: {
  //               name: 'TMT',
  //               symbol: 'TMT',
  //               decimals: 18
  //             },
  //             rpcUrls: ['https://init.txgsz.com'], // 节点
  //             blockExplorerUrls: ['https://tmtscan.txgsz.com']
  //           }
  //         ]
  //       })
  //     } catch (ee) {
  //       //
  //     }
  //   } else if (e.code === 4001) return
  // }
}

let web3: any;
const InitWeb3 = () => {
  if (typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum)
    initMonitor()
  } else {
    let timerInit = setInterval(() => {
      if (typeof window.ethereum !== 'undefined') {
        clearInterval(timerInit)
        web3 = new Web3(window.ethereum)
        initMonitor()
      }
    }, 200);
  }
}
InitWeb3()

// const web3 = new Web3(window.ethereum)
export enum Unit {
  bit6 = 'mwei',
  bit9 = 'gwei',
  bit18 = 'ether'
}
export const web3ToWei = (str: string, unit: Unit = Unit.bit18) => {
  return web3.utils.toWei(str, unit)
}
export const web3FromWei = (str: string, unit: Unit = Unit.bit18) => {
  return web3.utils.fromWei(str, unit)
}

//获取当前钱包地址
export const getAccount = () => {
  return new Promise(async (resolve, reject) => {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      resolve(accounts[0])
    } else {
      let timer = setInterval(async () => {
        if (typeof window.ethereum !== 'undefined') {
          clearInterval(timer)
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          resolve(accounts[0])
        }
      }, 200);
    }
  })
}

//初始循环获取chainId
export function getchain() {
  return new Promise((resolve, reject) => {
    let ch = window.ethereum?.chainId
    if (ch) {
      resolve(ch)
    } else {
      let timer = setInterval(() => {
        if (window.ethereum?.chainId) {
          clearInterval(timer)
          resolve(window.ethereum.chainId)
        }
      }, 200);
    }
  })
}

//验签登录
export const sign = async (address: string) => {
  const signStr = await window.ethereum.request({ method: 'personal_sign', params: ["BeingDex", address] })
  const signAddress = await web3.eth.accounts.recover("BeingDex", signStr)
  return new Promise((resolve, reject) => {
    if (address.toLowerCase() == signAddress.toLowerCase()) {
      resolve(true)
    } else {
      ElMessage.error('验签失败，请重试!')
    }
  })
}

//获取合约方法
interface ContractArg {
  abi: any,
  contract_address: any
}
export const getContract = (arg: ContractArg) => {
  const user_address = localStorage.getItem('beingdex:account')
  const nft_contract = new web3.eth.Contract(arg.abi, arg.contract_address, {
    from: user_address
  });
  return nft_contract['methods']
}

//授权合约
interface ArgAllowContract {
  abi_from: any,
  contract_from: string,
  contract_to: any
}
export const allowContract = async (arg: ArgAllowContract) => {
  const user_address = localStorage.getItem('beingdex:account')
  const contract_proto = new web3.eth.Contract(arg.abi_from, arg.contract_from, {
    from: user_address
  });
  const isAllowance = await contract_proto.methods.isApprovedForAll(user_address, arg.contract_to).call();
  if (isAllowance) {
    return true
  } else {
    await contract_proto.methods.setApprovalForAll(arg.contract_to, true).send();
    return true
  }
}

//授权金额
interface ArgAllowQuota extends ArgAllowContract {
  quota: string,
  noNeedToWei?: boolean
}
export const allowQuota = async (arg: ArgAllowQuota) => {
  const user_address = localStorage.getItem('beingdex:account')
  let f_max_num = new BigNumber(2).pow(256).minus(1);
  const max_num = f_max_num.toString(16)
  const contract_proto = new web3.eth.Contract(arg.abi_from, arg.contract_from, {
    from: user_address
  });
  const isAllowance = await contract_proto.methods.allowance(user_address, arg.contract_to).call();
  if (new BigNumber(isAllowance).gte(arg.noNeedToWei ? arg.quota : web3ToWei(arg.quota))) {
    return true
  } else {
    await contract_proto.methods.approve(arg.contract_to, '0x' + max_num).send()
    const isAllowance = await contract_proto.methods.allowance(user_address, arg.contract_to).call();
    if (new BigNumber(isAllowance).gte(arg.noNeedToWei ? arg.quota : web3ToWei(arg.quota))) {
      return true
    } else {
      ElMessage.error('授权金额不足，请重试!')
    }
  }
}

// bigNumber 计算方法
export enum BcType {
  plus = 'plus', //加
  minus = 'minus', //减
  times = 'times', //乘
  div = 'div' //除
}
export const bigNumberComputed = (one: number | string, two: number | string, method: BcType) => {
  const firstNum = new BigNumber(one)
  const second = new BigNumber(two)
  if (method == BcType.plus) {
    return firstNum.plus(second).toFixed()
  } else if (method == BcType.minus) {
    return firstNum.minus(second).toFixed()
  } else if (method == BcType.times) {
    return firstNum.times(second).toFixed()
  } else if (method == BcType.div) {
    return firstNum.div(second).toFixed()
  } else {
    return '0'
  }
}
export const bigToSmall = (from: number | string) => {
  const froms = new BigNumber(from)
  const x = new BigNumber(10).pow(-18)
  return froms.times(x).toFixed()
}
export const smallToBig = (from: number | string, wei: number = 18) => {
  const froms = new BigNumber(from)
  const x = new BigNumber(10).pow(wei)
  return froms.times(x).toFixed()  //toFixed() 转为字符串 可以防止位数过大被转为科学计数法 且可以传入参数保留多少位小数 不传入则保留原位数
}
//是否大于
export const bigGt = (one: number | string, two: number | string) => {
  const x = new BigNumber(one)
  const y = new BigNumber(two)
  return x.gt(y)
}
//是否大于等于
export const bigGte = (one: number | string, two: number | string) => {
  const x = new BigNumber(one)
  const y = new BigNumber(two)
  return x.gte(y)
}
//是否小于
export const bigLt = (one: number | string, two: number | string) => {
  const x = new BigNumber(one)
  const y = new BigNumber(two)
  return x.lt(y)
}
//是否小于等于
export const bigLte = (one: number | string, two: number | string) => {
  const x = new BigNumber(one)
  const y = new BigNumber(two)
  return x.lte(y)
}

//截取小数点后位数(web3FromWei)
export const getPointFive = (res: string, num: number = 5) => {
  let a = web3FromWei(res)
  let b = a.indexOf('.')
  if (b == -1) {
    return a
  } else {
    return a.slice(0, b + num + 1)
  }
}
//截取小数点后位数(默认2)
export const getPointTwo = (res: string, num: number = 2) => {
  let b = res.indexOf('.')
  if (b == -1) {
    return res
  } else {
    return res.slice(0, b + num + 1)
  }
}

//处理小数点后0过多问题 eg: 0.00000253 => 0.{5}253
export const formatZeroToNumber = (value: string | number) => {
  let a = value.toString()
  let b = a.indexOf('.')
  let c = 0;
  if (b !== -1) {
    for (let i = 0; i < a.length; i++) {
      if (i > b) {
        if (a[i] != '0') {
          c = i;
          break;
        }
      }
    }
    let d = c - b - 1
    if (d == 0) {
      return a;
    } else {
      return `0.{${c - b - 1}}${a.slice(c, a.length)}`
    }
  } else {
    return a;
  }
}

//处理位数过大转为kmb
export const formatBigNumberToletter = (value: string | number) => {
  const deck = '1000'
  const decm = '1000000'
  const decb = '1000000000'

  let a = value.toString();
  let res;
  if (bigGte(a, deck) && bigLt(a, decm)) {
    let b = bigNumberComputed(a, deck, BcType.div)
    res = getPointTwo(b);
    return `${res}K`
  } else if (bigGte(a, decm) && bigLt(a, decb)) {
    let b = bigNumberComputed(a, decm, BcType.div)
    res = getPointTwo(b);
    return `${res}M`
  } else if (bigGte(a, decb)) {
    let b = bigNumberComputed(a, decb, BcType.div)
    res = getPointTwo(b);
    return `${res}B`
  } else {
    return a
  }
}

//去掉末尾多余0
export const removeEndZero = (value: string) => {
  // for (let i = value.length - 1; i >= 0; i--) {
  //   const element = value[i];
  //   const res = element.indexOf('0')
  //   if (res !== 0) {
  //     return value.slice(0, i + 1)
  //   }
  // }
  // return value.toString().replace(/(\.\d*?[1-9])0+($|\.0+$)|\.0+$/, '$1$2')
  let res1 = value.toString().replace(/(\.\d*?[1-9])0+($|\.0+$)|\.0+$/, '$1$2');
  return formatZeroToNumber(res1)
}