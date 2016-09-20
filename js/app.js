angular.module('scApp', ['ngMaterial', 'ui.router'])
    .run(function ($rootScope, $state, $stateParams) {
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams, options) {
                //event.preventDefault();
                $rootScope.backgroundCss = toState.name;
            });

    })
    .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('red', {
                'default': '600', // by default use shade 400 from the pink palette for primary intentions
                'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
                'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
                'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
            })
            // If you specify less than all of the keys, it will inherit from the
            // default shades
            .accentPalette('grey', {
                'default': '800' // use shade 200 for default, and keep all other shades the same
            });

        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/home");
        //
        // Now set up the states
        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "views/home.html"
            })
            .state('about', {
                url: "/about",
                templateUrl: "views/about.html"
            })
            .state('portfolio', {
                url: "/portfolio",
                templateUrl: "views/portfolio.html"
            })
            .state('contact', {
                url: "/contact",
                templateUrl: "views/contact.html"
            })
    })
    .controller("MyController", ["$scope", "$http", '$anchorScroll', function MyController($scope, $http, $anchorScroll) {
        $http.get('js/data.json').success(function (data) {
            $scope.portfolio = data;
            $scope.portfolioOrder = "name";
            $scope.scroll = function () {
                $anchorScroll();
            };
            $scope.clear = function () {
                $scope.query = '';
            }
        });
    }]);

var burger = document.getElementById("burger-button");

var links = document.getElementsByClassName("links");

burger.addEventListener("click", function (e) {
    e.preventDefault();
    document.body.classList.toggle("open");
    burger.classList.toggle("open");
});

for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (e) {
        e.preventDefault();
        document.body.classList.toggle("open");
        burger.classList.toggle("open");
    }, false);
}

// Back To Top button
jQuery(document).ready(function () {
    var offset = 250;
    var duration = 300;

    jQuery(window).scroll(function () {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.back-to-top').fadeIn(duration);
        } else {
            jQuery('.back-to-top').fadeOut(duration);
        }
    });
});