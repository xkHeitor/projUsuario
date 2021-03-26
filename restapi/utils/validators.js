module.exports = {

    user: (app, req, res) => {
        req.assert('name'      ,   'O nome é obrigatório').notEmpty();
        req.assert('password'  ,   'A senha é obrigatório').notEmpty();
        req.assert('email'     ,   'O email está inválido').isEmail();

        let errors  = req.validationErrors();
        let valid   = true;

        if (errors) {
            app.utils.error.send(errors, req, res);
            valid   = false;
        }

        return valid;
    }
    
};