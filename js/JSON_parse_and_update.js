exports.config_read = function(){
	var config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
	return(config);
};


in_array(request.path, config.requests_allowed.path) ? function() {
    fs.readFile((path + request.path), function(err, data) {
        if (err) {
            res.writeHead(404, t.html);
            res.end(fourtyfour);
        } 
        res.writeHead(200, "t." + request.path);
    }
} : function() {
    var r;
    r = request.path == '/' ? '/main' : request.path;
    fs.readFile((index + r + '.html'), function(err, html) {
        if (err) {
            res.writeHead(404, t.html);
            res.end(fourtyfour);
        }
        res.writeHead(200, t.html);
        res.end(html);
    });
};