var app = angular.module('myApp', []);
app.controller('dispatchCtrl', function($scope) {

  // Global for creating process id's
  PID = 1;

  // Template for creating processes
  function process(prio){
    this.pid = PID;
    PID++;
    this.priority = prio;
  }

  // Initial processes
  var a = new process(4);
  var b = new process(4);
  var c = new process(3);
  var d = new process(1);
  var e = new process(9);

  console.log("processID: " + a.pid);
  console.log("priority: " + a.priority);
  console.log("processID: " + b.pid);
  console.log("priority: " + b.priority);

  $scope.readyQueue = [a];
  $scope.runningList = [b, c];
  $scope.blockedList = [d, e];

  // TODO MIGHT NEED THIS WILL PROBABLY GO UNUSED
  $scope.allProcesses = $scope.readyQueue.concat($scope.runningList, $scope.blockedList);

  // add a new process to the ready queue
  $scope.readyQueueAdd = function(){
    var p = new process($scope.todoInput);
    $scope.readyQueue.push(p);
    // reset input
    $scope.todoInput = "";
    // Sort processes by priority
    $scope.readyQueue.sort(function (a,b) {
      return a.priority - b.priority;
    });
  };

  // Terminate a currently running process
  $scope.remove = function(index) {
    $scope.runningList.splice(index,1);
  };

  // Block a currently running process
  $scope.block = function(index) {
    $scope.blockedList.push($scope.runningList[index]);
    $scope.runningList.splice(index,1);
  };

  // unblock a blocked process sending it back to the ready Queue
  $scope.unblock = function(index) {
    $scope.readyQueue.push($scope.blockedList[index]);
    $scope.readyQueue.sort(function (a,b) {
      return a.priority - b.priority;
    });
    $scope.blockedList.splice(index,1);
  };

  // dispatch process with the highest priority from the ready queue
  $scope.dispatch = function() {
    if($scope.readyQueue.length !== 0){
      $scope.runningList.push($scope.readyQueue[0]);
      $scope.readyQueue.splice(0,1);
    }
  };
});
