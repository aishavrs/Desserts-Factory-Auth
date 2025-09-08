const router = require("express").Router()
const {signup} = require("../controllers/userAuthController")
const {signin} = require("../controllers/userAuthController")

router.post("/signup", signup )
router.post("/signin", signin )

module.exports=router