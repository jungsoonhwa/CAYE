$(function () {
    
    // 새로고침
    history.scrollRestoration = "manual";
    
    var wheelDelta;
    var timeout;
    var timeout5;
    var animate = false;
    var doorkeeper = true;
    var i = 0;
    var j = 0;
    var k = 0;
    var tI = 0;
    var hI = 0;
    var mt = 0;
    var ml = 0;
    var onepage = $("#main section");
    var l = $("section").length;
    var jL = $(".mVtxt>div").length;
    var kL = $(".business_area").find(".cont").length;
    var hL = $('.history_tabs>li').length;
    var mtMax = -( $(".VMcont").outerHeight() - $(window).height() - 30);
    var mScrollTop = 0; 
    var hScrollHeight = -$('.h_scroll').prop("scrollHeight") + $(".h_scroll").height();
    
    
//    rollingCarousel ();
    
    
    // 모바일
    var mql = window.matchMedia("screen and (max-width: 1200px)");
    var mql2 = window.matchMedia("screen and (max-width: 768px)");
    var mql3 = window.matchMedia("screen and (max-width: 480px)");
    var mobileDevice = false;
    var mobileWidth = true;
    
    if ('ontouchstart' in document.documentElement === true) { // 모바일 환경 : 터치
        mobileDevice = true;
        history.scrollRestoration = "auto";
    } else {
        mobileDevice = false;
        history.scrollRestoration = "manual";
    }
    
    
        // 최초 접속 시
    if (mql.matches) {
        resetMobile(true);
    } 
    else {
        resetMobile(false);
    }
    
    var goSolutionValue = false;
    $(window).scroll(function() {
       // 리스트 좌우 스크롤 이벤트
        isScrolling = true;
        
        // 리사이즈 위치값 저장
        if( $(window).width()<1200 ) {
            
            var half = ($(window).height()-60) / 2;

            if ( $(window).scrollTop() > $('#page8').offset().top - half ) {i = $("#page8").index();}
            else if ( $(window).scrollTop() > $('#page7').offset().top - half ) {i = $("#page7").index();}
            else if ( $(window).scrollTop() > $('#page6').offset().top - half ) {i = $("#page6").index();}
            else if ( $(window).scrollTop() > $('#solution_area').offset().top - half ) {i = $("#page4").index(); goSolutionValue = true;}
            else if ( $(window).scrollTop() > $('#business_area').offset().top - half ) {i = $("#page4").index(); goSolutionValue = false;}
            else if ( $(window).scrollTop() > $('#page3').offset().top - half ) {i = $("#page3").index();}
            else if ( $(window).scrollTop() > $('#page2').offset().top - half ) {i = $("#page2").index();}
            else {i = $("#page1").index();}
        }
    });
    
    $(window).resize(function(){
        if( $(window).width()<1200 ) return;
        
        mtMax = -( $(".VMcont").outerHeight() - $(window).height() - 30);
        hScrollHeight = -$('.h_scroll').prop("scrollHeight") + $(".h_scroll").height(); 
        mt = 0;
        ml = 0;
        $(".VMcont").css("margin-top", mt + "px");
        $(".VMbg").css("margin-top", mt*0.3 + "px");
        $('.h_scroll .history:first-of-type').css('margin-top',ml+'px');
        return;
    })
    
    // 미디어쿼리 1200
    mql.addListener(function(e) {
        if(e.matches) { // 스크롤
            resizeToMobile (true);
        } 
        else { // 원페이지
            resizeToMobile (false);
        }
    });
    // 미디어쿼리 768
    mql2.addListener(function(e) {
        if(!e.matches) { 
            mSolutionMl = 0;
            $('.sol_box').css('margin-left', '' );
        }
    });
    // 미디어쿼리 480
    mql3.addListener(function(e) {
        if(!e.matches) { 
            mSolutionMl = 0;
            $('.sol_box').css('margin-left', '' );
        }
    });
    
    function resetMobile (type) {
        if(type == true) { // pc사이즈 -> 모바일사이즈
            history.scrollRestoration = "auto";
            k=0;
            mt = 0;
            ml = 0;
            mobileWidth = true;
            businessMove ();
            $(".business_area").css("left", "");
            $(".solution_area").css("left", "");
//            goSolution (false);
            $(".VMcont").css("margin-top", mt + "px");
            $(".VMbg").css("margin-top", mt*0.3 + "px");
            $('.h_scroll .history:first-of-type').css('margin-top',ml+'px');
            $('#page4').addClass('on');
            
        } else { // 모바일사이즈 -> pc사이즈
            history.scrollRestoration = "manual";
            mobileWidth = false;
            mtMax = -( $(".VMcont").outerHeight() - $(window).height() - 30);
            hScrollHeight = -$('.h_scroll').prop("scrollHeight") + $(".h_scroll").height();
            darkTheme ();
            $('.sol_box').css('margin-left', '' );
        }
    }
    
    function resizeToMobile (direction) {
        if(direction == true) { // 모바일사이즈로 리사이즈
            
//            onepage.css("transition","none").css("top", "0").removeClass('on');
            onepage.css("transition","none").css("top", "0");
            resetMobile (true);
            
            if (i == 0) {$('#page1')[0].scrollIntoView();}
            else if (i == 1) {$('#page2')[0].scrollIntoView();}
            else if (i == 2) {$('#page3')[0].scrollIntoView();}
            else if (i == 3 && $('.solution_area').hasClass('on') == true) {$('#solution_area')[0].scrollIntoView();}
            else if (i == 3) {$('#business_area')[0].scrollIntoView();}
            else if (i == 4) {$('#page6')[0].scrollIntoView();}
            else if (i == 5) {$('#page7')[0].scrollIntoView();}
            else {$('#page8')[0].scrollIntoView();}
            
            onepage.removeClass('on');
            $('#page4').addClass('on');
            mobileTheme ();
        }
        else { // pc사이즈로 리사이즈
            resetMobile (false);
            onepage.css("transition","").css("top", -100 * i + "%").removeClass('on').eq(i).addClass('on');
            goSolution (goSolutionValue);
            $(window).scrollTop(0);
            mobileTheme ();
            darkTheme ();
        }
    }
    
    function mobileTheme () { // 모바일헤더
        // 헤더
        if ( $(window).scrollTop() >= 60 && mobileWidth ) {
            $("#header").addClass('subLayout').addClass('dark');
        } else {
            $("#header").removeClass();
        }
    }
    
    // 스와이프 
    var isScrolling = false; // 스크롤중인지 체크
    
    // 스크롤이 멈췄을 때
    // 마지막 스크롤 이벤트로부터 100ms 후에 "scrollStopped"콜백이 호출
    $.fn.scrollStopped = function(callback) {
        var that = this, $this = $(that);
        $this.scroll(function(ev) {
            clearTimeout($this.data('scrollTimeout'));
            $this.data('scrollTimeout', setTimeout(callback.bind(that), 100, ev));
        });
    };
    // 스크롤 엔드 이벤트
    $(window).scrollStopped(function(ev){
        isScrolling = false;
        isPressedChk = false;
    });
    
    // 스와이프 - 비즈니스 페이지
    // 애니메이션 영역
    function swipeBusiness(direction){
        if(direction == "Left"){
            k--;
            if (k < 0) {
                k = 0;
            }
        } else {
            k++;
            if (k > kL - 1) {
                k = kL - 1;
            }
        }
        businessMove ();
        mobileTheme ();
    }

    // 페이지의 이벤트 체크하는 부분
    var startX = 0;
    var startYchk = 0;
    var endX = 0;
    var endYchk = 0;
    var sensitive = 90;
    $('.business_area').bind('touchstart mousedown', function(e){
        if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
            var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            startX = touch.pageX;
            startYchk = touch.pageY;
        } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mouseout' || e.type == 'mouseenter' || e.type == 'mouseleave') {
            startX = e.pageX;
            startYchk = e.pageY;
        }
    })

    $('.business_area').bind('touchend mouseup', function(e) {
        if ( !mobileWidth || isScrolling ) return;

        if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
            var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            endX = touch.pageX;
            endYchk = touch.pageY;
        } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover' || e.type == 'mouseout' || e.type == 'mouseenter' || e.type == 'mouseleave') {
            endX = e.pageX;
            endYchk = e.pageY;
        }
        
        if (startX + sensitive < endX){
            swipeBusiness("Left");
        } else if (startX > endX + sensitive) {
            swipeBusiness("Right");
        }
    })    
    
    
    // 스와이프 - 솔루션 페이지
    // 애니메이션 영역
    function swipeSolution(direction){
        if(direction == "Left"){
            k--;
            if (k < 0) {
                k = 0;
            }
        } else {
            k++;
            if (k > kL - 1) {
                k = kL - 1;
            }
        }
        businessMove ();
    }

    // 페이지의 이벤트 체크하는 부분
    var windowWidth;
    var isPressed = false;
    var startX = 0;
    var nowX = 0;
    var mSolutionMl = 0;
    var speed = 1.5;
    $('.solution_area .sol_box').bind('touchstart mousedown', function(e){
        if(isScrolling) return;
        windowWidth = $(window).width();
        isPressed = true;
        isPressedChk = true;
        
        if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
            var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            startX = touch.pageX*speed + mSolutionMl;
        } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mouseout' || e.type == 'mouseenter' || e.type == 'mouseleave') {
            startX = e.pageX*speed + mSolutionMl;
        }
    })
    
    $('.solution_area .sol_box').bind('touchmove mousemove', function(e){
        if ( $(window).width() > 768 || !isPressed || isScrolling || !isPressedChk ) return;
        
        if (e.type == 'touchmove') {
            var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            nowX = touch.pageX*speed;
        } else if (e.type == 'mousemove') {
            nowX = e.pageX*speed;
        }
        
        mSolutionMl =  startX - nowX; //이동한값
        
        if ($(document).width() < 480) {
            if(mSolutionMl > windowWidth*3) {
                mSolutionMl = windowWidth*3
            }
        } else if (mSolutionMl > windowWidth) {
            mSolutionMl = windowWidth;
        }
        if (mSolutionMl < 0) {
            mSolutionMl = 0;
        }
        
        mSolutionMlPer = mSolutionMl /windowWidth*100;
        $('.sol_box').css('margin-left', -mSolutionMlPer+'%' );
    })
    
    $(window).bind('touchend mouseup', function(e){
        isPressed = false;
    })
    // -- 모바일 - 여기까지 --
    
    // 개발자님 코드 - 서브페이지에서 넘어왔을 경우 페이지 처리
	var address = unescape(location.href);
    
    // 파라미터 페이지 확인
    var page = location.href.split("?")[1]
    var subPage = null;
    if(page && (page.indexOf(",") > 0)) {
        subPage = page.split(",")[1];
        page = page.split(",")[0];
    }
    if(page) {
        page = page.substr(4);
        page = Number(page) - 1;
        movePage(page, subPage);
    }
    // 저장
    $(window).unload(function() {
        if(i === 3 && $(".solution_area").hasClass("on") && !mobileWidth) {
            history.replaceState({}, null, location.pathname+"?page"+(i+1)+",S");
        } else if(i === 3 && !mobileWidth) {
            history.replaceState({}, null, location.pathname+"?page"+(i+1)+","+k);
        } else if(i >= 0 && !mobileWidth) {
            history.replaceState({}, null, location.pathname+"?page"+(i+1));
        }
	});
    
	// url에 파라미터없애기
	history.replaceState({}, null, location.pathname);

	// 해당 솔루션이미지로 화면이동
	if(address.indexOf("imgId", 0) != -1) {
		var imgId = address.split('=')[1];
		var offset = $("#" + imgId).offset();
        $(document).scrollTop(offset.top-130);
	}
	if(address.indexOf("datasel", 0) != -1) {
		// 클릭 이벤트 : 햄버거 메뉴
		var dataselval = address.split('=')[1];
		var sectionData = dataselval.split('_')[0];
		i = $(sectionData).index();
		var pageidx = dataselval.split('_')[1].substring(3);
		
		if(pageidx != ''){
			var nvMenuJ = pageidx;
			if (pageidx == 7  ) { // 원뎁스메뉴이면서 비즈니스메뉴 클릭 시
				goSolution (false);
			} else if (pageidx == 8  ) { // 원뎁스메뉴이면서 솔루션메뉴 클릭 시
				goSolution (true);
			}
			if ( i == $('#page2').index() ) { // index == 1 // 비전미션
				button(nvMenuJ);
			} else if ( i == $('#page4').index() ) { // index == 3 // 사업영역
                k = nvMenuJ;
				businessMove ();
			} else if ( i == $('#page7').index() ) { // index == 5 // 로케이션
				tI = nvMenuJ;
				locationMap ();
			}
		} 
        
        // 모바일사이즈에서 메인넘어올 때
        var mql = window.matchMedia("screen and (max-width: 1200px)");
    
        if (mql.matches) {
            onepage.css("transition","none").css("top", "0").removeClass('on');
            resetMobile (true);
            
            if(i == 0) {$('#page1')[0].scrollIntoView();}
            if(i == 1) {$('#page2')[0].scrollIntoView();}
            if(i == 2) {$('#page3')[0].scrollIntoView();}
            if(i == 3 && $('.solution_area').hasClass('on') == true) {$('#solution_area')[0].scrollIntoView();}
            if(i == 3) {$('#business_area')[0].scrollIntoView();}
            if(i == 4) {$('#page6')[0].scrollIntoView();}
            if(i == 5) {$('#page7')[0].scrollIntoView();}
            if(i == 6) {$('#page8')[0].scrollIntoView();}
            mobileTheme ();
            
        } else {
            resetMobile (false);
            onepage.css("top", -100 * i + "%").removeClass('on').eq(i).addClass('on');
		    darkTheme ();
        }
	}
    // 모바일사이즈에서 메인넘어올 때
    if (mql.matches) {
        onepage.css("transition","none").css("top", "0").removeClass('on');
        resetMobile (true);
        
        if( $('#page1').length ) { // 모바일접속시 서브메뉴 안눌리는문제 임시해결. 다시 수정필요
            if(i == 0) {$('#page1')[0].scrollIntoView();}
            if(i == 1) {$('#page2')[0].scrollIntoView();}
            if(i == 2) {$('#page3')[0].scrollIntoView();}
            if(i == 3 && $('.solution_area').hasClass('on') == true) {$('#solution_area')[0].scrollIntoView();}
            if(i == 3) {$('#business_area')[0].scrollIntoView();}
            if(i == 4) {$('#page6')[0].scrollIntoView();}
            if(i == 5) {$('#page7')[0].scrollIntoView();}
            if(i == 6) {$('#page8')[0].scrollIntoView();}
            mobileTheme ();
        }
        
    } else {
        resetMobile (false);
        onepage.css("top", -100 * i + "%").removeClass('on').eq(i).addClass('on');
        darkTheme ();
    }
	
	
      // 클릭 이벤트 : 메인페이지 로고 이동
    $('#mainlogo').on('click', function(e){
       i = $("#page1").index();
        onepage.css("top", -100 * i + "%").removeClass('on').eq(i).addClass('on');
    })
	// -- 개발자님 코드 - 여기까지 --
    
    
    
    
    // 마우스휠 이벤트 : 메인페이지
    $(window).on('scroll DOMScroll mousewheel DOMMousewheel', function (e) {
        wheelDelta = e.originalEvent.wheelDelta;

        if ( mobileWidth ) { // 모바일 사이즈 : 미디어쿼리
            mobileTheme ();
            return;
        }
        
        if( wheelDelta == undefined ) return;
        
        // 사용할 휠 타입 검사
        if ( onepage.eq(i).hasClass('wheelScroll') == true ) {
            wheelScroll (i);
            return;
        } 
        onePageScroll (i);
    })
    
    // 키보드 이벤트
    $(window).keydown(function(e){
        
        if ( mobileWidth ) return;
        
        if(e.keyCode == 38 || e.keyCode == 33) { // 윗방향키
            wheelDelta = +120;
        }
        else if(e.keyCode == 40 || e.keyCode == 34) { // 아래방향키
            wheelDelta = -120;
        } else return;
        
        if ( onepage.eq(i).hasClass('wheelScroll') == true ) {
            wheelScroll (i);
            return;
        } 
        onePageScroll (i);
    })
    
    // 포커스 이벤트           
    // 200915수정 - dell서브페이지 링크이동문제 수정
    function showSelected(e) {
        if ( mobileWidth || $("#sub_main").length == 1) return;
        
        var focused = $(document.activeElement);
        
        if(focused.parents('section').index() > l-1) {i = l-1}
        else if(focused.parents('section').index() >= 0) {
            i = focused.parents('section').index();
            if (i == 3) {
                if ( focused.parents('#solution_area').length==1 ) {goSolution(true);}
                else {goSolution(false);};
            }
        } 
        else if(focused.parents('section').index() < 0 && focused.parents('.nvMenu_area').length!=1) {
            $(".nvMenu_area").stop().fadeOut().removeClass('on');
            $(".menu-trigger").removeClass('active-1');
        }
        
        
        $(document).scrollTop(0);
        $('#page4').scrollLeft(0);
        onepage.css("top", -100 * i + "%").removeClass('on').eq(i).addClass('on');
        darkTheme ();
//        resetPage (i);
    }
    document.addEventListener("focus", showSelected, true);
    
    // 본문 바로가기
    $('#skipToContent').click(function(){
        if ( mobileWidth ) return;
        i = 0;
        onepage.css("top", -100 * i + "%").removeClass('on').eq(i).addClass('on');
        darkTheme ();
    })
    
    
    $('#nvMenu, .menu-trigger').click(function(e){
        e.preventDefault();
        closeToggle ();
    })
    
    // 마우스오버 이벤트 : 햄버거 메뉴
    $('.nvMenu_area .depth1>a').on('mouseover focusin', function(){
        
        // 디바이스 타입 검사 : 모바일 막기
        if ( $(window).width() < 768 ) return;
        
        $(".nvMenu_area .depth1").removeClass("active");
        $(this).parent().addClass("active");
    })
    
    // 클릭 이벤트 : 햄버거 메뉴
    $('.nvMenu_area li>a').click(function(e){
        e.stopPropagation();
        var sectionData = $(this).attr('data-section');
        
        
        // 반응형사이즈 검사 : 모바일 막기
        if (mobileWidth) { // 모바일사이즈
            
            if( $(this).siblings('ul').length == 1 && !$(this).is('[data-section="#page7"]') && !$(this).is('[data-section="#page7_sub"]') ) {
                e.preventDefault();
                
                if ( $(window).width() < 768 ) {
                    $(".nvMenu_area .depth1 ul").stop().slideUp();
                    $(this).siblings('ul').stop().slideToggle();
                }
            } else if ( $(this).is('[data-section]') ) {
                e.preventDefault();
                $(".nvMenu_area .depth1 ul").stop().slideUp();
                //서브페이지 구분
                if(sectionData != undefined && sectionData != null && sectionData.indexOf("_sub") > 0){
                    location.href="../index.html?datasel="+sectionData;
                }
                
                $(window).scrollTop( $(sectionData).offset().top );
                
                if( sectionData == '#page7' ){
                    tI = $(this).parent().index();
                    locationMap ();
                }
                closeToggle ();
            }
            $(".nvMenu_area .depth1").removeClass("active");
            $(this).parent().addClass("active");
            return;
        }
        
        // 서브페이지 구분
        if(sectionData != undefined && sectionData != null && sectionData.indexOf("_sub") > 0){
            location.href="../index.html?datasel="+sectionData;
        }
        
        i = $(sectionData).index();
            
        onepage.css("top", -100 * i + "%").removeClass('on').eq(i).addClass('on');
        darkTheme ();
//        resetPage (i);
        if ( $(this).parent().hasClass('depth2') == true ) { // 투뎁스메뉴 클릭 시
            
            var nvMenuJ = $(this).parent().index();
            
            if ( i == $('#page2').index() ) { // index == 1 // 비전미션
                if(nvMenuJ == 2) {
                    resetPage (i);
                    button(nvMenuJ);
                    closeToggle ();
                    return;
                }
                button(nvMenuJ);
            } else if ( i == $('#page4').index() && $(this).parents('.depth1').index() == 1 ) { // 사업영역
                goSolution (false);
                k = nvMenuJ;
                businessMove ();
            } else if ( i == $('#page4').index() && $(this).parents('.depth1').index() == 2 ) { // 솔루션
                goSolution (true);
            } else if ( i == $('#page7').index() ) { // index == 5 // 로케이션
                tI = nvMenuJ;
                locationMap ();
            }
        } else if ( $(this).parent().index() == 1  ) { // 원뎁스메뉴이면서 비즈니스메뉴 클릭 시
            goSolution (false);
        } else if ( $(this).parent().index() == 2  ) { // 원뎁스메뉴이면서 솔루션메뉴 클릭 시
            goSolution (true);
        } 
        resetPage (i);
        closeToggle ();
    })
    
    // 영역 밖 클릭 시 닫히는 이벤트 : 햄버거 메뉴
    $(".nvMenu_area").mouseup(function (e) {
        var container = $("nav");
        if (!container.is(e.target) && container.has(e.target).length === 0){
            closeToggle ();
        }	
    });
    
    // 클릭 이벤트 : 비주얼버튼
    $('.mVbtn>a').click(function(){
        if( $(this).index()== 2 ) { // 연혁
            i = 2;
            onepage.css("top", -100 * i + "%").removeClass('on').eq(i).addClass('on');
            darkTheme ();
            resetPage (i);
        } else { // 비전미션
            i = 1;
            onepage.css("top", -100 * i + "%").removeClass('on').eq(i).addClass('on');
            darkTheme ();
            if( $(this).index() == 1) {
                resetPage (i);
                button($(this).index()+1);
                return;
            }
            button ( $(this).index()+1 );
        }
    })
    
    // 클릭 이벤트 : 비즈니스영역 리스트
    $('.business_area > .indicator a').click(function () {
        k = $(this).parent('li').index();
        $('.business_area > .indicator > li').removeClass('active').eq(k).addClass('active');
        businessMove ();
    })
    
    // 클릭 이벤트 : 비즈니스영역 리스트 - 모바일
    $('.business_area .pagination > a').click(function () {
        k = $(this).index();
        $('.business_area .pagination > a').removeClass('active').eq(k).addClass('active');
        businessMove ();
    })
    
    // 클릭 이벤트 : 지도영역 탭메뉴
    $('.lo_tabs_menu > li').click(function (e) {
        e.preventDefault();
        tI = $(this).index();
        locationMap ();
    })
    
    // 기본 스크롤(스크롤 기준)
    function wheelScroll (page) {
        fadeEffect ();
//        bgEffect ();
        
        // 첫진입시 일정시간 스크롤 막는 문지기
        if (doorkeeper == true) {
            timeout5 = setTimeout(function () {
                doorkeeper = false;
            }, 500);
            return;
        } 
        clearTimeout(timeout5);
        
        if ( page == $('#page2').index() ) { // index == 1 // 미션비전
            mt = mt + (wheelDelta * 0.5);
            
            if (mt > 0) {
                mt = 0;
                clearTimeout(timeout3);
                var timeout3 = setTimeout(function(){
                    onePageScroll ();
                    doorkeeper = true;
                },500)
            } else if (mt < mtMax) {
                mt = mtMax;
                var timeout3 = setTimeout(function(){
                    onePageScroll ();
                    doorkeeper = true;
                },500)
            }
            $(".VMcont").css("margin-top", mt + "px");
            $(".VMbg").css("margin-top", mt*0.3 + "px");
            
        } else if ( page == $('#page3').index() ) { // index == 2 // 히스토리
            
            ml = ml + (wheelDelta * 0.3);
            if ( ml > 0) {
                ml = 0;
                clearTimeout(timeout3);
                var timeout3 = setTimeout(function(){
                    onePageScroll ();
                    doorkeeper = true;
                },500)
                
            } else if ( ml < hScrollHeight ) {
                ml = hScrollHeight;
                clearTimeout(timeout3);
                var timeout3 = setTimeout(function(){
                    onePageScroll (page);
                    doorkeeper = true;
                },500)
            }
            $('.h_scroll .history:first-of-type').css('margin-top',ml+'px');
            
        }
    }
    
    // 원페이지 스크롤(마우스휠 기준)
    function onePageScroll (page) {
        // eventCheck
        if (animate == true) {
            return;
        }
        animate = true;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            animate = false;
        }, 500)
        
        if ( page == $('#page1').index() && j <= jL ) { // index == 0 // 비주얼영역
            // j가  0 1 2 3일때만 통과
            if ( wheelDelta < 0) {
                j++;
                if (j > jL - 1) {
                    pageMove ();
                    j = jL - 1;
                }
            } else {
                j--;
                if (j < 0) {
                    j = 0;
                }
            }
            $(".mVtxt>div").removeClass("on").eq(j).addClass("on");
            
        } else if ( page == $('#page3').index() ) { // index == 2 // 히스토리  
            if ( wheelDelta < 0 ) {
                hI++;
                if(hI > hL-1) {
                    hI =  hL-1;
                    pageMove ();
                }
            } else {
                hI--;
                if(hI < 0) {
                    hI =  0;
                    pageMove ();
                }
            }
            activeCont ();
            
        } else if ( page == $('#page4').index() && $(".solution_area").hasClass("on") == false ) { // index == 3 // 사업영역
            if ( wheelDelta < 0) {
                k++;
                if (k > kL - 1) {
                    k = kL - 1;
                    goSolution (true);
                }
            } else {
                k--;
                if (k < 0) {
                    k = 0;
                    pageMove ();
                }
                $(".solution_area").css("left", "");
            }
            businessMove ();
            
        } else if ( page == $('#page4').index() ) { // index == 3 // 솔루션
            if (wheelDelta > 0 ) {
                 goSolution (false);
            } else if ( wheelDelta < 0) { pageMove (); }
            
        } else {
            pageMove ();
        }
    }
    
    // 페이지 이동
    function pageMove () {
        if ( wheelDelta < 0) {
            i++;
            if (i > l - 1) {
                i = l - 1;
            }
        } else {
            i--;
            if (i < 0) {
                i = 0;
            }
        }
        onepage.css("top", -100 * i + "%").removeClass('on').eq(i).addClass('on');
        darkTheme ();
    }
    
    // 비즈니스 내 페이지 이동
    function businessMove () {
        $('.business_area .indicator>li').removeClass('active').eq(k).addClass('active');
        $('.business_area .pagination > a').removeClass('active').eq(k).addClass('active');
        $('.business_area .cont').removeClass('on').eq(k).addClass('on');
        $('.vImg_wrap>.vImg').removeClass('on').eq(k).addClass('on');
        $('.vBg_wrap>.vBg').removeClass('on')
        $('.vBg_wrap').find('.bg'+k).addClass('on');
        darkTheme ();
    }
        
    // 솔루션영역, 비즈니스영역으로 바로가기  
    function goSolution (on) {
        if ( on == true ) { // 솔루션으로 이동
            $(".business_area").css("left", "-100%");
            $(".solution_area").addClass("on").css("left", "0");
        } else { // 사업영역으로 이동
            $(".business_area").css("left", "");
            $(".solution_area").removeClass("on").css("left", "");
        }
        darkTheme ();
    }   
    
    // 비전미션 이동 버튼
    function button(target) {
        if (target == 1) { // 비전
            mt = 0;
            $(".VMcont").css("margin-top", mt + "px");
            $(".VMbg").css("margin-top", mt*0.3 + "px");
        }
        if (target == 2) { // 미션
//            mt = -756;
            mt = -$('.mission>h3').position().top;
            $(".VMcont .mission").find(".fade").addClass("act")
            $(".VMcont").css("margin-top", mt + "px");
            $(".VMbg").css("margin-top", mt*0.3 + "px");
        }
    }
    
    // 어두운 테마 : 헤더, 넥스트버튼(방향도 추가)
    function darkTheme () {
        if ( !mobileWidth && $('#page4').hasClass('on') == true && $('.solution_area').hasClass('on') == false ) { // index == 3 // 사업영역
            $('#header').addClass('dark');
            $('#next_btn').removeClass().addClass('dark').addClass('right');
        } else if ( !mobileWidth && i == $('#page2').index() ) { // index == 1 // 비전미션
            $('#header').addClass('dark');
            $('#next_btn').addClass('dark');
        } else if ( !mobileWidth && $('#page8').hasClass('on') == true ) { // index == 7 // 컨택
            $('#header').removeClass().addClass('dark2');
            $('#next_btn').removeClass().addClass('top');
        } else if (!mobileWidth) { 
            $('#header').removeClass();
            $('#next_btn').removeClass();
        }
    }
    
    // fade 애니메이션
    function fadeEffect () {
        $('.fade').each(function (i) {
            var bottom_of_element = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if (bottom_of_window > bottom_of_element) {
                $(this).addClass('act')
            }
        });
    }
    
    // background 애니메이션
    function bgEffect () {
        $('.slide').each(function (i) {
            var top_of_element = $(this).offset().left + $(this).outerWidth();
            var top_of_window = $(window).scrollLeft() + $(window).width();
            if (top_of_window > top_of_element) {
                $(this).parents("#page3").addClass('type' + (i + 1));
            } else {
                $(this).parents("#page3").removeClass('type' + (i + 1));
            }
        });
    }
    
    // 롤링 배너 : 비즈니스영역 고객사
    function rollingCarousel () {
        // 이동시간간격 3초
        var moveSpeed = 3000;

        $('.RollDiv').each(function (index, item) {
            imgMove();
            function imgMove() {
                // 맨처음 이미지의 폭 
                var aWidth = $(item).find("ul > li:first").outerWidth(true);

                // 롤링마지막에 맨처음의 li태그 추가 
                $(item).find("ul").append("<li>" + $(item).find("ul > li:first").html() + "</li>");

                // 맨처음이미지를 왼쪽으로 이동시킨다. 
                $(item).find("ul > li:first").animate({
                    marginLeft: -aWidth
                }, {
                    duration: moveSpeed,
                    complete: function () {
                        // 이동을 마친후 첫번째 li태그를 지워버린다 
                        $(item).find("ul > li:first").remove();
                        // 이미지 움직이는것을 다시 실행 
                        imgMove();
                    }
                });
            }
        });
    }
    
    // 지도 : 로케이션영역
    function locationMap () {
        $(".lo_tabs_menu > li").removeClass("active").eq(tI).addClass("active");
        $(".lo_cont>li").removeClass("active").eq(tI).addClass("active");
        $(".map>a").stop().fadeOut().removeClass("active").eq(tI).stop().fadeIn().addClass("active");
    }
    
    // 토글 : 햄버거메뉴 열고닫기
    function closeToggle () {
        $(".nvMenu_area").stop().fadeToggle().toggleClass('on');
        $(".menu-trigger").toggleClass('active-1');
    }
    
    /********************** 200526추가 (정리 전) **********************/
//    var hI;
    $('.history_tabs>li').click(function(e){
        e.preventDefault();
        hI = $(this).index();
        activeCont ();
    })
    
    function activeCont () {
        $('.history_tabs>li').removeClass('active').eq(hI).addClass('active');
        $('.history_bg>div').removeClass('on').eq(hI).addClass('on');
        $('.list_wrap').removeClass('on').eq(hI).addClass('on');
        
        if ( $('.h_scroll').hasClass('on') == true ) {
            $('#page3').addClass('wheelScroll');
        } else { $('#page3').removeClass('wheelScroll'); }
    }
    
    /********************** 200527추가 (정리 전) **********************/
    // 탑 버튼
    $('#next_btn').click(function(){
        if ( $('#page4').hasClass('on') == true && $(".solution_area").hasClass("on") == false ) { // 사업영역에서 버튼 클릭: 옆으로 가기
            businessMove ();
            goSolution (true);
            return;
        } else if ( $('#page8').hasClass('on') == true ) { // 컨택영역에서 버튼 클릭: 맨 위로가기
            i=0;
            //resetPage (i);
        } else { 
            i++;
        }
        onepage.css("top", -100 * i + "%").removeClass('on').eq(i).addClass('on');
        darkTheme ();
        resetPage (i);
    })
    
    /********************** 아래는 정리 전 **********************/
    
    // 슬라이드 : 리크루트영역
    var recruitI = 0; // 0 1 2 3
    var recruitL = $(".bubble").length; //4
    $(".controller .total").text("/ " + recruitL);
    $(".before").click(function () {
        slide01(true);
    })
    $(".next").click(function () {
        slide01(false);
    })

    function slide01(direction) {
        if (direction == true) {
            recruitI--;
            if (recruitI < 0) {
                recruitI = recruitL - 1
            };
            $(".bubble").removeClass("on");
            $(".bubble").eq(recruitI).addClass("on");
            $(".controller .current").text(recruitI + 1);
        } else {
            recruitI++;
            if (recruitI > recruitL - 1) {
                recruitI = 0
            };
            $(".bubble").removeClass("on");
            $(".bubble").eq(recruitI).addClass("on");
            $(".controller .current").text(recruitI + 1);
        }
    }
    
    // test Func.
    function movePage(pageIndex, subPageIndex){
        // pageIndex보다 윗 항목들은 마지막 항목이 선택된 상태로 세팅
        if(pageIndex > 0) {
            j = jL - 1;
        }
        if(pageIndex > 2) {
            hI = hL - 1;
            activeCont();
        }
        if(pageIndex > 3) {
            k = kL - 1;
            businessMove();
        }

        // page의 subPage 위치 조정(businessPage일 때)
        if((pageIndex === 3) && subPageIndex) {
            k = (subPageIndex === "S") ? (kL - 1) : subPageIndex;
            businessMove();
        }

        // 메인 페이지 이동
        i = pageIndex;
        onepage.css("top", -100 * i + "%").removeClass('on').eq(i).addClass('on');
        darkTheme ();

        // BusinessPage의 Solution 페이지일 때
        if((pageIndex === 3) && (subPageIndex === "S")) {
            goSolution(true);
        }
    }
    
    // reset기능 - 탑버튼이랑 메뉴같은 클릭이벤트에
    function resetPage (pageIndex) {
        // 끝으로 셋팅
        if (pageIndex > $('#page1').index()) { // 비주얼기준 초과
            j = jL - 1;
            $(".mVtxt>div").removeClass("on").eq(j).addClass("on");
        }
        if (pageIndex > $('#page2').index()) { // 비전미션 초과
            mt = mtMax;
            $(".VMcont").css("margin-top", mt + "px");
            $(".VMbg").css("margin-top", mt*0.3 + "px");
        }
        if (pageIndex > $('#page3').index()) { // 연혁 초과
            hI = 2;
            ml = hScrollHeight;
            activeCont ();
            $('.h_scroll .history:first-of-type').css('margin-top',ml+'px');
        }
        if (pageIndex >= $('#page4').index() && $(".solution_area").hasClass("on") == true) { // 사업영역 초과
            k = kL - 1;
            businessMove ();
        }
        if (pageIndex > $('#page4').index()) { // 솔루션 초과
            goSolution (true);
        }
        
        // 첨으로 셋팅
        if (pageIndex <= $('#page1').index()) { // 비주얼포함 이하
            j = 0;
            $(".mVtxt>div").removeClass("on").eq(j).addClass("on");
        }
        if (pageIndex <= $('#page2').index()) { // 비전미션 이하
            doorkeeper = true;
            mt = 0;
            $(".VMcont").css("margin-top", mt + "px");
            $(".VMbg").css("margin-top", mt*0.3 + "px");
        }
        if (pageIndex <= $('#page3').index()) { // 연혁 이하
            doorkeeper = true;
            hI = 0;
            ml = 0;
            $('.h_scroll .history:first-of-type').css('margin-top',ml+'px');
            activeCont ();
        }
        if (pageIndex <= $('#page4').index() && $(".solution_area").hasClass("on") == false) { // 사업영역 이하
            k = 0;
            businessMove ();
        }
        if (pageIndex < $('#page4').index()) { // 솔루션 이하
            goSolution (false);
        }
        
        // 인재상
        recruitI = 0
        $(".bubble").removeClass("on").eq(recruitI).addClass("on");
        $(".controller .current").text(recruitI + 1);
    } 

})
