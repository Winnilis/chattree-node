mainApp.controller('mainController', function ($scope, $location, $http) {
    var email = localStorage.getItem('email'),
        password = localStorage.getItem('password'),
        login = localStorage.getItem('login');

    if (typeof email === "undefined" || typeof password === "undefined")
        $location.path('/login').replace();

    var pendingRequests = {},
        wsUri = getRootUri() + "/websockets/process",
        websocket;

    function getRootUri() {
        return "ws://" +
            (document.location.hostname === "" ? "localhost/chattree" : document.location.hostname) +
            ":8080";
    }

    function init() {
        websocket = new WebSocket(wsUri);
        websocket.onopen = function (evt) {
            onOpen(evt);
        };
        websocket.onmessage = function (evt) {
            onMessage(evt);
        };
        websocket.onerror = function (evt) {
            onError(evt);
        };
        websocket.onclose = function (evt) {
            onClose(evt);
        }
    }

    /* ----------------------------------------------------------------- */
    /* ------------------------ Answer Handlers ------------------------ */
    /* ----------------------------------------------------------------- */

    var onMessageInit = function (data) {
        if (parseInt(data.code) !== 200) {
            console.log("INIT KO");
            window.location.href = "/login";
            return false;
        }
        console.log("INIT OK");
        $location.path('/home').replace();
        $scope.$apply();
    };

    /* --------------------------------------------------------- */
    /* ------------------------ WS core ------------------------ */
    /* --------------------------------------------------------- */

    function onOpen(evt) {
        console.log("CONNECTÉ !");
        checkCredentials();
    }

    function onMessage(evt) {
        console.log("REÇU : " + evt.data);
        var data = JSON.parse(evt.data);
        var convId = data.id,
            handler = pendingRequests[convId];
        handler(data);
        delete pendingRequests[convId];
    }

    function onError(evt) {
        console.log("ERREUR : " + evt.data);
    }

    function onClose(evt) {
        console.log("DÉCONNECTÉ : " + evt.reason);
    }

    function checkCredentials() {
        var msg = {
            id: guid(),
            action: "init",
            content: {"email": email, "password": password},
            performative: "request"
        };
        pendingRequests[msg.id] = onMessageInit;
        websocket.send(JSON.stringify(msg));
    }

    init();

    /**
     * @see http://stackoverflow.com/a/105074
     * @returns {string}
     */
    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    /* --------------------------------------------------------- */
    /* --------------------- GET USER DATA --------------------- */
    /* --------------------------------------------------------- */
    var getUserData = function(login){
      $http.get('/api/user/' + login)
      .then(function(result){
        $scope.user =  result.data;
      });
    }
    getUserData(login);
});
