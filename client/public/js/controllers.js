app.controller("BeerController", function($scope, httpFactory, $timeout){

  //message section
  $scope.success = false;
  $scope.message = "";
  $scope.beer = {};
  $scope.edit = false;

  //this is out beer url
  $scope.findBeer = "";
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

  //delete request portion
  $scope.deleteBeer = function (id) {
    //endpoint to use for a http delete request, we'll define this in a factory
    $scope.findBeer = "api/v1/beer/"+ id;
    httpFactory.delete($scope.findBeer)
    .then(function(response) {

      $scope.success = true;
      $scope.message = "Deleted that beer!";

      //set timeout to close success message, need to add $timeout to pass in at the top
      $timeout(messageTimeout, 5000);
      console.log(response);
      //call getbeers again to update the list of beers
      getBeers('api/v1/beers');
    });
  };


  ///edit beer portion, pulls values to the form
  $scope.editBeer = function (id) {
    $scope.findBeer = "api/v1/beer/"+ id;
    httpFactory.get($scope.findBeer)
    .then(function(response){
      $scope.beer = response.data;
    });
    $scope.edit = true;
  };

  //update beer, on update sumbit
  $scope.updateBeer = function () {

    //send updated object with beer attributes
    var update = $scope.beer;

    httpFactory.put($scope.findBeer, update)
    .then(function(response){

      $scope.success = true;
      $scope.message = "Updated that beer!";

      //set timeout to close success message, need to add $timeout to pass in at the top
      $timeout(messageTimeout, 5000);
      $scope.beer = {};
      $scope.edit = false;

      getBeers('api/v1/beers');
    });
  };

});
