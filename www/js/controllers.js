angular.module('app.controllers', ["chart.js"])

.controller('switchingPhotonCtrl', function($scope, dataService) {
  // ACHTUNG! Noch mit curl die Rückgaben anschauen, damit es wirklich richtig gesetzt wird!
  $scope.dataObject = dataService.dataObj;
  var tempval = 0;
  var lightval = 0;
  var token = "";
  
  $scope.dataObject.index = 0;
    
  $scope.dataVars = {
    token : "63feb3bd81a9c37b5b5a15b12feaaa2cb13cb5fb", // 63feb3bd81a9c37b5b5a15b12feaaa2cb13cb5fb",
  } 
  /*
  $scope.saveData = function() {
    token = $scope.dataVars.token;
  };
  */

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
    var fnPr = particle.callFunction({ deviceId: '330033000947343432313031' , name: 'ledSet', argument: arg, auth: $scope.dataVars.token /*'63feb3bd81a9c37b5b5a15b12feaaa2cb13cb5fb'*/ });
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

  $scope.clickSensor = function() {
    var particle = new Particle();
    var now = new Date();

    var fnPr = particle.getVariable({ deviceId: '330033000947343432313031', name: 'Temperature', auth: '63feb3bd81a9c37b5b5a15b12feaaa2cb13cb5fb' });
    fnPr.then(
      function(data) {
        this.tempval = Number(data.body.result);
        console.log('switchingPhotonCtrl - ClickSensor - Particle Function tempvalue called succesfully. result = '+n);
        $scope.dataObject.temp = this.tempval;        
      }, function(err) {
      console.log('An error occurred: ' + err.body.error);
    });

    var fnPr = particle.getVariable({ deviceId: '330033000947343432313031', name: 'LDR_value', auth: '63feb3bd81a9c37b5b5a15b12feaaa2cb13cb5fb' });
    fnPr.then(
      function(data) {
        this.lightval = Number(data.body.result);
        console.log('switchingPhotonCtrl - ClickSensor - Particle Function tempvalue called succesfully. result = '+n);
        $scope.dataObject.light = this.lightval;        
      }, function(err) {
      console.log('An error occurred: ' + err.body.error);
    });


    setTimeout(function () {
      $scope.$apply(function () {
         $scope.dataObject.temp = this.tempval;
         $scope.dataObject.light = this.lightval;         
         $scope.dataObject.data[0][ $scope.dataObject.index] = this.tempval;
         $scope.dataObject.data[1][ $scope.dataObject.index] = this.lightval;
         $scope.dataObject.labels[$scope.dataObject.index] = now.getDate()+"."+now.getMonth()+"."+now.getFullYear()+"  "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
         alert("Index: "+ $scope.dataObject.index+"  ,  Temp:"+$scope.dataObject.data[0][$scope.dataObject.index]+"  Light: "+$scope.dataObject.data[1][$scope.dataObject.index]);
         $scope.dataObject.index++;
         if ( $scope.dataObject.index>6)  $scope.dataObject.index=0;
      });
    }, 900);
  }



  $scope.clickSensorTemp = function() {
    var particle = new Particle();
    var now = new Date();

    var fnPr = particle.getVariable({ deviceId: '330033000947343432313031', name: 'Temperature', auth: '63feb3bd81a9c37b5b5a15b12feaaa2cb13cb5fb' });
    fnPr.then(
      function(data) {
        this.tempval = Number(data.body.result);
        console.log('switchingPhotonCtrl - ClickSensor - Particle Function tempvalue called succesfully. result = '+n);
        $scope.dataObject.temp = this.tempval;        
      }, function(err) {
      console.log('An error occurred: ' + err.body.error);
    });

    setTimeout(function () {
      $scope.$apply(function () {
         $scope.dataObject.temp = this.tempval;
         $scope.dataObject.data[0][ $scope.dataObject.index] = this.tempval;
         $scope.dataObject.labels[$scope.dataObject.index] = now.getDate()+"."+now.getMonth()+"."+now.getFullYear()+"  "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
         alert("Index: "+ $scope.dataObject.index+"  ,  Temp:"+$scope.dataObject.data[0][$scope.dataObject.index]);
         $scope.dataObject.index++;
         if ( $scope.dataObject.index>6)  $scope.dataObject.index=0;
      });
    }, 600);
  }

  $scope.clickSensorLight = function() {
    var particle = new Particle();
    var now = new Date()

    var fnPr = particle.getVariable({ deviceId: '330033000947343432313031', name: 'LDR_value', auth: '63feb3bd81a9c37b5b5a15b12feaaa2cb13cb5fb' });
    fnPr.then(
      function(data) {
        this.lightval = Number(data.body.result);

        console.log('switchingPhotonCtrl - ClickSensor - Particle Function lightvalue called succesfully. result = '+n);
        $scope.dataObject.light = this.lightval;
      }, function(err) {
      console.log('An error occurred: ' + err.body.error);
    });
    // alert(now.getDate()+"."+now.getMonth()+"."+now.getFullYear()+"  "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds());
    setTimeout(function () {
      $scope.$apply(function () {
        $scope.dataObject.light = this.lightval;
      });
    }, 300);
    // timer(lightGet, 200);
  }

})


.controller('graphController', function($scope, dataService) {
  $scope.dataObject = dataService.dataObj;

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

/*    
  // Data 
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
   
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right'
        }
      ]
    }
  };
  */
  // End Controller  
});

