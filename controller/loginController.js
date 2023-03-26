// Get login page

function getLogin(req, res, next){
    res.render("index", {
        title: "CheetChat - Chat Application"
    })
}


module.exports = {
    getLogin
}