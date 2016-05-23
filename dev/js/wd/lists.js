/* global werneo */

function WerneoLists(){
	
	this.listItems = null;

	WerneoLists.prototype.handle = function(){
		var _this = this;
		var i;

		_this.listItems = document.querySelectorAll('.list-item');
		if(_this.listItems.length > 0){
			for (i = 0; i < _this.listItems.length; i++) {
				_this.listItems[i].addEventListener('contextmenu',function(event){
					event.preventDefault();
					event.stopPropagation();

					var checkbox = this.querySelector('input[type="checkbox"]');

					if(checkbox !== null && false === this.classList.contains('checked-disabled')){
						this.classList.toggle('checked');
						checkbox.checked = this.classList.contains('checked');
					}
				});
			}
		}

	};

	WerneoLists.prototype.invoke = function(){
		var _this = this;

		document.addEventListener('DOMContentLoaded',function(){
			_this.handle()
		});
	};

}

/// register plugin to Werneo core
werneo.registerPlugin('lists',new WerneoLists());
