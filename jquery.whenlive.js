/**
 * jQuery.whenLive plugin
 *
 * jQuery plugin that allows you to define event handlers to be fired the moment a
 * specified element becomes available within the DOM.
 *
 * https://github.com/tkambler/whenLive
 * Tim Ambler <tkambler@gmail.com>
 */
$.fn.whenLive = function(fn) {
    var self = this;
    if ( !$.whenLiveInit ) {
        $.whenLiveInit = true;
        /**
         * requestAnimationFrame polyfill
         */
        (function() {
            var lastTime = 0;
            var vendors = ['webkit', 'moz'];
            for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
                window.cancelAnimationFrame =
                  window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
            }
            if (!window.requestAnimationFrame)
                window.requestAnimationFrame = function(callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                      timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };
            if (!window.cancelAnimationFrame)
                window.cancelAnimationFrame = function(id) {
                    clearTimeout(id);
                };
        }());
        // /polyFill
        $.whenLiveLoop = function() {
        	for ( var ek in $.whenLiveElements ) {
                if ( $.contains(document.documentElement, $.whenLiveElements[ek]['elem'][0]) ) {
                    // The element exists within the DOM
                    $.whenLiveElements[ek].fn.call($.whenLiveElements[ek].elem);
                    $.whenLiveElements.splice(ek);
                }
        	}
			if ( $.whenLiveElements.length > 0 ) {
				requestAnimationFrame($.whenLiveLoop);
			}
        };
    }
    if ( jQuery.contains(document.documentElement, this[0]) ) {
        // The element exists within the DOM
        fn();
    } else {
        // The element is outside of the DOM
        if ( !$.whenLiveElements ) {
            $.whenLiveElements = [];
        }
        $.whenLiveElements.push({
            'elem': self,
            'fn': fn
        });
        if ( $.whenLiveElements.length === 1 ) {
            requestAnimationFrame($.whenLiveLoop);
        }
    }
};
