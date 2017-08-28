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

	/* Contact Form Handling */

	$("#contact-form").on('submit', function() {
	$('#contact-form .success').addClass('hidden');
	$('#contact-form .failure').addClass('hidden');
	var name = $('#contact-form #name');
	var email = $('#contact-form #email');
	var message = $('#contact-form #message');
	/*var url = $(this).attr('action');*/
	var url = "http://www.aneeshbhatnagar.com/contact.php"
	var data = $(this).serialize();

	console.log(data);
	var errors = 0;

	if (name.val() == '') {
		name.addClass('error');
		errors = 1;
	}

	if (email.val() == '') {
		email.addClass('error');
		errors = 1;
	}

	if (!validateEmail(email.val())) {
		email.addClass('error');
		errors = 1;
	}

	if (message.val() == '') {
		message.addClass('error');
		errors = 1;
	}

	if (errors == 0) {
		$.ajax({
			type: "POST",
			url: url,
			data: data,
			crossDomain: true,
			success: function(response) {
				console.log("Response from AJAX" + response);
				if (response == 1) {
					$('#contact-form').each(function() {
						this.reset();
					});
					grecaptcha.reset();
					$('#contact-form .success').removeClass('hidden');
				} else{
					$('#contact-form .failure').removeClass('hidden');
				}

			},
			error: function (jqXHR, status, err) {
				console.log(err);
				console.log(jqXHR);
				console.log(status);
			} 
		});
	}



	return false;
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

$(window).scroll(function(){
	var windowPos=$(window).scrollTop();
	nav_position = $("#side-navigation").position().top;
	content_position = $("#main-content").position().left;
	if(windowPos >= nav_position){
		$("#side-navigation").addClass("sticky-side-navigation");
		$("#main-content").css("left",content_position);
	}else{
		$("#side-navigation").removeClass("sticky-side-navigation");
		$("#main-content").css("left","0px");
	}
});

$(window).on('load',function(){
	$("#loader").fadeOut('slow');
});

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}