import { asyncHandler } from "../../utils/asyncHandler.js";
import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const LogoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const Options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("access-token", Options)
    .clearCookie("refresh-token", Options)
    .json(new ApiResponse(200, {}, "User Logout Successfully"));
});

export default LogoutUser;
