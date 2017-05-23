mainApp.controller('homeController', function ($scope, $http) {

    $scope.showUserInformation = false;

    $('#log-out').click(function (e) {
        e.preventDefault();
        localStorage.clear();
        window.location.href = "/login";
    });

    $scope.conversations = [];
    $scope.contacts = {};
    $scope.currentUser = {};

    /*
    TODO improve logic with Promises using $q
    */
    var getConversations = function(login){
      $http.get('/api/'+ login + '/conversations').then(function(result){
        if(result){
          var conversations = result.data;
          conversations.forEach(function(c){
            $http.get('/api/conversation/'+c).then(function(conv){
              var conversation = conv.data;
              $scope.conversations.push(conversation);
              var members = conversation.members;
              conversation.completeMembers = [];
              members.forEach(function (m){
                $http.get('/api/user/'+m).then(function(member){
                  $scope.contacts[member.data._id] = member.data;
                })
              })
            })
          })
        }
      })
    }

    $scope.newConversation = function(){
      window.alert('nouvelle conv');
    }
    $scope.addMore = function(){
      window.alert('More');
    }
    $scope.sendMessage = function(){
      window.alert('message sent');
    }

    $scope.showConv = function(){
      console.log($scope.conversations);
      console.log($scope.contacts);
    }

    getConversations('HPotter');
});
