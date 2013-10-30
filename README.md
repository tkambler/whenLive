jQuery.whenLive
========

## What is this?

The jQuery.whenLive plugin allows the developer to define one or more callback functions
to be fired the moment a specified element becomes available within the DOM. This
functionality allows the developer to defer procedures that are reliant on an element's
existence within the DOM (such as the calculation of dimensions, etc...) until the
appropriate time.

## How does it work?

jQuery.whenLive plugs into the 'requestAnimationFrame' function introduced by Paul Irish,
which you can learn more about [here](http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/).
A [majority of modern browsers](http://caniuse.com/requestanimationframe) implement this
functionality, but in the event that one does not, the plugin introduces a polyfill in its
place.

## Pics or it didn't happen.

	var widget = $("<div>I am a nobody. Nobody is perfect. Therefore, I am perfect.</div>");
	$(widget).onLive(function() {
		// Awesomesauce.
		var height = $(this).height();
		var width = $(this).width();
	});
	$("body").append(widget);

## Amuse me.

A guy walks into a bar and takes a seat. Before he can order a beer, the bowl of pretzels in front of him says "Hey, you're a handsome fellow." The man tries to ignore the bowl of pretzels, and orders a fine Pilsner beer. The bowl of pretzels then says "Ooooh, a pilsner, great choice. You're a smart man." Starting to freak out, the guy says to the bartender "Hey what the hell, this bowl of pretzels keeps saying nice things to me!" Bartender says "Don't worry about it, the pretzels are complimentary."

### Notes

* Invoking the $.whenLive method on an element that already exists within the DOM will
cause the specified callback function to be fired immediately.
