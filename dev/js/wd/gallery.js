/* global werneo, WerneoPlugin */

class WerneoGallery extends WerneoPlugin {
	
	constructor(){
		super();
		this.galleries = null;
	}

	create(gallery){
		var galleryWidth = gallery.offsetWidth;						/// total current width of the gallery container
		var items = gallery.querySelectorAll('.gallery-item');		/// items of the gallery
		var images = [];											/// array to hold images
		var lowest;													/// holds height of the lowest image from images
		var rows = [];												/// array of rows (images that will end up displayed in the same row)
		var rowIndex = 0;											/// index of rows

		var parameters = {
			'gutter': 0,
			'maxItemsPerLine': 0,
			'minHeight': -1,
			'maxHeight': -1,
		};

		/// extend parameters
		if(typeof gallery.dataset.gutter !== typeof undefined && gallery.dataset.gutter !== null){
			parameters.gutter = parseInt(gallery.dataset.gutter);
		}
		if(typeof gallery.dataset.maxItemsPerLine !== typeof undefined && gallery.dataset.maxItemsPerLine !== null){
			parameters.maxItemsPerLine = parseInt(gallery.dataset.maxItemsPerLine);
		}
		if(typeof gallery.dataset.minHeight !== typeof undefined && gallery.dataset.minHeight !== null){
			parameters.minHeight = parseInt(gallery.dataset.minHeight);
		}
		if(typeof gallery.dataset.maxHeight !== typeof undefined && gallery.dataset.maxHeight !== null){
			parameters.maxHeight = parseInt(gallery.dataset.maxHeight);
		}

		lowest = parameters.maxHeight;

		if(items.length > 0){
			let i = 0;
			for (let item of items) {
				images[i] = item.querySelector('img');
				if(lowest < 0 || lowest > images[i].naturalHeight){
					lowest = images[i].naturalHeight;
				}
				i++;
			}
		}

		if(lowest < parameters.minHeight){
			lowest = parameters.minHeight;
		}

		if(items.length > 0){
			let i = 0;
			for (let item of items) {
				/// initialize row
				if(typeof rows[rowIndex] === typeof undefined){
					rows[rowIndex] = {
						'contentWidth': 0,
						'items': [],
					};
				}
				/// calculate and width
				var ratio = images[i].naturalWidth / images[i].naturalHeight;
				var width = (lowest * ratio);
				item.style.height = lowest + 'px';
				item.style.width = width + 'px';
				/// save row data
				rows[rowIndex].contentWidth += width;
				rows[rowIndex].items.push(i);
				if(rows[rowIndex].contentWidth > galleryWidth || (parameters.maxItemsPerLine > 0 && parameters.maxItemsPerLine <= rows[rowIndex].items.length)){
					rowIndex++;
				}
				i++;
			}
		}

		if(rows.length > 0){
			for (let row of rows) {
				/// calculate ratio to shrink items by
				var scaleRatio = galleryWidth / (row.contentWidth + ((row.items.length - 1) * parameters.gutter));
				if(row.items.length > 0){
					var counter = 0;
					for (let item of row.items) {
						/// calculate scaled dimensions
						var scaledWidth = items[item].offsetWidth * scaleRatio;
						var scaledHeight = items[item].offsetHeight * scaleRatio;
						counter += scaledWidth;
						/// set new dimensions
						items[item].style.height = scaledHeight + 'px';
						items[item].style.width = scaledWidth + 'px';
						items[item].style.marginBottom = parameters.gutter + 'px';
					}
				}
			}
		}

		gallery.classList.add('showing');
	}

	handle(){
		var _this = this;

		_this.galleries = document.querySelectorAll('.gallery');
		if(_this.galleries.length > 0){
			for (let gallery of _this.galleries) {
				_this.create(gallery);
			}
		}
	}

	invoke(){
		var _this = this;

		window.addEventListener('load',function(){
			_this.handle()
		});
	}

}

/// register plugin to Werneo core
werneo.registerPlugin('gallery',new WerneoGallery());
