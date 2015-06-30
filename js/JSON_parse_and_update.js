exports.config_read = function(){
	var config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
	return(config);
};