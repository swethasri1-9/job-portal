import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob, applyJob } from "../controllers/job.controller.js";
import { saveJob, unsaveJob } from "../controllers/job.controller.js";


const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/apply/:id").post(isAuthenticated, applyJob);
router.post("/save/:id", isAuthenticated, saveJob);
router.post("/unsave/:id", isAuthenticated, unsaveJob);


export default router;

