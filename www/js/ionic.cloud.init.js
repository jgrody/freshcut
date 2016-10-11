angular.module('ionic.cloud.init', ['ionic.cloud'])

.config(function($ionicCloudProvider) {
  $ionicCloudProvider.init({
    "core": {
      "app_id": "06e05464"
    }
  });
})