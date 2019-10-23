function checkAdmin(req, res, next) {
  const user = req.user;

  if (!user.isAdmin)
    return res.status(403).send("You need to have admin privilages!");

  next();
}

module.exports = { checkAdmin };
