
var locals = {},
	time = new Date().getTime();

locals.baseUrl = 'http://local.uploader.com/';

locals.staticUrl = locals.baseUrl;
locals.elementUrl = locals.baseUrl;
locals.version = time;

/*
* Exports locals
*/
module.exports = locals;
