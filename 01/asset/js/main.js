/* *******************************************************
 * filename : main.js
 * description : 메인에만 사용되는 JS
 * date : 2021-06-15
******************************************************** */


setTimeout(function  () {
	addClassName($("body"), "active-page");
	addClassName($("#mainEnvironment"), "active-ani");
},100);


$(document).ready(function  () {	
	/* 홈페이지 들어왔을때 애니메이션 */
	$(".main-bk-bg").animate({"opacity":"0"},1300,"easeInOutCubic",function  () {
		$(".main-bk-bg").css("visibility", "hidden");
	});

	/* ************************
	* Func : fullpage 레이아웃 사용시
	* fullpage.js , detectBrowser() 필요
	************************ */
	if ($.exists('#fullpage')) {
		var $fullPage = $("#fullpage");
		var $fullPageSection = $fullPage.children(".section");
		$fullPage.fullpage({
			css3: true,
			fitToSection: false,
			navigation: true,
			scrollBar:false,
			scrollingSpeed:800,
			navigationPosition: 'right',
			navigationTooltips: ['Content01', 'Content02', 'Content03', 'Content04'],
			responsiveWidth: tabletWidth + 1,
			responsiveHeight : 750,
			onLeave : function(origin, destination, direction){
				setTimeout(function  () {
					$(".section").eq(destination-1).find("[data-scroll]").addClass("animated");
					$(".section").eq(destination-1).addClass("active-section");
				},0);
				// 사이드바 색상변경
				if ( destination > 1) {
					$("#header").addClass("hide").removeClass("show");
				}else {
					$("#header").removeClass("hide").addClass("show");
				}

				if ( destination == 3) {		
					$("#fp-nav").addClass("black");
				}else{	
					$("#fp-nav").removeClass("black");
				}
				
				// 해당영역 갔을때 슬라이드 재생
				if ( destination == 2) {
					$(".main-visual-control").addClass("down");
					$(".main-visual-control").removeClass("up");
					$(".envi-control").addClass("down");
					$(".envi-control").removeClass("up");
					$(".main-envi-lf-con").find('.active-item').addClass('start');
					$(".main-envi-rt-con").find('.active-item').addClass('start');
				}else if( destination == 1) {
					$(".main-visual-control").removeClass("down");
					$(".main-visual-control").addClass("up");
					$(".envi-control").addClass("up");
					$(".envi-control").removeClass("down")
				}
				

				 if (direction == 'up') {  
                    $("#mainEnvironment").removeClass("active-ani");
                }

				if ( destination > 4 )  {
					$("body:not('.fp-responsive')").find("#header").hide();	// ie responsive모드에서 상단으로 이동시 destination 오류로 추가
					$("#fp-nav").addClass("hide")
				}else {
					$("body:not('.fp-responsive')").find("#header").show();
					$("#fp-nav").removeClass("hide")
				}
			}
		});
	}

	/* ************************
	* Func : 메인 비주얼 높이 설정 및 slick 슬라이드
	* slick.js , getWindowWidth(), getWindowHeight() 필요
	************************ */
	// 메인 비주얼 높이값 설정
	if ($.exists('#mainVisual.full-height')) {
		mainVisualHeight();
		$(window).on('resize', mainVisualHeight);

		function mainVisualHeight () {
			var visual_height = getWindowHeight();	
			$("#mainVisual").height(visual_height);
		}
	}


	// 메인 비주얼 슬라이드
	var $mainVisual = $("#mainVisual");
	var $mainVisualItem = $mainVisual.find(".main-slider-item");
	var $mainLoadingBar = $mainVisual.find(".main-visual-loading-bar > span");
	var $mainCounter = $mainVisual.find(".main-visual-conuter");
	var mainVisualLength = $mainVisualItem.length;

	var autoPlaySpeed = 5000;
	var interleaveOffset = 0.75;
	var swiperOptions = {
		loop: true,
		effect: "fade",
		parallax:true,
		speed: 1000,
		autoplay: {
			delay: autoPlaySpeed,
			disableOnInteraction: false,
		},
		watchSlidesProgress: true,
		navigation: {
			nextEl: '.main-visual-control .main-slide-next',
			prevEl: '.main-visual-control .main-slide-prev'
		},
		on: {
			progress: function() {
				var swiper = this;
				for (var i = 0; i < swiper.slides.length; i++) {
					var slideProgress = swiper.slides[i].progress;
					var innerOffset = swiper.height * interleaveOffset;
				}  
			},
			init : function  () {
				$mainCounter.find(".total-num").text("0"+mainVisualLength);
			},
			slideChangeTransitionStart : function(){
				var cur_idx = $(this.slides[this.activeIndex]).data("swiper-slide-index");

				// Counter
				$mainCounter.find(".cur-num").text("0"+(cur_idx+1));
				
				// Loading Motion
				TweenMax.killTweensOf($mainLoadingBar);
				TweenMax.set($mainLoadingBar, { width: "0%" });
				TweenMax.to($mainLoadingBar, autoPlaySpeed / 1000, { width: "100%" });
			},
			slideChange: function () {
			  var activeIndex = this.activeIndex;
			  var realIndex = this.slides.eq(activeIndex).attr('data-swiper-slide-index');
			 $('.main-slider-item').removeClass('active-item');
			 $('.main-slider-item[data-swiper-slide-index="'+realIndex+'"]').addClass('active-item');
			},
		}
	};
	 
	var swiper = new Swiper(".main-visual-container", swiperOptions);       


	/* 슬라이드 stop play버튼 */
	var visualState = "play";
	$(".main-visual-control .main-visual-pause-btn").click(function(){
		swiper.autoplay.stop();
		TweenMax.killTweensOf($mainLoadingBar);
		$(this).hide();
		$(".main-visual-control .main-visual-play-btn").show();
		visualState = "pause";
	});
	$(".main-visual-control .main-visual-play-btn").click(function(){
		swiper.autoplay.start();
		TweenMax.killTweensOf($mainLoadingBar);
		TweenMax.set($mainLoadingBar, { width: "0%" });
		TweenMax.to($mainLoadingBar, autoPlaySpeed / 1000, { width: "100%" });
		$(this).hide();
		$(".main-visual-control .main-visual-pause-btn").show();
		visualState = "play";
	});
	$(".main-visual-control .main-slide-prev, .main-visual-control .main-slide-next").click(function  () {
		if ( visualState === "pause" ) {
			$(".main-visual-control .main-visual-play-btn").hide();
			$(".main-visual-control .main-visual-pause-btn").show();
			swiper.autoplay.start();
		}
	});


	

	/* ************************
	* Func : 메인 실내환경 관리 제품 슬라이드
	************************ */
	// 메인 슬라이더
	var $mainEnviWrap = $(".main-visual-wrapper");
	var $mainEnviCon = $(".main-envi-lf-con");
	var $mainEnviSlide = $(".envi-lf-item");
	var $mainEnviLoadingBar = $mainEnviWrap.find(".main-visual-loading-bar > span");
	var $mainEnviCounter = $mainEnviWrap.find(".main-visual-conuter");
	var mainEnviLength = $mainEnviSlide.length;

	
	var interleaveOffset = 0.75;
	var autoPlaySpeed = 4000;

	// Init swiper

	// Timer
	var time = 4000;
	var transition_time = 1200;
	
	var main_envi_rt_swiper = new Swiper('.main-envi-rt-slide', {
		effect: "fade",
		parallax: true,
		loop : true,
		speed : transition_time,
		allowTouchMove:false,
		on: {	
			setTransition: function (speed) {	
				$('.envi-slide-item').removeClass('start');
			},
		} 
	});


	var main_envi_lf_swiper = new Swiper('.main-envi-lf-slide', {
		loop: true,
		speed: 1200,
		parallax: false,
		draggable: false,
		autoplay: {
			delay: autoPlaySpeed,
			disableOnInteraction: false 
		},
		watchSlidesProgress: true,
		navigation: {
			nextEl: '.envi-control .main-slide-next',
			prevEl: '.envi-control .main-slide-prev'
		},
		on: {
			init : function  () {
				$mainEnviCounter.find(".total-num").text("0"+mainEnviLength);
			},
			progress: function () {
				var swiper = this;
				for (var i = 0; i < swiper.slides.length; i++) {
					var slideProgress = swiper.slides[i].progress;
					var innerOffset = swiper.width * interleaveOffset;
					var innerTranslate = slideProgress * innerOffset;
					if ( detectBrowser () !== "ie" ) {
						TweenMax.set(swiper.slides[i].querySelector(".slide-inner"), {
							x: innerTranslate,
						});
					}
				} 
			},
			slideChange : function  () {
			},
			slideChangeTransitionStart : function(){
				var cur_idx = $(this.slides[this.activeIndex]).data("swiper-slide-index");
				
				// Zoom in
				$mainVisualImage = $(".swiper-slide-active").find(".envi-bg");
				TweenMax.killTweensOf($mainVisualImage);
				TweenMax.fromTo($mainVisualImage, 2, { transform: "scale(1.4)" }, {transform: "scale(1) rotate(0.002deg)",force3D: true,ease: Circ.easeOut,delay: 0});
		
				// Counter
				$mainEnviCounter.find(".cur-num").text("0"+(cur_idx+1));

				// Loading Motion
				TweenMax.killTweensOf($mainEnviLoadingBar);
				TweenMax.set($mainEnviLoadingBar, { width: "0%" });
				TweenMax.to($mainEnviLoadingBar, autoPlaySpeed / 1000, { width: "100%" });

			},
			touchStart: function () {
				var swiper = this;
				for (var i = 0; i < swiper.slides.length; i++) {
					swiper.slides[i].style.transition = "";
				}
			},
			setTransition: function (speed) {	
				$('.envi-slide-item').removeClass('start');
				var swiper = this;
				if ( detectBrowser () !== "ie") {
					for (var i = 0; i < swiper.slides.length; i++) {
						swiper.slides[i].style.transition = speed + "ms";
						swiper.slides[i].querySelector(".slide-inner").style.transition =
						speed + "ms";
					}
				}
			},
			slideChange: function () {
			  var activeIndex = this.activeIndex;
			  var realIndex = this.slides.eq(activeIndex).attr('data-swiper-slide-index');
			 $('.envi-slide-item').removeClass('active-item');
			 $('.envi-slide-item[data-swiper-slide-index="'+realIndex+'"]').addClass('active-item');
			 $('.envi-slide-item[data-swiper-slide-index="'+realIndex+'"]').prev().removeClass('first');
			 $('.envi-slide-item[data-swiper-slide-index="'+realIndex+'"]').next().removeClass('first');
			},
		} 
	});

	
	// 우측 슬라이드 변경
	main_envi_lf_swiper.controller.control = [main_envi_rt_swiper];


	/* 슬라이드 stop play버튼 */
	var visualState = "play";
	$(".envi-control .main-visual-pause-btn").click(function(){
		main_envi_lf_swiper.autoplay.stop();
		TweenMax.killTweensOf($mainEnviLoadingBar);
		$(this).hide();
		$(".envi-control .main-visual-play-btn").show();
		visualState = "pause";
	});
	$(".envi-control .main-visual-play-btn").click(function(){
		main_envi_lf_swiper.autoplay.start();
		TweenMax.killTweensOf($mainEnviLoadingBar);
		TweenMax.set($mainEnviLoadingBar, { width: "0%" });
		TweenMax.to($mainEnviLoadingBar, autoPlaySpeed / 1000, { width: "100%" });
		$(this).hide();
		$(".envi-control .main-visual-pause-btn").show();
		visualState = "play";
	});
	$(".envi-control .main-slide-prev, .envi-control .main-slide-next").click(function  () {
		if ( visualState === "pause" ) {
			$(".envi-control .main-visual-play-btn").hide();
			$(".envi-control .main-visual-pause-btn").show();
			main_envi_lf_swiper.autoplay.start();
			
		}
	});





	/* ************************
	* Func : 메인 Public Relations 슬라이드
	************************ */
	var $mainPublicCon = $(".main-public-con");
	var $mainPublicSlide = $(".main-public-slide");
	var $mainPublicItem = $mainPublicSlide.find(".public-slide-item");
	var $mainPublicLoadingBar = $mainPublicCon.find(".main-visual-loading-bar > span");
	var $mainPublicCounter = $mainPublicCon.find(".main-visual-conuter");
	var mainPublicLength = $mainPublicItem.length;

	var autoPlaySpeed = 5000;
	var interleaveOffset = 0.5;
	var swiperOptions = {
		loop: true,
		slidesPerView: 1,
        spaceBetween: 0,
        slidesPerGroup: 1,
		speed: 1000,
		autoplay: {
			delay: autoPlaySpeed,
			disableOnInteraction: false,
		},
		breakpoints: {
          481: {
			slidesPerView: "2",
			spaceBetween: 15,
          },
          801: {
			slidesPerView: "auto",
			spaceBetween: 30,
          },
        },
		watchSlidesProgress: true,
		navigation: {
			nextEl: '.public-control .main-slide-next',
			prevEl: '.public-control .main-slide-prev'
		},
		on: {
			progress: function() {
				var swiper2 = this;
				for (var i = 0; i < swiper2.slides.length; i++) {
					var slideProgress = swiper2.slides[i].progress;
					var innerOffset = swiper2.height * interleaveOffset;
				}  
			},
			init : function  () {
				$mainPublicCounter.find(".total-num").text("0"+mainPublicLength);
			},
			slideChangeTransitionStart : function(){
				var cur_idx = $(this.slides[this.activeIndex]).data("swiper-slide-index");

				// Counter
				$mainPublicCounter.find(".cur-num").text("0"+(cur_idx+1));
				
				// Loading Motion
				TweenMax.killTweensOf($mainPublicLoadingBar);
				TweenMax.set($mainPublicLoadingBar, { width: "0%" });
				TweenMax.to($mainPublicLoadingBar, autoPlaySpeed / 1000, { width: "100%" });
			},
		}
	};
	 
	var swiper2 = new Swiper(".main-public-slide", swiperOptions);       


	/* 슬라이드 stop play버튼 */
	var visualState = "play";
	$(".public-control .main-visual-pause-btn").click(function(){
		swiper2.autoplay.stop();
		TweenMax.killTweensOf($mainPublicLoadingBar);
		$(this).hide();
		$(".public-control .main-visual-play-btn").show();
		visualState = "pause";
	});
	$(".public-control .main-visual-play-btn").click(function(){
		swiper2.autoplay.start();
		TweenMax.killTweensOf($mainPublicLoadingBar);
		TweenMax.set($mainPublicLoadingBar, { width: "0%" });
		TweenMax.to($mainPublicLoadingBar, autoPlaySpeed / 1000, { width: "100%" });
		$(this).hide();
		$(".public-control .main-visual-pause-btn").show();
		visualState = "play";
	});
	$(".public-control .main-slide-prev, .public-control .main-slide-next").click(function  () {
		if ( visualState === "pause" ) {
			$(".public-control .main-visual-play-btn").hide();
			$(".public-control .main-visual-pause-btn").show();
			swiper2.autoplay.start();
		}
	});


	//swiper2.autoplay.stop();



	/* ************************
	* Func : 해당영역갔을때 슬라이드 autoPlay
	* wayPoint.js 필요
	************************ */
	// 해당영역갔을때 슬라이드 autoPlay
	if ($.exists('.start-autoplay-scroll-object')) {
		$(".start-autoplay-scroll-object").slick("slickPause");
		$(".start-autoplay-scroll-object").waypoint(function  () {
			$(this).slick("slickPlay");
		}, { 
			offset: startOffset
		});
	}

	/* ************************
	* Func : 사이드바 FIXED
	* objectFixed() 필요
	************************ */
	if ($.exists('#rightBar')) {
		$(window).scroll(function  () {
			var rightStartTop = $(window).height() / 2;
			objectFixed($("#rightBar"), rightStartTop);
		});
	}
});



