import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async(req,res) => {
    //Get the details of the user
    //validations check whether this details are given by the user or not
    // check user exists already or not
    // check for images 

    const {fullname,email,username,password} = req.body;
    console.log("email :", email)
    
    if (!fullname || !email || !username || !password) {
       throw new ApiError(400,"All fields are required")
    }
    // check user exists already or not using the or operator

    const existingUser = User.findOne({
        $or:[{ username },{ email }]
    })

    if (existingUser){
        throw new ApiError(409,"User Already Registred with email or username")
    }

    //check for images Multer gives .files option in case for the req method
    const avatarLocalPath = req.files?.avatar[0]?.path;

    const coverImageLocalPath = req.files?.coverImage[0].path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required");
    }

    //upload them to cloudinary

    const avatar = await uploadOnCloudinary(avatarLocalPath) // as this step take time we will wait here

    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    // Create user in the DB as all checks are completed

     const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken" // this is the syntax of select - means dont show these feilds
    );

    if(!createdUser) {
        throw new ApiError(400,"User not created and something went wrong")
    }

    //user created successfully then send the response

    return res.status(200).json(
        new ApiResponse(200,createdUser,"User Created Successfully")
    )
    
} )

export {registerUser}