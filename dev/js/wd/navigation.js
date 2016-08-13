/* global werneo */

function WerneoNavigation(){
	
	this.navigations = null;
	this.currentPanes = null;
	this.navigationPanes = null;
	this.navigationPanesId = 0;
	this.navigationPaneOpeners = null;
	this.navigationTriggers = null;

	WerneoNavigation.prototype.insertNavigationPaneOpener = function(pane){
		var chevron = document.createElement('div');
		chevron.classList.add('chevron');
		chevron.dataset.rotate = '-90deg';

		var opener = document.createElement('a');
		opener.href = '#';
		opener.classList.add('navigation-pane-opener');
		opener.dataset.navigationPane = pane.dataset.id;

		opener.appendChild(chevron);
		pane.parentNode.insertBefore(opener,pane);
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
		_this.navigationPanes[_this.navigationPanesId] = pane;

		_this.navigationPanesId++;

		/// sub-navigation panes
		var subPanes = pane.querySelectorAll('#' + pane.id + ' > li > ul');
		if(subPanes.length > 0){
			for (i = 0; i < subPanes.length; i++) {
				/// prepare sub-navigation panes
				_this.prepareNavigationPanes(subPanes[i],level + 1,navigation);
				/// insert sub-navigation opener
				_this.insertNavigationPaneOpener(subPanes[i]);
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
					var currentLevel = parseInt(_this.currentPanes[navigation.id].dataset.level);
					var newLevel = parseInt(newPane.dataset.level);
					var delta = currentLevel > newLevel ? 100 : -100;
					_this.currentPanes[navigation.id].style.left = (parseInt(_this.currentPanes[navigation.id].style.left) + (Math.max(currentLevel,1) * delta)) + '%';
					_this.currentPanes[navigation.id].classList.remove('active');
					_this.currentPanes[navigation.id] = newPane;
					_this.currentPanes[navigation.id].classList.add('active');
					_this.currentPanes[navigation.id].style.left = (parseInt(_this.currentPanes[navigation.id].style.left) + (Math.max(newLevel,1) * delta)) + '%';
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

		console.log(_this);

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
