/* global werneo, WerneoPlugin */

class WerneoBreadcrumbs extends WerneoPlugin {
	
	constructor(){
		super();
		this.breadcrumbs = null;
		this.subcrumbs = null;
		this.subcrumbTriggers = null;
		this.activeSubcrumb = null;
		this.activeSubcrumbTrigger = null;
	}

	insertSubcrumbOpener(subcrumb){
		/// opener
		var openerChevron = document.createElement('div');
		openerChevron.classList.add('chevron');
		openerChevron.classList.add('sm');

		var opener = document.createElement('a');
		opener.href = '#';
		opener.classList.add('subcrumb-trigger');

		opener.appendChild(openerChevron);
		subcrumb.parentNode.insertBefore(opener,subcrumb);
	}

	prepareSubcrumbs(breadcrumb){
		var _this = this;

		/// sub-navigation panes
		_this.subcrumbs = breadcrumb.querySelectorAll('ul');
		if(_this.subcrumbs.length > 0){
			for (let subcrumb of _this.subcrumbs) {
				/// insert subcrumb opener
				_this.insertSubcrumbOpener(subcrumb);
			}
		}
	}

	prepareBreadcrumbs(){
		var _this = this;

		_this.breadcrumbs = document.querySelectorAll('.breadcrumbs');
		if(_this.breadcrumbs.length > 0){
			_this.subcrumbs = [];
			for (let breadcrumb of _this.breadcrumbs) {
				/// prepare all subcrumbs for current breadcrumb
				_this.prepareSubcrumbs(breadcrumb);
			}
		}
	}

	activateSubcrumbTriggers(){
		var _this = this;

		_this.subcrumbTriggers = document.querySelectorAll('.subcrumb-trigger');
		if(_this.subcrumbTriggers.length > 0){
			for (let subcrumbTrigger of _this.subcrumbTriggers) {
				subcrumbTrigger.addEventListener('click',function(event){
					event.preventDefault();
					event.stopPropagation();

					var subcrumb = subcrumbTrigger.nextSibling;

					/// hide all panes
					if(null !== _this.activeSubcrumb && subcrumb !== _this.activeSubcrumb){
						_this.activeSubcrumb.classList.remove('active');
						_this.activeSubcrumbTrigger.classList.remove('active');
					}
					subcrumb.classList.toggle('active');
					subcrumbTrigger.classList.toggle('active');
					_this.activeSubcrumb = subcrumb;
					_this.activeSubcrumbTrigger = subcrumbTrigger;
				});
			}
		}
	}

	handle(){
		var _this = this;

		/// prepare subcrumbs
		_this.prepareBreadcrumbs();
		/// activate subcrumb openers
		_this.activateSubcrumbTriggers();
	}

}

/// register plugin to Werneo core
werneo.registerPlugin('breadcrumbs',new WerneoBreadcrumbs());
