var fs = require("fs");
var path = require("path");

var jsEscape = require("js-string-escape");
var LessParser = require("less").Parser;

module.exports = {
	aliases:require("webant-handler-css").aliases,
	extensions:".less",
	handle:function(filePath,done){
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
				
				if (module.exports.settings && module.exports.settings.compress) {
					opts.compress = true;
				}
				
				var css = tree.toCSS(opts);
				
				done(null,'require("{css/addStylesheet}|sameChunkAs={entry}")("'+jsEscape(css.trim())+'");');
			});
		});
	}
};