class Werneo {

	constructor(){
		this.plugins = [];
		this.pluginNames = [];
	}

	registerPlugin(name,plugin){
		this.plugins[name] = plugin;
		this.pluginNames.push(name);
	}

	invoke(){
		for (let pluginName of this.pluginNames) {
			this.plugins[pluginName].invoke();
		}
	}

}

var werneo = new Werneo();
