/* global werneo */

function WerneoGallery(){
	
	this.galleries = null;

	WerneoGallery.prototype.create = function(gallery){
		var galleryWidth = gallery.offsetWidth;						/// total current width of the gallery container
		var gutter = 0;												/// margin between items
		var items = gallery.querySelectorAll('.gallery-item');		/// items of the gallery
		var images = [];											/// array to hold images
		var lowest = -1;											/// holds height of the lowest image from images
		var rows = [];												/// array of rows (images that will end up displayed in the same row)
		var rowIndex = 0;											/// index of rows
		var i,j;													/// iterators

		if(typeof gallery.dataset.gutter !== typeof undefined && gallery.dataset.gutter !== null){
			gutter = parseInt(gallery.dataset.gutter);
		}

		if(items.length > 0){
			for (i = 0; i < items.length; i++) {
				images[i] = items[i].querySelector('img');
				if(lowest < 0 || lowest > images[i].naturalHeight){
					lowest = images[i].naturalHeight;
				}
			}
		}

		if(items.length > 0){
			for (i = 0; i < items.length; i++) {
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
				items[i].style.height = lowest + 'px';
				items[i].style.width = width + 'px';
				/// save row data
				rows[rowIndex].contentWidth += width;
				rows[rowIndex].items.push(i);
				if(rows[rowIndex].contentWidth > galleryWidth){
					rowIndex++;
				}
			}
		}

		if(rows.length > 0){
			for (i = 0; i < rows.length; i++) {
				/// calculate ratio to shrink items by
				var scaleRatio = galleryWidth / (rows[i].contentWidth + ((rows[i].items.length - 1) * gutter));
				console.log('r' + i + ': ' + (rows[i].contentWidth - galleryWidth));
				if(rows[i].items.length > 0){
					var counter = 0;
					for (j = 0; j < rows[i].items.length; j++) {
						/// calculate scaled dimensions
						var scaledWidth = items[rows[i].items[j]].offsetWidth * scaleRatio;
						var scaledHeight = items[rows[i].items[j]].offsetHeight * scaleRatio;
						console.log('w: ' + items[rows[i].items[j]].offsetWidth + ' -> ' + scaledWidth + 'px');
						//console.log('h: ' + items[rows[i].items[j]].offsetHeight + ' -> ' + scaledHeight + 'px');
						counter += scaledWidth;
						/// set new dimensions
						items[rows[i].items[j]].style.height = scaledHeight + 'px';
						items[rows[i].items[j]].style.width = scaledWidth + 'px';
						items[rows[i].items[j]].style.marginBottom = gutter + 'px';
					}
					console.log(counter);
				}
			}
		}

		gallery.classList.add('showing');
	};

	WerneoGallery.prototype.handle = function(){
		var _this = this;
		var i;

		_this.galleries = document.querySelectorAll('.gallery');
		if(_this.galleries.length > 0){
			for (i = 0; i < _this.galleries.length; i++) {
				_this.create(_this.galleries[i]);
			}
		}
	};

	WerneoGallery.prototype.invoke = function(){
		var _this = this;

		window.addEventListener('load',function(){
			_this.handle()
		});
	};

}

/// register plugin to Werneo core
werneo.registerPlugin('gallery',new WerneoGallery());
