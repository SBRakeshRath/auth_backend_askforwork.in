const router = require("express").Router();

// router.use(require())
router.post('/',(req,res,next)=>{


    res.json({"hello" : "doc"})
})
module.exports = router;
