var express = require('express'),
	router = express.Router();
router.get("/", function (req, res) {

  return res.redirect('/html/backLogin.html');
  console.log(req.url);

});
//判断用户是否登录，否就返回登录页面
router.get("/html/adminList.html",checkLogin);
router.get("/html/backHome.html",checkLogin);
router.get("/html/backHomeIndex.html",checkLogin);
router.get("/html/browserUp.html",checkLogin);
router.get("/html/courseList.html",checkLogin);
router.get("/html/editCourse.html",checkLogin);
router.get("/html/studentList.html",checkLogin);
router.get("/html/videoList.html",checkLogin);

function checkLogin(req, res, next) {
	// if (!req.session.user) {
	// 	return res.redirect('/');
	// }
	next();
}
function checkNotLogin(req, res, next) {
	if (req.session.user) {
		req.flash('error', '已登入');
		return res.redirect('/');
	}
	next();
}

module.exports = router;
