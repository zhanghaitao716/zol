$(function(){
	//点击切换用户商家登录
	$(".main_r_t").find("h3").click(function(){
		console.log($(this).index())
		$(".login_select").find("li").eq($(this).index()).css("display","block")
		.siblings("li").css("display","none");
		$(this).addClass("curLogin")
		.siblings('h3').removeClass("curLogin")
	})

	//表单点击边框变化
	$("input").on("click",function(){
		//console.log($(this))
		$(this).css("borderColor","#cc0000");
	})
	$("input").on("blur",function(){
		//console.log($(this))
		$(this).css("borderColor","#ccc");
	})



	//链接走秀接口
	$("#login_btn").click(function(event){
		var name = $("#name").val();
		var password = $("#password").val();
		//console.log($(".login_select li i"))
		// $(this).attr("disabled","disabled")
		var judge = false;
		$.ajax({
				async:false,
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				type:"POST",     
				data:{
					status:"login",
					userID:name,
					password:password
				}
		})
		.then(function(res){
			console.log(res)
			switch(res){
				case "0" : 
					$(".login_select li i").css("opacity","1").html("用户不存在,请注册")
					judge = false;
					//return false;
					break;
				case "2": 
					$(".login_select li i").css("opacity","1").html("登录失败，用户名或密码错误");
					judge = false;
					break;
				default:
					$(".login_select li i").css("opacity","0")
					judge = true;
					console.log(12);
			}

		},function(a,b,c){
			console.log(b)
		})
		console.log(judge)
		if(!judge){
			return false;
		}
	})
})