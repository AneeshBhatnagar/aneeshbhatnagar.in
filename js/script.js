$(document).ready(function(){
	$(".menu-item-inner").hover(function(){
		$(this).children("div.menu-image").children("img.circle-image").css("transform","rotate(90deg)");
	}, function(){
		$(this).children("div.menu-image").children("img.circle-image").css("transform","rotate(0deg)");
	});
	assignNavHeight();
});


function assignNavHeight(){
	//Height for homepage navigation
	var width = $(".menu-item-inner .circle-image").width();
	$(".menu-item-inner").css("height",width);
}


/*Event Handlers*/
$(window).resize(function(){
	assignNavHeight();
});