import express from "express"
import response from "../../controllers/response";
import { generateMegaAccessToken, validateTokenAPI } from "../../utils/JWT";
import limiter from "../../utils/RateLimiter";

const router = express.Router()

router.post("/login", limiter, function(req,res){
    let megaData = req.body 
    try {
        if(megaData.credentials == "mega"){
          let megaToken = generateMegaAccessToken(megaData)
          res.cookie("mega-token", megaToken, {
            httpOnly: true
          });
          return response(200, "success login", [], res)
        }else{
          return response(400, "Wrong Credentials", [], res)
        }
    } catch (error) {
        res.json(error)
    }  
});

export default router;
