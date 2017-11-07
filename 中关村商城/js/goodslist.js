$(function(){
	//筛选点击部分
	$(".main_b_select").children().children("a").click(function(){
		$(this).addClass('current')
		.parent().siblings().children("a")
		.removeClass('current')
	})
	

	//分页
		//请求数据
		//分页
		//渲染页面
	class Pagination{
		constructor(){
			this.howMany()
		}
		load(){
			if(!Pagination.res){
                var that = this;
				$.ajax("../data/goods.json")
				.then(function(res){
					//成功
					//console.log(res)
					Pagination.res = res;
					that.init();
					that.join();
				},function(a,b,c){
					//失败
					console.log(b)
				})
            }else{
                this.init();
                that.join();
            }
			
		}
		init(){
			var that = this;
            $(".Pagination").pagination(100,{
                items_per_page:1,
                prev_text:"上一页",
                next_text:"下一页",
                num_display_entries:3,
                num_edge_entries:1,
                callback:function(index){
                    that.index = index;
                    that.rendringPag()
                    //console.log($(".Pagination").children().eq(1).attr("class"))
                    if($(".Pagination").children().eq(1).attr("class") == "current"){
                    	$(".Pagination").find(".prev").css({
                    		backgroundPosition:"0 -208px",
                    		color:"#b3b3b3"
                    	})
                    }else{
                    	$(".Pagination").find(".prev").css({
                    		backgroundPosition:"0 -160px",
                    		color:"#333"
                    	})
                    }
                     if($(".Pagination").children().eq($(".Pagination").children().length - 2).attr("class") == "current"){
                    	$(".Pagination").find(".next").css({
                    		backgroundPosition:"100% -232px",
                    		color:"#b3b3b3"
                    	})
                    }else{
                    	$(".Pagination").find(".next").css({
                    		backgroundPosition:"100% -184px",
                    		color:"#333"
                    	})
                    }
                }
            })

		}
		rendringPag(){
			var that = this;
			//console.log(this.index);
			//console.log(Pagination.res.length)
			var html = ""
			for(var i = this.index * 20;i< (this.index+1) * 20;i++){
                if(i < Pagination.res.length){
                    html += `
                              	<li>
									<a href="##" class="main_pic" target="_blank"><img src="${Pagination.res[i].img}" alt=""></a>
									<div class="main_title"><span>${Pagination.res[i].txt1}</span><a href="##" target="_blank">${Pagination.res[i].txt2}</a></div>
									<h4>${Pagination.res[i].price}</h4>
									<div class="evaluate clearfix">
										<span>销量数<em>&nbsp;${Pagination.res[i].num1}</em></span>
										<span>评价数 <a href="##">${Pagination.res[i].num2}</a></span>
									</div>
									<div class="shop_ifon">
										<p class="shop_name"><a href="##" target="_blank">${Pagination.res[i].ifon}</a></p>
										<p class="total-volume">店铺总成交<em>${Pagination.res[i].num3}</em>笔</p>
									</div>
									<div class="main_shop_car" id="${Pagination.res[i].id}"><span>购物车</span></div>
								</li> 
                            `
                }    
            }
            //console.log(html)
            $(".main_b_c ul").html(html)

		}
		join(){
			var that = this;
			$(".main_b_c").on("click",".main_shop_car",function(){
				// console.log(this.id)
				that.storage(this.id);
				that.howMany();
				// console.log(12)
			})
			// that.showCar()
			$(".side_box_t").find("li").eq(2).click(function(){
				$(".side_empty_box").css("display","none");
				that.showCar()
			})
			
		}
		storage(id){
			// console.log(id)
			if(!$.cookie("goods")){
					//不存在;
					$.cookie("goods",'[{"id":'+id+',"num":1}]');
				}else{
					//存在;
					//变成数组 => 操作cookie;
					var cookie = $.cookie("goods");
					var cookieArr = JSON.parse(cookie);
					var same = false;
					for(var i = 0 ; i < cookieArr.length ; i++){
						if(cookieArr[i].id == id){ //存在当前的商品;
							cookieArr[i].num++;
							same = true;
							break;
						}
					}
					if(same == false){
						var obj = {
							id:id,
							num:1
						};
						cookieArr.push(obj);
					}
					//变成字符串 => 存进cookie;
					cookie = JSON.stringify(cookieArr);
					$.cookie("goods",cookie);
					return cookieArr[i].num;
				}

		}
		howMany(){
			if($.cookie("goods")){
				var aCookie = JSON.parse($.cookie("goods"));
				var res = 0;
				for(var i = 0 ; i < aCookie.length ; i++){
					res += aCookie[i].num;
				}	

				$(".goods_num").html(res);			
				return res;
			}
		}
		showCar(){
			var that = this;
			// console.log(1)
			if($.cookie("goods")){
				// console.log(2)
				var aCookie = JSON.parse($.cookie("goods"));
				var html = "";
				for(var i = 0 ; i < aCookie.length ; i++){
					// console.log(i)
					// console.log(aCookie[i].id,aCookie[i].num)
					html += `
							<li>
								<form action="">
									<div class="shop_car_t clearfix">
										<input type="checkbox">
										<span>${Pagination.res[aCookie[i].id].ifon}</span>
									</div>
									<div class="shop_car_c clearfix">
										<input type="checkbox">
										<a href="##"><img src="${Pagination.res[aCookie[i].id].img}" alt=""></a>
										<div class="shop_car_number clearfix">
											<em class="zc-minus"></em>
											<span>${aCookie[i].num}</span>
											<em class="zc-plus"></em>
										</div>
										<p class="shop_car_price">¥<span>${Pagination.res[aCookie[i].id].num3}</span></p>
									</div>
									<div class="zc-order-related clearfix">
										<p>已选<span class="zc-order_num">${aCookie[i].num}</span>件</p>
										<p>¥<span class="zc-order_price">${Pagination.res[aCookie[i].id].num3}</span></p>
									</div>
									<input type="submit" value="结算" id="shop_car_btn">
								</form>
							</li>
						`
				}
				// console.log(html)
				$(".side_order_b ul").html(html)
			}		
		}
	}
	var shopcar = new Pagination();

		shopcar.load();
})