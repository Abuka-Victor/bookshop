const Product = require('../models/product');
const Cart = require('../models/cart');
const CartItem = require('../models/cart-item');

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then((products) => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products',
            });
        })
        .catch((err) => console.log(err));
};

exports.getProductDetail = (req, res, next) => {
    const prodId = req.params.productId;
    Product.getProductById(prodId)
        .then(([product, productMetaInfo]) => {
            res.render('shop/product-detail', {
                product: product[0],
                pageTitle: product.title,
                path: '/products',
            });
        })
        .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then((products) => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/',
            });
        })
        .catch((err) => console.log(err));
};

// Result Image
// {
//   products: [
//     {
//       product: {
//         title: "some title",
//         description: "some title",
//         price: "some title",
//         id: "some title",
//         imageUrl: "some title",
//       },
//       qty: someQty
//     },
//   ]
//   totalPrice: total
// }

// Cart Image
// {
//     products: [
//         { id: '0.36709131339825496', qty: 1 },
//         { id: '0.07384702736276427', qty: 1 },
//     ],
//     totalPrice: 50,
// }

exports.getCart = (req, res, next) => {
    const cartResult = { products: null, total: null };
    req.user
        .getCart()
        .then((cart) => {
            return cart.getProducts();
        })
        .then((data) => {
            // Find total
            cartResult.total =
                Math.round(
                    data.reduce(
                        (acc, current) =>
                            acc + current.price * current.cartItem.qty,
                        0
                    ) * 1000
                ) / 1000;

            cartResult.products = data;
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                cart: cartResult,
            });
        })
        .catch((err) => console.log(err));
};

exports.postToCart = (req, res, next) => {
    const productId = req.body.productId;
    let cart;
    let quantity = 1;
    req.user
        .getCart()
        .then((cartValue) => {
            cart = cartValue;
        })
        .then(() => {
            Product.findByPk(productId)
                .then(async (product) => {
                    if (await cart.hasProduct(product)) {
                        // Increase quantity by 1
                        const newProduct = await cart.getProducts({
                            where: { id: productId },
                        });
                        quantity = newProduct[0].cartItem.qty + 1;
                    }
                    cart.addProduct(product, { through: { qty: quantity } });
                })
                .then(() => res.redirect('/cart'));
        })
        .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout',
    });
};

exports.postDeleteCartItem = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .getCart()
        .then((cart) => cart.removeProduct(prodId))
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => console.log(err));
};
