
//smooth scroll
$(window).load(function(){				
	// smoothScroll();		
});

function smoothScroll(){
	if(isMobile() || detectOS() == "ios" || detectBrowser() == "firefox") return;
	var $window = $(window);
	var $parallaxContent = document.getElementsByClassName("parallax-container-wrapper");
	if(smoothScroll_passive()){
		window.addEventListener("wheel",smoothScroll_scrolling,{passive: false});
	}else{
		$window.on("mousewheel DOMMouseScroll", smoothScroll_scrolling);
	}
}

function smoothScroll_passive(){
	var supportsPassive = false;
	try {document.addEventListener("test", null, { get passive() { supportsPassive = true }});
	} catch(e) {}
	return supportsPassive;
}

function smoothScroll_scrolling(event){
	
	event.preventDefault();
	// console.log("smooth scroll start");

	var $window = $(window);
	var scrollTime = 1;
	// var scrollDistance = $window.height() / 2.5;
	var delta = 0;
	if(smoothScroll_passive()){
		var scrollDistance = $window.height() / 2.5;
		delta = event.wheelDelta/120 || -event.originalEvent.detail/3;
	}else{
		var scrollDistance = $window.height() / 2.5;
		if(typeof event.originalEvent.deltaY != "undefined"){
			delta = -event.originalEvent.deltaY/120;
		}else{
			delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
		}
	}

	var scrollTop = $window.scrollTop();
	var finalScroll = scrollTop - parseInt(delta*scrollDistance);
	winScrolling = TweenMax.to($window, scrollTime, {
		scrollTo : { y: finalScroll, autoKill:true },
		ease: Power3.easeOut,
		overwrite: 5
	});
}
 
function smoothScroll_destory (event) {
	// console.log("smooth scroll destory ");
	if(smoothScroll_passive()){
		window.removeEventListener("wheel",smoothScroll_scrolling);
	}else{
		$(window).off("mousewheel DOMMouseScroll", smoothScroll_scrolling);
	}
	TweenMax.killChildTweensOf($(window),{scrollTo:true});
}