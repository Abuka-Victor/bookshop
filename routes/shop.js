const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/product/:productId', shopController.getProductDetail);

router.get('/cart', shopController.getCart);

router.post('/cart/delete-item', shopController.postDeleteCartItem);

router.post('/cart', shopController.postToCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
