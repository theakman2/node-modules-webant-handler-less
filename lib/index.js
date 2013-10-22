var path = require("path");

var LessParser = require("less").Parser;

function Handler(settings) {
	var self = this;
	
	this.extensions = [".less"];
	this.requireTypes = ["comment","function"];
	this.requireAliases = {
		'@@css/addStylesheet':path.resolve(__dirname,"data/addStylesheet.js")
	};
	
	this.go = function(data,update,done) {
		var parser = new LessParser({
			paths:[path.dirname(data.filePath)]
		});
		
		parser.parse(data.content,function(err,tree){
			if (err) {
				done(err);
				return;
			}
			
			var opts = {};
			
			if (self.settings && self.settings.compress) {
				opts.compress = true;
			}
			
			var css = tree.toCSS(opts);
			
			if (data.requireType === "comment") {
				update({
					type:"internalCss",
					content:tree.toCSS(opts).trim()
				},done);	
			} else {
				update({
					type:"internalJs",
					content:'require("@@css/addStylesheet")('+self.makeString(css.replace(/\s+/g," ").trim())+');'
				},done);
			}
			
		});
	};
};

module.exports = Handler;