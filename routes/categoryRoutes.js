const express = require ('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authJwt, role } = require('../middlewares');


router.post('/',[authJwt.verifyToken, role.checkRole('admin','coordinador')],categoryController.createCategory);
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoriesById);
router.put('/:id', [authJwt.verifyToken, role.checkRole('admin','coordinador')],categoryController.updateCategory);
router.delete('/:id',[authJwt.verifyToken, role.checkRole('admin')], categoryController.deleteCategory);

module.exports = router;