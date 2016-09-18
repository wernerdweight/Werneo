import WerneoPlugin from "../core/plugin.js";

class WerneoDynaFilter extends WerneoPlugin {
	
	constructor(){
		super();
		this.dynaFilters = null;
	}

	toggle(trigger,triggers,target){
		/// remove active class from all triggers
		for (let trigger of triggers) {
			trigger.classList.remove('active');
		}
		/// hide items without respective class and show those that have it
		if(trigger.dataset.class !== null){
			if(trigger.dataset.class !== ''){
				/// hide items
				var itemsToHide = target.querySelectorAll('.dynafilter-item:not(.' + trigger.dataset.class + ')');
				for (let itemToHide of itemsToHide) {
					itemToHide.classList.add('dynafilter-hidden');
				}
			}

			/// show items
			var itemsToShow = target.querySelectorAll('.dynafilter-item' + (trigger.dataset.class !== '' ? '.' + trigger.dataset.class : ''));
			for (let itemToShow of itemsToShow) {
				itemToShow.classList.remove('dynafilter-hidden');
			}
		}
		/// add active class to current trigger
		trigger.classList.add('active');
	}

	handle(){
		var _this = this;

		_this.dynaFilters = document.querySelectorAll('.dynafilter');
		if(_this.dynaFilters.length > 0){
			for (let dynaFilter of _this.dynaFilters) {
				var target = document.querySelector(dynaFilter.dataset.target);
				var triggers = dynaFilter.querySelectorAll('.dynafilter-trigger');

				if(target !== null && triggers.length > 0){
					for (let trigger of triggers) {
						trigger.addEventListener('click',function(){
							_this.toggle(this,triggers,target);
						});
					}
				}
			}
		}
	}

}

export default WerneoDynaFilter;
