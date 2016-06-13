/*! werneo - v0.1.0 - 2016-06-13
* Copyright (c) 2016 ; Licensed  */
function Werneo(){this.plugins=[],this.pluginNames=[],this.registerPlugin=function(name,plugin){this.plugins[name]=plugin,this.pluginNames.push(name)},this.invoke=function(){var i;for(i=0;i<this.pluginNames.length;i++)this.plugins[this.pluginNames[i]].invoke()}}function WerneoDropdowns(){this.dropdownTriggers=null,this.dropdownOptions=null,WerneoDropdowns.prototype.toggle=function(dropdown){var i,siblings=dropdown.parentNode.childNodes;for(dropdown.classList.toggle("active"),i=0;i<siblings.length;i++)1===siblings[i].nodeType&&siblings[i]!==dropdown&&siblings[i].classList.toggle("active")},WerneoDropdowns.prototype.select=function(option){for(var dropdown=option;null!==dropdown.parentElement&&!1===dropdown.classList.contains("dropdown");)dropdown=dropdown.parentElement;for(var next=option.nextSibling;null!==next&&1!==next.nodeType;)next=next.nextSibling;if(null!==next&&next.classList.contains("dropdown-level"))next.classList.toggle("active");else{var i,activatedElements=dropdown.querySelectorAll(".dropdown-option,.dropdown-value,.dropdown-level,.dropdown-list,.dropdown-handle");if(activatedElements.length>0)for(i=0;i<activatedElements.length;i++)activatedElements[i].classList.remove("active");option.classList.add("active");var newDropdownValue="undefined"==typeof option.dataset.label?option.innerHTML:option.dataset.label;if(dropdown.querySelector(".dropdown-value").innerHTML=newDropdownValue,"undefined"!=typeof dropdown.dataset.inputId){var associatedInput=document.querySelector("#"+dropdown.dataset.inputId);if(associatedInput.value=option.dataset.value,null!==associatedInput.onchange&&associatedInput.onchange(),"true"===dropdown.dataset.submit){for(var form=dropdown;null!==form.parentElement&&"FORM"!==form.nodeName;)form=form.parentElement;null!==form&&form.submit()}}}},WerneoDropdowns.prototype.handle=function(){var i,_this=this;if(_this.dropdownTriggers=document.querySelectorAll(".dropdown-handle,.dropdown-value"),_this.dropdownTriggers.length>0)for(i=0;i<_this.dropdownTriggers.length;i++)_this.dropdownTriggers[i].addEventListener("click",function(){_this.toggle(this)});if(_this.dropdownOptions=document.querySelectorAll(".dropdown-option"),_this.dropdownOptions.length>0)for(i=0;i<_this.dropdownOptions.length;i++)_this.dropdownOptions[i].addEventListener("click",function(){_this.select(this)})},WerneoDropdowns.prototype.invoke=function(){var _this=this;document.addEventListener("DOMContentLoaded",function(){_this.handle()})}}function WerneoDynaFilter(){this.dynaFilters=null,WerneoDynaFilter.prototype.toggle=function(trigger,triggers,target){var i;for(i=0;i<triggers.length;i++)triggers[i].classList.remove("active");if(null!==trigger.dataset["class"]){if(""!==trigger.dataset["class"]){var itemsToHide=target.querySelectorAll(".dynafilter-item:not(."+trigger.dataset["class"]+")");for(i=0;i<itemsToHide.length;i++)itemsToHide[i].classList.add("dynafilter-hidden")}var itemsToShow=target.querySelectorAll(".dynafilter-item"+(""!==trigger.dataset["class"]?"."+trigger.dataset["class"]:""));for(i=0;i<itemsToShow.length;i++)itemsToShow[i].classList.remove("dynafilter-hidden")}trigger.classList.add("active")},WerneoDynaFilter.prototype.handle=function(){var i,j,_this=this;if(_this.dynaFilters=document.querySelectorAll(".dynafilter"),_this.dynaFilters.length>0)for(i=0;i<_this.dynaFilters.length;i++){var target=document.querySelector(_this.dynaFilters[i].dataset.target),triggers=_this.dynaFilters[i].querySelectorAll(".dynafilter-trigger");if(null!==target&&triggers.length>0)for(j=0;j<triggers.length;j++)triggers[j].addEventListener("click",function(){_this.toggle(this,triggers,target)})}},WerneoDynaFilter.prototype.invoke=function(){var _this=this;document.addEventListener("DOMContentLoaded",function(){_this.handle()})}}function WerneoFlashMessages(){this.queue=null,this.id=1,WerneoFlashMessages.prototype.dismiss=function(id){var _this=this;_this.queue.querySelector("#flash-message-"+id).classList.remove("active")},WerneoFlashMessages.prototype.show=function(id){var _this=this;_this.queue.querySelector("#flash-message-"+id).classList.add("active"),_this.queue.querySelector("#flash-message-"+id+"-close").addEventListener("click",function(){_this.dismiss(id)})},WerneoFlashMessages.prototype.getMessageHtml=function(content,type,id){var html='<div class="'+type+' flash-message" id="flash-message-'+id+'">';return html+=content,html+='<span class="close" id="flash-message-'+id+'-close">&times;</span>',html+="</div>"},WerneoFlashMessages.prototype.createMessage=function(content,type){var _this=this,id=_this.id++;_this.queue.innerHTML=_this.getMessageHtml(content,type,id)+_this.queue.innerHTML,setTimeout(function(){_this.show(id)},100),setTimeout(function(){_this.dismiss(id)},5100)},WerneoFlashMessages.prototype.invoke=function(){var _this=this;null===document.getElementById("flash-message-queue")&&(document.querySelector("body").innerHTML+='<div id="flash-message-queue" class="flash-message-queue"></div>'),_this.queue=document.getElementById("flash-message-queue")}}function WerneoGallery(){this.galleries=null,WerneoGallery.prototype.create=function(gallery){var lowest,i,j,galleryWidth=gallery.offsetWidth,items=gallery.querySelectorAll(".gallery-item"),images=[],rows=[],rowIndex=0,parameters={gutter:0,maxItemsPerLine:0,minHeight:-1,maxHeight:-1};if("undefined"!=typeof gallery.dataset.gutter&&null!==gallery.dataset.gutter&&(parameters.gutter=parseInt(gallery.dataset.gutter)),"undefined"!=typeof gallery.dataset.maxItemsPerLine&&null!==gallery.dataset.maxItemsPerLine&&(parameters.maxItemsPerLine=parseInt(gallery.dataset.maxItemsPerLine)),"undefined"!=typeof gallery.dataset.minHeight&&null!==gallery.dataset.minHeight&&(parameters.minHeight=parseInt(gallery.dataset.minHeight)),"undefined"!=typeof gallery.dataset.maxHeight&&null!==gallery.dataset.maxHeight&&(parameters.maxHeight=parseInt(gallery.dataset.maxHeight)),lowest=parameters.maxHeight,items.length>0)for(i=0;i<items.length;i++)images[i]=items[i].querySelector("img"),(0>lowest||lowest>images[i].naturalHeight)&&(lowest=images[i].naturalHeight);if(lowest<parameters.minHeight&&(lowest=parameters.minHeight),items.length>0)for(i=0;i<items.length;i++){"undefined"==typeof rows[rowIndex]&&(rows[rowIndex]={contentWidth:0,items:[]});var ratio=images[i].naturalWidth/images[i].naturalHeight,width=lowest*ratio;items[i].style.height=lowest+"px",items[i].style.width=width+"px",rows[rowIndex].contentWidth+=width,rows[rowIndex].items.push(i),(rows[rowIndex].contentWidth>galleryWidth||parameters.maxItemsPerLine>0&&parameters.maxItemsPerLine<=rows[rowIndex].items.length)&&rowIndex++}if(rows.length>0)for(i=0;i<rows.length;i++){var scaleRatio=galleryWidth/(rows[i].contentWidth+(rows[i].items.length-1)*parameters.gutter);if(rows[i].items.length>0){var counter=0;for(j=0;j<rows[i].items.length;j++){var scaledWidth=items[rows[i].items[j]].offsetWidth*scaleRatio,scaledHeight=items[rows[i].items[j]].offsetHeight*scaleRatio;counter+=scaledWidth,items[rows[i].items[j]].style.height=scaledHeight+"px",items[rows[i].items[j]].style.width=scaledWidth+"px",items[rows[i].items[j]].style.marginBottom=parameters.gutter+"px"}}}gallery.classList.add("showing")},WerneoGallery.prototype.handle=function(){var i,_this=this;if(_this.galleries=document.querySelectorAll(".gallery"),_this.galleries.length>0)for(i=0;i<_this.galleries.length;i++)_this.create(_this.galleries[i])},WerneoGallery.prototype.invoke=function(){var _this=this;window.addEventListener("load",function(){_this.handle()})}}function WerneoLists(){this.listItems=null,WerneoLists.prototype.handle=function(){var i,_this=this;if(_this.listItems=document.querySelectorAll(".list-item"),_this.listItems.length>0)for(i=0;i<_this.listItems.length;i++)_this.listItems[i].addEventListener("contextmenu",function(event){event.preventDefault(),event.stopPropagation();var checkbox=this.querySelector('input[type="checkbox"]');null!==checkbox&&!1===this.classList.contains("checked-disabled")&&(this.classList.toggle("checked"),checkbox.checked=this.classList.contains("checked"))})},WerneoLists.prototype.invoke=function(){var _this=this;document.addEventListener("DOMContentLoaded",function(){_this.handle()})}}function WerneoModalButtons(){this.modalTriggers=null,this.modalClosers=null,WerneoModalButtons.prototype.handle=function(){var i,_this=this;if(_this.modalTriggers=document.querySelectorAll(".modal-btn-trigger"),_this.modalTriggers.length>0)for(i=0;i<_this.modalTriggers.length;i++)_this.modalTriggers[i].addEventListener("click",function(event){event.preventDefault(),event.stopPropagation();var parent=this.parentNode,modalContent=parent.querySelector(".modal-btn-content"),offset=this.getBoundingClientRect();modalContent.classList.add("disable-transition"),modalContent.style.top=offset.top+"px",modalContent.style.left=offset.left+"px",modalContent.style.width=offset.width+"px",modalContent.style.height=offset.height+"px",setTimeout(function(){modalContent.classList.remove("disable-transition"),parent.classList.add("open"),"undefined"!=typeof modalContent.dataset.width&&(modalContent.style.width=modalContent.dataset.width,modalContent.style.left="50%",modalContent.style.marginLeft="-"+parseInt(modalContent.dataset.width)/2+modalContent.dataset.width.replace(/^[\d]+(.*)$/,"$1"),setTimeout(function(){modalContent.offsetWidth>window.innerWidth&&(modalContent.style.width="100%",modalContent.style.left=0,modalContent.style.marginLeft=0)},500)),"undefined"!=typeof modalContent.dataset.height&&(modalContent.style.height=modalContent.dataset.height,modalContent.style.top="50%",modalContent.style.marginTop="-"+parseInt(modalContent.dataset.height)/2+modalContent.dataset.height.replace(/^[\d]+(.*)$/,"$1"),setTimeout(function(){modalContent.offsetHeight>window.innerHeight&&(modalContent.style.height="100%",modalContent.style.top=0,modalContent.style.marginTop=0)},500))},50)});if(_this.modalClosers=document.querySelectorAll(".modal-btn-content .close"),_this.modalClosers.length>0)for(i=0;i<_this.modalClosers.length;i++)_this.modalClosers[i].addEventListener("click",function(event){event.preventDefault(),event.stopPropagation();for(var modalButton=this;null!==modalButton.parentElement&&!1===modalButton.classList.contains("modal-btn");)modalButton=modalButton.parentElement;var modalContent=modalButton.querySelector(".modal-btn-content"),offset=modalButton.getBoundingClientRect();modalContent.style.top=offset.top+"px",modalContent.style.left=offset.left+"px",modalContent.style.width=offset.width+"px",modalContent.style.height=offset.height+"px",modalContent.style.marginLeft=0,modalContent.style.marginTop=0,modalButton.classList.remove("open")})},WerneoModalButtons.prototype.invoke=function(){var _this=this;document.addEventListener("DOMContentLoaded",function(){_this.handle()})}}function WerneoModals(){this.modal=null,this.modalTriggers=null,this.modalClosers=null,WerneoModals.prototype.handle=function(){var i,_this=this;if(_this.modal=document.getElementById("modal-container"),_this.modalTriggers=document.querySelectorAll("[data-modal]"),_this.modalTriggers.length>0)for(i=0;i<_this.modalTriggers.length;i++)_this.modalTriggers[i].addEventListener("click",function(event){event.preventDefault(),_this.modal.classList.add("active"),_this.modal.classList.remove("medium"),_this.modal.classList.remove("large"),_this.modal.classList.remove("full"),_this.modal.classList.remove("tall"),_this.modal.classList.remove("wide"),"undefined"!=typeof this.dataset.size&&_this.modal.classList.add(this.dataset.size),"false"===this.dataset.close?_this.modal.querySelector(".modal > .close").style.display="none":_this.modal.querySelector(".modal > .close").style.display="block",_this.modal.querySelector(".modal > iframe").src=this.dataset.modal});if(_this.modalClosers=document.querySelectorAll(".modal > .close,#modal-container"),_this.modalClosers.length>0)for(i=0;i<_this.modalClosers.length;i++)_this.modalClosers[i].addEventListener("click",function(event){event.preventDefault();var iframe=_this.modal.querySelector(".modal > iframe");null!==iframe?(_this.modal.classList.remove("active"),iframe.src=""):_this.modal.classList.remove("active")})},WerneoModals.prototype.invoke=function(){var _this=this;document.addEventListener("DOMContentLoaded",function(){_this.handle()})}}function WerneoTabs(){this.tabTriggers=null,WerneoTabs.prototype.handle=function(){var i,j,_this=this;if(_this.tabTriggers=document.querySelectorAll(".tab-nav .nav"),_this.tabTriggers.length>0)for(i=0;i<_this.tabTriggers.length;i++)_this.tabTriggers[i].addEventListener("click",function(event){event.preventDefault(),event.stopPropagation();for(var tabContainer=this;null!==tabContainer.parentElement&&!1===tabContainer.classList.contains("tabs");)tabContainer=tabContainer.parentElement;var tabs=tabContainer.querySelectorAll(".tab"),triggers=tabContainer.querySelectorAll(".tab-nav .nav");for(j=0;j<tabs.length;j++)tabs[j].classList.remove("active");for(j=0;j<triggers.length;j++)triggers[j].classList.remove("active");tabContainer.querySelector('.tab[data-id="'+this.dataset.target+'"]').classList.add("active"),this.classList.add("active")})},WerneoTabs.prototype.invoke=function(){var _this=this;document.addEventListener("DOMContentLoaded",function(){_this.handle()})}}function WerneoTimeline(){this.milestones=null,this.offset=.8,WerneoTimeline.prototype.hideMilestones=function(){var i,j,_this=this;if(_this.milestones.length>0)for(i=0;i<_this.milestones.length;i++)if(_this.milestones[i].getBoundingClientRect().top>window.innerHeight*_this.offset){var animatedItems=_this.milestones[i].querySelectorAll(".timeline-milestone-icon, .timeline-milestone-content");if(animatedItems.length>0)for(j=0;j<animatedItems.length;j++)animatedItems[j].classList.add("hidden")}},WerneoTimeline.prototype.showMilestones=function(){var i,j,_this=this;if(_this.milestones.length>0)for(i=0;i<_this.milestones.length;i++)if(_this.milestones[i].getBoundingClientRect().top<=window.innerHeight*_this.offset&&_this.milestones[i].querySelector(".timeline-milestone-content").classList.contains("hidden")){var animatedItems=_this.milestones[i].querySelectorAll(".timeline-milestone-icon, .timeline-milestone-content");if(animatedItems.length>0)for(j=0;j<animatedItems.length;j++)animatedItems[j].classList.remove("hidden"),animatedItems[j].classList.add("animate")}},WerneoTimeline.prototype.handle=function(){var _this=this;_this.milestones=document.querySelectorAll(".timeline-milestone"),_this.hideMilestones(),window.addEventListener("scroll",function(){window.requestAnimationFrame?window.requestAnimationFrame(function(){_this.showMilestones()}):setTimeout(function(){_this.showMilestones()},100)})},WerneoTimeline.prototype.invoke=function(){var _this=this;document.addEventListener("DOMContentLoaded",function(){_this.handle()})}}function WerneoTreeView(){this.nodes=null,WerneoTreeView.prototype.handle=function(){var i,j,_this=this;if(_this.nodes=document.querySelectorAll(".tree-view .node > .label"),_this.nodes.length>0)for(i=0;i<_this.nodes.length;i++)_this.nodes[i].addEventListener("click",function(event){event.preventDefault(),event.stopPropagation();var siblings=this.parentNode.childNodes;for(j=0;j<siblings.length;j++)1===siblings[j].nodeType&&siblings[j].classList.contains("node")&&siblings[j].classList.toggle("opened");this.classList.toggle("active")})},WerneoTreeView.prototype.invoke=function(){var _this=this;document.addEventListener("DOMContentLoaded",function(){_this.handle()})}}var werneo=new Werneo;werneo.registerPlugin("dropdowns",new WerneoDropdowns),werneo.registerPlugin("dynaFilter",new WerneoDynaFilter),werneo.registerPlugin("flashMessages",new WerneoFlashMessages),werneo.registerPlugin("gallery",new WerneoGallery),werneo.registerPlugin("lists",new WerneoLists),werneo.registerPlugin("modalButtons",new WerneoModalButtons),werneo.registerPlugin("modals",new WerneoModals),werneo.registerPlugin("tabs",new WerneoTabs),werneo.registerPlugin("timeline",new WerneoTimeline),werneo.registerPlugin("treeView",new WerneoTreeView),werneo.invoke();