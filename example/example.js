/**
 * The following example demonstrates how you can go about tracking the insertion of an
 * element into the DOM tree, without taking the element's visibility into account.
 */

var example1 = function() {

	console.log('Running example 1...');

	var $widget = $("<div class='widget'>I am a nobody. Nobody is perfect. Therefore, I am perfect.</div>");

	$widget.whenLive({
		'visibility': false
	}, function() {
		console.log('Example 1 widget has been inserted into the DOM.');
	});

	$('body').prepend($widget);

};

/**
 * The following example demonstrates how you can go about tracking the insertion of an
 * element into the DOM tree, while also taking the element's visibility into account.
 */

var example2 = function() {

	console.log('Running example 2...');

	var $widget = $("<div class='widget'>I am a nobody. Nobody is perfect. Therefore, I am perfect.</div>");

	$widget.hide();

	$widget.whenLive({
		'visibility': true
	}, function() {
		console.log('Example 2 widget has been inserted into the DOM.');
	});

	$('body').prepend($widget);

	setTimeout(function() {
		$widget.show();
	}, 3000);

}

example1();
setTimeout(function() {
	example2();
}, 4000);
