import request from '@/utils/request'


export function login(data) {
  return request({
      url: '/admin/admin/login',
      method: 'post',
      data
  })
}