const userManager = require("../manager/user.manager");
const registerUser = async (request, response) => {
  userManager
    .registerUser(request.body,response)
    .catch((error) => response.status(500).send(error.message));
};
const verifyOtp = async (request, response) => {
  console.log("lmlml")
  userManager
    .verifyOtp(request,response)
    .catch((error) => response.status(500).send(error.message));
};
const loginuser = async (request, response) => {
  console.log(request.body)
  userManager
    .loginuser(request.body,response)
    .catch((error) => response.status(500).send(error.message));
};
module.exports = {loginuser, registerUser,verifyOtp };
