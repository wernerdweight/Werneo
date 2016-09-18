import WerneoPlugin from "../core/plugin.js";

class WerneoNavigation extends WerneoPlugin {
	
	constructor(){
		super();
		this.navigations = null;
		this.currentPanes = null;
		this.navigationPanes = null;
		this.navigationPanesId = 0;
		this.navigationPaneOpeners = null;
		this.navigationTriggers = null;
	}

	insertNavigationPaneOpener(pane,parentPane,navigation){
		/// opener
		var openerChevron = document.createElement('div');
		openerChevron.classList.add('chevron');
		openerChevron.dataset.rotate = '-90deg';

		var opener = document.createElement('a');
		opener.href = '#';
		opener.classList.add('navigation-pane-opener');
		opener.dataset.navigationPane = pane.dataset.id;
		opener.dataset.title = pane.parentNode.querySelector('.navigation-item').textContent;

		opener.appendChild(openerChevron);
		pane.parentNode.insertBefore(opener,pane);

		/// closer
		var closerChevron = document.createElement('div');
		closerChevron.classList.add('chevron');
		closerChevron.dataset.rotate = '90deg';

		var closer = document.createElement('a');
		closer.href = '#';
		closer.id = 'navigation-pane-closer-' + pane.dataset.id;
		closer.classList.add('navigation-pane-opener');
		closer.dataset.navigationPane = parentPane.dataset.id;
		closer.dataset.title = parentPane.parentNode.querySelector('.navigation-header .title, .navigation-item').textContent;

		closer.appendChild(closerChevron);
		var header = navigation.querySelector('.navigation-header');
		header.appendChild(closer);
	}

	moveNavigationPane(pane,navigation){
		/// change position is DOM
		navigation.appendChild(pane);
	}

	prepareNavigationPanes(pane,level,navigation){
		var _this = this;

		/// current pane
		pane.id = 'nav-pane-' + _this.navigationPanesId;
		pane.dataset.id = _this.navigationPanesId;
		pane.style.left = (level * 100) + '%';
		pane.dataset.level = level;
		pane.dataset.navigationId = navigation.id;
		_this.navigationPanes[_this.navigationPanesId] = pane;

		_this.navigationPanesId++;

		/// sub-navigation panes
		var subPanes = pane.querySelectorAll('#' + pane.id + ' > li > ul');
		if(subPanes.length > 0){
			for (let subPane of subPanes) {
				/// prepare sub-navigation panes
				_this.prepareNavigationPanes(subPane,level + 1,navigation);
				/// insert sub-navigation opener (and closer)
				_this.insertNavigationPaneOpener(subPane,pane,navigation);
				/// move pane in DOM
				_this.moveNavigationPane(subPane,navigation);
			}
		}
	}

	prepareNavigation(){
		var _this = this;

		_this.navigations = document.querySelectorAll('.navigation > .navigation-container');
		if(_this.navigations.length > 0){
			_this.navigationPanes = [];
			_this.currentPanes = {};
			for (let navigation of _this.navigations) {
				var rootPane = navigation.querySelector('ul');
				var level = 0;

				rootPane.classList.add('active');
				_this.currentPanes[navigation.id] = rootPane;

				/// prepare all navigation panes and their sub-navigation panes
				_this.prepareNavigationPanes(rootPane,level,navigation);
			}
		}
	}

	activateNavigationPaneOpeners(){
		var _this = this;

		_this.navigationPaneOpeners = document.querySelectorAll('.navigation-pane-opener');
		if(_this.navigationPaneOpeners.length > 0){
			for (let navigationPaneOpener of _this.navigationPaneOpeners) {
				navigationPaneOpener.addEventListener('click',function(event){
					event.preventDefault();
					event.stopPropagation();

					/// change offset (animate navigation)
					var newPane = _this.navigationPanes[parseInt(this.dataset.navigationPane)];
					var navigation = newPane.parentNode;
					var currentCloser = navigation.querySelector('#navigation-pane-closer-' + _this.currentPanes[navigation.id].dataset.id);
					var newCloser = navigation.querySelector('#navigation-pane-closer-' + newPane.dataset.id);
					var currentLevel = parseInt(_this.currentPanes[navigation.id].dataset.level);
					var newLevel = parseInt(newPane.dataset.level);
					var delta = currentLevel > newLevel ? 100 : -100;
					/// animate all panes
					for (let navigationPane of _this.navigationPanes) {
						if(navigationPane.dataset.navigationId === navigation.id){
							navigationPane.style.left = (parseInt(navigationPane.style.left) + delta) + '%';
						}
					}
					/// currently active pane
					_this.currentPanes[navigation.id].classList.remove('active');
					if(null !== currentCloser){
						currentCloser.classList.remove('showing');
					}
					/// newly active pane
					_this.currentPanes[navigation.id] = newPane;
					_this.currentPanes[navigation.id].classList.add('active');
					navigation.querySelector('.navigation-header .title').textContent = this.dataset.title;
					if(null !== newCloser){
						newCloser.classList.add('showing');
					}
				});
			}
		}
	}

	navigationTriggerListener(event){
		event.preventDefault();
		event.stopPropagation();

		var target = document.querySelector('#' + this.dataset.navigationTrigger);
		var triggers = document.querySelectorAll('[data-navigation-trigger=' + this.dataset.navigationTrigger + ']');

		/// toggle active state
		if(triggers.length > 0){
			for (let trigger of triggers) {
				trigger.classList.toggle('active');
			}
			target.classList.toggle('active');
		}
	}

	activateNavigationTriggers(){
		var _this = this;

		_this.navigationTriggers = document.querySelectorAll('[data-navigation-trigger]');
		if(_this.navigationTriggers.length > 0){
			for (let navigationTrigger of _this.navigationTriggers) {
				navigationTrigger.addEventListener('click',_this.navigationTriggerListener);
			}
		}
	}

	handle(){
		var _this = this;

		/// prepare navigation
		_this.prepareNavigation();

		/// activate navigation pane openers
		_this.activateNavigationPaneOpeners();

		/// activate navigation triggers
		_this.activateNavigationTriggers();
	}

}

export default WerneoNavigation;
