$(function(){
	$(window).on("load",function(){
	// 读取cookie中的用户名显示
		$.cookie.json = true;
		var name = $.cookie("name");
		console.log(name);
		if(name){
			$(".user_name").text("欢迎您"+name);
				$(".quit").show();
			// 点击退出清空当前的cookie值
			$(".quit").on("click",function(){
				$.cookie("name",name,{expires:-1});
				location = "login.html";
			});
		}

		
	//大图轮播
		var $topics = $(".topic"),
			imgWidth = $(".topic").width(),
			len = $topics.length,
			nextIndex = 1,
			time = null;
		$(".b-list").width(imgWidth*len);
		//轮播
		time = setInterval(move,3000);
		//动态添加小圆点
		$.each($(".topic"),function(index,element){
			var Index = index +1;
			$("#pages").append("<div>"+Index+"</div>");
			$("#pages :first-child").addClass("curr");
			$("#pages :last-child").data("index",index);
		});
		// 鼠标移入运动
		$("#pages div").on("mouseenter",function(){
			clearInterval(time);
			nextIndex = $(this).data("index");
			move();
			time = setInterval(move,3000);
		});
		//运动
		function move(){
			var _left = -nextIndex * imgWidth;
			//小圆点改变样式
			$.each($("#pages div"),function(index,element){
				$("#pages div").eq(index).removeClass("curr");
			});
			$("#pages div").eq(nextIndex).addClass("curr");
			nextIndex++;
			if(nextIndex>=len){
				nextIndex=0;
			}
			$(".b-list").animate({"left":_left});
		}
	
	//楼层导航
	var imgoneHeight = $(".img-one").offset().top,
		winHeight = $(window).height();
	//获取最后一层的高度
	var lastHeight = $(".drink").offset().top;
	var isMoving = false;
	$(window).on("scroll",function(index,element){
		if(!isMoving){
			var srcTop = $(this).scrollTop();
			if(srcTop > imgoneHeight - winHeight&&srcTop<lastHeight){
				$(".floor").show();
			}else{
				$(".floor").hide();
			}
		$(".friut").each(function(index,element){
			var _top = $(this).offset().top;
			if(srcTop > _top - winHeight/2){
				$(".floor>li").eq(index).addClass("caur").children("span").
				show().end().siblings().removeClass("caur").children("span").hide();
			}
		});
		}
	});
	$(".floor li").hover(function(){
		$(this).children("span").show();
	},function(){
		$(this).not(".caur").children("span").hide();
	}).on("click",function(){
		console.log(123);
		isMoving = true;
		var index = $(this).index();
		var _top = $(".friut").eq(index).offset().top;
		$(this).addClass("caur").children("span").show().end().siblings().
		children("span").hide();
		$("html,body").animate({"scrollTop":_top},1000,function(){
			isMoving = false;
		});
	});
	//鼠标移入出现购物车
	$(".friut-center li").hover(function(){
		$(this).find(".shopping").show();
	},function(){
		$(this).find(".shopping").hide();
	});	
	$(".yx-list li").hover(function(){
		$(this).find(".shopping").show();	
	},function(){
		$(this).find(".shopping").hide();
	});
	// 点击加入购物车
	$(".shopping").on("click",function(){
		// console.log(123);
		var $dl = $(this).parents("dl"),
			id = $dl.find("p").text(),
			price = parseFloat($dl.find("span").text().replace("￥","")),
			pic = $dl.find("img").attr("src"),
			product = {
				"id":id,
				"price":price,
				"pic":pic,
				"amount":1
			}

			$.cookie.json = true;
		var products = $.cookie("products");
			if(!products){
				products = [];
			}
		var index = getProductIndex(products,product);
		if(index!=-1){
			var prod = products[index];
				prod.amount++;
		}else{
			products.push(product);
		}
		console.log(products);
		$.cookie("products",products,{expires:7});
		function getProductIndex(products,product){
			var prodIndex = -1;
			$.each(products,function(index,element){
				if(element.id==product.id){
					prodIndex = index;
				}
			});
			return prodIndex;
		}
	});
	//鼠标移入添加颜色
	$(".fr-list-one span").hover(function(){
		$(this).css("backgroundColor","#70990c").find("a").css("color","#fff");
	},function(){
		$(this).css("backgroundColor","#fff").find("a").css("color","#000");
		}
	);
	$(".fr-list-two span").hover(function(){
		$(this).css("backgroundColor","#fa648c").find("a").css("color","#fff");
	},function(){
		$(this).css("backgroundColor","#fff").find("a").css("color","#000");
		}
	);
	$(".fr-list-three span").hover(function(){
		$(this).css("backgroundColor","#ff6c00").find("a").css("color","#fff");
	},function(){
		$(this).css("backgroundColor","#fff").find("a").css("color","#000");
		}
	);
	$(".fr-list-four span").hover(function(){
		$(this).css("backgroundColor","#fa648c").find("a").css("color","#fff");
	},function(){
		$(this).css("backgroundColor","#fff").find("a").css("color","#000");
		}
	);
	$(".fr-list-five span").hover(function(){
		$(this).css("backgroundColor","#d12e49").find("a").css("color","#fff");
	},function(){
		$(this).css("backgroundColor","#fff").find("a").css("color","#000");
		}
	);
	$(".fr-list-six span").hover(function(){
		$(this).css("backgroundColor","#f08c18").find("a").css("color","#fff");
	},function(){
		$(this).css("backgroundColor","#fff").find("a").css("color","#000");
		}
	);
	$(".fr-list-seven span").hover(function(){
		$(this).css("backgroundColor","#78b270").find("a").css("color","#fff");
	},function(){
		$(this).css("backgroundColor","#fff").find("a").css("color","#000");
		}
	);
	});
})