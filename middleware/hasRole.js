module.exports = (...roles) => {
    return (req,res,next) => {
        if(!req.user) {
            return res.status(401).send({error: 'You must log in!'});
        }   
        if(!roles.includes(req.user.role)) {
            return res.status(401).send({error: 'You do not have the permission to perform this action!'});
        } 
        next();
    }
}