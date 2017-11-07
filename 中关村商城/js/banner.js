;(function(){
	$.fn.banner = function(options){
		//存放需要的数据
		this.LOCAL = {
			iNow:0,
			index:0,
			iPrev:0,
			sIndex:0
		}
		var that = this;


		//options.opa 判断是否为透明度变化的轮播
		if(options.opa){  
			options.items.eq(0).css("background","#ce1a1b");
			options.img.eq(0).css("opacity","1");
			options.items.click(function(){
				var target = $(this).index();
				if(that.LOCAL.iNow == target){
					return 0;
				}
				that.LOCAL.opaMove(target);
				that.LOCAL.iNow = target;
				that.LOCAL.index = that.LOCAL.iNow;
			});
			//console.log(that.LOCAL.iNow)
			
			
		}

		that.LOCAL.opaMove = function(target){ //透明度轮播图变化
			//console.log(target)
			that.LOCAL.zIndex = 2;
			options.img.eq(target).animate({
				opacity:1,
			},1000)
			.css("zIndex","that.LOCAL.zIndex")
			.siblings('li').css({
				zIndex:1,
			})
			.animate({
				opacity:0
			});

			$(options.items)
				.css({
					background:"#ccc"
				})
				.eq(target)
				.css({
					background:"#ce1a1b"
				})
		}

		//左右键点击变化
		if(typeof options.btn == "object" && options.btn.length != 0){
			options.btn.left.parent().parent().parent().hover(function(){
				options.btn.left.animate({opacity:1})
				options.btn.right.animate({opacity:1})
			},function(){
				options.btn.left.animate({opacity:0});
				options.btn.right.animate({opacity:0})
			})
			options.btn.left.click(function(){
				if(that.LOCAL.iNow == 0){
					that.LOCAL.iNow = options.img.length - 1;
				}else{
					that.LOCAL.iNow--;
				}
				console.log(that.LOCAL.iNow)
				that.LOCAL.opaMove(that.LOCAL.iNow);
				that.LOCAL.index = that.LOCAL.iNow;
			})
			options.btn.right.click(function(){
				if(that.LOCAL.iNow == options.img.length - 1){
					that.LOCAL.iNow = 0;
				}else{
					that.LOCAL.iNow++;
				}
				console.log(that.LOCAL.iNow)
				that.LOCAL.opaMove(that.LOCAL.iNow);
				that.LOCAL.index = that.LOCAL.iNow;
			})
			
		}


		//自动轮播判断；
		if(options.autoPlay == undefined || options.autoPlay == true){
			clearInterval(this.LOCAL.opaTimer);
			this.LOCAL.opaTimer = setInterval(function(){ //透明度轮播图自动变化；
				if(that.LOCAL.index == options.items.length - 1){
					that.LOCAL.index = 0;
				}else{
					that.LOCAL.index++;
				}
				//console.log(that.LOCAL.index)
				options.items.eq(that.LOCAL.index).click();
			},3000)		
			options.items.eq(0).parent().parent().parent().hover(function(){
				clearInterval(that.LOCAL.opaTimer)
			},function(){
				that.LOCAL.opaTimer = setInterval(function(){ //透明度轮播图自动变化；
					if(that.LOCAL.index== options.items.length - 1){
						that.LOCAL.index = 0;
					}else{
						that.LOCAL.index++
					}
					//console.log(that.LOCAL.index)
					options.items.eq(that.LOCAL.index).click();
				},3000)
			})
		}



		//滑动轮播图
		if(options.opa == undefined || options.opa == false){
			//console.log(options.img)
			options.img.css({
					left:options.img.eq(0).width()
				})
			options.img.eq(0).css({
				left:0
			})
			options.items.eq(0).css("background","#ce1a1b")
			options.items.mouseenter(function(){
				var target = $(this).index();
				//console.log(target);
				if(that.LOCAL.iPrev == target){
					return 0;
				}
				that.LOCAL.slideMove("right",target);
				/*if(that.LOCAL.iPrev < target){
					that.LOCAL.slideMove("left",target);
				}
				if(that.LOCAL.iPrev > target){
					that.LOCAL.slideMove("right",target);
				}*/
				options.items.css("background","#cbcbcb").eq(target).css("background","#ce1a1b")
				that.LOCAL.iPrev = target;
				that.LOCAL.sIndex = that.LOCAL.iPrev;
				return false;
				//console.log(that.LOCAL.sIndex)
			})
			
			//滑动轮播图的自动轮播判断
			if(options.autoPlay == undefined || options.autoPlay == true){
				options.img.eq(0).parent().parent().hover(function(){
					//console.log(1)
					clearInterval(that.LOCAL.slideTimer);
				},function(){
					that.LOCAL.slideTimer = setInterval(function(){
						if(that.LOCAL.sIndex == options.img.length - 1){
							that.LOCAL.sIndex = 0;
						}else{
							that.LOCAL.sIndex++;
						}
						//console.log(that.LOCAL.sIndex)
						options.items.eq(that.LOCAL.sIndex).mouseenter();

					},2000)
				})
				clearInterval(that.LOCAL.slideTimer)
				that.LOCAL.slideTimer = setInterval(function(){
					if(that.LOCAL.sIndex == options.img.length - 1){
						that.LOCAL.sIndex = 0;
					}else{
						that.LOCAL.sIndex++;
					}
					//console.log(that.LOCAL.sIndex)
					options.items.eq(that.LOCAL.sIndex).mouseenter();
				},2000);
			}

		}

		that.LOCAL.slideMove = function(directive,target){
			if(directive == "left"){
				var moveTaget = options.img.eq(0).width();
				var moveiPrev = -options.img.eq(0).width();
			}
			if(directive == "right"){
				var moveTaget = -options.img.eq(0).width();
				var moveiPrev = options.img.eq(0).width();
			}
			options.img.eq(that.LOCAL.iPrev)
			.stop()
			.animate({
				left:moveiPrev
			})
			options.img.eq(target).css({
				left : moveTaget
			})
			options.img.eq(target)
			.stop()
			.animate({
				left:0
			})
		}	
	}
})(jQuery)