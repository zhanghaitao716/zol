$(function(){
	//输入框事件
		//设置点击事件，
			//点击时边框变为红色rgb(204, 0, 0)
		//设置失焦事件，
			//边框颜色变为rgb(204, 204, 204)；
			//获取输入框中信息；
				//手机号
				//若为空，请填写手机号码
				//其他为，请填写有效的11位手机号码
				//验证码
				//空，请填写验证码
				//其他为，验证码不正确
				//成功×变为对号
				//密码
				//其他6-16位字符，可使用字母、数字或符号的组合
				//密码不能全是数字
				//确认密码
				//其他：两次填写的密码不一致
	$("input").on("click",function(){
		//console.log($(this))
		$(this).css("borderColor","#cc0000");
	})
	$("input").on("blur",function(){
		//console.log($(this))
		$(this).css("borderColor","#ccc");
	})
	//提交验证
	var aValidate = [false,false,false,false,false,false];
//手机号
	$("#iphone").on("blur",function(){
		var oIphoneValue = $("#iphone").val();
		//var reg = /^1[34578]\d{9}$/;
		var reg = /^1[34578]\d{9}$/;
		//console.log(oIphoneValue)
		if(!reg.test(oIphoneValue)){ //失败状态	
			if(oIphoneValue == ""){  //输入为空状态；
				$(this).siblings(".error").css("display","block")
				.html("请填写手机号码")
			}else{  //请填写有效的11为手机号码
				$(this).siblings(".error").css("display","block")
				.html("请填写有效的11位手机号码")
			}
			aValidate[0] = false;
		}else{ //成功
			$(this).siblings(".error").css("display","none");
			aValidate[0] = true;
		}
	})
//图片验证码
	var verifyCode = new GVerify("v_container");
	$("#pic_verify").blur(function(){
		var res = verifyCode.validate($(this).val())
		//console.log(res)
		if(res){ //成功状态
			$(this).siblings(".error").css({
				backgroundPosition:"-155px -162px",
				display:"block",
				width:"15px",
				height:"15px",
				marginTop:"10px"
			})
			.html("")
			aValidate[1] = true;
		}else{ //失败装填
			if($(this).val() == ""){
				$(this).siblings(".error").css("display","block")
				.html("请填写验证码")
			}else{
				$(this).siblings(".error").css("display","block")
				.html("验证码不正确")
			}
			aValidate[1] = false;
		}
	})
//手机验证
	$("#iph_verify").blur(function(){
		if($(this).val() == ""){ //填入为空
			$(this).siblings(".error").css("display","block")
				.html("请填写手机验证码")
			aValidate[2] = false;
		}else{ //填入成功
			aValidate[2] = true;
			$(this).siblings(".error").css({
				backgroundPosition:"-155px -162px",
				display:"block",
				width:"15px",
				height:"15px",
				marginTop:"10px"
			})
			.html("")
		}
	})
//密码
	$("#pass").blur(function(){
		var oPass = $(this).val();
		var reg = /^\w{6,12}$/i;
		if(reg.test(oPass)){ //填写成功
			var onlyNum = /^\d+$/i;
			if(onlyNum.test(oPass)){
				$(this).siblings(".error").css("display","block")
				.html("密码不能全是数字")
				aValidate[3] =false;
			}else{
				$(this).siblings(".error").css({
					backgroundPosition:"-155px -162px",
					display:"block",
					width:"15px",
					height:"15px",
					marginTop:"10px"
				})
				.html("")
				aValidate[3] = true;
			}	
		}else{
			if(oPass == ""){
				$(this).siblings(".error").css("display","block")
				.html("请填写密码")
			}else{
				$(this).siblings(".error").css("display","block")
				.html("6-16位字符，可使用字母、数字或符号的组合")
			}
			aValidate[3] =false;
		}
	})
//确认密码
	$("#password").blur(function(){
		if($(this).val() == ""){ //填写为空
			$(this).siblings(".error").css("display","block")
				.html("请填写确认密码")
			aValidate[4] =false;
		}else if($(this).val() == $("#pass").val()){ //填写正确
			$(this).siblings(".error").css({
				backgroundPosition:"-155px -162px",
				display:"block",
				width:"15px",
				height:"15px",
				marginTop:"10px"
			})
			.html("")
			aValidate[4] = true;
		}else{
			$(this).siblings(".error").css("display","block")
				.html("两次填写的密码不一致")
			aValidate[4] =false;
		}
	})


	if($("#check").prop("checked")){
		aValidate[5] = true;
	}else{
		aValidate[5] = false;
	}
//提交验证
	$("#sub").click(function(event){
		//console.log(aValidate)
		for(var i = 0;i < aValidate.length;i++){
			if(aValidate[i] == false){  //以上验证失败阻止默认事件；
				/*$(this).attr("disabled","disabled");*/
				event.preventDefault()
			}else{
				//console.log(2)
			}
		}
		var judge = false;
		/*$(this).attr("disabled","disabled");*/

		var sUser = $("#iphone").val();
		var sPass = $("#pass").val();

		$.ajax({
			async:false,
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			data:{
				status:"register",
				userID:sUser,
				password:sPass
			},
			type:"POST"
		})
		.then(function(res){ //成功
			//console.log(res)
			switch(res){
					case "0":
						$("#iphone").siblings(".error").css("display","block").html("该手机号已注册，重新输入");
						judge = false
						break;
					case "1":
						$("#sub").removeAttr("disabled") //注册成功
							//console.log(1)
						judge = true;
						break;
					case "2":
						$("#iphone").siblings(".error").css("display","block").html("我们的服务器爆炸了")
						judge = false
						break;
				}
		},function(a,b,c){
			console.log("sorry 服务器报错了!报错信息为:"+c);
			judge = false;
		})

		if(!judge){
			event.preventDefault();
		}
		
	})
})
	