define(function(){
	$(function(){
		//头部
		$(".top_change").hover(function(){
			$(this).addClass('top_active');
			$(this).children().eq(2).css("display","block");
			
		},function(){
			$(this).removeClass('top_active');
			$(this).children().eq(2).css("display","none");
		})
		for(var i = 0 ;i < $(".top_r_cover").length;i++){
		$(".top_r_cover").eq(i)
		.width($(".top_r_cover").eq(i).parent().width())
	}
		
		//地理位置选择
		$(".address").hover(function(){
			$(this).find("ul").css("display","block");
		},function(){
			$(this).find("ul").css("display","none");
			
		})
		$(".city_list").on("click","li",function(){
			$(this).find("a").css({
				background:"#ce1a1b",
				color:"#fff"
			}).parent().siblings().find("a").css({
				background:"#fff",
				color:"#333"
			});
			$(".address").find("span").html($(this).text()+'<i class="icon"></i>')
		})
		
		//二级导航
	//给.nav_all  hover事件 =》.nav_all_b出现，消失;
	//给.nav_all_b子集nav_all_over的子集li  hover事件，给划过的li。class名，让对应的nav_all_mouse出现及显示对应的子集；
		class Nav{
			constructor(){
				this.init();
			}
			init(){
				var that = this;
				$(".nav_all").hover(function(){
					//$(this).children().eq(1).css("display","block");
					$(".nav_all_over").on("mouseenter","li",function(){
						$(this)
						.siblings("li").
						removeClass('hover')
						.end()
						.addClass('hover');
						that.show($(this).index());
					})
				},function(){
					//$(this).children().eq(1).css("display","none");
					$(".nav_all_over").find("li").removeClass('hover');
					$(".nav_all_mouse").css("display","none");
				})
			}
			show(index){
				//console.log(index)
				$(".nav_all_mouse").css("display","block");
				$(".nav_all_mouse").children("li")
				.css("display","none")
				.eq(index)
				.css("display","block")
			}
		}
		new Nav()
		
		
	})
})