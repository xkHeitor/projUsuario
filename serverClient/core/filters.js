( function () {
	'use strict'
	angular.module('app')

		.filter('admFilter', function () {
			return function ( admin ) {
				let isAdmin				= 'Não';
				if ( admin ) isAdmin	= 'Sim';

				return isAdmin;
			}
		})

		.filter('reduceNameFilter', function () {
			return function ( name ) {
				if ( name.length > 10 ) {
					name = name.substring(0, 10) + '...';
				}

				return name;
			}
		})

		.filter('dateFormat', function () {
			return function ( date ) {
				return Utils.dateFormat( date );
			}
		})

})();