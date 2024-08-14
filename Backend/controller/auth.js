const User = require("../models/user");
const ApiError = require("../utils/ApiError");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const ApiResponse = require("../utils/ApiResponse");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../services/auth");

exports.userSignUp = async (req, res) => {
  try {
    const { name, emailId, contactNumber, password, role } = req.body;

    if (!(name && emailId && contactNumber && password)) {
      return res.status(400).json(new ApiError("All fileds are mandatory"));
    }

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ emailId }, { contactNumber }],
      },
    });

    if (existingUser) {
      const errorMessage =
        existingUser.emailId === emailId
          ? "Already exists email"
          : "Already exists contact number";
      return res.status(400).json(new ApiError(errorMessage));
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name,
      role,
      emailId,
      contactNumber,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json(new ApiResponse("Welcome! Account created", user));
  } catch (error) {
    return res.status(500).json(new ApiError("Something went wrong"));
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!(emailId && password)) {
      return res.status(400).json(new ApiError("All fields are mandatory"));
    }

    const isUserExists = await User.findOne({ where: { emailId } });

    if (!isUserExists) {
      return res.status(400).json(new ApiError("Please create account"));
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserExists.password
    );

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json(new ApiError("Please enter correct credentials"));
    }

    const accessToken = await generateAccessToken(isUserExists);

    const { refreshToken, hashedRefreshToken } = await generateRefreshToken(
      isUserExists
    );

    const updateUser = await User.update(
      {
        refreshToken: hashedRefreshToken,
      },
      {
        where: {
          id: isUserExists.id,
        },
      }
    );

    if (updateUser) {
      return res.status(200).json(
        new ApiResponse("Welcome to CharityGram", {
          accessToken: accessToken,
          refreshToken: refreshToken,
        })
      );
    }
  } catch (error) {
    return res.status(500).json(new ApiError("Something went wrong"));
  }
};

exports.getRefreshToken = async (req, res) => {

    try {
        const { refreshToken, emailId } = req.body;
    
        if (!(refreshToken && emailId)) {
          return res
            .status(400)
            .json(new ApiError("Error occured in refresh token or email"));
        }
    
        const user = await User.findOne({
          where: { emailId },
        });
    
        const isValidToken = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!isValidToken) {
          return res.status(401).json(new ApiError("Invalid refresh token"));
        }
    
        const newAccessToken = await generateAccessToken(user);
    
        return res.status(200).json(
          new ApiResponse("Access token refreshed", {
            accessToken: newAccessToken,
          })
        );
      } catch (error) {
        return res.status(500).json(new ApiError("Something went wrong"));
      }

};

exports.getInfo = async (req, res) => {
    try {
        const userId = req.user.id;
        const userData = await User.findOne({
          where: { id: userId },
        });
    
        if (!userData) {
          return res.status(404).json(new ApiError("User details not found"));
        }
        const userDetails = {
          id: userData.id,
          name: userData.name,
          emailId: userData.emailId,
          contactNumber: userData.contactNumber,
          role: userData.role
        };
        return res
          .status(200)
          .json(new ApiResponse("User details get successfully", userDetails));
      } catch (error) {
        return res.status(500).json(new ApiError("Something went wrong"));
      }

};
