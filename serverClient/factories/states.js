angular.module('app')
.factory('states', function ($http) {
	return {
		getList: () => { 
			return $http({
				method  : 'GET',
				url     : 'http://servicodados.ibge.gov.br/api/v1/localidades/estados'
			});
		}
	};
});