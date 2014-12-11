var app = angular.module('fancytodo', []);

app.directive('ngBlur', function(){
	return function(scope, elem, attrs){
		elem.bind('blur', function(){
			scope.$apply(attrs.ngBlur);
		})
	}
});

app.controller('toDoController', function($scope, filterFilter, $http, $location){

	$scope.todos = [];
	$scope.placeholder = "Chargement..."	
	$scope.statusFilter = {};
		
	$http.get('todos.php').success(function(data){
		$scope.todos = data;
		$scope.placeholder = "Ajouter une Nouvelle Tâche";
	});
	
	$scope.$watch('todos', function(){
		$scope.remaining = filterFilter($scope.todos, { completed: false }).length;
		$scope.allchecked = !$scope.remaining;
	}, true)
	
	if($location.path() == ''){ $location.path('/')}
	$scope.location = $location;
	$scope.$watch('location.path()', function(path){
		$scope.statusFilter = 
		(path == '/active') ? {completed : false} : 
		(path == '/done') ? {completed : true} :
		null;
	})
	
	$scope.deleteTodo = function(index){
		$scope.todos.splice(index, 1);
	}
	
	$scope.addTodo = function(){
		$scope.todos.push({
			name : $scope.newitem,
			completed : false
		});
		
		$scope.newitem = '';
	}
	
	$scope.editTodo = function(todo){
		todo.editing = false;
	}
	
	$scope.checkAllTodo = function(allchecked){
		$scope.todos.forEach(function(todo){
			todo.completed = allchecked;
		})
	}
});