$(function () {
    $('#sub_Topbtn').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 400);
        return false;
    });

})


$(window).scroll(function () {
    /*scroll 효과*/
    $('.scEffect').each(function (i) {
        var bottom_of_element = $(this).offset().top + 250;
        var bottom_of_window = $(window).scrollTop() + $(window).height();
        if (bottom_of_window > bottom_of_element) {
            $(this).addClass('act')
        }
    });
});
