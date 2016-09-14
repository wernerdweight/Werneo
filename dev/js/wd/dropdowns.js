/* global werneo, WerneoPlugin */

class WerneoDropdowns extends WerneoPlugin {
	
	constructor(){
		super();
		this.dropdownTriggers = null;
		this.dropdownOptions = null;
	}

	toggle(dropdown){
		var siblings = dropdown.parentNode.childNodes;

		dropdown.classList.toggle('active');
		for (let sibling of siblings){
			if(sibling.nodeType === 1 && sibling !== dropdown){
				sibling.classList.toggle('active');
			}
		}
	}

	select(option){
		/// get relevant dropdown
		var dropdown = option;
		while(null !== dropdown.parentElement && false === dropdown.classList.contains('dropdown')){
			dropdown = dropdown.parentElement;
		}

		/// get next sibling (exclude text nodes)
		var next = option.nextSibling;
		while(next !== null && next.nodeType !== 1){
			next = next.nextSibling;
		}

		if(next !== null && next.classList.contains('dropdown-level')){
			/// if option has children, show them
			next.classList.toggle('active');
		}
		else{
			var activatedElements = dropdown.querySelectorAll('.dropdown-option,.dropdown-value,.dropdown-level,.dropdown-list,.dropdown-handle');
			/// remove active class from everything in this dropdown
			if(activatedElements.length > 0){
				for (let activatedElement of activatedElements){
					activatedElement.classList.remove('active');
				}
			}
			/// add active class to selected option
			option.classList.add('active');

			/// update value with the data from selected option
			var newDropdownValue = (typeof option.dataset.label === typeof undefined ? option.innerHTML : option.dataset.label);
			dropdown.querySelector('.dropdown-value').innerHTML = newDropdownValue;

			/// update value of associated input field
			if(typeof dropdown.dataset.inputId !== typeof undefined){
				var associatedInput = document.querySelector('#' + dropdown.dataset.inputId);
				associatedInput.value = option.dataset.value;
				if(associatedInput.onchange !== null){
					associatedInput.onchange();
				}
				/// submit form if needed
				if(dropdown.dataset.submit === 'true'){
					var form = dropdown;
					while(null !== form.parentElement && form.nodeName !== 'FORM'){
						form = form.parentElement;
					}
					if(form !== null){
						form.submit();
					}
				}
			}
		}
	}

	handle(){
		var _this = this;

		_this.dropdownTriggers = document.querySelectorAll('.dropdown-handle,.dropdown-value');
		if(_this.dropdownTriggers.length > 0){
			for (let dropdownTrigger of _this.dropdownTriggers) {
				dropdownTrigger.addEventListener('click',function(){
					_this.toggle(this);
				});
			}
		}

		_this.dropdownOptions = document.querySelectorAll('.dropdown-option');
		if(_this.dropdownOptions.length > 0){
			for (let dropdownOption of _this.dropdownOptions) {
				dropdownOption.addEventListener('click',function(){
					_this.select(this);
				});
			}
		}
	}

}

/// register plugin to Werneo core
werneo.registerPlugin('dropdowns',new WerneoDropdowns());
