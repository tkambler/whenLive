jQuery.whenLive
========

## What is this?

I occasionally find myself creating Javascript components that need to run some type of setup procedure - but only once the component exists and is visible within the DOM tree. Situations in which I run into this problem typically involve calculations that are dependent on a component's dimensions.

My experience has been that such a seemingly simple thing to track often isn't. The component in question may not be immediately inserted into the document... It may be created as part of an even larger component that won't be inserted until its own setup routines are complete.

$.whenLive allows you to track the DOM tree insertion of one or more elements, while placing an emphasis on performance. Where possible, $.whenLive leverages the relatively new `requestAnimationFrame` function, which you can learn more about [here](http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/) and [here](http://css-tricks.com/using-requestanimationframe/). In short, recurring functions that are invoked via `requestAnimationFrame` will:

* Pause when an active browser tab becomes inactive and vice-versa.
* Run at an interval that is optimized to match the speed at which the browser is able to update the DOM tree.

## Pics or it didn't happen.

```javascript
var widget = $("<div>I am a nobody. Nobody is perfect. Therefore, I am perfect.</div>");
	$(widget).onLive(function() {
	// Awesomesauce.
	var height = $(this).height();
	var width = $(this).width();
});
$("body").append(widget);
```

## Installation

### Bower

	$ bower install tkambler/whenLive

## Amuse me.

A guy walks into a bar and takes a seat. Before he can order a beer, the bowl of pretzels in front of him says "Hey, you're a handsome fellow." The man tries to ignore the bowl of pretzels, and orders a fine Pilsner beer. The bowl of pretzels then says "Ooooh, a pilsner, great choice. You're a smart man." Starting to freak out, the guy says to the bartender "Hey what the hell, this bowl of pretzels keeps saying nice things to me!" Bartender says "Don't worry about it, the pretzels are complimentary."

### Notes

* Invoking the $.whenLive method on an element that already exists within the DOM will cause the specified callback function to be fired immediately.
