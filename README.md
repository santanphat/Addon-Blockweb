# Addon-Blockweb
Add-on BlockWeb Create an add-on application to run on Firefox, use to prevent the spam and black-links on the page.


- Install this file app at firefox > version:38.
- Default password is 123456 and you can change pass after login app.
- Program and  develop by Jpm tool support by npm(Node.js).
- Storage in localstorage firefox and this app use simple-storage(using libary of firefox)
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
- Add-on to develop from Gawkblocker
- Link to consult 
http://www.ibm.com/developerworks/library/os-extendfirefox/
