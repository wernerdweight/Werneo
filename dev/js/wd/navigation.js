/* global werneo */

function WerneoNavigation(){
	
	this.navigations = null;
	this.currentPanes = null;
	this.navigationPanes = null;
	this.navigationPanesId = 0;
	this.navigationPaneOpeners = null;
	this.navigationTriggers = null;

	WerneoNavigation.prototype.insertNavigationPaneOpener = function(pane,parentPane,navigation){
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
	};

	WerneoNavigation.prototype.moveNavigationPane = function(pane,navigation){
		/// change position is DOM
		navigation.appendChild(pane);
	};

	WerneoNavigation.prototype.prepareNavigationPanes = function(pane,level,navigation){
		var _this = this;
		var i;

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
			for (i = 0; i < subPanes.length; i++) {
				/// prepare sub-navigation panes
				_this.prepareNavigationPanes(subPanes[i],level + 1,navigation);
				/// insert sub-navigation opener (and closer)
				_this.insertNavigationPaneOpener(subPanes[i],pane,navigation);
				/// move pane in DOM
				_this.moveNavigationPane(subPanes[i],navigation);
			}
		}
	};

	WerneoNavigation.prototype.prepareNavigation = function(){
		var _this = this;
		var i;

		_this.navigations = document.querySelectorAll('.navigation');
		if(_this.navigations.length > 0){
			_this.navigationPanes = [];
			_this.currentPanes = {};
			for (i = 0; i < _this.navigations.length; i++) {
				var rootPane = _this.navigations[i].querySelector('ul');
				var level = 0;

				rootPane.classList.add('active');
				_this.currentPanes[_this.navigations[i].id] = rootPane;

				/// prepare all navigation panes and their sub-navigation panes
				_this.prepareNavigationPanes(rootPane,level,_this.navigations[i]);
			}
		}
	};

	WerneoNavigation.prototype.activateNavigationPaneOpeners = function(){
		var _this = this;
		var i,j;

		_this.navigationPaneOpeners = document.querySelectorAll('.navigation-pane-opener');
		if(_this.navigationPaneOpeners.length > 0){
			for (i = 0; i < _this.navigationPaneOpeners.length; i++) {
				_this.navigationPaneOpeners[i].addEventListener('click',function(event){
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
					for (j = 0; j < _this.navigationPanes.length; j++) {
						if(_this.navigationPanes[j].dataset.navigationId === navigation.id){
							_this.navigationPanes[j].style.left = (parseInt(_this.navigationPanes[j].style.left) + delta) + '%';
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
	};

	WerneoNavigation.prototype.activateNavigationTriggers = function(){
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

	WerneoNavigation.prototype.handle = function(){
		var _this = this;

		/// prepare navigation
		_this.prepareNavigation();

		/// activate navigation pane openers
		_this.activateNavigationPaneOpeners();

		/// activate navigation triggers
		_this.activateNavigationTriggers();
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
