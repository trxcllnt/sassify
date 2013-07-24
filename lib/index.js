var through = require('through');
var sass = require('node-sass');

module.exports = function(file) {
	
	if (!/\.scss|\.sass/.test(file)) return through();
	
	var source = "";
	
	return through(function(chunk) {
	    source += chunk.toString();
	},
	function() {
		
	    var css = sass.renderSync(source);
	    
	    css = css.replace(/\"/g, "\\\"").replace(/\n/g, "\\\n");
	    
	    var compiled = "var css = '" + css + "'; (require('cssify2'))(css); module.exports = css;";
	    
    	this.queue(compiled);
    	this.queue(null);
  	});
};