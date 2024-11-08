const authService = require("../service/login");
const { generateKey } = require("../../common/utils/csrfGenerate");

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    const cToken = await generateKey();
    res.cookie("csrf-token", cToken, {
      httpOnly: true, // Makes the cookie accessible only by the web server
      secure: true, // Ensures the cookie is sent only over HTTPS
      sameSite: "Strict", // Prevents CSRF by ensuring the cookie is only sent on same-site requests
    });
    res.json({ token: token, csrfT: cToken });
    const nameFromCookies = req.cookies["csrf-token"];
    console.log(nameFromCookies, "cookies========");
  } catch (err) {
    console.log("-------", err.message);
    res.status(401).json({ message: "Invalid credentials" });
  }
}

module.exports = {
  login,
};
