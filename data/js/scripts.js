
	var l1 = self.options.l1;// l1 danh sach domain whitelist
	var l2 = self.options.l2;// l2 danh sach url whitelist
	var l3 = self.options.l3;// l3 danh sach domain blacklist
	var l4 = self.options.l4;// l4 danh sach url blacklist
	var l7 = self.options.l7; // trang chuyen huong 
	
	var pp=new Array();
	// url da cat domain rieng
	var domain = (function(){
	   var i=0,domain=document.domain,p=domain.split('.'),s='_gd'+(new Date()).getTime();
	   while(i<(p.length-1) && document.cookie.indexOf(s+'='+s)==-1){
		  domain = p.slice(-1-(++i)).join('.');
		  document.cookie = s+"="+s+";domain="+domain+";";
	   }
	   document.cookie = s+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain="+domain+";";
	   return domain;
	   })();
	
	//lấy subdomain of url 
	var parts = location.hostname.split(domain);
	var subdomain = parts.shift();

	//domain lay phan domain path
	var pathdomain = window.location.pathname;
	
	
	
	var domain2=document.location.href;
	for(a in l7)
		
	var isExit = false;
	//whitelist domain
	if(!isExit)	{
	for(p in l1)
		{
			if(p == domain){
				location.reload();
				isExit=true;
			}
		}
	}
	//whitelist url
	if(!isExit)	{
		
		for (var p in l2) {
			if(p == domain2){				
				location.reload();
				isExit=true;
				
			}
		}
	}
	//blacklist domain
	if(!isExit)	{
		for (var p in l3) {
			if(p == domain){				
				alert(p+" Domain này đang bị chặn vui lòng truy cập trang khác");
				window.location = a;
				isExit=true;
				
			}
		}
	}
	//blacklist url
	if(!isExit)	{
		for (var p in l4) {
			if(p == domain2){				
				alert(p+" Trang Web này đang bị chặn vui lòng truy cập trang khác");
				window.location = a;
				isExit=true;
				
			}
		}
	}
	
	if(!isExit)	{
		
		loadXMLDoc(domain, subdomain, pathdomain);
	
			function loadXMLDoc(str1, str2, str3) 
			{	
				// branch for native XMLHttpRequest object
				var url="http://localhost:8080/filexuly/xuly6.php?domain="+str1+"&subdomain="+str2+"&pathdomain="+str3;
				if (window.XMLHttpRequest) {
					req = new XMLHttpRequest();
					req.onreadystatechange = processReqChange;
					req.open("GET", url, true);
					req.send(null);
				// branch for IE/Windows ActiveX version
				} else if (window.ActiveXObject) {
					req = new ActiveXObject("Microsoft.XMLHTTP");
					if (req) {
						req.onreadystatechange = processReqChange;
						req.open("GET", url, true);
						req.send();
					}
				}
			}
			
			function processReqChange() 
			{
				if (req.readyState == 4) // only if req shows "complete"
				{
					if (req.status == 200) // only if "OK"
					{
						if(req.responseText)
						{
							alert('gui thanh cong');
							console.log("123456");
						}
					} 
					else
					{
						alert('bi loi');
					}
				}
			}
			
			
			/*
			thieu thu vien js nen khong chay duoc.
			$.ajax({
			url : "http://localhost:8080/filexuly/xuly6.php?domain="+domain+"&subdomain="+subdomain+"&pathdomain="+pathdomain,
			success : function (result)
			{
				console.log(result);
			},
			error:function()
			{
				console.log("Lỗi không lấy được dữ liệu");
			}
			});
			*/
}
	