/* global werneo, WerneoPlugin */

class WerneoAjaxLoader extends WerneoPlugin {
	
	constructor(){
		super();
		this.nodes = null;
	}

	handle(){
		var _this = this;

		_this.nodes = document.querySelectorAll('[data-ajax-load]');
		if(_this.nodes.length > 0){
			for (let node of _this.nodes) {
				var call = new XMLHttpRequest();
				call.onreadystatechange = function(){
					if(this.readyState === XMLHttpRequest.DONE && this.status === 200){
						if(typeof undefined !== typeof node.dataset.replace && node.dataset.replace === 'true'){
							var responseNode = document.createElement('div');
							responseNode.innerHTML = this.responseText;
							if(responseNode.childNodes.length > 0){
								for (let childNode of responseNode.childNodes) {
									node.parentNode.insertBefore(childNode,node);
								}
							}
							node.parentNode.removeChild(node);
						}
						else{
							node.innerHTML = this.responseText;
						}
					}
				};
				call.onload = function(){
					if(typeof undefined !== typeof node.dataset.callback){
						var callback = new Function(node.dataset.callback);
						callback();
					}
				};
				call.open('GET',node.dataset.ajaxLoad,true);
				call.send();
			}
		}

	}

}

/// register plugin to Werneo core
werneo.registerPlugin('ajaxLoader',new WerneoAjaxLoader());
