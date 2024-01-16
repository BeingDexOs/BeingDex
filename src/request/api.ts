import {$post} from '@/request/index';

export enum HashType {
  recharge = 0,  //充值
  withdraw = 1,  //提现
}
interface HashArg {
  hash:string,
  orderno:string,
  type:HashType
}
export const addHash = (argument:HashArg)=>{
  return $post('/index/addHash',argument)
}

export const getUser = ()=>{
  return $post('/index/refresh')
}