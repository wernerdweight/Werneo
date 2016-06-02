/* global werneo */

function WerneoTabs(){
	
	this.tabTriggers = null;

	WerneoTabs.prototype.handle = function(){
		var _this = this;
		var i,j;

		_this.tabTriggers = document.querySelectorAll('.tab-nav .nav');
		if(_this.tabTriggers.length > 0){
			for (i = 0; i < _this.tabTriggers.length; i++) {
				_this.tabTriggers[i].addEventListener('click',function(event){
					event.preventDefault();
					event.stopPropagation();

					/// get relevant tabs container, its tabs and triggers
					var tabContainer = this;
					while(null !== tabContainer.parentElement && false === tabContainer.classList.contains('tabs')){
						tabContainer = tabContainer.parentElement;
					}
					var tabs = tabContainer.querySelectorAll('.tab');
					var triggers = tabContainer.querySelectorAll('.tab-nav .nav');

					/// inactivate all tabs
					for (j = 0; j < tabs.length; j++) {
						tabs[j].classList.remove('active');
					}
					/// inactivate all triggers
					for (j = 0; j < triggers.length; j++) {
						triggers[j].classList.remove('active');
					}
					/// activate current tab and trigger
					tabContainer.querySelector('.tab[data-id="' + this.dataset.target + '"]').classList.add('active');
					this.classList.add('active');
				});
			}
		}

	};

	WerneoTabs.prototype.invoke = function(){
		var _this = this;

		document.addEventListener('DOMContentLoaded',function(){
			_this.handle()
		});
	};

}

/// register plugin to Werneo core
werneo.registerPlugin('tabs',new WerneoTabs());
