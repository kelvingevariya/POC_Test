import { Router } from "express";
import { graphClient } from "./authCoonfig";

export const router = Router()



router.get("/fileupload",async(req,res) => {
    const body = req.body
    const userEmail = body.userEmail
    // const res = graphClient.api("/me").get()
    const res = authProvideGrpah

    res.json({user:res})

})