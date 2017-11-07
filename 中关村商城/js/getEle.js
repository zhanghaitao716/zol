/* define(function(){
	class GetEle{
		constructor(){
		}
		load(ele){
			this.data = ele.data;
			this.url = ele.url;
			var that = this;
			$.ajax({
				url:this.url,
				data:{
					notebook:"notebook"
				},
				type:"GET"
				})
			.then(function(res){
				that.res = JSON.parse(res);
				//console.log(that.res)
				that.init();
			},function(a,b,c){
				console.log(b)
			})
		}
		init(){
			var html="";
			var that = this;
			for(var i = 0;i < that.res.length;i++){
				html += eval(that.data);
			}
			$(".selling_list").append(html);
		}
	}
	return new GetEle();
})*/
	
		
