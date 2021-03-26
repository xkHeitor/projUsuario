class Utils {

	static dateFormat ( date ) {
		let newDate = '';

		if ( date ) {
			date    = new Date(date);
			newDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
		} 

		return newDate;
	}

	static getPhotoData ( file ) {
		return new Promise( (resolve, reject) => {
			
			let fileReader = new FileReader;
			fileReader.onload = () => {
				resolve(fileReader.result);
			};

			fileReader.onerror = (e) => {
				reject(e);
			}
			
			fileReader.readAsDataURL(file);
		});
	}

}