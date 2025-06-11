const express = require('express');
const productsController = require('../controllers/productController');
const router = express.Router();
const {check} = require('express-validator');
const { authJwt, role } = require('../middlewares');


const validateProduct = [

    check('name').not().isEmpty().withMessage('el nombre es obligatorio'),
    check('description').not().isEmpty().withMessage('la descripcion es obligatorio'),
    check('price').isFloat({min:0}).isEmpty().withMessage('el precio es obligatorio'),
    check('stock').isInt({min:0}).withMessage('stock invalido'),
    check('category').not().isEmpty().withMessage('la categoria es requerida'),
    check('subcategory').not().isEmpty().withMessage('la subcategoria es requerida'),
];
router.post('/',[authJwt.verifyToken, role.checkRole('admin','coordinador')], validateProduct, productsController.createProduct);
router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductById);
router.put('/:id',[authJwt.verifyToken, role.checkRole('admin','coordinador')],validateProduct, productsController.updateProduct);
router.delete('/:id',[authJwt.verifyToken, role.checkRole('admin')], productsController.deleteProduct);

module.exports = router;