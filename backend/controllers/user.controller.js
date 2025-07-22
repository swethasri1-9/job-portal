import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({ message: "Missing fields", success: false });
    }

    let resumeFile = req.files?.file?.[0];
    let avatarFile = req.files?.avatar?.[0];

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    // Upload avatar
    if (avatarFile) {
      const avatarUri = getDataUri(avatarFile);
      const avatarUpload = await cloudinary.uploader.upload(avatarUri.content);
      newUser.profile.profilePhoto = avatarUpload.secure_url;
    }

    // Upload resume
    if (resumeFile) {
      const resumeUri = getDataUri(resumeFile);
      const resumeUpload = await cloudinary.uploader.upload(resumeUri.content);
      newUser.profile.resume = resumeUpload.secure_url;
      newUser.profile.resumeOriginalName = resumeFile.originalname;
    }

    await newUser.save();

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Missing fields", success: false });
    }

    let user = await User.findOne({ email }).populate("savedJobs");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Incorrect email or password", success: false });
    }

    if (role !== user.role) {
      return res.status(400).json({ message: "Incorrect role", success: false });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
    const savedJobIds = user.savedJobs.map(job => job._id.toString());

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
      savedJobs: savedJobIds, // ✅ ADD THIS
    };


    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json({ message: `Welcome back ${user.fullname}`, user, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login failed", success: false });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const resumeFile = req.files?.file?.[0];
    const avatarFile = req.files?.avatar?.[0];

    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found", success: false });
    }

    let skillsArray = skills ? skills.split(",").map((s) => s.trim()) : [];

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // Upload avatar
    if (avatarFile) {
      const avatarUri = getDataUri(avatarFile);
      const avatarUpload = await cloudinary.uploader.upload(avatarUri.content);
      user.profile.profilePhoto = avatarUpload.secure_url;
    }

    // Upload resume
    if (resumeFile) {
      const resumeUri = getDataUri(resumeFile);
      const resumeUpload = await cloudinary.uploader.upload(resumeUri.content);
      user.profile.resume = resumeUpload.secure_url;
      user.profile.resumeOriginalName = resumeFile.originalname;
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed", success: false });
  }
};
