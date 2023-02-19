import userService from "../services/userService";

let handleLogin = async (req, res) => {
  // return res.status(200).json({ message: "Okay" });
  let email = req.body.email;
  let password = req.body.password;
  console.log(email);
  console.log(password);

  if (!email || !password) {
    return res.status(500).json({
      message: "Missing input value",
    });
  }
  let userData = await userService.handleUserLogin(email, password);
  console.log("userdata", userData);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    userData: userData.user ? userData : {},
  });
};

module.exports = { handleLogin };
