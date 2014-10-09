jQuery.whenLive
========

## What is this?

I occasionally find myself creating Javascript components that need to run some type of setup procedure - but only once the component exists and is visible within the DOM tree. Situations in which I run into this problem typically involve calculations that are dependent on a component's dimensions.

My experience has been that such a seemingly simple thing to track often isn't. The component in question may not be immediately inserted into the document - it may be created as part of an even larger component that won't be inserted until its own setup routines are complete.

$.whenLive allows you to track the DOM tree insertion of one or more elements, while placing an emphasis on performance. When supported, $.whenLive uses the browser’s [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) notification system. In the event that Mutation Observers are unavailable, $.whenLive uses the relatively new `requestAnimationFrame` function, which you can learn more about [here](http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/) and [here](http://css-tricks.com/using-requestanimationframe/) - A requestAnimationFrame polyFill is created if that is also unavailable. In short, recurring functions that are invoked via `requestAnimationFrame` will:

* Pause when an active browser tab becomes inactive and vice-versa.
* Run at an interval that is optimized to match the speed at which the browser is able to update the DOM tree.

## Browser Support

Browsers that implement Mutation Observers will see the best performance, but browser support should be nearly universal given the requestAnimationFrame polyfill that is put in place as a last resort.

## Examples

### Tracking the Availability of a Specific Element

In the following example, we track the availability of a specific jQuery element. Our callback will fire when the element exists within the DOM *and* is visible.

```javascript
var $widget = $("<div class='widget'>I am a nobody. Nobody is perfect. Therefore, I am perfect.</div>");

$widget.whenLive(function(el) {
	// The widget exists within the DOM and is visible.
});

$('body').prepend($widget);
```

### Tracking the Availability of Elements with a Specified Class

In the following example, we track the ability of all elements with a specified class. Our callback function will fire when a matching element is inserted into the DOM *and* becomes visible.

```javascript
$('.dropdown').whenLive(function(el) {
	// An element with the class 'dropdown' exists within the DOM and is visible.
});
```

### Tracking Element Insertion without Visibility

```javascript
var $widget = $("<div class='widget'>I am a nobody. Nobody is perfect. Therefore, I am perfect.</div>");

$widget.whenLive({
	'visibility': false
}, function() {
	console.log('Widget has been inserted into the DOM.');
});

$('body').prepend($widget);
```

### Triggering Custom Events

Finally, you can also trigger custom events in response to the addition of specific elements to the DOM by binding against the `document` object.

```javascript
// declare an event listener
$(document).bind("dropdown.added", function(event) {
	var $dropdown = $(event.addedElement);
	// whatever
});

$(".dropdown").whenLive('dropdown.added');
```

Of course you can use the same options when using custom events:

```javascript
$widget.whenLive({
	'visibility': false
}, 'dropdown.added');
```

## Installation

### Bower

	$ bower install whenlive
	
## Development

```
$ npm install
$ grunt server
$ grunt build
```

## Amuse me.

A guy walks into a bar and takes a seat. Before he can order a beer, the bowl of pretzels in front of him says "Hey, you're a handsome fellow." The man tries to ignore the bowl of pretzels, and orders a fine Pilsner beer. The bowl of pretzels then says "Ooooh, a pilsner, great choice. You're a smart man." Starting to freak out, the guy says to the bartender "Hey what the hell, this bowl of pretzels keeps saying nice things to me!" Bartender says "Don't worry about it, the pretzels are complimentary."

### Notes

* If the targeted element already meets the specified criteria when the plugin is called, the callback function will be fired immediately.
