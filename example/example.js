/**
 * The following example demonstrates how you can go about tracking the insertion of an
 * element into the DOM tree, without taking the element's visibility into account.
 */

function example1() {

	console.log('Running example 1 ...');

	var $widget = $("<div class='widget'>I am a nobody. Nobody is perfect. Therefore, I am perfect.</div>");

	$widget.on('whenLive', '#foo', {
		'visibility': false
	}, function() {
		console.log('Example 1 widget has been inserted into the DOM with context.');
	});

	$('#foo').append($widget);

};

/**
 * The following example demonstrates how you can go about tracking the insertion of an
 * element into the DOM tree, while also taking the element's visibility into account.
 */

function example2() {

	console.log('Running example 2 ...');

	var $widget = $("<div class='widget'>I am a nobody. Nobody is perfect. Therefore, I am perfect.</div>");

	$widget.hide();

	$widget.whenLive({
		'visibility': true,
		context: '#bar'
	}, function() {
		console.log('Example 2 widget has been inserted into the DOM with context.');
	});

	$('#bar').append($widget);

	setTimeout(function() {
		$widget.show();
	}, 3000);

}

function example3() {

	console.log('Running example 3 ...');

	var $widget = $("<div class='widget'>I am a nobody. Nobody is perfect. Therefore, I am perfect.</div>");

	$widget.on('whenLive', function() {
		console.log('Example 3 widget has been inserted into the DOM.');
	});	

	setTimeout(function() {
		$('body').prepend($widget);
	}, 3000);

}

$(function () {
	example1();
	setTimeout(example2, 4000);
	setTimeout(example3, 9000);
});
