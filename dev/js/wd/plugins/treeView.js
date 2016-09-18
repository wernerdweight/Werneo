import WerneoPlugin from "../core/plugin.js";

class WerneoTreeView extends WerneoPlugin {
	
	constructor(){
		super();
		this.nodes = null;
	}

	handle(){
		var _this = this;

		_this.nodes = document.querySelectorAll('.tree-view .node > .label');
		if(_this.nodes.length > 0){
			for (let node of _this.nodes) {
				node.addEventListener('click',function(event){
					event.preventDefault();
					event.stopPropagation();

					var siblings = this.parentNode.childNodes;
					for (let sibling of siblings) {
						if(sibling.nodeType === 1 && sibling.classList.contains('node')){
							sibling.classList.toggle('opened');
						}
					}
					this.classList.toggle('active');
				});
			}
		}
	}

}

export default WerneoTreeView;
