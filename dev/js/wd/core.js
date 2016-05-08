function Werneo(){

	this.plugins = [];
	this.pluginNames = [];

	this.registerPlugin = function(name,plugin){
		this.plugins[name] = plugin;
		this.pluginNames.push(name);
	};

	this.invoke = function(){
		var i;
		for (i = 0; i < this.pluginNames.length; i++) {
			this.plugins[this.pluginNames[i]].invoke();
		}
	};

}

var werneo = new Werneo();
