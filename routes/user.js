const router = require('express').Router();
const { userAuth } = require('../middlewares/auth');
const {
  registerController,
  loginController,
  samplePage,
} = require('../controllers/user');

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/', userAuth, samplePage);

module.exports = router;
