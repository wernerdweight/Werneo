/* global werneo */

function WerneoDynaFilter(){
	
	this.dynaFilters = null;

	WerneoDynaFilter.prototype.toggle = function(trigger,triggers,target){
		var i;

		/// remove active class from all triggers
		for (i = 0; i < triggers.length; i++) {
			triggers[i].classList.remove('active');
		}
		/// hide items without respective class and show those that have it
		if(trigger.dataset.class !== null){
			if(trigger.dataset.class !== ''){
				/// hide items
				var itemsToHide = target.querySelectorAll('.dynafilter-item:not(.' + trigger.dataset.class + ')');
				for (i = 0; i < itemsToHide.length; i++) {
					itemsToHide[i].classList.add('dynafilter-hidden');
				}
			}

			/// show items
			var itemsToShow = target.querySelectorAll('.dynafilter-item' + (trigger.dataset.class !== '' ? '.' + trigger.dataset.class : ''));
			for (i = 0; i < itemsToShow.length; i++) {
				itemsToShow[i].classList.remove('dynafilter-hidden');
			}
		}
		/// add active class to current trigger
		trigger.classList.add('active');
	};

	WerneoDynaFilter.prototype.handle = function(){
		var _this = this;
		var i;
		var j;

		_this.dynaFilters = document.querySelectorAll('.dynafilter');
		if(_this.dynaFilters.length > 0){
			for (i = 0; i < _this.dynaFilters.length; i++) {
				var target = document.querySelector(_this.dynaFilters[i].dataset.target);
				var triggers = _this.dynaFilters[i].querySelectorAll('.dynafilter-trigger');

				if(target !== null && triggers.length > 0){
					for (j = 0; j < triggers.length; j++) {
						triggers[j].addEventListener('click',function(){
							_this.toggle(this,triggers,target);
						});
					}
				}
			}
		}
	};

	WerneoDynaFilter.prototype.invoke = function(){
		var _this = this;

		document.addEventListener('DOMContentLoaded',function(){
			_this.handle()
		});
	};

}

/// register plugin to Werneo core
werneo.registerPlugin('dynaFilter',new WerneoDynaFilter());
