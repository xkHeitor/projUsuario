module.exports = {
    
    send: (err, req, res, statusCode = 400) => {
        console.log(`Error: ${err}`);
        res.status(statusCode).json({
            error: err
        });
    }
};