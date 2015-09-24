app.controller("BeerController", function($scope, httpFactory, $timeout){

  //message section
  $scope.success = false;
  //gets all the beers, moved to services
  // $http.get('/api/v1/beers')
  // .then(function(response){
  //   $scope.beers = response.data;
  // });

  //1. get beers route
  getBeers = function (url) {
    httpFactory.get(url)
    .then(function(response){
      $scope.beers = response.data;
      console.log(response.data);
    });
  };

  //call the get beers function with right api url
  getBeers('api/v1/beers');

  //setting up timeout function
  function messageTimeout () {
    $scope.success = false;
  }

  //2. post beers
  //this will be ng-click on the submit button
  $scope.postBeer = function () {

    //match this payload with the correct form inputs
    //option 1
    // var payload = {
    //   'name': $scope.name,
    //   'type': $scope.type,
    //   'abv': $scope.abv
    // };

    //option 2
        var payload = $scope.beer;
    //post request
    httpFactory.post('api/v1/beers', payload)
    .then(function(response){
      //pushing new data into beers
      $scope.beers.push(response.data);
      //clear out input form option 1
        // $scope.name = "";
        // $scope.type = "";
        // $scope.abv = "";

      //clear out form option 2
      $scope.beer = {};

      //show success message
      $scope.success = true;
      $scope.message = "Added a new beer, thanks!";

      //set timeout to close success message, need to add $timeout to pass in at the top
      $timeout(messageTimeout, 5000);
    });


  };





});
