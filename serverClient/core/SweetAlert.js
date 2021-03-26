'use strict';

angular
	.module('app')
	.service('SweetAlert', [
		function() {

			/**
			 * Função que retorna uma instância do Sweet Alert.
			 *
			 * @returns	{Promise}
			 */
			this.Swal = () => window.Swal;

			/**
			 * Função que exibe uma mensagem de erro.
			 *
			 * @param	{String}			message	Mensagem do modal
			 * @param	{string|undefined}	message with html
			 * 
			 * @returns {Promise}
			 */
			this.error = (message, html = undefined) => {
				return window.Swal.fire({
					icon	: 'error',
					title	: 'Erro',
					text	: message,
					html	: html
				});
			};

			/**
			 * Função que exibe uma mensagem informativa.
			 *
			 * @param	{String}	title	Título do modal
			 * @param	{String}	message	Mensagem do modal
			 * 
			 * @returns {Promise}
			 */
			this.info = (title, message) => {
				return window.Swal.fire({
					icon	: 'info',
					title	: title,
					text	: message
				});
			};

			/**
			 * Função que exibe um questionamento.
			 *
			 * @param	{String}	title	Título do modal
			 * @param	{String}	message	Mensagem do modal
			 * 
			 * @returns {Promise}
			 */
			this.question = (title, message) => {
				return window.Swal.fire({
					icon				: 'question',
					title				: title,
					showCancelButton	: true,
					text				: message
				});
			};

			/**
			 * Função que exibe uma mensagem de sucesso.
			 *
			 * @param	{String}	message	Mensagem do modal
			 * 
			 * @returns {Promise}
			 */
			this.success = (message) => {
				return window.Swal.fire({
					icon	: 'success',
					title	: 'Sucesso',
					text	: message
				});
			};

			/**
			 * Função que exibe uma mensagem de alerta.
			 *
			 * @param	{String}	message	Mensagem do modal
			 * 
			 * @returns {Promise}
			 */
			this.warning = (message) => {
				return window.Swal.fire({
					icon	: 'warning',
					title	: 'Atenção',
					text	: message
				});
			};

	
			/**
			 * Função que exibe uma mensagem de alerta.
			 *
			 * @param	{String}		message		Mensagem do modal
			 * @param	{Function}		confirmed	Função a ser executada caso seja confimado
			 * @param	{Function|null}	denied		Função a ser executada caso seja negado
			 * 
			 * @returns {Promise}
			 */
			this.confirm = (message, confirmed, denied = null) => {
				return window.Swal.fire({
					icon				: 'warning',
					title				: 'Atenção',
					text				: message,
					showCancelButton	: true,
					confirmButtonColor	: "#DD6B55",
					confirmButtonText	: "Sim",
					cancelButtonText	: "Não"
				}).then( function ( response ) {
					if ( response.isConfirmed ) {
						confirmed();
					} else {
						if (denied) denied();
					}
				});
			}

		}
	]);