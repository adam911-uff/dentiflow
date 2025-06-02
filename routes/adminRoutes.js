const express =  require ('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require ('../middleware/authMiddleware');
const isAdminMiddleware= require('../middleware/isAdminMiddleware');

router.put('/user/:id', authMiddleware, isAdminMiddleware,adminController.updateUser );
router.get('/users', authMiddleware, isAdminMiddleware, adminController.getAllUsers);


router.get('/dashboard', authMiddleware, isAdminMiddleware, adminController.getDashboard);

module.exports = router;