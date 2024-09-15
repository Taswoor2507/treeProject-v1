import User from "../models/user.model.js"
import ApiError from "./apiError.utils.js"

const generateAccessAndRefereshTokens = async (userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        return next (new ApiError("Something went wrong while generating referesh and access token" , 500))
    }
}

export default generateAccessAndRefereshTokens;