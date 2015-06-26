function sec(i) {
	if (i.toString().length == 1) {
		return ('0' + i);
	} else {
		return i;
	}
}

exports.getDate = function() {
	var f = new Date();
	var month = ['января', 'февраля', 'марта',
		        'апреля', 'мая', 'июня',
		        'июля', 'августа', 'сентября',
		        'октября', 'ноября', 'декабря'];
	var now = {
		dd: sec(f.getDate()),
		mm: sec(f.getMonth() + 1),
		yyyy: sec(f.getFullYear()),
		min: sec(f.getMinutes()),
		hh: sec(f.getHours()),
		ss: sec(f.getSeconds())
	};
	var response = {
		date: now.dd + ' ' + month[now.mm - 1] + ' ' + now.yyyy,
		time: now.hh + ':' + now.min + ':' + now.ss,
		rest: now.dd + '.' + now.mm + '.' + now.yyyy + '; ' + now.hh + ':' + now.min + ':' + now.ss,
	};
	return (response);
};