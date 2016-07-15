angular.module('app.controllers', ['ionic', 'ngResource'])

.controller('switchingPhotonCtrl', function($scope, ledService) {
  // ACHTUNG! Noch mit curl die Rückgaben anschauen, damit es wirklich richtig gesetzt wird!
  // curl https://api.particle.io/v1/devices/330033000947343432313031/ledSet -d arg="off" -d access_token="63feb3bd81a9c37b5b5a15b12feaaa2cb13cb5fb"
/*   
 $scope.postData = {
   'arg' : 'on',
      'access_token':'63feb3bd81a9c37b5b5a15b12feaaa2cb13cb5fb'
 };
*/
  $scope.clickOn = function() {
    ledService.save({cmd:'ledSet',dev:'330033000947343432313031'},{accees_token: '63feb3bd81a9c37b5b5a15b12feaaa2cb13cb5fb', arg: 'on'});
    console.log("https-post via angular Photon1 LedSet('on'): ");    
  }

  $scope.clickOff = function() {
    // $scope.source = 'img/Wj3FAAKQvW9brLnQmgFx_off.png';
    console.log("Posting REST-API-Particle-Function ledSet('off')...");
    
    var querystring = require('querystring');
    var https = require('https');
    var obj = {};
 
    var postData = querystring.stringify({
      'arg' : 'off',
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
    console.log("https-post Photon1 LedSet('off')...");    

    // write data to request body
    req.write(postData);
    req.end();
  }

})

.factory('ledService', function ($resource) {
      var data = $resource('https://api.particle.io/v1/device/:device:command', {device:'@dev',command:'@cmd'}, {
      save:{
          method:'POST'
          }
      });
      return data;
});

/*
.factory('ledService', function ($resource) {
//    return $resource('https://api.particle.io/v1/devices/330033000947343432313031/ledSet',{user: "@user"});
return $resource('https://api.particle.io/v1/devices/330033000947343432313031/ledGet?access_token=63feb3bd81a9c37b5b5a15b12feaaa2cb13cb5fb',{'save':{method:'POST'}});
});
*/

/*
.factory('Post', function($resource) {
  console.log("https-post Photon1 inside factory...");
 // return $resource('https://api.particle.io/v1/devices/330033000947343432313031/ledSet',{arg:'@arg', access_token:'@access_token'}, {'save':{method:'POST'}});
 return $resource('https://api.particle.io/v1/devices/330033000947343432313031/ledSet');
});
*/