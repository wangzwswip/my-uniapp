import ajax from '@/services/request.js'
// 字典查询
export const getDictionary = (_params) => {
  return ajax({
    url: '/aa/ddd/ss/all'
  })
}
// 区域
export const getAllZone = () => {
  return ajax({
    url: '/aa/ss/dd/all'
  })
}
