app.factory('httpFactory', ['$http', function($http) {
  var obj = {};

  //1.get request
  obj.get = function(url) {
    return $http.get(url);
  };

  //2. post request
  obj.post = function (url, payload) {
    return $http.post(url, payload);
  };

  //3. delete request

  obj.delete = function(url) {
    return $http.delete(url);
  };

  //4. Put request
  obj.put = function(url) {
    return $http.delete(url);
  };



  return obj;
}]);
