const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
    });
};

exports.postAddProduct = (req, res, next) => {
    const { title, imageUrl, price, description } = req.body;
    req.user
        .createProduct({
            title,
            imageUrl,
            description,
            price,
        })
        .then((result) => {
            console.log(result);
            res.redirect('/');
        })
        .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
    const productId = req.params.productId;
    req.user
        .getProducts({
            where: {
                id: productId,
            },
        })
        .then((product) => {
            console.log(product);
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                product: product[0],
            });
        })
        .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const { productId, title, imageUrl, price, description } = req.body;
    req.user
        .getProducts({
            where: {
                id: productId,
            },
        })
        .then((productValue) => {
            return Product.update(
                { title, imageUrl, price, description },
                { where: { id: productId } }
            );
        })
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const { productId } = req.body;
    Product.destroy({ where: { id: productId } }).then(() => {
        if (Cart.cartExists() && Cart.productExistsInCart(productId)) {
            Cart.recalculateTotalCost();
        }
        res.redirect('/');
    });
};

exports.getProducts = (req, res, next) => {
    req.user
        .getProducts()
        .then((products) => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products',
            });
        })
        .catch((err) => console.log(err));
};
