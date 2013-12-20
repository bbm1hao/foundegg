var httpclient = require('https'),
	md5 = require('MD5'),
	dateFormat = require('dateformat');
var cloopensms = {
	sendSMS:function(dest,content){
		var accountSid = "aaf98fda42e022750142e9c98d37019b";
		var authToken = "c11730bc0b3443c4819e93f97de50001";
		var appId = "aaf98fda42e022750142e9cb5aa8019d";
		var subAccountSid = "aaf98fda42e022750142e9cb5abb019e";
		var msgType = "0";
		var timestamp = dateFormat(new Date(),"yyyyMMddHHmmss");
		var hostname = "https://app.cloopen.com";
		var	port = "8883";
		var	softVer = "2013-03-22";
		var sig = accountSid + authToken + timestamp;
		var signature =	md5(sig);
		var url = hostname+":"+port+"/"+softVer+"/Accounts/"+accountSid+"/SMS/Messages?sig="+signature;
		var auth = new Buffer(accountSid + ":" +signature).toString('base64');
		var options = {
		  hostname: hostname,
		  port: port,
		  path: '/',
		  method: 'POST',
		  headers:{
		  	'Accept':'application/xml',
		  	'Content-Type':'application/xml;charset=utf-8',
		  	'Authorization':auth
		  }
		};
		var bodyData = {
			to:dest,
			body:content,
			msgType:msgType,
			appId:appId,
			subAccountSid:subAccountSid
		};
		var resbody = "";
		var req = httpclient.request(options,function(res){
			 res.on(bodyData);
		});
		req.on('error', function(e) {
		  	console.log('problem with request: ' + e.message);
		});
		// write data to request body
		req.write(new Buffer(bodyData).toString());
		req.end();
	}
};
cloopensms.sendSMS("13391535797","hello");