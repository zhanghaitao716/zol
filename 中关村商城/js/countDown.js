;(function(){
	//倒计时
	$.fn.countDown = function(options){  //year,month,date,$day,$hour,$minute,$second
		
		function timer(){
			//设置截止日期
			
			var end = new Date();	
			end.setFullYear(options.year)
			end.setMonth(options.month - 1);
			end.setDate(options.date);

			//设置0点0分0秒
			end.setHours(0)
			end.setMinutes(0)
			var nEnd = end.setSeconds(0)	//nend为截止日期

			//创建开始日期
			var start = new Date();
			var nStart = start.getTime();
			//计算相差时间
			var day = parseInt((nEnd - nStart) / 1000 / 3600 / 24) ;
			var hour = parseInt((nEnd - nStart -  day * 24 * 3600 * 1000) /1000 / 3600) ;
			var minute = parseInt((nEnd - nStart - day * 24 * 3600 * 1000 - hour * 1000 * 3600) / 1000 / 60);
			var second = (nEnd - nStart - day * 24 * 3600 * 1000 -  hour * 1000 * 3600 - minute * 1000 *60) / 1000
/*
			var obj = {
				day : day,
				hour : hour,
				minute : minute,
				second :second 
			}*/

			options.$day.html(day);
			options.$hour.html(hour);
			options.$minute.html(minute);
			options.$second.html(second);
			/*return obj;*/
		}
			
		setInterval(function(){

			timer(options.year,options.month,options.date)
			/*console.log(countDown(2017,10,1))*/


		}, 1000);
	}	

		


		
})(jQuery)