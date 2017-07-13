$(document).ready(function(){
	$(".menu-item-inner").hover(function(){
		$(this).children("div.menu-image").children("img.circle-image").css("transform","rotate(90deg)");
	}, function(){
		$(this).children("div.menu-image").children("img.circle-image").css("transform","rotate(0deg)");
	})
});