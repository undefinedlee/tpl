function tpl(template) {
	try {
		return new Function("Model", "var _$_ = [],model=Model;" + ("$>" + template.trim() + "<$").replace(/<\$\s*=\s*([\s\S]*?)\s*\$>/g, function (a, b) {
			return "<$ _$_.push(" + b + "); $>";
		}).replace(/\$>([\s\S]*?)<\$/g, function (a, b) {
			if (/^\s*$/.test(b))
				return "";
			else
				return "_$_.push('" + b.replace(/\\/g, "\\\\").replace(/[\r\t\n]/g, " ").replace(/'/g, "\\'") + "');";
		}) + "return _$_.join('');");
	} catch (e) {
		console.error(e);
		return function(){}
	}
}