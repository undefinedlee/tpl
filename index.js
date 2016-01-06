function tpl(template) {
	try {
		return new Function("Model", "var _$_ = [],model=Model;" + ("$>" + template + "<$").replace(/<\$\s*=\s*([\s\S]*?)\s*\$>/g, function (a, b) {
			return "<$ _$_.push(" + b + "); $>";
		}).replace(/\$>([\s\S]*?)<\$/g, function (a, b) {
			return "_$_.push('" + b.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/'/g, "\\'") + "');";
		}) + "return _$_.join('');");
	} catch (e) {
		console.error(e);
		return function(){}
	}
}