angular.module('app.controllers', [])

.controller('switchingPhotonCtrl', function($scope) {
  // ACHTUNG! Noch mit curl die Rückgaben anschauen, damit es wirklich richtig gesetzt wird!
  // curl https://api.particle.io/v1/devices/330033000947343432313031/ledSet -d arg="off" -d access_token="63feb3bd81a9c37b5b5a15b12feaaa2cb13cb5fb"
   
  
  $scope.clickOn = function() {
    // $scope.source = 'img/OH1lqJIvTQSnV5tUEREH_on.png';
    
    var querystring = require('querystring');
    var https = require('https');
    var obj = {};
 
    var postData = querystring.stringify({
      'arg' : 'on',
      'access_token':'63feb3bd81a9c37b5b5a15b12feaaa2cb13cb5fb'
    });

    var options = {
      hostname: 'api.particle.io',
//      port:443,
   // path : mypath,
      path: '/v1/devices/330033000947343432313031/ledSet',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
      }
    }

      var req = https.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          obj = JSON.parse(chunk);
          console.log("return_value: " + obj.return_value);
        });
        res.on('end', () => {
          console.log('No more data in response.')
        })
      });

    req.on('error', (e) => {
      console.log(`problem with request: ${e.message}`);
    });
    console.log("https-post Photon1 LedSet('on')...");    

    // write data to request body
    req.write(postData);
    req.end();
    
    /*
    var request = require('browser-request');
    console.log("Posting REST-API-Particle-Function ledSet('on')...");
    request({method:'POST', url:'https://api.particle.io/v1/devices/330033000947343432313031/ledSet', json:{arg:'on', access_token:'63feb3bd81a9c37b5b5a15b12feaaa2cb13cb5fb'}}, on_response)
    
    function on_response(er, res) {
      if(er)
        throw er
      if(res.ok)
        console.log('Server ok, id = ' + res.id)
    } 
    */   
  }


})
