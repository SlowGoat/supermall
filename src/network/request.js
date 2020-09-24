import axios from 'axios'

export function request(config) {
  //1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000
  })

  //2.axios的拦截器

  //2.1请求成功和请求失败
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    // console.log(err);
  })

  //2.2响应成功和响应失败
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  //3.发送真正的网络请求, instance本质上就是promise的对象， 所以直接返回在调用端处理结果就行
  return instance(config)
}