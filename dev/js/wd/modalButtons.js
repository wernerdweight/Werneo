/* global werneo */

function WerneoModalButtons(){
	
	this.modalTriggers = null;
	this.modalClosers = null;

	WerneoModalButtons.prototype.toggle = function(trigger,triggers,target){
		
	};

	WerneoModalButtons.prototype.handle = function(){
		var _this = this;
		var i;

		_this.modalTriggers = document.querySelectorAll('.modal-btn-trigger');
		if(_this.modalTriggers.length > 0){
			for (i = 0; i < _this.modalTriggers.length; i++) {
				_this.modalTriggers[i].addEventListener('click',function(event){
					event.preventDefault();
					event.stopPropagation();

					var parent = this.parentNode;
					var modalContent = parent.querySelector('.modal-btn-content');
					var offset = this.getBoundingClientRect();
					/// position the element to dwell directly under its trigger
					modalContent.classList.add('disable-transition');
					modalContent.style.top = offset.top + 'px';
					modalContent.style.left = offset.left + 'px';
					modalContent.style.width = offset.width + 'px';
					modalContent.style.height = offset.height + 'px';

					setTimeout(function(){
						modalContent.classList.remove('disable-transition');
						parent.classList.add('open');
					},50);
				});
			}
		}

		_this.modalClosers = document.querySelectorAll('.modal-btn-content .close');
		if(_this.modalClosers.length > 0){
			for (i = 0; i < _this.modalClosers.length; i++) {
				_this.modalClosers[i].addEventListener('click',function(event){
					event.preventDefault();
					event.stopPropagation();

					/// get relevant modal button
					var modalButton = this;
					while(null !== modalButton.parentElement && false === modalButton.classList.contains('modal-btn')){
						modalButton = modalButton.parentElement;
					}

					modalButton.classList.remove('open');
				});
			}
		}
	};

	WerneoModalButtons.prototype.invoke = function(){
		var _this = this;

		document.addEventListener('DOMContentLoaded',function(){
			_this.handle()
		});
	};

}

/// register plugin to Werneo core
werneo.registerPlugin('modalButton',new WerneoModalButtons());
