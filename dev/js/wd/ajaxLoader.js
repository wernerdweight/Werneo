/* global werneo */

function WerneoAjaxLoader(){
	
	this.nodes = null;

	WerneoAjaxLoader.prototype.handle = function(){
		var _this = this;
		var i;

		_this.nodes = document.querySelectorAll('[data-ajax-load]');
		if(_this.nodes.length > 0){
			for (i = 0; i < _this.nodes.length; i++) {
				var index = i;
				var call = new XMLHttpRequest();
				call.onreadystatechange = function(){
					if(this.readyState === XMLHttpRequest.DONE && this.status === 200){
						if(typeof undefined !== typeof _this.nodes[index].dataset.replace && _this.nodes[index].dataset.replace === 'true'){
							var responseNode = document.createElement('div');
							responseNode.innerHTML = this.responseText;
							if(responseNode.childNodes.length > 0){
								var k;
								for (k = 0; k < responseNode.childNodes.length; k++) {
									_this.nodes[index].parentNode.insertBefore(responseNode.childNodes[k],_this.nodes[index]);
								}
							}
							_this.nodes[index].parentNode.removeChild(_this.nodes[index]);
						}
						else{
							_this.nodes[index].innerHTML = this.responseText;
						}
					}
				};
				call.onload = function(){
					if(typeof undefined !== typeof _this.nodes[index].dataset.callback){
						var callback = new Function(_this.nodes[index].dataset.callback);
						callback();
					}
				};
				call.open('GET',_this.nodes[index].dataset.ajaxLoad,true);
				call.send();
			}
		}

	};

	WerneoAjaxLoader.prototype.invoke = function(){
		var _this = this;

		document.addEventListener('DOMContentLoaded',function(){
			_this.handle()
		});
	};

}

/// register plugin to Werneo core
werneo.registerPlugin('ajaxLoader',new WerneoAjaxLoader());
