/* global werneo, WerneoPlugin */

class WerneoTabs extends WerneoPlugin {
	
	constructor(){
		super();
		this.tabTriggers = null;
	}

	handle(){
		var _this = this;

		_this.tabTriggers = document.querySelectorAll('.tab-nav .nav');
		if(_this.tabTriggers.length > 0){
			for (let tabTrigger of _this.tabTriggers) {
				tabTrigger.addEventListener('click',function(event){
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
					for (let tab of tabs) {
						tab.classList.remove('active');
					}
					/// inactivate all triggers
					for (let trigger of triggers) {
						trigger.classList.remove('active');
					}
					/// activate current tab and trigger
					tabContainer.querySelector('.tab[data-id="' + this.dataset.target + '"]').classList.add('active');
					this.classList.add('active');
				});
			}
		}

	}

}

/// register plugin to Werneo core
werneo.registerPlugin('tabs',new WerneoTabs());
