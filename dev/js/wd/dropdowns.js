/* global werneo */

function WerneoDropdowns(){
	
	this.dropdownTriggers = null;
	this.dropdownOptions = null;

	WerneoDropdowns.prototype.toggle = function(dropdown){
		var siblings = dropdown.parentNode.childNodes;
		var i;

		dropdown.classList.toggle('active');
		for (i = 0; i < siblings.length; i++){
			if(siblings[i].nodeType === 1 && siblings[i] !== dropdown){
				siblings[i].classList.toggle('active');
			}
		}
	};

	WerneoDropdowns.prototype.select = function(option){
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
			var i;
			/// remove active class from everything in this dropdown
			if(activatedElements.length > 0){
				for (i = 0; i < activatedElements.length; i++){
					activatedElements[i].classList.remove('active');
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
	};

	WerneoDropdowns.prototype.handle = function(){
		var _this = this;
		var i;

		_this.dropdownTriggers = document.querySelectorAll('.dropdown-handle,.dropdown-value');
		if(_this.dropdownTriggers.length > 0){
			for (i = 0; i < _this.dropdownTriggers.length; i++) {
				_this.dropdownTriggers[i].addEventListener('click',function(){
					_this.toggle(this);
				});
			}
		}

		_this.dropdownOptions = document.querySelectorAll('.dropdown-option');
		if(_this.dropdownOptions.length > 0){
			for (i = 0; i < _this.dropdownOptions.length; i++) {
				_this.dropdownOptions[i].addEventListener('click',function(){
					_this.select(this);
				});
			}
		}
	};

	WerneoDropdowns.prototype.invoke = function(){
		var _this = this;

		document.addEventListener('DOMContentLoaded',function(){
			_this.handle()
		});
	};

}

/// register plugin to Werneo core
werneo.registerPlugin('dropdowns',new WerneoDropdowns());
