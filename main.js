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
    fourtyfour = read('./html/404.html').content;

var t = { // типы контента отдельно
    plain: {'content-type': 'text/plain'},
    html: {'content-type': 'text/html'},
    css: {'content-type': 'text/css'},
    js: {'content-type': 'text/javascript'},
    svg: {'content-type': 'image/svg+xml'},
    assets: {'content-type': 'text/javascript'}
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

function getMyPublicIp(){
    http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
        resp.on('data', function(ip) {
            return(JSON.parse(ip));
        });
    });
};

(function() {
    http.createServer(function(req, res) { // объект сервера с req/res
        var request = { // слушаем реквесты, записываем в массив
            path: url.parse(req.url).pathname, // путь
            query: url.parse(req.url).query, // аргумент
            method: req.method
        };
        if (request.query == 'async') { // отделяю асинхронные запросы от обычных
            var async = {
                uptime: {type: t.plain, response: start},
                random: {type: t.plain, response: Math.random().toString()},
                //publicIp: {type: t.plain, response: getMyPublicIp()},
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
        } else if (contains(request.path, 'css')) { // отдельный вызов для стилей
            fs.readFile((path + request.path), function(err, data) {
                if (err) {
                    res.writeHead(404, t.html);
                    res.end(fourtyfour);
                }
                res.writeHead(200, "t." + request.path);
                res.end(data);
            });
        } else if (contains(request.path, 'js')) { // отдельный вызов для клиентских скриптов
            fs.readFile((path + request.path), function(err, data) {
                if (err) {
                    res.writeHead(404, t.html);
                    res.end(fourtyfour);
                }
                res.writeHead(200, t.js);
                res.end(data);
            });
        } else if (contains(request.path, 'assets')) { // отдельный вызов для хуй пойми чего
            fs.readFile((path + request.path), function(err, data) {
                if (err) {
                    res.writeHead(404, t.html);
                    res.end(fourtyfour);
                }
                res.writeHead(200, t.js);
                res.end(data);
            });
        } else if (contains(request.path, 'img')) { // жопой чую, что-то тут не так
            fs.readFile((path + request.path), function(err, data) {
                if (err) {
                    res.writeHead(404, t.html);
                    res.end(fourtyfour);
                }
                request.path.indexOf('svg') != -1 ? res.writeHead(200, t.svg) : {};
                res.end(data);
            });  
        } else if (contains(request.path, 'font')) {
            fs.readFile((path + request.path), function(err, data) {
                if (err) {
                    res.writeHead(404, t.html);
                    res.end(fourtyfour);
                }
                res.end(data);
            });
        } else if (contains(request.path, 'favicon')) { // показываем фавиконку хрому
            fs.readFile((path + request.path), function(err, data) {
                if (err) {
                    res.writeHead(404, t.html);
                    res.end(fourtyfour);
                }
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
            fs.readFile((index + r + '.html'), function(err, html) {
                if (err) {
                    res.writeHead(404, t.html);
                    res.end(fourtyfour);
                }
                res.writeHead(200, t.html);
                res.end(html);
            });
        }
        console.log('запрошена страница ' + request.path + ' с параметром ' + request.query);
    }).listen(port);
}).call(this);

config.auto_main_page_open == true ? open('http://' + host.toString() + ':' + port.toString()) : {};
console.log('Сервер запущен ' + date.getDate().date + ' в ' + date.getDate().time);
console.log('Порт ' + port + ' доступен');