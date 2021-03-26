class Fetch {

	static get(url, params = {}) {
		return Fetch.request('GET', url, params);
	}

	static delete(url, params = {}) {
		return Fetch.request('DELETE',	url + '/' + params.id, params);
	}

	static put(url, params = {}) {
		return Fetch.request('PUT',		url + '/' + params._id, params);
	}

	static post(url, params = {}) {
		return Fetch.request('POST', url, params);
	}

	static request(method, url, params = {}) {
		return new Promise((resolve, reject) => {
			let request;

			if (method.toLowerCase() == 'get') {
				request	= url;
			} else {
				request	= new Request(url, {
					method,
					headers : new Headers({
						'Content-Type'  : 'application/json', 
						'Accept'		: 'application/json'
					}),
					body: JSON.stringify( params )
				});
			}

			fetch(request).then(response => {
				response.json().then(json => {
					resolve(json);
				}).catch(e => {
					reject(e);
				});
			}).catch(e => {
				reject(e);
			});
		});
	}

}