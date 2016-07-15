angular.module('app.controllers', [])

.controller('switchingPhotonCtrl', function($scope) {
  // ACHTUNG! Noch mit curl die Rückgaben anschauen, damit es wirklich richtig gesetzt wird!
  
  
  $scope.clickOn = function() {
   
    var arg = 'on';
    var particle = new Particle();
    var fnPr = particle.callFunction({ deviceId: '330033000947343432313031', name: 'ledSet', argument: arg, auth: '63feb3bd81a9c37b5b5a15b12feaaa2cb13cb5fb' });
    console.log("Calling Particle-Function ledSet()..."+arg);    
    fnPr.then(
      function(data) {
      n = Number(data.body.return_value);
      if (n===1) {
          console.log('switchingPhotonCtrl - ClickOn - ParticleFunction LedSet called succesfully. return_value = '+n);
      } else {
          console.log('switchingPhotonCtrl - ClickOn - Particle Function LedSet called. return_value = '+n);
      }
    }, function(err) {
      console.log('An error occurred: ' + err.body.error);
    });
  }


})
