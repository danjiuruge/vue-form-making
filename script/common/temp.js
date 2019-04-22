import * as api from '../index'

const ###Prefix = '###'

//获取
const query = params => {
  return api.doGet(`${###Prefix}/index`, params).then(res => res)
}
//修改
const upsert = params => {
  return api.doPost(`${###Prefix}/upsert`, params).then(res => res)
}
// 编辑
const one = params => {
  return api.doPost(`${###Prefix}/one`, params).then(res => res)
}
//删除
const del = params => {
  return api.doPost(`${###Prefix}/del`, params).then(res => res)
}
//发布
const publish = params => {
  return api.doPost(`${###Prefix}/publish`, params).then(res => res)
}

export default {query, upsert, one, del, publish}
