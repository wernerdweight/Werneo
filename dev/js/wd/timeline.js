/* global werneo, WerneoPlugin */

class WerneoTimeline extends WerneoPlugin {
	
	constructor(){
		super();
		this.milestones = null;
		this.offset = 0.8;
	}

	hideMilestones(){
		var _this = this;

		if(_this.milestones.length > 0){
			for (let milestone of _this.milestones) {
				if(milestone.getBoundingClientRect().top > window.innerHeight * _this.offset){
					var animatedItems = milestone.querySelectorAll('.timeline-milestone-icon, .timeline-milestone-content');
					if(animatedItems.length > 0){
						for (let animatedItem of animatedItems) {
							animatedItem.classList.add('hidden');
						}
					}
				}
			}
		}
	}

	showMilestones(){
		var _this = this;

		if(_this.milestones.length > 0){
			for (let milestone of _this.milestones) {
				if(milestone.getBoundingClientRect().top <= window.innerHeight * _this.offset && milestone.querySelector('.timeline-milestone-content').classList.contains('hidden')){
					var animatedItems = milestone.querySelectorAll('.timeline-milestone-icon, .timeline-milestone-content');
					if(animatedItems.length > 0){
						for (let animatedItem of animatedItems) {
							animatedItem.classList.remove('hidden');
							animatedItem.classList.add('animate');
						}
					}
				}
			}
		}
	}

	handle(){
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

	}

}

/// register plugin to Werneo core
werneo.registerPlugin('timeline',new WerneoTimeline());
