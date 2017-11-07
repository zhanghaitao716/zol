$(function(){
	//返回顶部
	$(window).scroll(function(event) {
		$(".side_box_b a").click(function(){
			//console.log(1)
			$("html,body").scrollTop(0);
		})
	});
	


	//右侧导航栏的hover效果
	$(".side_box_t li").hover(function(){
		$(this).css({
			background:"#f33"
		}).find("span").animate({
			left:"-68px"
		},100)
	},function(){
		$(this).css({
			background:"#2d2d2d"
		}).find("span").animate({
			left:"0px"
		},100)
	})

	//点击右侧切换
		//点击事件
		//出现.side_switch （单例模式）点击相同的一个才会消失，点击不同的切换；
		//.side_switch的index的div出现
	class SideBar{
		constructor(){
			this.init();
		}
		init(){
			var that = this;
			// var flag;
			$(".side_order_t").find("p").click(function(){
				$(".side_switch").children("div").css({
					top:"100%"
				})
				$(".side_switch").css("display","none")
			})

			// jQuery.data("name","value") 向元素附加数据；
			// jQuery.data("name") 向元素取回数据

			$(".side_box_t li").data("flag","true");  
			$(".side_box_t li").click(function(){
					// console.log($(this).data("flag"))
					if($(this).data("flag") == "false"){
						// console.log("同次点击")
						$(".side_switch").children("div").css({
							top:"100%"
						})
						$(".side_switch").css("display","none");
						$(".side_box_t li").data("flag","true"); //当同次点击完成后，将data值清空
					}else{
						// console.log("第一次点击")
						$(".side_switch").css("display","block");
						that.change($(this).index());
						//当第一次点击的时候给data赋值为false；兄弟集赋值为true;
						$(this).data("flag","false")  
						.siblings().data("flag","ture");	
					}

						/*有问题，当第三次点击同个元素的时候，元素不能点击了
						if($(this).index() == flag){
							//同次点击
							$(".side_switch").css("display","none")
							// console.log("同次点击")
						}else{
							//第一次点击
							$(".side_switch").css("display","block");
							// console.log("第一次点击")
						}
						flag = $(this).index()*/

			})
		}
		change(index){
			$(".side_switch").children("div").eq(index).animate({
				top:0,
				opacity:1
			},500)
			.siblings().animate({
				opacity:"0"
			},500).queue(function(next){
				$(this).css({
					top:"100%"
				})
				next();
			})
		}
	}
	new SideBar();
})