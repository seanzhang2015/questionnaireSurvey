
// request.js
// import axios from 'axios'
import service from './api.js'
// import {Toast} from 'vant'

//service 循环遍历输出不同的请求方法
let instance = axios.create({
	baseURL:'https://xymind.net:3000',
	timeout:1000
})

//包裹请求方法的容器
const Http = {};

for(let key in service){
	let api = service[key];//url method
    Http[key] = async function(
	       params,//请求参数
	       isFormData = false,//标识是否为form-data请求
	       config = {}//参数配置
	){
	  let url = api.url
	  let newParams = {}
	  //content-type 是否为form-data
	  if (params && isFormData) {
		  newParams = new FormData()
		  for(let i in params){
			  newParams.append(key.params[key])
		 }
	  } else{
		  newParams = params
	  }
	  // 不同请求判断
	  let respond = {};//请求返回值
	  if( api.method === 'PUT' || api.method === 'POST' ||api.method === 'PATCH'){
		  try{
			 await instance[api.method](api.url,newParams,config)   
		  }catch(err){
			  respond = err 
		  }  
	  } else if ( api.method === 'DELETE' || api.method === 'DELETE'){
		  config.params = newParams
		  try{		
		  	await instance[api.method](api.url,config)  		  
		  }catch(err){
		  	 respond = err		  
		  }   
	  }
	}
	
	return  respond;//返回返回值
}
//拦截器

instance.interceptors.request(config=>){
	// 发起请求前做写什么
	Toast.loading({
		mask:false,
		duratinon:1,
		forbidClick:true,
		massage:'加载中...'
	})
	return config;
},err=>{
	// 请求错误
	Toast.clear()
	Toast('error')
}

//响应拦截器
instance.interceptors.response.use(res=>{
	Toast.clear()
	return res.data
	
}),()=>{
	Toast.clear()
	Toast('error')
}

export default Http
