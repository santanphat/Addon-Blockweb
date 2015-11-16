var self = require("sdk/self");
var tabs = require("sdk/tabs");
var Block = require("Block").Block;
var list1=Block.getPassListsDomain();	// whitelist theo domain
var list2=Block.getPassListsURL(); // whitelist theo url
var list3=Block.getBlockedDomain(); // black list theo domain
var list4=Block.getBlockedSites();  // blacklist theo url
var list7=Block.getDieuHuong();// trang chuyen huong

var pageWorkers = require("sdk/page-worker");

// This content script sends header titles from the page to the add-on:
var script = "var elements = document.querySelectorAll('h2 > span'); " +
             "for (var i = 0; i < elements.length; i++) { " +
             "  postMessage(elements[i].textContent) " +
             "}";

// Create a page worker that loads Wikipedia:
pageWorkers.Page({
  contentURL: "http://en.wikipedia.org/wiki/Internet",
  contentScript: script,
  contentScriptWhen: "ready",
  onMessage: function(message) {
    console.log(message);
  }
});
var options = {
        contentScriptWhen: 'start', //This says not to wait until the page is ready
		include: ['*'],	
		contentScriptFile: self.data.url("js/scripts.js"),
		contentScriptOptions: {
        l1: list1,
		l2:	list2,
		l3: list3,
		l4:	list4,
		l7: list7,
      },
		attachTo: ["top"],
		onAttach: function(worker) {
			taburl=worker.tab.url;
			this.destroy();  
	}
};
const { PageMod } = require("sdk/page-mod");
var mod = PageMod(options);
// Listen for tab content loads.
tabs.on('ready', function(tab) {
  //console.log('tab is loaded', tab.title, tab.url);
  if((tab.url!="http://hcmutrans.edu.vn") && (tab.url!=taburl))
  {
	var mod = PageMod(options);
  }
  
});


var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");

// tạo nút button
var button = ToggleButton({
  id: "my-button",
  label: "my button",
  icon: {
    "16": "./images/home.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onChange: handleChange,
});
//tạo panel hiển thị 
var panel = panels.Panel({
  contentURL: self.data.url("index.html"),
  width: 500,
  height: 400,
  onHide: handleHide
});
panel.port.on("popinfo", function () {
                panel.port.emit("domain", tabs.activeTab.url);
            });
function handleChange(state) {
  if (state.checked) {
    panel.show({
      position: button
    });
  }
}

function handleHide() {
  button.state('window', {checked: false});
}







//Hien thi danh sách các loại ra giao diện admin

//whitelist domain
panel.port.on("pass1", function () {
    panel.port.emit("pld", Block.getPassListsDomain());
});
//whitelist url
panel.port.on("pass", function () {
    panel.port.emit("pl", Block.getPassListsURL());
});
//blacklist domain
panel.port.on("pop1", function () {
    panel.port.emit("blockdomain", Block.getBlockedDomain());
});
//blacklist url
panel.port.on("pop", function () {
    panel.port.emit("blocklist", Block.getBlockedSites());
});


// Quản lý Thêm một node vào danh sách hiện tại

//whitelist domain
panel.port.on("gopassd", function (plistdomain) {  // gopass giao tiep giua trang main voi trang con insertpasslist.html
    Block.addPassListDomain (plistdomain);
    panel.port.emit("pld", Block.getPassListsDomain());// pl giao tiep voi pl ben Block.js
    console.log(plistdomain);
});
//whitelist url
panel.port.on("gopass", function (plist) {  // gopass giao tiep giua trang main voi trang con insertpasslist.html
    Block.addPassListURL (plist);
    panel.port.emit("pl", Block.getPassListsURL());// pl giao tiep voi pl ben Block.js
    console.log(plist);
});
//blacklist domain
panel.port.on("dontgothere1", function (blockit) {// blockitd ten dat chung khi chuyen qua hoat dong trang con
    Block.addBlockedDomain(blockit);
    panel.port.emit("blockdomain", Block.getBlockedDomain());
    console.log(blockit);
});
//blacklist url
panel.port.on("dontgothere", function (blockit) {
    Block.addBlockedSite(blockit);
    panel.port.emit("blocklist", Block.getBlockedSites());
    console.log(blockit);
});

// Quản lý Xóa một node trong danh sách hiện tại

//whitelist domain
panel.port.on("unblockpassd", function (indexpld) { // unblockpass giao tiep giua trang main voi trang con passlist.html
    Block.removePassListDomain (indexpld);
    panel.port.emit("pld", Block.getPassListsDomain());
    console.log(indexpld);
});
//whitelist url
panel.port.on("unblockpass", function (index) { // unblockpass giao tiep giua trang main voi trang con passlist.html
    Block.removePassListURL (index);
    panel.port.emit("pl", Block.getPassListsURL());
    console.log(index);
});
//blacklist domain
panel.port.on("unblock1", function (index) {
    Block.removeBlockedDomain(index);
    panel.port.emit("blockdomain", Block.getBlockedDomain());
    console.log(index);
});
//blacklist url
panel.port.on("unblock", function (index) {
    Block.removeBlockedSite(index);
    panel.port.emit("blocklist", Block.getBlockedSites());
    console.log(index);
});




/*Quản lý điều hướng của trang web*/
panel.port.on("popdh", function (index) {
    panel.port.emit("dh", Block.getDieuHuong());
});
panel.port.on("chondh", function (dh) {
    Block.addDieuHuong(dh);
    panel.port.emit("dh", Block.getDieuHuong());
    //console.log(dh);
});
panel.port.on("xoadh", function (index) {
    Block.removeDieuHuong(index);
    panel.port.emit("dh", Block.getDieuHuong());
    console.log("xoa thanh cong "+index);
});

