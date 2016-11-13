/**
 * Created by juan on 11-09-16.
 */
module.exports = function(req,res,next){
    if(!req.session.name){
        res.redirect("/login");
    }
    else{
        next();
    }
};