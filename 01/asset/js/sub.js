/* *******************************************************
 * filename : sub.js
 * description : 서브컨텐츠에만 사용되는 JS
 * date : 2021-06-14
******************************************************** */



$(document).ready(function  () {
	/* ************************
	* Func : 서브 Visual Active 클래스 붙이기
	* addClassName () 필요
	************************ */
	setTimeout(function  () {
		addClassName($("#visual"), "active");
	},200);

	/* ************************
	* Func : 모달팝업 플러그인 사용
	* MagnificPopup.js 필요
	************************ */
	if ($.exists(".popup-gallery")) {
		magnificPopup($(".popup-gallery"));
	}

	/* ************************
	* Func : 일정 가로사이즈 아래부터 scroll 사용하기
	* mCustomScrollbar.js, customScrollX() 필요
	************************ */
	/* 서브 Scrollbar object  */
	$(".custom-scrollbar-wrapper").each(function  () {
		if ( $("html").attr("lang") == "ko" ) {
			var dragTxt = "좌우로 드래그 해주세요.";
		}else {
			var dragTxt = "Drag left and right.";
		}
		$(this).append("<div class='custom-scrollbar-cover'><div class='scroll-cover-txt'><i class='xi-touch'></i><p>"+dragTxt+"</p></div></div>");
		var $scrollObject = $(this).find(".scroll-object-box");
		if ($.exists($scrollObject)) {
			customScrollX($scrollObject);
		}
		$(this).on("touchmove click",function  () {
			$(this).find(".custom-scrollbar-cover").fadeOut(200);
		});
	});

	/* ************************
	* Func : 서브 상단 메뉴 FIXED
	* getWindowWidth(), checkOffset(), toFit() 필요
	************************ */
	if ($.exists(".fixed-sub-menu")) {
		var $fixedSubMenu = $(".fixed-sub-menu");
		var topMenuStart =  checkOffset($fixedSubMenu);
		$(window).resize(function  () {
			if ( getWindowWidth() > tabletWidth ) {
				topMenuStart =  checkOffset($fixedSubMenu);
			}else {
				$fixedSubMenu.removeClass("top-fixed");
			}
		});
		window.addEventListener('scroll', toFit(function  () {
			if ( getWindowWidth() > tabletWidth ) {
				objectFixed($fixedSubMenu, topMenuStart, "top-fixed");
			}else {
				$fixedSubMenu.removeClass("top-fixed");
			}
		}, {
		}),{ passive: true })
	}

	/* ************************
	* Func : 컨텐츠 메뉴 FIXED 및 클릭시 해당영역 이동
	* getScrollTop(), getWindowWidth(), checkOffset(), toFit(), checkFixedHeight(), moveScrollTop() 필요
	************************ */
	if ($.exists(".cm-fixed-tab-container-JS")) {
		var $fixedMoveTab = $(".cm-fixed-tab-list-JS");		// fixed되는 메뉴 클래스
		var $moveTabItem = $fixedMoveTab.find("li");
		var menuCount= $moveTabItem.size();
		var nav = [];
		
		$(window).on('load', function  () {
			checkStartOffset();
			nav = checkTopOffset();

			if ( getScrollTop() >  checkStartOffset() ) {
				$fixedMoveTab.addClass("top-fixed");
			}else if ( getScrollTop() <  (checkStartOffset() + $fixedMoveTab.height()) ) {
				$fixedMoveTab.removeClass("top-fixed");
			}

			$moveTabItem.each(function  (idx) {
				var eachOffset = nav[idx] -  checkFixedHeight();
				if( getScrollTop() >= eachOffset ){
					$moveTabItem.removeClass('selected');
					$moveTabItem.eq(idx).addClass('selected');
					// 모바일 드롭메뉴일때
					if ($.exists($moveTabItem.parents(".cm-drop-menu-box-JS"))) {
						$fixedMoveTab.find(".cm-drop-open-btn-JS > span").text($moveTabItem.eq(idx).find("em").text());
					}
				};
			});

		});
		$(window).on('resize', function  () {
			checkStartOffset();
			nav = checkTopOffset();
		}); 		
		
		// 탭이 붙기 시작하는 지점 체크
		function checkStartOffset () {
			var fixedStartPoint =  $(".cm-fixed-tab-container-JS").offset().top - checkFixedHeight();	
			return fixedStartPoint;
		}		

		// 해당되는 각각의 영역 상단값 측정
		function checkTopOffset () {
			var arr = [];
			for(var i=0;i < menuCount;i++){
				arr[i]=$($moveTabItem.eq(i).children("a").attr("href")).offset().top;
			}
			return arr;
		}
		
		// 스크롤 0일때 상단fixed되는 높이값 체크
		function checkFixedObjectHeight () {
			var fixedObjectTotalHeight = 0;
			for (var i=0; i<$(".top-fixed-object").length; i++) {
				var fixedObjectTotalHeight = fixedObjectTotalHeight + $(".top-fixed-object").eq(i).outerHeight();
			}
			return fixedObjectTotalHeight;
		}

		// 스크롤 event 
		window.addEventListener('scroll', toFit(function  () {
			// 메뉴fixed
			// objectFixed($fixedMoveTab, checkStartOffset(), "top-fixed");

			if ( getScrollTop() >  checkStartOffset() ) {
				$fixedMoveTab.addClass("top-fixed");
			}else if ( getScrollTop() <  (checkStartOffset() + $fixedMoveTab.height()) ) {
				$fixedMoveTab.removeClass("top-fixed");
			}

			$moveTabItem.each(function  (idx) {
				var eachOffset = nav[idx] -  checkFixedHeight();
				if( getScrollTop() >= eachOffset ){
					$moveTabItem.removeClass('selected');
					$moveTabItem.eq(idx).addClass('selected');
					// 모바일 드롭메뉴일때
					if ($.exists($moveTabItem.parents(".cm-drop-menu-box-JS"))) {
						$fixedMoveTab.find(".cm-drop-open-btn-JS > span").text($moveTabItem.eq(idx).find("em").text());
					}
				};
			});
			}, {
		}),{ passive: true })
		
		// 클릭 event 
		$moveTabItem.find("a").click(function  () {
			var goDivOffset = $($(this).attr("href")).offset().top - checkFixedHeight() + 1;	// 이동해야할 지점
			if ( getScrollTop()  < checkStartOffset()) {
				if ( getScrollTop() == 0 ) {
					var goDiv = goDivOffset - checkFixedObjectHeight();
				}else {
					var goDiv = goDivOffset - $fixedMoveTab.height();
				}
			}else {
				var goDiv = goDivOffset;
			}
			setTimeout(function  () {
				moveScrollTop(goDiv);
			});

			// 모바일 드롭메뉴일때
			if ($.exists($(this).parents(".cm-drop-menu-box-JS")) ) {
				if ( getWindowWidth () < $fixedMoveTab.data("drop-width")+1 ) {
					$fixedMoveTab.find("ul").slideUp();
				}
			}
			 
			return false;
		});
	}
	

	/* ************************
	// 서브공통 :: 고정탭
	 ************************ */
	if ($.exists(".cm-tab-fixed-con")) {
		var $fixedMoveTab = $(".cm-fixed-tab");// fixed되는 메뉴 클래스
		
		$(window).on('load', function  () {
			checkStartOffset();
		});
		$(window).on('resize', function  () {
			checkStartOffset();
		}); 		
		
		// 탭이 붙기 시작하는 지점 체크
		function checkStartOffset () {
			var fixedStartPoint =  $(".cm-tab-fixed-con").offset().top - checkFixedHeight();	
			return fixedStartPoint;
		}		

		window.addEventListener('scroll', toFit(function  () {
			// 메뉴fixed
			if ( getScrollTop() >  checkStartOffset() ) {
				$fixedMoveTab.addClass("top-fixed");
			}else if ( getScrollTop() <  (checkStartOffset() + $fixedMoveTab.height()) ) {
				$fixedMoveTab.removeClass("top-fixed");
			}

			}, {
		}),{ passive: true })	
	}





	/* ************************
	* Func : 패럴랙스 레이이아웃 관련 
	* getWindowHeight() 필요
	************************ */
	if ($.exists('.full-height')) {
		mainVisualHeight();
		$(window).on('resize', mainVisualHeight);

		function mainVisualHeight () {
			var visual_height = getWindowHeight();
			if ( getWindowWidth() > 1220 ) {
				$(".full-height").height(visual_height);
			}else {
				$(".full-height").css("height","auto");
			}
		}
	}
	if ($.exists(".parallax-fixed-container")) {
		var $scrollFixedWrapper = $(".parallax-fixed-wrapper");
		parallaxStart =  checkOffset($scrollFixedWrapper);
		$(window).resize(function  () {
			parallaxStart =  checkOffset($scrollFixedWrapper);
		});
		window.addEventListener('scroll', toFit(function  () {
			objectFixed($scrollFixedWrapper, parallaxStart , "parallax-fixed");
		}, {
		}),{ passive: true })
	}
	

	/* ************************
	* 제품뷰페이지 슬라이드
	************************ */
	$('.prd-big-img').slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  arrows: false,
	  fade: true,
	  asNavFor: '.prd-sub-img'
	});
	$('.prd-sub-img').slick({
	  slidesToShow: 3,
	  slidesToScroll: 1,
	  asNavFor: '.prd-big-img',
	  dots: false,
	  arrows: false,
	  focusOnSelect: true
	});



});

$(window).load(function() {
	$(".scroll-active").each(function(){
		var top_object = $(this).offset().top;
		var top_window = $(window).scrollTop();

		if( top_window > top_object - 200){
			$(this).addClass("on");
		}		
	});
});
$(window).scroll(function() {
	$(".scroll-active").each(function(){
		var top_object = $(this).offset().top;
		var top_window = $(window).scrollTop();

		if( top_window > top_object - 200){
			$(this).addClass("on");
		}		
	});
});



/* *********************** parallax scroll ************************ */
$(window).load(function  (e) {
	if ( $(".parallax-container").length == 0) {
		smoothScroll();
	}
	var isParallaxScroll = false; 
	var $contentSelector = $(".parallax-container");
	var wheel_move;
	var visual_num = $contentSelector.length;
	var reactiveHeight = 0;
	var parallaxStartPoint = $("#visual").height(); 

	// windowTop 구하기
	var windowHeightCheck = function  () {
		return $(window).scrollTop();
	}

	// 스크롤멈추기
	var scrollStop = function(event) {
			event.preventDefault();
			event.stopPropagation();
			return false;
	}
	// 패럴랙스 영역에서 스크롤할때
	$contentSelector.mousewheel(function(event) {
		var $curContent = $(this);
		if (getWindowWidth() > 1220) {
			smoothScroll_destory();
			scrolling($(this), event.deltaY);
		} else {
			$contentSelector.off("mousewheel");
		}

		event.preventDefault();
	});


	// 비주얼 영역에서 스크롤할때
	$("#visual").mousewheel(function(event) {
		if (getWindowWidth() > 1220) {
			if ( event.deltaY < 0) {
				if ( visual_num > 1 ) {
					$("#fieldContent1").addClass("on");
					moveScrollContent($("#visual").height(),0.8,false);
					smoothScroll_destory();
				}
			}else {
				moveScrollContent(0,0.8,true);
			}
		}
		event.preventDefault();
	});

	// 해당영역으로 이동, 스크롤 해제 유무 체크	
	function moveScrollContent (top,duration,scrollState) { 
		if ( scrollState ) {
			smoothScroll();
		}
		if(wheel_move && wheel_move.progress() < 1){
			return;
		}
		TweenMax.to($(window), duration, {
			scrollTo: {
				y: top,
				autoKill: true
			},
			ease: Sine.easeInOut,
			onComplete : function() {
				
			}
		});
	}
	
	function scrolling (contents, delta) {
		if (delta < 0) {	// down
			reactiveHeight = windowHeightCheck();
			parallaxStartPoint = 610;
			if ( reactiveHeight < 610 ) {	//비주얼영역에 scrolltop이 있을때 wheel
				moveScrollContent(parallaxStartPoint,0.8,false);
				$("#fieldContent1").addClass("on");
			}else if ( contents.index() == (visual_num-1) ) {	// 마지막영역에서 wheel
				moveScrollContent((contents.offset().top + contents.height()),1.2,true);
			}else {
				if ( visual_num == 1) {
					moveScrollContent((contents.offset().top + contents.height()),1.2,true);
				}else if( visual_num >= 3 ){
					moveScrollContent(contents.next(".parallax-container").offset().top,1.2,false);
				}else {
					moveScrollContent(contents.next(".parallax-container").offset().top,1.2,false);
				}
			}
		} else {		// up
			if ( contents.index() === 0 ) {	// fixed되는 영역에서 wheel
				moveScrollContent(0, 0.8, true);
			} else if ( contents.index() === 1 ) {	// 2번째영역에서 wheel할때 첫번째영역은 fixed되어있으므로 offset.top을 구할수없어서 parallaxStartPoint로 이동
				$("#fieldContent1").addClass("on");
				if ( visual_num == 1) {
					moveScrollContent(0, 0.8, true);
				}else {
					moveScrollContent(parallaxStartPoint,1.2,false);
				}
			} else if ( contents.index() == (visual_num-1) ) {	// 마지막영역에서 wheel
				if ( $(window).scrollTop() > contents.last(".parallax-container").offset().top + 10 ) {
					moveScrollContent( contents.offset().top,0.8,false);
				}else {
					moveScrollContent(contents.prev(".parallax-container").offset().top,1.2,false);
				}
			}else {
				moveScrollContent(contents.prev(".parallax-container").offset().top,1.2,false);
			}
		}
	}


	// 스크롤 멈춤
	function removeScroll () {
		if (isPassive()) {
			window.removeEventListener("wheel",scrollStop, {passive: false});
		} else {
			$('body').off('scroll touchmove mousewheel', scrollStop);
		}
		TweenMax.killChildTweensOf($(window),{scrollTo:true});
	}
		
	// 패럴랙스 인덱스 체크
	function scrollIndexCheck (top) {
		var init = 610;
		var number = 0;
		$(".parallax-container").each(function(val) {
			if (top >= init && top < $(this).offset().top) {
				number = val;
				init = $(this).offset().top;
			}  else if (top >= $(this).offset().top ) {
				number = val + 1;
			}
		});
		
		return number;
	}

	// 스크롤 event 
	window.addEventListener('scroll', toFit(function  () {
			// 비주얼 영역
			if ( windowHeightCheck() > ($("#visual").height() / 3)) {
				TweenMax.to( $(".visual-img-con"), 0, { autoAlpha: 0.3 });
				$(".visual-img-con").addClass("active")
			}else {
				TweenMax.to( $(".visual-img-con"), 0, { autoAlpha: 1 });
				$(".visual-img-con").removeClass("active")
			}
		}, {
	}),{ passive: true })
});


$(document).ready(function  () {
/* *********************** Brand 아코디언 ************************ */
	if ($.exists(".accordion-list-box")) {
		// 아코디언 Width
		function accordion_width () {
			$(".accordion-list").each(function  () {
				$accordionList = $(this);
				$accordionItem = $(this).find(".accordion-item");		// 아코디언 각각의 class
				itemTotalWidth = $accordionList.outerWidth();		// 아코디언 전체 width
				itemBoxLength = $accordionItem.length;		// 아코디언 갯수
				mobileWidth = 800;
				// itemWidth = 158; 		// 아코디언 각각 width
				if ( $(window).width() > 1367 ) {
					itemWidth = 320
				}else {
					itemWidth = 180
				}
				activeWidth =  itemTotalWidth - (itemWidth * (itemBoxLength-1));
				
				// console.log("Total width : " + itemTotalWidth + "px, None Active width :  " + itemWidth + "px, Active width :  " + activeWidth + "px");
				
				if ( $(window).width() + 17 > mobileWidth ) {
					$accordionItem.each(function  () {
						$accordionItem.not(".active").css("width", itemWidth );
						$accordionList.find(".accordion-item.active").css("width", activeWidth );
					});
				}else {
					$accordionItem.removeAttr("style");
				}
			});
		}
		accordion_width();
		$(window).on('resize', accordion_width);
		
		// 1024 PC버전 마우스오버시
		$accordionItem.on("click",function  () {
			if ( $(window).width() > mobileWidth && !$(this).is(".active")) {
				$(this).addClass("active").stop().animate({"width": activeWidth },300,"swing");
				$accordionItem.not($(this)).removeClass("active").stop().animate({"width":itemWidth},300,"swing"); 
				// $accordionItem.not($(this)).removeClass("active");
				// TweenMax.to($accordionItem.not($(this)), 0.5, {width:itemWidth, ease:Power2.easeOut })
			}
		});

		// 1024이하 모바일버전 클릭시
		$accordionItem.on("click",function  () {
			if ( $(window).width() <  mobileWidth+1 ) {
				$(".accordion-list .accordion-item").not($(this)).removeClass("active");
				$(this).addClass("active");
			}
		});

	}


	/* *********************** Solution 슬라이드 ************************ */
	// 솔루션 비주얼 슬라이드
	var $examVisual = $("#examVisual");
	var $examVisualItem = $examVisual.find(".exam-slider-item");
	var $examLoadingBar = $examVisual.find(".exam-visual-loading-bar > span");
	var $examCounter = $examVisual.find(".exam-visual-conuter");
	var examVisualLength = $examVisualItem.length;

	var autoPlaySpeed = 5000;
	var interleaveOffset = 0.5;
	var swiperOptions = {
		loop: true,
		//effect: "fade",
		parallax:true,
		speed: 1000,
		autoplay: {
			delay: autoPlaySpeed,
			disableOnInteraction: false,
		},
		watchSlidesProgress: true,
		navigation: {
			nextEl: '.exam-visual-control .main-slide-next',
			prevEl: '.exam-visual-control .main-slide-prev'
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
				$examCounter.find(".total-num").text("0"+examVisualLength);
			},
			slideChangeTransitionStart : function(){
				var cur_idx = $(this.slides[this.activeIndex]).data("swiper-slide-index");

				// Counter
				$examCounter.find(".cur-num").text("0"+(cur_idx+1));
				
				// Loading Motion
				TweenMax.killTweensOf($examLoadingBar);
				TweenMax.set($examLoadingBar, { width: "0%" });
				TweenMax.to($examLoadingBar, autoPlaySpeed / 1000, { width: "100%" });
			},
			slideChange: function () {
			  var activeIndex = this.activeIndex;
			  var realIndex = this.slides.eq(activeIndex).attr('data-swiper-slide-index');
			 $('.exam-slider-item').removeClass('active-item');
			 $('.exam-slider-item[data-swiper-slide-index="'+realIndex+'"]').addClass('active-item');
			},
		}
	};
	 
	var swiper = new Swiper(".exam-visual-container", swiperOptions);       

});

customScrollY(".cm-scroll-con");