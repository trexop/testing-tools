var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    // = require(''), ещё какой-нибудь модуль подключить можно
    date = require('./js/DatePlain'),
    http = require('http'),
    https = require("https"),
    open = require('./js/Open');

var config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

var start = date.getDate().rest.toString(), // дата и время запуска сервера
    host = config.host,
    port = config.port;

// относительные пути к файлам
var path = './',
    css = './css/global.css',
    index = './html',
    images = './html/images/',
    fonts = './fonts/'
    fourtyfour = read('./html/404.html').content,
    hashes = ['md5', 'sha1', 'sha256', 'sha224'];

var t = { // типы контента отдельно
    plain: {'content-type': 'text/plain'},
    html: {'content-type': 'text/html'},
    css: {'content-type': 'text/css'},
    js: {'content-type': 'text/javascript'},
    svg: {'content-type': 'image/svg+xml'}
};

function in_array(what, where) { // проверяет, есть ли значение в массиве
    for (var i=0; i < where.length; i++) // ещё пригодится много раз
        if(what == where[i])
            return true;
    return false;
}
function contains(what, where) {
    if(what.indexOf(where.toString()) != -1){
        return true;
    } else { return false; }
}
function random(min, max, type) {
    if (type == 'int') {
        return Math.floor(Math.random()*(max - min +1)) + min;
    } else {
        return Math.random() * (max - min) + min;
    }
}
// читает любой файл, возвращает ассоциативный массив
// с расширением и содержимым. Доступ через точку
function read(f) {
    var file = {
        type: 'text/' + f.substring(f.lastIndexOf('.') + 1),
        content: fs.readFileSync(f, 'utf-8')
    };
    return (file);
}

var myPublicIp = function(){
    http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
        resp.on('data', function(ip) {
            return(ip.toString());
        });
    });
};

(function() { // основная функция. Оставить одну пару if/else на каждый тип запроса. Остальное нахуй.
    http.createServer(function(req, res) { // объект сервера с req/res
        var request = { // слушаем реквесты, записываем в массив
            path: url.parse(req.url).pathname, // путь
            query: url.parse(req.url).query, // аргумент
            method: req.method
        };
        '''
        if(request.method == "POST"){
            Заготовка для обработчика POST
        }
        '''
        if (request.query == 'async') { // отделяю асинхронные запросы от обычных
            var async = {
                uptime: {type: t.plain, response: start},
                random: {type: t.plain, response: Math.random().toString()},
                publicIp: {type: t.plain, response: myPublicIp},
                css: {type: t.css, response: read(css).content}
            };
            var arr = Object.keys(async),
                x = request.path.slice(1);
            if (x in async) {
                for (var i=0; i < arr.length; i++) {
                    if (request.path.indexOf(arr[i]) != -1){
                        res.writeHead(200, async[x].type);
                        res.end(async[x].response);
                    }
                }
            } else { // тут тоже бывает 404
                console.log('Another async request: ' + request.path);
                res.writeHead(404, t.html);
                res.end(fourtyfour);
            }
        } else if (in_array(request.path.slice(1), hashes)) { // api для подсчёта хеш-сумм
            for (var n=0; n < hashes.length; n++) { // надо бы указать типы явно, без ссылок на массив
                if (request.path.indexOf(hashes[n]) != -1) {
                    res.writeHead(200, {'content-type': 'text/plain'});
                    if (n === 0) {
                        res.end(hashcount.md5(request.query));
                    } else if ( n == 1 ) {
                        res.end(hashcount.sha1(request.query));
                    } else if ( n == 2 ) {
                        res.end(hashcount.sha256(request.query));
                    } else if ( n == 3 ) {
                        res.end(hashcount.sha224(request.query));
                    }
                }
            }
        } else if (contains(request.path, 'css')) { // отдельный вызов для стилей
            fs.readFile((path + request.path), function(err, data) {
                if (err) console.log(err);
                res.writeHead(200, t.css);
                res.end(data);
            });
        } else if (contains(request.path, 'js')) { // отдельный вызов для клиентских скриптов
            fs.readFile((path + request.path), function(err, data) {
                if (err) console.log(err);
                res.writeHead(200, t.js);
                res.end(data);
            });
        } else if (contains(request.path, 'assets')) { // отдельный вызов для хуй пойми чего
            fs.readFile((path + request.path), function(err, data) {
                if (err) console.log(err);
                res.writeHead(200, t.js);
                res.end(data);
            });
        } else if (contains(request.path, 'img')) { // жопой чую, что-то тут не так
            fs.readFile((path + request.path), function(err, data) {
                if (err) console.log(err);
                request.path.indexOf('svg') != -1 ? res.writeHead(200, t.svg) : {};
                res.end(data);
            });  
        } else if (contains(request.path, 'font')) {
            fs.readFile((path + request.path), function(err, data) {
                if (err) console.log(err);
                res.end(data);
            });
        } else if (contains(request.path, 'favicon')) { // показываем фавиконку хрому
            fs.readFile((index + request.path), function(err, data) {
                if (err) console.log(err);
                res.end(data);
            });
        } else if (contains(request.path, 'randpic')) { // на запрос /randpic отвечает случайной картинкой из папки
            var arr = fs.readdirSync(images),
                pic = arr[random(0, arr.length, 'int')];
            fs.readFile(images + pic, function(err, data) {
                if (err) console.log(err);
                res.end(data);
            });
        } else { // дефолтный ответ сервера
            var r;
            r = request.path == '/' ? '/main' : request.path;
            fs.readFile((index + r + '.html'), function(err, html) { // формируем относительный путь к файлу и шарим
                if (err) { // если страница не найдена, отдаём 404
                    res.writeHead(404, t.html);
                    res.end(fourtyfour);
                }
                res.writeHead(200, t.html); // бла-бла-бла
                res.end(html); // вуаля, отдаём страницу, пляшем
            });
        }
        console.log('запрошена страница ' + request.path + ' с параметром ' + request.query); // брейкпоинт. Потом снесу
    }).listen(port);
}).call(this);

console.log('Сервер запущен ' + date.getDate().date + ' в ' + date.getDate().time);
console.log('Порт ' + port + ' доступен');
open('http://' + host.toString() + ':' + port.toString());