import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";

// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary,
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
// student k liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// student can apply to job
export const applyJob = async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== "student") {
      return res.status(403).json({
        message: "Only students can apply for jobs.",
        success: false,
      });
    }

    const jobId = req.params.id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    // Check if already applied
    if (job.applications.includes(user._id)) {
      return res.status(400).json({
        message: "You have already applied for this job.",
        success: false,
      });
    }

    job.applications.push(user._id);
    await job.save();

    return res.status(200).json({
      message: "Job application submitted successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", success: false });
  }
};

export const saveJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    const user = await User.findById(userId);
    if (!user.savedJobs.includes(jobId)) {
      user.savedJobs.push(jobId);
      await user.save();
    }

    const updatedUser = await User.findById(userId); // ✅ fetch updated user

    return res.status(200).json({
      message: "Job saved successfully",
      success: true,
      user: updatedUser, // ✅ return updated user
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to save job",
      success: false,
    });
  }
};

export const unsaveJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found", success: false });

    user.savedJobs = user.savedJobs.filter((id) => id.toString() !== jobId);
    await user.save();

    const updatedUser = await User.findById(userId); // ✅ fetch updated user

    return res.status(200).json({
      message: "Job removed from saved",
      success: true,
      user: updatedUser, // ✅ return updated user
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
