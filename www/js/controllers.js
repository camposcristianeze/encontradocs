angular.module('app.controllers', [])

    .controller('encontraDocsCtrl', function ($scope) {

    })

    .controller('encontréCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
        $scope.upload = function (dataUrl) {
            Upload.upload({
                url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                data: {
                    file: Upload.dataUrltoBlob(dataUrl)
                },
            }).then(function (response) {
                $timeout(function () {
                    $scope.result = response.data;
                });
            }, function (response) {
                if (response.status > 0) $scope.errorMsg = response.status
                    + ': ' + response.data;
            }, function (evt) {
                $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            });
        }
    }])

    .controller('buscoCtrl', function ($scope) {
        $scope.locationChanged = function (location) {
            alert(location);
        };
    })
 