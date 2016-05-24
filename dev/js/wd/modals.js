/* global werneo */

function WerneoModals(){
	
	this.modal = null;
	this.modalTriggers = null;
	this.modalClosers = null;

	WerneoModals.prototype.handle = function(){
		var _this = this;
		var i;

		_this.modal = document.getElementById('modal-container');

		_this.modalTriggers = document.querySelectorAll('[data-modal]');
		if(_this.modalTriggers.length > 0){
			for (i = 0; i < _this.modalTriggers.length; i++) {
				_this.modalTriggers[i].addEventListener('click',function(event){
					event.preventDefault();

					_this.modal.classList.add('active');
					/// change modal size (set default and optionally add class name)
					_this.modal.classList.remove('medium');
					_this.modal.classList.remove('large');
					_this.modal.classList.remove('full');
					_this.modal.classList.remove('tall');
					_this.modal.classList.remove('wide');
					if(typeof undefined !== typeof this.dataset.size){
						_this.modal.classList.add(this.dataset.size);
					}
					/// optionally hide close button (if action mandatory)
					if(this.dataset.close === 'false'){
						_this.modal.querySelector('.modal > .close').style.display = 'none';
					}
					else{
						_this.modal.querySelector('.modal > .close').style.display = 'block';
					}
					/// set iframe source
					_this.modal.querySelector('.modal > iframe').src = this.dataset.modal;
				});
			}
		}

		_this.modalClosers = document.querySelectorAll('.modal > .close,#modal-container');
		if(_this.modalClosers.length > 0){
			for (i = 0; i < _this.modalClosers.length; i++) {
				_this.modalClosers[i].addEventListener('click',function(event){
					event.preventDefault();

					var iframe = _this.modal.querySelector('.modal > iframe');
					/// if parent needs reloading, reload it
					if(iframe !== null){
						_this.modal.classList.remove('active');
						iframe.src = '';
					}
					/// otherwise just hide the iframe
					else{
						_this.modal.classList.remove('active');
					}
				});
			}
		}
	};

	WerneoModals.prototype.invoke = function(){
		var _this = this;

		document.addEventListener('DOMContentLoaded',function(){
			_this.handle()
		});
	};

}

/// register plugin to Werneo core
werneo.registerPlugin('modals',new WerneoModals());
