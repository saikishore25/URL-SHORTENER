const mongoose = require("mongoose");
const shortid = require("shortid");
const URL = require("../models/urlSchema.js");

const generateShortURL = async (req, res)=>{
    console.log("Received POST request with body:", req.body);
    const body = req.body;
    if((!body.url)){

        return res.status(400).json({msg:"URL Required"});

    }

    const shortID = shortid(8);

    await URL.create({

        shortID : shortID,
        redirectURL : body.url,
        visitHistory : []

    })

    return res.json({id: shortID});



}

const getAnalytics = async(req, res)=>{

    const shortID = req.params.shortID
    const result = await URL.findOne({shortID})
    return res.json({

        totalClicks: result.visitHistory.length,
        analytics:result.visitHistory
    })
}

const redirectURL =  async(req, res)=>{

    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate({

        shortID
    }, {
        $push: {

            visitHistory:{

                timestamp: Date.now()

            }
        }
    })
    res.redirect(entry.redirectURL);

}

const showURL = async(req, res)=>{

    const all_urls = await URL.find({});
    return res.render("Home", {
        urls: all_urls
    })

}

module.exports = {

    generateShortURL, getAnalytics, redirectURL, showURL

}