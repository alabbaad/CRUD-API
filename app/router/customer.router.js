const customer = require('../controller/customer.controller.js');
const router = require('express').Router();

router.get('/', customer.findAll)
router.get('/:id', customer.findOne)
router.post('/', customer.create)
router.put('/:id', customer.update)
router.delete('/', customer.deleteAll)
router.delete('/:id', customer.deleteOne)

module.exports = router