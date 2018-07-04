exports.showLogin = (req, res) => {
  res.render('login.html')
}

exports.login = (req, res) => {
  res.send('login')
}

exports.showRegister = (req, res) => {
  res.render('register.html')
}

exports.register = (req, res) => {
  res.send('register')
}

exports.logout = (req, res) => {
  res.send('logout')
}
