$(document).ready(function(){
	$(".menu-item-inner").hover(function(){
		$(this).children("div.menu-image").children("img.circle-image").css("transform","rotate(90deg)");
	}, function(){
		$(this).children("div.menu-image").children("img.circle-image").css("transform","rotate(0deg)");
	});
	assignNavHeight();
	$(".skills-images img").tooltipster({
		position:"top",
		delay:120,
		theme:"tooltipster-borderless"
	});
	$(".menu-item-inner").tooltipster({
		position:"right",
		delay: 100,
		theme: "tooltipster-borderless"
	});
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