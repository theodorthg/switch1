angular.module('app.controllers', [])

.controller('switchingPhotonCtrl', function($scope) {
  // ACHTUNG! Noch mit curl die Rückgaben anschauen, damit es wirklich richtig gesetzt wird!
  var lightval = 0;
  var tempval = 0;
  $scope.light = "Waiting for value";
  $scope.temp = "Waiting for value";
  var token = "";
  $scope.data = {
    token : "63feb3bd81a9c37b5b5a15b12feaaa2cb13cb5fb", // 63feb3bd81a9c37b5b5a15b12feaaa2cb13cb5fb",
  } 
  
  $scope.saveData = function() {
    token = $scope.data.token;
  };
  
  ledGet = function() {
    var particle = new Particle();
    var fnPr = particle.callFunction({ deviceId: '330033000947343432313031', name: 'ledGet', auth: '63feb3bd81a9c37b5b5a15b12feaaa2cb13cb5fb' });
    console.log("switchingPhotonCtrl - LedGet - Calling Particle-Function ledGet()...");    
    fnPr.then(
      function(data) {
      n = Number(data.body.return_value);
      if (n===1) {
          console.log('switchingPhotonCtrl - LedGet - Particle-Function called succesfully. return_value = '+n);
          $scope.source = 'img/OH1lqJIvTQSnV5tUEREH_on.png';
          console.log("switchingPhotonCtrl - LedGet - Der Pfad zum Image: "+$scope.source);
      } else {
          console.log('switchingPhotonCtrl - LedGet - Function called succesfully. return_value = '+n);
          $scope.source = 'img/Wj3FAAKQvW9brLnQmgFx_off.png';
          console.log("switchingPhotonCtrl - LedGet - Der Pfad zum Image: "+$scope.source);
      }
    }, function(err) {
      console.log('An error occurred: ' + err.body.error);
    });   
  }
  
  $scope.clickOn = function() {
    var arg = 'on';
    var particle = new Particle();
    var fnPr = particle.callFunction({ deviceId: '330033000947343432313031' , name: 'ledSet', argument: arg, auth: $scope.data.token /*'63feb3bd81a9c37b5b5a15b12feaaa2cb13cb5fb'*/ });
    console.log("Calling Particle-Function ledSet()..."+arg);    
    fnPr.then(
      function(data) {
      n = Number(data.body.return_value);
      if (n===1) {
          console.log('switchingPhotonCtrl - ClickOn - ParticleFunction LedSet called succesfully. return_value = '+n);
          $scope.source = 'img/OH1lqJIvTQSnV5tUEREH_on.png';
          console.log("switchingPhotonCtrl - ClickOn - Der Pfad zum Image ist jetzt: "+$scope.source+"\n");
      } else {
          console.log('switchingPhotonCtrl - ClickOn - Particle Function LedSet called succesfully. return_value = '+n);
          $scope.source = 'img/Wj3FAAKQvW9brLnQmgFx_off.png';
          console.log("switchingPhotonCtrl - ClickOn - Der Pfad zum Image ist jetzt: "+$scope.source+"\n");
      }
    }, function(err) {
      console.log('An error occurred: ' + err.body.error);
    });
    // timer(ledGet, 0);
  }

  $scope.clickOff = function() {
    // $scope.source = 'img/Wj3FAAKQvW9brLnQmgFx_off.png';
    var arg = 'off';
    var particle = new Particle();
    var fnPr = particle.callFunction({ deviceId: '330033000947343432313031', name: 'ledSet', argument: arg, auth: '63feb3bd81a9c37b5b5a15b12feaaa2cb13cb5fb' });
    console.log("switchingPhotonCtrl - ClickOff - Calling Particle-Function ledSet()..."+arg);    
    fnPr.then(
      function(data) {
      n = Number(data.body.return_value);
      if (n===1) {
          console.log('switchingPhotonCtrl - ClickOff - Particle Function LedSet called succesfully. return_value = '+n);
          $scope.source = 'img/OH1lqJIvTQSnV5tUEREH_on.png';
          console.log("switchingPhotonCtrl - ClickOff - Der Pfad zum Image ist jetzt: "+$scope.source+"\n");
      } else {
          console.log('switchingPhotonCtrl - ClickOff - ParticleFunction LedSet called succesfully. return_value = '+n);
          $scope.source = 'img/Wj3FAAKQvW9brLnQmgFx_off.png';
          console.log("switchingPhotonCtrl - ClickOff - Der Pfad zum Image ist jetzt: "+$scope.source+"\n");
      }
    }, function(err) {
      console.log('An error occurred: ' + err.body.error);
    });
    // timer(ledGet, 0);
  }

  $scope.clickSensorTemp = function() {
    var particle = new Particle();
    var fnPr = particle.getVariable({ deviceId: '330033000947343432313031', name: 'Temperature', auth: '63feb3bd81a9c37b5b5a15b12feaaa2cb13cb5fb' });
    fnPr.then(
      function(data) {
        this.tempval = Number(data.body.result);

        console.log('switchingPhotonCtrl - ClickSensor - Particle Function tempvalue called succesfully. result = '+n);
        $scope.temp = this.tempval;
      }, function(err) {
      console.log('An error occurred: ' + err.body.error);
    });

    setTimeout(function () {
      $scope.$apply(function () {
         $scope.temp = this.tempval;
      });
    }, 300);
  }

  $scope.clickSensorLight = function() {
    var particle = new Particle();
    var fnPr = particle.getVariable({ deviceId: '330033000947343432313031', name: 'LDR_value', auth: '63feb3bd81a9c37b5b5a15b12feaaa2cb13cb5fb' });
    fnPr.then(
      function(data) {
        this.lightval = Number(data.body.result);

        console.log('switchingPhotonCtrl - ClickSensor - Particle Function lightvalue called succesfully. result = '+n);
        $scope.light = this.lightval;
      }, function(err) {
      console.log('An error occurred: ' + err.body.error);
    });
    
    setTimeout(function () {
      $scope.$apply(function () {
        $scope.light = this.lightval;
      });
    }, 300);
    // timer(lightGet, 200);
  }

})

.controller('graphController', function($scope) {
    
    // Options
    
    $scope.width = 600;
    $scope.height = 350;
    $scope.yAxis = 'Temperatures';
    $scope.xAxis = 'Time';
    
    // Data 

    $scope.points = [
      {
      label: 'January',
      xValue: 1,
      yValue: 36
      },
      {
      label: 'February',
      xValue: 2,
      yValue: 54
      },
      {
      label: 'March',
      xValue: 3,
      yValue: 62
      },
      {
      label: 'April',
      xValue: 4,
      yValue: 82
      },
      {
      label: 'May',
      xValue: 5,
      yValue: 96
      },
      {
      label: 'June',
      xValue: 6,
      yValue: 104
      },
      {
      label: 'July',
      xValue: 7,
      yValue: 122
      },
      {
      label: 'August',
      xValue: 8,
      yValue: 152
      },
      {
      label: 'September',
      xValue: 9,
      yValue: 176
      },
      {
      label: 'October',
      xValue: 10,
      yValue: 180
      },
      {
      label: 'November',
      xValue: 11,
      yValue: 252
      },
      {
      label: 'December',
      xValue: 12,
      yValue: 342
      }
    ];
    
    // Find Maximum X & Y Axis Values - this is used to position the points as a percentage of the maximum
    $scope.maxY = 0;
    $scope.maxX = 0;
    
    var arrLength = $scope.points.length;
    for (var i = 0; i < arrLength; i++) {
        // Find Maximum X Axis Value
      	if ($scope.points[i].yValue > $scope.maxY)
        $scope.maxY = $scope.points[i].yValue;
      	// Find Maximum Y Axis Value
      	if ($scope.points[i].xValue > $scope.maxX)
        $scope.maxX = $scope.points[i].xValue;
    }
   
  // End Controller  
	});

