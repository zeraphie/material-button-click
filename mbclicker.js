$.fn.mbClicker = function mbClicker(options) {

		//General Variables
		var addClickerTo = $(this);
		var ua = navigator.userAgent;
		var iclicky = (ua.match(/iPad/i)) ? 'touchstart' : 'mousedown';
	
		//Apply no shadow unless shadow is specified in options
		var shadow = 'none';
		if (options.shadow) {
				shadow = '0 0 ' + options.size / 5 + 'px ' + options.colour;
		}

		//Click event with IOS support
		addClickerTo.unbind().on(iclicky, function(e) {
				var el = $(this);

				//Stops ghost-click and bad placement of element
				//on clicks that would click the added element
				var lastclickpoint = el.attr('data-clickpoint');
				var curclickpoint = e.clientX+'x'+e.clientY;
				if (lastclickpoint == curclickpoint){
					return false;
				}
				el.attr('data-clickpoint',curclickpoint);
				e.preventDefault();
				e.stopImmediatePropagation();

				//Adds the elements at the point clicked with css
				el.append('<div class="clicked"></div>');
				var x = e.offsetX;
				var y = e.offsetY;
				var clicked = $('.clicked');
				clicked.css({
						'position': 'absolute',
						'top': y.toString() + 'px',
						'left': x.toString() + 'px',
						'width': '0',
						'height': '0',
						'border': '0px solid ' + options.colour,
						'box-shadow': shadow,
						'border-radius': '100%',
						'box-sizing': 'border-box',
						'-webkit-transition': 'none',
						'transition': 'none',
						'pointer-events': 'none',
						'z-index': Number.MAX_VALUE.toString()
				});

				//Animates circle to grow and fade at the same time
				//as well as removing the circle on animation complete
				clicked.animate({
						'top': (y - options.size).toString() + 'px',
						'left': (x - options.size).toString() + 'px',
						'border-width': options.size.toString() + 'px',
						'opacity': '0'
				}, options.speed, function() {
						$(this).remove();
				});

				//Animates the button itself with a slight opacity change
				//to have a better feel, button should not have the attr
				//style applied to it as this resets it
				if(options.buttonAnimation){
					el.css({
						'-webkit-transition': 'none',
						'transition': 'none'
					});
					el.stop().animate({
						'opacity': '0.8'
					}, options.speed * 0.25, function() {
						el.animate({
							'opacity': '1'
						}, options.speed * 0.75, function() {
							$(this).removeAttr('style');
						});
					});
				}
		});

}
