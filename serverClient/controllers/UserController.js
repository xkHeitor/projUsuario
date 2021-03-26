(function () {
	'use strict'
	angular.module('app')
		.controller('UserController', function ( $scope, API_PATH, states, SweetAlert ) {
		
			const APIroute		= 'users';
			const ADDUser		= 'adding';
			const EDITUser		= 'editing';
					
			let user      		= { 
				'name'      : '',   	'gender'    : 'M',
				'birth'     : '',   	'state'     : '',
				'email'     : '',   	'password'  : '',
				'admin'		: false,	'photo'		: ''								
			};

			let requiredFields	= {
				'name'  	: { "fieldName" : "Nome"		},
				'gender'	: { "fieldName" : "Gênero"		},
				'birth'		: { "fieldName" : "Nascimento"	},
				'email'		: { "fieldName" : "Email"		},
				'password'	: { "fieldName" : "Senha"		}
			};

			$scope.photo		= false;
			$scope.states       = [];  
			$scope.listUsers	= [];
			$scope.userObj		= { [ADDUser]	: user,	[EDITUser]		: user	};
			$scope.formStatus	= { [ADDUser] 	: true,	[EDITUser]		: false	};
			$scope.typeUsers	= { 'admin' 	: 0, 	'commonUser' 	: 0 	};

			$scope.init = function () {
				// Carrega a listagem dos estados.
				if ( $scope.states.length === 0 ) {
					states.getList().then( response => {
						$scope.states = response.data;
					});
				}

				// Carrega listagem de usuários cadastrados.
				Fetch.get( API_PATH + APIroute )
				.then( response => {
					$scope.listUsers = response.users;

					// Faz a contagem dos usuário para saber quantidade de admins e usuários.
					countTypeUsers( response.users );
				});
			};

			$scope.validSave = function () {
				if (!formValidation( ADDUser )) save();	
			}

			function save() {
				removeHashKeyObject(ADDUser);
				Fetch.post(API_PATH + APIroute, $scope.userObj[ADDUser])
					.then(response => {
						returnTreatment(response, 'Usuário gravado com sucesso!');
					});
			};

			$scope.validUpdate = function () {
				if (!formValidation( EDITUser )) update();
			}

			function update() {
				removeHashKeyObject(EDITUser);
				SweetAlert.confirm('Deseja realmente alterar os dados?', () => {
					Fetch.put(API_PATH + APIroute, $scope.userObj[EDITUser])
						.then(response => {
							returnTreatment(response, 'Registro alterado com sucesso!');
							$scope.changeFormStatus();
						});
				});
			}

			$scope.deleteUser = function ( index, userObj ) {
				SweetAlert.confirm('Deseja realmente excluir esse registro?', () => {
					Fetch.delete(API_PATH + APIroute, { 'id': userObj._id })
						.then(function (response) {
							$scope.listUsers.splice(index, 0);
							returnTreatment(response, 'Usuário deletado com sucesso!');
						});
				});
			};
			
			$scope.changeFormStatus = function  ( user = {} ) {
				$scope.formStatus[ADDUser] 	= !$scope.formStatus[ADDUser];
				$scope.formStatus[EDITUser]	= !$scope.formStatus[EDITUser];

				// Caso for alterar para edição de usuário, passar os dados que estão sendo editados. 
				if ( $scope.formStatus[EDITUser] ) {
					user.birth 					= new Date(user.birth)
					$scope.userObj[EDITUser] 	= Object.assign({}, user)
				}
			}

			$scope.changePhotoButton = function () {
				$scope.photo = !$scope.photo
			}

			function returnTreatment ( response, successMsg  ) {
				if (response.error) {
					Error.errorAPI(response.error, SweetAlert);
				} else {
					SweetAlert.success( successMsg );
					$scope.init();
					clearForm();
				}
			}

			function countTypeUsers ( listUsers ) {
				$scope.typeUsers = { 'admin': 0, 'commonUser': 0 };
				listUsers.forEach( user => {
					if ( user.admin ) {
						$scope.typeUsers.admin++;
					} else {
						$scope.typeUsers.commonUser++;
					}
				});
			}

			function formValidation  ( typeForm ) {
				let invalid		= false;
				let recordData	= validations.requiredFields(requiredFields, $scope.userObj[typeForm]);
				if (!recordData.valid) {
					SweetAlert.warning(recordData.msg);
					invalid 	= true;
				}

				return invalid;
			}

			$scope.getPhoto = function ( typeForm ) {
				let photo = typeForm === 'A' ? document.getElementById('addingPhoto') : document.getElementById('editingPhoto');
	
				if ( photo ) {
					Utils.getPhotoData( photo.files[0] )
					.then( function ( photoData ) {
						if ( typeForm === 'A' ) {
							$scope.userObj[ADDUser].photo	= photoData;
						} else {
							$scope.userObj[EDITUser].photo	= photoData;
						}
					});
					$scope.changePhotoButton();
				} else {
					SweetAlert.warning('Cancela e adicione alguma foto para salva-la!');
				}
			}

			function removeHashKeyObject ( typeForm ) {
				if ( $scope.userObj[typeForm]['$$hashKey'] ) {
					$scope.userObj[typeForm]['$$hashKey'] = undefined;
				}
			}	

			function clearForm () {
				$scope.userObj[ADDUser] = user;
			}

	})
})();