import { ApiError } from "./ApiError.js"

const GenerateAccessAndRefreshToken = async(user) => {
    try {
        const AccessToken = user.generateAccessToken()
        const RefreshToken =user.generateRefreshToken() 

        user.refreshToken - RefreshToken
        await user.save({ValidationBeforeSave : false})

        return {RefreshToken, AccessToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

export default GenerateAccessAndRefreshToken