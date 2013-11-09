var fs = require("fs");
var path = require("path");
var url = require("url");

var jsStringEscape = require("js-string-escape");
var LessParser = require("less").Parser;

function Handler(settings) {
	
	this.willHandle = function(filePath) {
		if (url.parse(filePath,false,true).host) {
			return false;
		}
		if (filePath === "@@css/addStylesheet") {
			return true;
		}
		if (filePath.indexOf("@@") === 0) {
			return false;
		}
		if (path.extname(filePath) === ".less") {
			return true;
		}
		return false;
	};
	
	this.handle = function(filePath,done) {
		if (filePath === "@@css/addStylesheet") {
			fs.readFile(__dirname+"/data/addStylesheet.js",function(e,c){
				if (e) {
					done(e);
					return;
				}
				done(null,c.toString());
			});
		} else {
			fs.readFile(filePath,function(e,c){
				if (e) {
					done(e);
					return;
				}
				
				var parser = new LessParser({
					paths:[path.dirname(filePath)]
				});
				
				parser.parse(c.toString(),function(err,tree){
					if (err) {
						done(err);
						return;
					}
					
					var opts = {};
					
					if (settings && settings.compress) {
						opts.compress = true;
					}
					
					var css = tree.toCSS(opts);
					
					done(null,'require("@@css/addStylesheet",function(add){ add("'+jsStringEscape(css.trim())+'"); });');
				});
			});
		}
	};
};

module.exports = Handler;