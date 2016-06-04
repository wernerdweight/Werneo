/* global werneo */

function WerneoTimeline(){
	
	this.milestones = null;
	this.offset = 0.8;

	WerneoTimeline.prototype.hideMilestones = function(){
		var _this = this;
		var i,j;

		if(_this.milestones.length > 0){
			for (i = 0; i < _this.milestones.length; i++) {
				if(_this.milestones[i].getBoundingClientRect().top > window.innerHeight * _this.offset){
					var animatedItems = _this.milestones[i].querySelectorAll('.timeline-milestone-icon, .timeline-milestone-content');
					if(animatedItems.length > 0){
						for (j = 0; j < animatedItems.length; j++) {
							animatedItems[j].classList.add('hidden');
						}
					}
				}
			}
		}
	}

	WerneoTimeline.prototype.showMilestones = function(){
		var _this = this;
		var i,j;

		if(_this.milestones.length > 0){
			for (i = 0; i < _this.milestones.length; i++) {
				if(_this.milestones[i].getBoundingClientRect().top <= window.innerHeight * _this.offset && _this.milestones[i].querySelector('.timeline-milestone-content').classList.contains('hidden')){
					var animatedItems = _this.milestones[i].querySelectorAll('.timeline-milestone-icon, .timeline-milestone-content');
					if(animatedItems.length > 0){
						for (j = 0; j < animatedItems.length; j++) {
							animatedItems[j].classList.remove('hidden');
							animatedItems[j].classList.add('animate');
						}
					}
				}
			}
		}
	}

	WerneoTimeline.prototype.handle = function(){
		var _this = this;

		_this.milestones = document.querySelectorAll('.timeline-milestone');

		/// hide milestones outside the viewport
		_this.hideMilestones();

		/// animate milestones when they enter the viewport on scroll
		window.addEventListener('scroll',function(){
			if(!window.requestAnimationFrame){
				setTimeout(function(){
					_this.showMilestones();
				},100);
			}
			else{
				window.requestAnimationFrame(function(){
					_this.showMilestones();
				});
			}
		});

	};

	WerneoTimeline.prototype.invoke = function(){
		var _this = this;

		document.addEventListener('DOMContentLoaded',function(){
			_this.handle()
		});
	};

}

/// register plugin to Werneo core
werneo.registerPlugin('timeline',new WerneoTimeline());
