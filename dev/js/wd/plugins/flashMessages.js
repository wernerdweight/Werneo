import WerneoPlugin from "../core/plugin.js";

class WerneoFlashMessages extends WerneoPlugin {
	
	constructor() {
		super();
		this.queue = null;
		this.id = 1;
	}

	dismiss(id) {
		let _this = this;

		_this.queue.querySelector(`#flash-message-${id}`).classList.remove('active');
	}

	show(id) {
		let _this = this;

		_this.queue.querySelector(`#flash-message-${id}`).classList.add('active');
		/// enable listener to dismiss message
		_this.queue.querySelector(`#flash-message-${id}-close`).addEventListener('click', () => {
			_this.dismiss(id);
		});
	}

	getMessage(content, type, id) {
		let node = document.createElement('div');
		node.classList.add(type);
		node.classList.add(`flash-message`);
		node.id = `flash-message-${id}`;
		node.innerHTML = `<span class="close" id="flash-message-${id}-close">&times;</span>${content}`;
		return node;
	}

	createMessage(content, type, timeout = 5000) {
		let _this = this;
		let id = _this.id++;
		let delay = 100;
		
		/// add flash message into the queue
		_this.queue.insertBefore(_this.getMessage(content, type, id), _this.queue.firstChild);

		/// activate message
		setTimeout(() => {
			_this.show(id);
		}, delay);

		/// automatically dismiss message after [timeout] ms
		if(parseInt(timeout) > 0) {
			setTimeout(() => {
				_this.dismiss(id);
			}, parseInt(timeout) + delay);
		}
	}

	invoke() {
		let _this = this;

		/// append queue if not present
		if(null === document.getElementById('flash-message-queue')) {
			document.querySelector('body').innerHTML += `<div id="flash-message-queue" class="flash-message-queue"></div>`;
		}
		_this.queue = document.getElementById('flash-message-queue');
	}

}

export default WerneoFlashMessages;
