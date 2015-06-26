var gum = function () {
	var width = document.body.clientWidth,
		mainMobileMenu = document.getElementById("main-mobile-menu"),
		main = document.getElementsByClassName("main")[0],
		header = document.getElementsByClassName("header")[0],
		usernameField = document.getElementById("username"),
		avatar = document.getElementById("user-avatar"),
		notification = document.getElementById("notification"),
		investitions = document.getElementById("investitions"),
		search = document.getElementById("search"),
		searchIcon = document.getElementsByClassName("search-icon")[0],
		startapy = document.getElementById("startapy"),
		games = document.getElementById("games"),
		vakancies = document.getElementById("vakancies"),
		share = document.getElementsByClassName("share")[0],
		socialButtons = document.getElementsByClassName("socialButtons")[0],
		suggMoar = document.getElementsByClassName('sugg-moar')[0],
		owl = document.getElementById('owl-example'),
		noOwl = document.getElementById('noOwl');
	if(width<1280){
		usernameField.style.display = "none";
		avatar.style.height = "40px";
		avatar.style.top = "5px";
		avatar.style.right = "5px";
		avatar.style.marginRight = "15px"
		notification.style.height = "15px";
		notification.style.right = "0px";
		notification.style.marginRight = "12px";
		header.style.textAlign = "left";
		main.style.marginLeft = "40px";
		if(width<1264){
			investitions.style.display = "none";
				if(width<1254) {
					search.style.display = "none";
					searchIcon.style.display = "none";
					if(width<1200) {
						startapy.style.display = "none";
						games.style.display = "none";
						vakancies.style.display = "none";
						socialButtons.style.display = "none";
						share.style.display = "block";
						suggMoar.style.display = 'none';
						owl.style.display = 'block';
						noOwl.style.display = 'none';
						domobile();
						if(width<1165){
							mainMobileMenu.style.display = "inline";
							main.innerHTML = "<b>BNM</b>";
							main.style.left = "15px";
							main.style.position = "fixed";
							main.style.top = "-5px";
							main.style.fontSize = "34px";
							mainMobileMenu.style.height = "48px";
							mainMobileMenu.style.position = "fixed";
						}
					}
				}
		}
	} else {
		usernameField.style.display = "inline";
		avatar.style.height = "25px";
		avatar.style.top = "10px";
		avatar.style.right = "";
		notification.style.height = "10px";
		notification.style.right = "";
		main.style.left = "";
		main.style.position = "relative";
		main.style.top = "";
		main.style.fontSize = "";
		mainMobileMenu.style.height = "15px";
		mainMobileMenu.style.position = "relative";
		header.style.textAlign = "center"
		investitions.style.display = "inline";
		mainMobileMenu.style.display = "none";
		startapy.style.display = "inline";
		games.style.display = "inline";
		vakancies.style.display = "inline";
		search.style.display = "inline";
		searchIcon.style.display = "inline";
		mainMobileMenu.style.display = "none";
		share.style.display = "none";
		socialButtons.style.display = "flex";
		suggMoar.style.display = 'block';
		main.innerHTML = "<b>BestNewsMedia</b>";
		owl.style.display = "none";
		noOwl.style.display = 'block';
		unmobile();
	}
}
function showhide(id) { // Показывает/скрывает боковое меню
	var el = document.getElementsByClassName(id)[0],
		isit = window.getComputedStyle(el, null).getPropertyValue('display');
	if(isit == "none"){
		el.style.display = "block";
		if (id == 'side-box') {
			document.getElementById("main-mobile-menu").style.backgroundImage = "url(/img/svg/cross.svg)";
		}
	} else {
		el.style.display = "none";
		if (id == 'side-box') {
			document.getElementById("main-mobile-menu").style.backgroundImage = "url(/img/svg/menu.svg)";
		}
	}
}
function showmore() {
	var arr = document.getElementsByClassName("sugg-item-hide"),
		block = document.getElementsByClassName("suggestions")[0],
		button = document.getElementsByClassName("sugg-moar")[0];
	[].forEach.call(arr, function (el) {
		el.className = "sugg-item";
	});
	block.style.height = "835px";
	button.style.marginTop = "366px";
	var arr = document.getElementsByClassName("sugg-item-hide");
	if (arr.length > 0) {
		showmore(); // Заглушка. Форич не всегда нормально срабатывает
	};
}
function domobile() {
	var arr = ['sugg-tiles','sugg-item','sugg-cover','suggestions','image-cover','image-fade','quote','quote-pic-container','quote-author','quote-post','quote-text','quote-pic'],
		tags = ['p','h1','h2','h3'];
	arr.forEach(function(i, arr) {
		var elements = document.getElementsByClassName(i);
		[].forEach.call(elements, function (el) {
			el.className = 'm-' + i.toString();
		});
		var arr = document.getElementsByClassName(i);
		if (arr.length > 0) {
			domobile(); 
		};
	})
	tags.forEach(function(i, tags) {
		var x = document.getElementsByTagName(i);
		[].forEach.call(x, function(el) {
			el.className = 'mobile';
		})
	})
}
function unmobile() {
	var arr = ['m-sugg-tiles','m-sugg-item','m-sugg-cover','m-suggestions','m-image-cover','m-image-fade','m-quote','m-quote-pic-container','m-quote-author','m-quote-post','m-quote-text','m-quote-pic'],
		tags = ['p','h1','h2','h3'];
	arr.forEach(function(i, arr) {
		var elements = document.getElementsByClassName(i);
		[].forEach.call(elements, function (el) {
			el.className = i.slice(2).toString();
		});
		var arr = document.getElementsByClassName(i);
		if (arr.length > 0) {
			unmobile(); 
		};
	})
	tags.forEach(function(i, tags) {
		var x = document.getElementsByTagName(i);
		[].forEach.call(x, function(el) {
			el.className = '';
		})
	})
}

$(document).ready(function() {
 	$("#owl-example").owlCarousel({
  		items: 1,
  		singleItem: true,
  		autoHeight: true
 	});
});

window.onresize = gum;
window.onload = gum;