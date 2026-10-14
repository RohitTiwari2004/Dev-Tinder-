 const adminAuth = (req,res,next)=>
{
    console.log("Admin auth is getting checked !!!");
    const token = "xyz";
    const isAuthorizedToken = token === "xyz";
    if(!isAuthorizedToken)
    {
        res.status(401).send("Unauthorized request");
    }
    else
    {
        next();
    }
}


const userAuth = (req,res,next)=>
{
    console.log("user auth is getting checked");
    const token = "Nepal";
    const isAuthorizedUserToken = token === "Nepal";
    if(!isAuthorizedUserToken)
    {
        res.status(401).send({
            message: "Unauthorized access"
        });
    }
    else
    {
        next();
    }
}
module.exports = {adminAuth, userAuth}