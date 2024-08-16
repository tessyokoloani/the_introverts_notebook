const confirmCookie = async (req, res, next) => {
  const { cookie } = req.cookie;
  if (cookie) {
    // If the cookie exists, proceed with the request
    req.user = cookie;
    console.log(req.user);
    next();
  } else {
    // If the cookie does not exist, redirect to the login page
    res.redirect("/login");
  }
};

module.exports = confirmCookie;
