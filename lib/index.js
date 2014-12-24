var fs = require("fs");
var path = require("path");

var jsEscape = require("js-string-escape");
var less = require("less");

function LessHandler() {
	this.settings = {
		compress:false
	};
}

LessHandler.prototype = {
	extensions:".less",
	handle:function(filePath,done){
		var _this = this;
		fs.readFile(filePath,function(e,c){
			if (e) {
				done(e);
				return;
			}
			
			var opts = {
				paths:[path.dirname(filePath)],
				compress:_this.settings.compress
			};
			
			less.render(c.toString(),opts,function(err,output){
				if (err) {
					done(err);
					return;
				}
				done(
					null,
					'module.exports = "' + jsEscape(output.css.trim()) + '";'
				);
			});
		});
	}
};

module.exports = LessHandler;