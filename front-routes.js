mainApp.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: './pages/home.html',
            title: 'Chat Tree | Accueil'
        })
    ;
});

mainApp.config(function ($locationProvider) {
    $locationProvider.html5Mode(true); //remove the ugly #
});

mainApp.run(['$rootScope', function ($rootScope) {
    $rootScope.title = "Chat Tree";
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);
