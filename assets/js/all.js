var html,
		rem,
		rem_w = 127,
		rem_h = 107,
		body_var,
		degree = 0.0174532925,
		$window,
		global_window_Height,
		global_window_Width,
		$wrapper,
		$wrapper_Height,
		$scroll_top,
		mobile = false;

$(document).ready(function ($) {
	$window = $(window);
	html = $('html');
	$wrapper = $('.wrapper');
	body_var = $('body');

	resize();
});

$(window).on('resize', resize);
$(window).on('orientationchange', resize);

function resize() {
	global_window_Height = $window.height();
	global_window_Width = $window.width();
	$wrapper_Height = $wrapper.height();

	if (body_var.hasClass('develop_mod')) {
		console.log('window ' + global_window_Width + ' X ' + global_window_Height);
	}
	if (global_window_Height > global_window_Width) {
		rem = global_window_Width / rem_w;
	}
	else {
		rem = global_window_Height / rem_h;
	}

	html.css('font-size', rem + 'px');
}


$(window).on('scroll', function () {

});
$(window).on('load', function () {

});

$(window).on('touchstart', function (event) {
	touchstart = true;
	var clickPointY = event.originalEvent.touches[0].pageY;
});
$(window).on('touchmove', function (event) {
	var shift = event.originalEvent.touches[0].pageY - clickPointY;
});

$(window).on('touchend', function (event) {
	var touchstart = false,
	clickPointY = 0,
	shift = 0;
});