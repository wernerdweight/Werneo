class WerneoPlugin {

	invoke(){
		var _this = this;

		document.addEventListener('DOMContentLoaded',function(){
			_this.handle()
		});
	}

}
