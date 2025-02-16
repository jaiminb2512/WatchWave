import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const RefreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!refreshToken) {
      throw new ApiError(401, "No refresh token provided");
    }

    const decodedUser = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedUser?._id);
    if (!user) {
      throw new ApiError(400, "Invalid RefreshToken");
    }

    if (refreshToken != user?.refreshToken) {
      throw new ApiError(401, "RefreshToken is expired or used");
    }

    const Options = {
      httpOnly: true,
      secure: true,
    };

    const { RefreshToken, AccessToken } = await GenerateAccessAndRefreshToken(
      user._id
    );

    return res
      .status(200)
      .cookie("accessToken", AccessToken, Options)
      .cookie("refreshToken", RefreshToken, Options)
      .json(
        new ApiResponse(
          200,
          user,
          { AccessToken, RefreshToken },
          "RefreshToken successfully updated"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh Token");
  }
});

export default RefreshAccessToken;
