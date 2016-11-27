var app = angular.module('myApp', []);
app.controller('dispatchCtrl', function($scope) {
  // Template for creating processes
  function process(processID, prio){
    this.pid = processID;
    this.priority = prio;
  }
  var a = new process(1, 4);
  var b = new process(2, 3);
  console.log("processID: " + a.pid);
  console.log("priority: " + a.priority);
  console.log("processID: " + b.pid);
  console.log("priority: " + b.priority);

  $scope.readyQueue = [a, b];
  $scope.runningList = [a, b];
  $scope.blockedList = [a, b];
  console.log($scope.runningList[1]);

  // TODO remove this
  $scope.todoList = [{todoText:'Clean House', done:false}];

  $scope.readyQueueAdd = function(){
    var p = new process($scope.readyQueue.length + 1, $scope.todoInput);
    $scope.readyQueue.push(p);
    // reset input
    $scope.todoInput = "";
    // Sort processes by priority
    $scope.readyQueue.sort(function (a,b) {
      return a.priority - b.priority;
    });
  };

// TODO remove old code below this line
  $scope.todoAdd = function() {
    $scope.todoList.push({todoText:$scope.todoInput, done:false});
    $scope.todoInput = "";
  };

  $scope.remove = function() {
    var oldList = $scope.todoList;
    $scope.todoList = [];
    angular.forEach(oldList, function(x) {
      if (!x.done) $scope.todoList.push(x);
    });
  };
});
