//  OpenShift sample Node application
var express = require('express'),
    app     = express();
var request = require('request');
    

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.get('/http/daocloud/restart/:appid/:token',function(req, res){
    var appid = req.params.appid;
    var token = req.params.token;
    request({
        method: 'POST',
        url:"https://openapi.daocloud.io/v1/apps/"+ appid +"/actions/restart",
        headers: {"Authorization": token}}, 
        function (error, response, body) {
            if(error)
                res.send(error);
            else
                res.send(body);
    });
});

//app.listen(port, ip);
//console.log('Server running on http://%s:%s', ip, port);

//module.exports = app ;
