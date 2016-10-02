(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'founditemlist.html',
    scope: {
      found: '<',
      onRemove: '&'
    }
  };

  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  menu.searchTerm = "";

  menu.getMatchedMenuItems = function () {
    var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
    promise.then(function (result) {
      menu.found = result.data.menu_items;
      console.log(menu.found);
    });
  };

  menu.removeItem = function (index) {
    menu.found.splice(index, 1);
  }

}


MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json")
          }).then(function (result) {
            // process result and only keep items that match
            var foundItems = []

            for (var index in result.data.menu_items) {
              if (result.data.menu_items[index].description.indexOf(searchTerm) != -1) {
                foundItems.push(result.data.menu_items[index]);
              }
            }

            // return processed items
            result.data.menu_items = foundItems;
            return result;
          });
  };

}

})();
