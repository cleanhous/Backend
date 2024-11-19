const { Router } = require("express")

const AuthAdminController = require("../controllers/authAdminController")

const router = Router()

router.post("/admin/login", AuthAdminController.login)

module.exports = router