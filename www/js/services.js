angular.module('app.services', [])

.factory('HttpService', ['$http', function($http){
return { 
    setSwitch: function(arg) {
     // $http returns a promise, which has a then function, which also returns a promise.
     var data = {   
       'arg' : 'on',/* arg, */
       'access_token':'63feb3bd81a9c37b5b5a15b12feaaa2cb13cb5fb'
     };
     var conf = {
       method: 'POST' /*,
       
       headers: {
         'Content-Type':'application/x-www-form-urlencoded' 
       } 
       */
     };
      
     return $http.post('https://api.particle.io/v1/devices/330033000947343432313031/ledSet',data) /*,conf) */
         .then(function(response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Set switch On or Off', response);
         return response.data;
      }); 
    },
    getSwitch: function() {
     // $http returns a promise, which has a then function, which also returns a promise.
     return $http.post('https://api.particle.io/v1/devices/330033000947343432313031/ledGet') 
     
       .then(function (response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Get item 1', response);
         return response.data;
       }); 
       
   }
  }
}])

.service('dataService', [function(){
  // private variable
  var _dataObj = {
    temp: "Waiting for value",
    light: "Waiting for value",
    index: "0",
    labels: ["", "", "", "", "", "", ""],
    series: ['Temperature', 'Light'],
    data: [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
    ],
    datasetOverride: [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }],
    options:  {
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
    }
  };

  // public API
  this.dataObj = _dataObj;
}]);

