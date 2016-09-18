import WerneoPlugin from "../core/plugin.js";

class WerneoLists extends WerneoPlugin {
	
	constructor(){
		super();
		this.listItems = null;
	}

	handle(){
		var _this = this;

		_this.listItems = document.querySelectorAll('.list-item');
		if(_this.listItems.length > 0){
			for (let listItem of _this.listItems) {
				listItem.addEventListener('contextmenu',function(event){
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
	}

}

export default WerneoLists;
