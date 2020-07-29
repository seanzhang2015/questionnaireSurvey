
const QUESTIONNAIRWE_API = {
	//获取问卷列表
	getQuestionnaireList:{
		method:'GET ',
		url:'/api/satisfaction/questionnaire'
	},
	//对问卷的评分
	postQuestionnaireScore:{
		method:'POST',
		url:'/api/satisfaction/answers'
	},
}
export default QUESTIONNAIRWE_API