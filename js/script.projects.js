$(document).ready(function(){
	$.getJSON("data/projects.json", function(data){
		console.log("Data fetched!");
		projects = data.projects;
		/*<div class=" academic web android">
						<p class="hover-item"><span>test</span>Hello!</p>
						<img src="images/projects-temp.png" class="img-responsive">
					</div>*/
		console.log(projects[5]);
		projects.forEach(function(project){
			classString = "col-lg-4 col-md-4 col-sm-6 col-xs-12 project-listing";
			project.category.forEach(function(cat){
				classString += " " + cat;
			})
			embedString = '<div class="'+classString+'"><a href="'+ project.url +'" target="_blank"><p class="hover-item"><span>'+project.title+'</span>'+project.desc+'</p></a><img src="'+project.image+'" class="img-responsive"></div>';
			$("#all-projects").append(embedString);
		});
		
		setTimeout(function(){
			var projectWidth = $(".project-listing img").css('width');
			var projectHeight = $(".project-listing img").css('height');
			$(".hover-item").css('width',projectWidth);
			$(".hover-item").css('height',projectHeight);
		},2000);
	})	
});