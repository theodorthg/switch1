
// Funktioniert noch nicht ganz so, wie es soll. 
// Erst mal noch schauen, ob die Parametrisierung Schuld ist und ggf. erst mal einzelne Funktionne für on/off (ohne Parameter)
// danach schauen, ob ggf. der Header korrekt ist bzw. weggelassen werden kann
//  
angular.module('app.controllers', ['ionic'])

.controller('switchingPhotonCtrl', ['$http', function($scope /*, HttpService */) {
  $scope.clickOn = function() {
    /* HttpService.setSwitch('on') */
    var data = {'arg' : 'on','access_token':'63feb3bd81a9c37b5b5a15b12feaaa2cb13cb5fb'};
    $http.post('https://api.particle.io/v1/devices/330033000947343432313031/ledSet',data)
    .then(function(response) {
       $scope.oneitem = response;
    });
    console.log("https-post via angular Photon1 LedSet('on'): ");    
  }

  $scope.clickOff = function() {
     HttpService.setSwitch('off')
    .then(function(response) {
       $scope.oneitem = response;
    });
    console.log("https-post via angular Photon1 LedSet('off'): ");
  }

}])
