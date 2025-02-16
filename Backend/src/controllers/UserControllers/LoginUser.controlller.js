import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import GenerateAccessAndRefreshToken from "../../utils/GenerateAccessAndRefreshToken.js";

const LoginUser = asyncHandler(async (req, res) => {
  // Get the data from req
  // User is available or not
  // Match the password
  // Generate a token and refresh token
  // Return the token and refresh token

  const { email, username, password } = req.body;
  if (!email && !username) {
    throw new Error(400, "Email or Username is required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!existedUser) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect = await existedUser.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid user Credentials");
  }

  const { RefreshToken, AccessToken } =
    await GenerateAccessAndRefreshToken(existedUser);

  const resUser = existedUser.toObject();
  delete resUser.password;

  const Options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", AccessToken, Options)
    .cookie("refreshToken", RefreshToken, Options)
    .json(
      new ApiResponse(
        200,
        { user: resUser },
        AccessToken,
        RefreshToken,
        "User Loggedin Successfully"
      )
    );
});

export default LoginUser;
