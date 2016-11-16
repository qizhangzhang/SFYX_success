$(function(){
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
	$(".list-list li").hover(function(){
		$("#llo-list").show();
	},function(){
		$("#llo-list").hide();
	});
	//点击加号出现下拉菜单
	var isMoving = false;
	$(".dml-list i").on("click",function(){
		if($(this).parents("li").find(".dml-one").hasClass("open")){
			$(this).parents("li").find(".dml-one").removeClass("open");
			$(this).removeClass("lii-bg");
		}else{
			$(this).parents(".dml-list").find('i').removeClass("lii-bg");
			$(this).parents(".dml-list").find(".dml-one").removeClass("open");
			$(this).parents("li").find(".dml-one").addClass("open");
			$(this).addClass("lii-bg");
		}
	});
	//点击更多
	$(".dmro-more").on("click",function(){
		if(!isMoving){
			$(this).find("span").html("收起");
			$(this).find("i").addClass("open");
			$(this).parents(".dmro-list").css("height","120px");
			isMoving = true;
		}else{
			$(this).find("span").html("更多");
			$(this).find("i").removeClass("open");
			$(this).parents(".dmro-list").css("height","60px");
			isMoving = false;
		}
		
	});

	// 点击加入到购物车
	$(".append-car").click(function(){
		// console.log(123);
		var $dl = $(this).parents("dl"),
			id = $dl.find(".dmrtp-two").text(),
			price = $dl.find(".dmrtp-one").children("span").text(),
			pic = $dl.find("img").attr("src"),
			amount = $dl.find(".amout").text(),
			product = {
				"id":id,
				"price":price,
				"pic":pic,
				"amount":amount
			}
			console.log(amount);
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
	/*************点击加减数量***********/
	// 加
	$(".add").on("click",function(){
		var _amount = $(this).parent(".operate").siblings(".amout").text();
		_amount++;
		// console.log(_amount)
		$(this).parent(".operate").siblings(".amout").text(_amount);
	});
	// 减
	$(".cut").on("click",function(){
		var _amount = $(this).parent(".operate").siblings(".amout").text();
		_amount--;
		if(_amount<1){
			return;
		}
		$(this).parent(".operate").siblings(".amout").text(_amount);
	});
});