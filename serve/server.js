var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic("../dist")).listen(7000, function(){
    console.log('Server running on 7000...');
});