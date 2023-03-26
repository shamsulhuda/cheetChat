const createEror = require("http-errors");
// 404 not found handler

function notFoundHandler(req, res, next){
    next(createEror(404, "404 Content Not Found!"));
}

// Defalt error handler

function errorHandler (err, req, res, next){
    res.locals.error = process.env.NODE_ENV === 'development' ? err : {message: err.message}
    res.status(err.status || 500);
    
    // html response
    if(res.locals.html){
        res.render("error", {
            title: "Error page"
        })
    }else{
        // json response
        res.json(res.locals.error)
    }
}

module.exports = {
    notFoundHandler,
    errorHandler
}