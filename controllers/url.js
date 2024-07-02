const shortid = require("shortid");
const URL = require("../model/url")
async function handleGenerateShortUrl(req,res)
{
    const body = req.body;
    if(!body.url) return res.status(400).json({error:"Url is required"});
    const shortId = shortid();
    await URL.create({
        shortId:shortId,
        redirectUrl:body.url,
        visitHistory:[],
        createdBy:req.user._id,
        
    });

    return res.render("home",{
        id:shortId
    });
    
}

module.exports=handleGenerateShortUrl;