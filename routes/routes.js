const express = require("express");
const router = express.Router();
const filesPayloadExists = require("../middleware/filesPayloadExists");
const fileExtLimiter = require("../middleware/fileExtLimiter");
const fileSizeLimiter = require("../middleware/fileSizeLimiter");
const fileUpload = require("express-fileupload");
const {
  login,
  logout,
  register,
  dashboard,
  googleLogin,
  getAllUsers,
  verifyUser,
  requestOtp,
  upload,
} = require("../controllers/user");
const authMiddleware = require("../middleware/auth");

router.route("/login").post(login);
router.route("/verify").post(verifyUser);
router.route("/getOtp").post(requestOtp);
router.route("/googlelogin").post(googleLogin);
router.route("/logout").post(logout);
router.route("/register").post(register);
router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/users").get(getAllUsers);
router
  .route("/upload")
  .post(
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiter([".png", ".jpg", ".jpeg"]),
    fileSizeLimiter,
    upload
  );

const empController = require('../controllers/employeeController');
router.post('/employees', empController.createEmployee);
router.get('/employees', empController.getEmployees);
router.get('/employees/:id', empController.getEmployeeById);
router.put('/employees/:id', empController.updateEmployee);
router.delete('/employees/:id', empController.deleteEmployee);

const deptController = require('../controllers/departmentController');
router.post('/departments', deptController.createDepartment);
router.get('/departments', deptController.getDepartments);
router.get('/departments/:id', deptController.getDepartmentById);
router.put('/departments/:id', deptController.updateDepartment);
router.delete('/departments/:id', deptController.deleteDepartment);

module.exports = router;
