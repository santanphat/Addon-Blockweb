// SM (Storage Manager) mot bao boc cho localstorage khong lam viec ben trong tien ich cua ff
//ss (simple-storage) thu vien API cua ff dc khai bao de cap nhat SM
var SM = (function () {
    var SS = require("sdk/simple-storage");
    var my = {};
    my.get = function (key) {
        return SS.storage[key];
    }
    my.put = function (key, value) {
        return SS.storage[key] = value;
    }
    my.delete = function (key) {
        return delete SS.storage[key];
    }   
    return my;
}());
var Block = (function (SM) {
    var my = {};

my.blockDH = {
        "http://hcmutrans.edu.vn"       	 	:"main add",
    }
    if (!SM.get("dh")) {
        SM.put("dh", JSON.stringify(my.blockDH));
    }
    my.getDieuHuong = function () {
        return JSON.parse(SM.get("dh"));
    }
	// ham them danh sach passlist domain
    my.addDieuHuong = function (index) {
        my.DieuHuong = JSON.parse(SM.get("dh"));
        my.DieuHuong[index] = "";
        SM.put("dh", JSON.stringify(my.DieuHuong));
    }
	//ham xoa danh sach passlist domain
    my.removeDieuHuong  = function (index) {
        my.DieuHuong = JSON.parse(SM.get("dh"));
        delete my.DieuHuong[index];
        SM.put("dh", JSON.stringify(my.DieuHuong));
    } 
		
		
// cac danh sach duoc phan theo thu tu tu phần 1 xuong phần 6 theo do uu tien cua cac danh sach theo 
 
 
//PHẦN 1	
// danh sach white list nhan theo Domain 
my.blockPassListDomain = {
        "google.com"       	 	:"main add",
		"vnexpress.net"        	:"main add",
		"w3schools.com"        	:"main add",
		"php.net"        		:"main add",
		"freecodecamp.com"      :"main add",
		"jsbin.com"        		:"main add",
		"jsfiddle.net"        	:"main add",
    }
    if (!SM.get("pld")) {
        SM.put("pld", JSON.stringify(my.blockPassListDomain));
    }
    my.getPassListsDomain = function () {
        return JSON.parse(SM.get("pld"));
    }
	// ham them danh sach passlist domain
    my.addPassListDomain = function (passd) {
        my.PassListsDomain = JSON.parse(SM.get("pld"));
        my.PassListsDomain[passd] = "";
        SM.put("pld", JSON.stringify(my.PassListsDomain));
    }
	//ham xoa danh sach passlist domain
    my.removePassListDomain  = function (passd) {
        my.PassListsDomain = JSON.parse(SM.get("pld"));
        delete my.PassListsDomain[passd];
        SM.put("pld", JSON.stringify(my.PassListsDomain));
    } 
	
//PHẦN 2	
//pass list = pl
	//danh sach khai bao de truy cap ma khong bi chan theo URL
    my.blockPassListURL = {
		"https://www.duolingo.com/welcome"        	:"main add",
		"http://thecodeplayer.com"        			:"main add",
		"http://news.zing.vn/phap-luat"        						:"main add",
		"http://mp3.zing.vn/bai-hat"        				:"main add",
		"http://manga24h.com/120726/Shokugeki-no-Soma-Vua-Bep-Soma" :"main add",
		"http://comicvn.net/truyen-tranh/toriko/18"        :"main add",
		"http://vechai.info/one-piece"        :"main add",
    }
    if (!SM.get("pl")) {
        SM.put("pl", JSON.stringify(my.blockPassListURL));
    }
    my.getPassListsURL = function () {
        return JSON.parse(SM.get("pl"));
    }
	
	// ham them danh sach passlist url
    my.addPassListURL = function (pass) {
        my.PassListsURL = JSON.parse(SM.get("pl"));
        my.PassListsURL[pass] = "";
        SM.put("pl", JSON.stringify(my.PassListsURL));
    }
	//ham xoa danh sach passlist url
    my.removePassListURL  = function (pass) {
        my.PassListsURL = JSON.parse(SM.get("pl"));
        delete my.PassListsURL[pass];
        SM.put("pl", JSON.stringify(my.PassListsURL));
    } 
//PHẦN 3

	// danh sach cac trang chan theo url domain
    my.blockDomain = {
        "vechai.info"        : "main add",
        "comicvn.net"           : "main add", 
		"manga24h.com"           : "main add",
		"phim3s.net"           : "main add", 	
		"phim47.com"           : "main add", 	
		"manga24h.com"           : "main add", 	
    }
	//kiem tra
    if (!SM.get("blockdomain")) {
        SM.put("blockdomain", JSON.stringify(my.blockDomain));
    }
    my.getBlockedDomain = function () {
        return JSON.parse(SM.get("blockdomain"));
    }    
	// ham them trang vao danh sach chan theo domain
    my.addBlockedDomain = function (sited) {
        my.blockedDomain = JSON.parse(SM.get("blockdomain"));
        my.blockedDomain[sited] = "";
        SM.put("blockdomain", JSON.stringify(my.blockedDomain));
    }  
	// ham xoa danh sach chan theo domain
    my.removeBlockedDomain = function (sited) {
        my.blockedDomain = JSON.parse(SM.get("blockdomain"));
        delete my.blockedDomain[sited];
        SM.put("blockdomain", JSON.stringify(my.blockedDomain));
    } 
 

 
//PHẦN 4   
// url list
	// danh sach cac trang chan theo url
    my.blockTheseSites = {
        "http://news.zing.vn/thi-truong.html"        : "main add",
        "http://tv.zing.vn/the-loai/Phim-Hong-Kong/IWZ9ZIW7.html"           : "main add", 
		"http://www.truyensubviet.com"           : "main add", 	
		"http://haiivl.com":"main add",
		"http://chatvl.com":"main add",
		"http://blogtruyen.com/trangchu":"main add",
    }
	//kiem tra
    if (!SM.get("blocklist")) {
        SM.put("blocklist", JSON.stringify(my.blockTheseSites));
    }
    my.getBlockedSites = function () {
        return JSON.parse(SM.get("blocklist"));
    }    
	// ham them trang vao danh sach chan theo url
    my.addBlockedSite = function (site) {
        my.blockedSites = JSON.parse(SM.get("blocklist"));
        my.blockedSites[site] = "";
        SM.put("blocklist", JSON.stringify(my.blockedSites));
    }  
	// ham xoa danh sach chan theo url
    my.removeBlockedSite = function (site) {
        my.blockedSites = JSON.parse(SM.get("blocklist"));
        delete my.blockedSites[site];
        SM.put("blocklist", JSON.stringify(my.blockedSites));
    } 	
    return my;
}(SM));

exports.Block = Block;