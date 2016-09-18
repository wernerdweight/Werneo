import WerneoPlugin from "../core/plugin.js";

class WerneoModalButtons extends WerneoPlugin {
	
	constructor(){
		super();
		this.modalTriggers = null;
		this.modalClosers = null;
	}

	handle(){
		var _this = this;

		_this.modalTriggers = document.querySelectorAll('.modal-btn-trigger');
		if(_this.modalTriggers.length > 0){
			for (let modalTrigger of _this.modalTriggers) {
				modalTrigger.addEventListener('click',function(event){
					event.preventDefault();
					event.stopPropagation();

					var parent = this.parentNode;
					var modalContent = parent.querySelector('.modal-btn-content');
					var offset = this.getBoundingClientRect();
					var modalBody = modalContent.querySelector('.body');
					var modalHeader = modalContent.querySelector('.header');
					var modalFooter = modalContent.querySelector('.footer');
					/// position the element to dwell directly under its trigger
					modalContent.classList.add('disable-transition');
					modalContent.style.top = offset.top + 'px';
					modalContent.style.left = offset.left + 'px';
					modalContent.style.width = offset.width + 'px';
					modalContent.style.height = offset.height + 'px';

					setTimeout(function(){
						modalContent.classList.remove('disable-transition');
						parent.classList.add('open');
						/// set width
						if(typeof modalContent.dataset.width !==  typeof undefined){
							modalContent.style.width = modalContent.dataset.width;
							modalContent.style.left = '50%';
							modalContent.style.marginLeft = '-' + (parseInt(modalContent.dataset.width) / 2) + modalContent.dataset.width.replace(/^[\d]+(.*)$/,'$1');
							/// set full width if resulting modal is wider than viewport
							setTimeout(function(){
								if(modalContent.offsetWidth > window.innerWidth){
									modalContent.style.width = '100%';
									modalContent.style.left = 0;
									modalContent.style.marginLeft = 0;
								}
							},500);
						}
						/// set height
						if(typeof modalContent.dataset.height !== typeof undefined){
							modalContent.style.height = modalContent.dataset.height;
							modalContent.style.top = '50%';
							modalContent.style.marginTop = '-' + (parseInt(modalContent.dataset.height) / 2) + modalContent.dataset.height.replace(/^[\d]+(.*)$/,'$1');
							/// set full height if resulting modal is higher than viewport
							setTimeout(function(){
								if(modalContent.offsetHeight > window.innerHeight){
									modalContent.style.height = '100%';
									modalContent.style.top = 0;
									modalContent.style.marginTop = 0;
								}
								/// adjust body height if modal has body
								if(null !== modalBody){
									var headerHeight = (null !== modalHeader ? modalHeader.getBoundingClientRect().height : 0);
									var footerHeight = (null !== modalFooter ? modalFooter.getBoundingClientRect().height : 0);
									var modalHeight = modalContent.getBoundingClientRect().height;
									modalBody.style.height = (modalHeight - (headerHeight + footerHeight)) + 'px';
								}
							},500);
						}
					},50);
				});
			}
		}

		_this.modalClosers = document.querySelectorAll('.modal-btn-content .close');
		if(_this.modalClosers.length > 0){
			for (let modalCloser of _this.modalClosers) {
				modalCloser.addEventListener('click',function(event){
					event.preventDefault();
					event.stopPropagation();

					/// get relevant modal button
					var modalButton = this;
					while(null !== modalButton.parentElement && false === modalButton.classList.contains('modal-btn')){
						modalButton = modalButton.parentElement;
					}

					var modalContent = modalButton.querySelector('.modal-btn-content');
					var offset = modalButton.getBoundingClientRect();
					/// position the element to dwell directly under its trigger
					modalContent.style.top = offset.top + 'px';
					modalContent.style.left = offset.left + 'px';
					modalContent.style.width = offset.width + 'px';
					modalContent.style.height = offset.height + 'px';
					modalContent.style.marginLeft = 0;
					modalContent.style.marginTop = 0;
					modalButton.classList.remove('open');
				});
			}
		}
	}

}

export default WerneoModalButtons;
