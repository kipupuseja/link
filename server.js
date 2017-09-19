//  OpenShift sample Node application
var request = require('request'),
    app     = request();
    

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

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
