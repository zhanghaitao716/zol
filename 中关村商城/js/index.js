$(function(){
	//活动页关闭
	$(".active_close").click(function(){
		$("#active").css("display","none")
	})
	
	//banner图调节位置 banner图插件使用
	$(".banner_list").find("li").css({
		left:-($(".banner_list").find("li").eq(0).width() - $(window).width())/2
	})
	$("banner_list").banner({
		opa:"true",
		img:$(".banner_list li"),
		items:$(".banner_items span"),
		btn:{
				left:$(".banner_btn").find("span").eq(0),
				right:$(".banner_btn").find("span").eq(1)
			},
		autoPlay:true
	})
	$(".main_group_banner").banner({
		img:$(".main_group_banner ul"),
		items:$(".main_group_items span"),
		autoPlay:true
	})

	
	//倒计时插件使用 参数year,month,date,$day,$hour,$minute,$second
	$(".main_group_banner").countDown({
		year:2017,
		month:10,
		date:1,
		$day:$(this).find(".day1"),
		$hour:$(this).find(".hour1"),
		$minute:$(this).find(".minute1"),
		$second:$(this).find(".second1")
	})

	$(".main_group_banner").countDown({
		year:2017,
		month:11,
		date:1,
		$day:$(this).find(".day2"),
		$hour:$(this).find(".hour2"),
		$minute:$(this).find(".minute2"),
		$second:$(this).find(".second2")
	})

	$(".main_group_banner").countDown({
		year:2017,
		month:9,
		date:30,
		$day:$(this).find(".day3"),
		$hour:$(this).find(".hour3"),
		$minute:$(this).find(".minute3"),
		$second:$(this).find(".second3")
	})

	$(".main_group_banner").countDown({
		year:2017,
		month:12,
		date:1,
		$day:$(this).find(".day4"),
		$hour:$(this).find(".hour4"),
		$minute:$(this).find(".minute4"),
		$second:$(this).find(".second4")
	})

	$(".main_group_banner").countDown({
		year:2017,
		month:10,
		date:1,
		$day:$(this).find(".day5"),
		$hour:$(this).find(".hour5"),
		$minute:$(this).find(".minute5"),
		$second:$(this).find(".second5")
	})

	$(".main_group_banner").countDown({
		year:2017,
		month:9,
		date:30,
		$day:$(this).find(".day6"),
		$hour:$(this).find(".hour6"),
		$minute:$(this).find(".minute6"),
		$second:$(this).find(".second6")
	})

	$(".main_group_banner").countDown({
		year:2017,
		month:11,
		date:11,
		$day:$(this).find(".day7"),
		$hour:$(this).find(".hour7"),
		$minute:$(this).find(".minute7"),
		$second:$(this).find(".second7")
	})

	$(".main_group_banner").countDown({
		year:2017,
		month:11,
		date:11,
		$day:$(this).find(".day8"),
		$hour:$(this).find(".hour8"),
		$minute:$(this).find(".minute8"),
		$second:$(this).find(".second8")
	})

	$(".main_group_banner").countDown({
		year:2017,
		month:10,
		date:10,
		$day:$(this).find(".day9"),
		$hour:$(this).find(".hour9"),
		$minute:$(this).find(".minute9"),
		$second:$(this).find(".second9")
	})



	//电竞频道json选项卡
	class Tab{
		constructor(bann){
			this.bann = bann;
			this.load();
		}
		load(){
			var that = this;
			$.ajax("data/gaming.json")
			.then(function(res){
				//成功
				//console.log(res);
				that.res = res;
				that.init();
			},function(a,b,c){
				//失败
				console.log(b)
			})
		}
		init(){
			var that = this;
			$(".gaming_tab").find("li").click(function(){
				//console.log($(this).index())
				that.rendringPage($(this).index());
				$(".gaming_tab li").css({
					border:0
				})
				.eq($(this).index()).css({
					borderBottom:"3px solid #fff"
				})
				console.log($(".gaming_ban"))
				/*console.log($(".gaming_main li").children(".gaming_ban"))
				$(".gaming_main li").children().banner({
					img:$(".gaming_ban ul li"),
					items:$(".btn span")
				})*/
				that.bann({
					img:$(".gaming_ban ul li"),
					items:$(".btn span")
				})
			})
			that.rendringPage(0); 
			this.ban();
		}
		rendringPage(index){
			var html = "";
			html =`
					<div class="gaming_ban">
						<ul>
							<li><a href="##"><img src="${this.res[index].img1}" alt=""></a></li>
							<li><a href="##"><img src="${this.res[index].img2}" alt=""></a></li>
							<li><a href="##"><img src="${this.res[index].img3}" alt=""></a></li>
						</ul>
						<div class="btn">
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>
					<ul class="gaming_list clearfix">
						<li>
							<a href="##"><img src="${this.res[index].img4}" alt=""></a>
							<p class="ware-name"><a href="##">${this.res[index].txt1}</a></p>
							<p>${this.res[index].price1}</p>
						</li>
						<li>
							<a href="##"><img src="${this.res[index].img5}" alt=""></a>
							<p class="ware-name"><a href="##">${this.res[index].txt2}</a></p>
							<p>${this.res[index].price2}</p>
						</li>
						<li>
							<a href="##"><img src="${this.res[index].img6}" alt=""></a>
							<p class="ware-name"><a href="##">${this.res[index].txt3}</a></p>
							<p>${this.res[index].price3}</p>
						</li>
					</ul>
				`
			$(".gaming_main li").html(html);
			
		}
		ban(){
			//console.log($(".gaming_ban"))
			$(".gaming_ban").banner({
				img:$(".gaming_ban ul li"),
				items:$(".btn span")
			})
		}
	}
	new Tab($(".gaming_main li").banner);
	
})
