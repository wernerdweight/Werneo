/* global werneo */

function WerneoNavigation(){
	
	this.navigationTriggers = null;

	WerneoNavigation.prototype.handle = function(){
		var _this = this;
		var i,j;

		_this.navigationTriggers = document.querySelectorAll('[data-navigation-trigger]');
		if(_this.navigationTriggers.length > 0){
			for (i = 0; i < _this.navigationTriggers.length; i++) {
				_this.navigationTriggers[i].addEventListener('click',function(event){
					event.preventDefault();
					event.stopPropagation();

					var target = document.querySelector('#' + this.dataset.navigationTrigger);
					var triggers = document.querySelectorAll('[data-navigation-trigger=' + this.dataset.navigationTrigger + ']');

					/// toggle active state
					if(triggers.length > 0){
						for (j = 0; j < triggers.length; j++) {
							triggers[j].classList.toggle('active');
						}
						target.classList.toggle('active');
					}
				});
			}
		}

	};

	WerneoNavigation.prototype.invoke = function(){
		var _this = this;

		document.addEventListener('DOMContentLoaded',function(){
			_this.handle()
		});
	};

}

/// register plugin to Werneo core
werneo.registerPlugin('navigation',new WerneoNavigation());
