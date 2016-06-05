/* global werneo */

function WerneoTreeView(){
	
	this.nodes = null;

	WerneoTreeView.prototype.handle = function(){
		var _this = this;
		var i,j;

		_this.nodes = document.querySelectorAll('.tree-view .node > .label');
		if(_this.nodes.length > 0){
			for (i = 0; i < _this.nodes.length; i++) {
				_this.nodes[i].addEventListener('click',function(event){
					event.preventDefault();
					event.stopPropagation();

					var siblings = this.parentNode.childNodes;
					for (j = 0; j < siblings.length; j++) {
						if(siblings[j].nodeType === 1 && siblings[j].classList.contains('node')){
							siblings[j].classList.toggle('opened');
						}
					}
					this.classList.toggle('active');
				});
			}
		}

	};

	WerneoTreeView.prototype.invoke = function(){
		var _this = this;

		document.addEventListener('DOMContentLoaded',function(){
			_this.handle()
		});
	};

}

/// register plugin to Werneo core
werneo.registerPlugin('treeView',new WerneoTreeView());
