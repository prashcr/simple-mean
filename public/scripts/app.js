'use strict';

angular.module('app', []);

angular.module('app')
  .controller('TodoCtrl', function ($scope, TodoSvc) {
    $scope.todos = [{title: 'Get paper'}, {title: 'Mail rent check'}];

    $scope.refresh = function() {
      TodoSvc.fetch()
      .then(function (todos) {
        $scope.todos = todos.data;
      });
    };

    $scope.remove = function(todo) {
      TodoSvc.remove(todo)
      .then(function () {
        $scope.refresh();
      });
    };

    $scope.addTodo = function () {
      TodoSvc.add($scope.newTodo)
      .then(function () {
        $scope.newTodo = {};
        $scope.refresh();
      });
    }

    $scope.refresh();
  });

  angular.module('app')
    .service('TodoSvc', function ($http) {
      this.fetch = function() {
        return $http.get('/api/todos');
      };

      this.add = function(todo) {
        return $http.post('/api/todos', todo);
      };

      this.remove = function(todo) {
        return $http.delete(`/api/todos/${todo._id}`);
      };
    });