import ajax from '@/services/request.js'

export const getProjectList = (_params) => {
  return ajax({
    url: '/aaa/bbb/list',
	method: 'POST',
    data: _params
  })
}