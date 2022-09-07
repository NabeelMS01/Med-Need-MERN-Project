const express = require("express");

const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

const {
  updateResume,
  ProfileData,
  checkFormstatus,
  submitApplication,
  createAccount,
  authUser,
  verify,
  getallusers,
  BlockUnblock,
  getAllProfessions,
  UpdateProfile,
} = require("../controllers/UserControllers");
const {
  userProfiles,
  adminAuth,
  getUser,
  addProfession,
  getCategory,
  acceptProfile,
 
} = require("../controllers/AdminControllers");
//=================user router==============================
router.get("/get-all-users", getallusers);
router.post("/create-account", createAccount);
router.post("/login", authUser);
router.post("/block-user", BlockUnblock);
router.post("/unblock-user", BlockUnblock);
router.get("/getAllProfessions", getAllProfessions);
router.post("/formStatus", checkFormstatus);
router.get("/profile/:id", ProfileData);
router.post(
  "/update-resume",
  upload.fields([
    {
      name: "resume",
      maxCount: 1,
    },
  ]),
  updateResume
);
router.post(
  "/update-profile",
  upload.fields([
    {
      name: "resume",
      maxCount: 1,
    },
  ]),
  updateResume
);
router.post(
  "/edit-profile",
  upload.fields([
    {
      name: "profile_img",
      maxCount: 1,
    },
    {
      name: "resume",
      maxCount: 1,
    },
  ]),
  submitApplication
);
  router.post(
  "/update-profile-data",
  upload.fields([
    {
      name: "profile_img",
      maxCount: 1,
    },
   
  ]),
  UpdateProfile
);

//=====================admin router =======================

router.post("/admin-login", adminAuth);
router.get("/user/:id", getUser);
router.get("/user-profiles", userProfiles);
router.post("/admin/add-profession", upload.single("image"), addProfession);
router.get("/admin/get-all-professions", getCategory);
router.get("/accept-profile/:status/:id", acceptProfile);

module.exports = router;
