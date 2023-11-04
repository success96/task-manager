const errorHandlerMiddleWare = (err, req, res, next) =>{
    return res.status(500).json({msg: err})
}

module.exports = errorHandlerMiddleWare