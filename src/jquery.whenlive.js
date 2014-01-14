/**
 * jQuery.whenLive plugin
 *
 * jQuery plugin that allows you to define event handlers to be fired the moment a
 * specified element becomes available within the DOM.
 *
 * https://github.com/tkambler/whenLive
 * Tim Ambler <tkambler@gmail.com>
 */
(function(root, factory) {
    if ( typeof define === 'function' && define.amd ) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    }
})(this, function(jQuery) {

(function($) {

	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

	var checkElements = function(container) {
		if ( !container ) {
			container = document.documentElement;
		}
		for ( var ek in $.whenLiveElements ) {
			if ( $.contains(container, $.whenLiveElements[ek]['elem'][0]) || container === $.whenLiveElements[ek]['elem'][0] ) {
				// The element exists within the DOM
				if ( $.whenLiveElements[ek].options.visibility ) {
					// User has requested that we also check for visibility.
					if ( $.whenLiveElements[ek]['elem'].is(':visible') ) {
						// It's visible.
						$.whenLiveElements[ek].fn.call($.whenLiveElements[ek].elem);
						$.whenLiveElements.splice(ek);
					}
				} else {
					$.whenLiveElements[ek].fn.call($.whenLiveElements[ek].elem);
					$.whenLiveElements.splice(ek);
				}
			}
		}
	};

	$.fn.whenLive = function(options, fn) {

		var self = this;

		if ( typeof options === 'function' ) {
			fn = options;
			options = {};
		} else if ( typeof options !== 'object' ) {
			options = {};
		}

		if ( typeof options.visibility !== 'boolean' ) {
			options.visibility = false;
		}

		if ( typeof fn !== 'function' ) {
			return;
		}

		if ( !$.whenLiveElements ) {
			$.whenLiveElements = [];
		}

		if ( !$.whenLiveInit ) {

			$.whenLiveInit = true;

			if ( MutationObserver ) {

				var observer = new MutationObserver(function(mutations) {
					for ( var mi = 0; mi < mutations.length; mi++ ) {
						var mutation = mutations[mi];
						checkElements(mutation.target);
						if ( $.whenLiveElements.length ) {
							for ( var ni = 0; ni < mutation.addedNodes.length; ni ++ ) {
								var node = mutation.addedNodes[ni];
								checkElements(node);
							}
						}
					}
				});
				observer.observe(document, {
					'childList': true,
					'subtree': true,
					'attributes': true
				});

			} else {

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
					checkElements();
					if ( $.whenLiveElements.length > 0 ) {
						requestAnimationFrame($.whenLiveLoop);
					}
				};

			}

		}

		if ( jQuery.contains(document.documentElement, this[0]) ) {
			// The element exists within the DOM
			if ( options.visibility ) {
				if ( $(this).is(':visible') ) {
					fn();
				} else {
					$.whenLiveElements.push({
						'elem': self,
						'fn': fn,
						'options': options
					});
					if ( !MutationObserver ) {
						if ( $.whenLiveElements.length === 1 ) {
							requestAnimationFrame($.whenLiveLoop);
						}
					}
				}
			} else {
				fn();
			}
		} else {
			// The element is outside of the DOM
			$.whenLiveElements.push({
				'elem': self,
				'fn': fn,
				'options': options
			});
			if ( !MutationObserver ) {
				if ( $.whenLiveElements.length === 1 ) {
					requestAnimationFrame($.whenLiveLoop);
				}
			}
		}

	};

})(jQuery);

});
