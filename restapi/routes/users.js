let NeDB    = require('nedb');
let userDB  = new NeDB({
    filename        : 'users.db',
    autoload        : true,
    timestampData   : true
});

module.exports = app => {

    let route   = app.route('/users');
    let routeID = app.route('/users/:id');


    // POST
    route.post((req, res) => {

        if (!app.utils.validators.user(app, req, res)) return false;

        userDB.insert(req.body, (err, user) => {

            if (err) {
                app.utils.error.send(err, req, res);
                return;
            }

            res.status(200).json(user);

        });
    });
    

    // GET ALL
    route.get( (req, res) => {

        userDB.find({}).sort({ name : 1 }).exec( (err, users) => {

            if (err) {
                app.utils.error.send(err, req, res);
                return;
            } 

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ users }); 
            
        });
    });  


    // GET ONE
    routeID.get( (req, res) => {

        userDB.findOne({ _id: req.params.id }).exec( (err, user) => {

           if (err) {
               app.utils.error.send(err, req, res);
               return;
           } 

            res.status(200).json(user);
           
        });
    });


    // PUT
    routeID.put( (req, res) => {

        if (!app.utils.validators.user(app, req, res)) return false;

        userDB.update({ _id: req.params.id }, req.body, err => {

            if (err) {
                app.utils.error.send(err, req, res);
                return;
            }

            res.status( 200 ).json(
                Object.assign(req.params, req.body));

        });
    });


    // DELETE
    routeID.delete( (req, res) => {

        userDB.remove({ _id: req.params.id }, {}, err => {

            if (err) {
                app.utils.error.send( err, req, res );
                return;
            }

            res.status( 200 ).json( req.params );

        })
    });
};