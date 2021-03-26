class validations {

	/**
	 * 
	 * @param 		{Object} requiredFields	Exemplo: { name : { fieldName : Nome } };
	 * @param 		{Object} userObj		
	 * 
	 * @returns 	{Object}
	 */
	static requiredFields ( requiredFields, userObj ) {
		let msg		= 'O(s) campo(s): ';
		let fields	= {
			'valid'	: true,
			'msg'	: msg
		};

		Object.keys(requiredFields).forEach(field => {
			if (!userObj[field]) fields.msg += requiredFields[field].fieldName + ', ';
		});

		if (fields.msg != msg) {
			fields.valid	= false;
			fields.msg		= fields.msg.replace(/,\s*$/, '') + ' são obrigatório(s)!';
		}

		return fields;
	}

}