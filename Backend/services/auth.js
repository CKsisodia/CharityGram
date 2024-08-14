const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.generateAccessToken = async (user) => {
  try {
    const accessTokenSecretKey = process.env.ACCESSTOKEN_SECRET_KEY;

    const userData = {
      id: user.id,
      role: user.role,
      name: user.name,
      emailId: user.emailId,
      contactNumber: user.contactNumber,
    };

    const jwtToken = jwt.sign(userData, accessTokenSecretKey, {
      expiresIn: "30m",
    });

    return jwtToken;
  } catch (error) {
    console.error("Error generating access token:", error);
    throw error;
  }
};

exports.generateRefreshToken = async (user) => {
  try {
    const refreshTokenSecretKey = process.env.REFRESHTOKEN_SECRET_KEY;

    const userData = {
      id: user.id,
      emailId: user.emailId,
    };

    const refreshToken = jwt.sign(userData, refreshTokenSecretKey, {
      expiresIn: "24h",
    });

    const saltRounds = 10;
    const hashedRefreshToken = await bcrypt.hash(refreshToken, saltRounds);

    return {
      refreshToken: refreshToken,
      hashedRefreshToken: hashedRefreshToken,
    };
  } catch (error) {
    console.error("Error generating refresh token:", error);
    throw error;
  }
};
