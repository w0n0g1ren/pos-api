const logRequest =(req, res, next) =>{
    console.log('log request path: ', req.path, ' method: ', req.method);
    next();
}

module.exports = logRequest