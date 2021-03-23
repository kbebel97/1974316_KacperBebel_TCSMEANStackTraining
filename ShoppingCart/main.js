//--------------------------------------------interfaces---------------------------------------------------
var product_1 = {
    id: 0,
    name: 'playstation5',
    price: 500,
    description: "sony's new console",
    src: 'https://images-na.ssl-images-amazon.com/images/I/619BkvKW35L._SX342_.jpg'
};
var product_2 = {
    id: 1,
    name: 'Xbox Series X',
    price: 500,
    description: "Microsoft's new console",
    src: 'https://cdn.vox-cdn.com/thumbor/a_ymDVPv-hGegntPeTiHtCXOPR0=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/19810251/XboxSeriesX_FrontOrtho_DkBG_16x9_Crop_RGB.png'
};
var product_3 = {
    id: 2,
    name: 'Nintendo Switch',
    price: 300,
    description: "Nintendo's portable home console",
    src: 'https://images-na.ssl-images-amazon.com/images/I/71ivrWiYkLL._SX522_.jpg'
};
var product_4 = {
    id: 3,
    name: 'NVIDIA GeForce RTX 3080',
    price: 700,
    description: "NVIDIA's latest powerful graphics card. Good luck finding one",
    src: 'https://i.ebayimg.com/images/g/ChsAAOSwXrpfbI4~/s-l640.jpg'
};
var product_5 = {
    id: 4,
    name: 'Playstation2',
    price: 200,
    description: "Sony's old console. Amazing games, great experiences",
    src: 'https://images-na.ssl-images-amazon.com/images/I/81QWa2SdU-L._SL1500_.jpg'
};
var product_6 = {
    id: 5,
    name: 'Wii',
    price: 50,
    description: "Nintendo's old console. Wii sports and motion controls!",
    src: 'https://www.slashgear.com/wp-content/uploads/2020/01/Wii1-1280x720.jpg'
};
var products = [product_1, product_2, product_3, product_4, product_5, product_6];
//--------------------------------------------Cart---------------------------------------------------
function add_to_cart(product) {
    var cart = retrieveCart();
    if (cart) {
        var isFound_1 = false;
        cart.forEach(function (cartItem) {
            if (cartItem.id == product.id) {
                cartItem.qty++;
                isFound_1 = true;
            }
        });
        if (!isFound_1) {
            var cartItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description,
                src: product.src,
                qty: 1
            };
            cart.push(cartItem);
        }
        sessionStorage.setItem("cart", JSON.stringify(cart));
    }
    else {
        var cart_1 = [];
        var cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            src: product.src,
            qty: 1
        };
        cart_1.push(cartItem);
        sessionStorage.setItem("cart", JSON.stringify(cart_1));
    }
}
function retrieveCart() {
    var cart = sessionStorage.getItem("cart");
    return JSON.parse(cart);
}
function remove_from_Cart(cartItem, cart) {
    cart.splice(cart.indexOf(cartItem), 1);
    sessionStorage.setItem("cart", JSON.stringify(cart));
}
//--------------------------------------------checkout---------------------------------------------------
function add_to_checkout(cart) {
    var checkout = retrieveCheckout();
    if (checkout) {
        var isFound_2 = false;
        checkout.forEach(function (checkoutItem) {
            cart.forEach(function (cartItem) {
                if (cartItem.id == checkoutItem.id) {
                    checkoutItem.qty += cartItem.qty;
                    isFound_2 = true;
                }
            });
        });
        if (!isFound_2) {
            cart.forEach(function (cartItem) {
                var checkoutItem = {
                    id: cartItem.id,
                    name: cartItem.name,
                    price: cartItem.price,
                    description: cartItem.description,
                    src: cartItem.src,
                    qty: 1
                };
                checkout.push(checkoutItem);
            });
        }
        sessionStorage.setItem("checkout", JSON.stringify(checkout));
    }
    else {
        var checkout_1 = [];
        cart.forEach(function (cartItem) {
            var checkoutItem = {
                id: cartItem.id,
                name: cartItem.name,
                price: cartItem.price,
                description: cartItem.description,
                src: cartItem.src,
                qty: 1
            };
            checkout_1.push(checkoutItem);
        });
        sessionStorage.setItem("checkout", JSON.stringify(checkout_1));
    }
}
function add_single_cartItem_to_checkout(cartItem, cart) {
    var checkout = retrieveCheckout();
    if (checkout) {
        var isFound_3 = false;
        checkout.forEach(function (checkoutItem) {
            if (checkoutItem.id == cartItem.id) {
                checkoutItem.qty += cartItem.qty;
                isFound_3 = true;
            }
        });
        if (!isFound_3) {
            var checkoutItem = {
                id: cartItem.id,
                name: cartItem.name,
                price: cartItem.price,
                description: cartItem.description,
                src: cartItem.src,
                qty: 1
            };
            checkout.push(checkoutItem);
        }
        sessionStorage.setItem("checkout", JSON.stringify(checkout));
        this.remove_from_Cart(cartItem, cart);
    }
    else {
        var checkout_2 = [];
        var checkoutItem = {
            id: cartItem.id,
            name: cartItem.name,
            price: cartItem.price,
            description: cartItem.description,
            src: cartItem.src,
            qty: 1
        };
        checkout_2.push(checkoutItem);
        sessionStorage.setItem("checkout", JSON.stringify(checkout_2));
        this.remove_from_Cart(cartItem, cart);
    }
}
function retrieveCheckout() {
    var checkout = sessionStorage.getItem("checkout");
    return JSON.parse(checkout);
}
function remove_from_checkout(checkoutItem, checkout) {
    checkout.splice(checkout.indexOf(checkoutItem), 1);
    sessionStorage.setItem("checkout", JSON.stringify(checkoutItem));
}
function remove_all_from_checkout() {
    sessionStorage.setItem("checkout", null);
}
//--------------------------------------------checkout_function---------------------------------------------------
function populateCheckout() {
    var checkout = retrieveCheckout();
    if (checkout) {
        var total_1 = 0;
        var table = document.getElementById("checkout_table");
        var body = table.getElementsByTagName("tbody")[0];
        checkout.forEach(function (checkoutItem) {
            total_1 += checkoutItem.price;
            var newRow = body.insertRow(0);
            var cell1 = newRow.insertCell(0);
            cell1.innerHTML = checkoutItem.name;
            var cell2 = newRow.insertCell(1);
            cell2.innerHTML = String(checkoutItem.price);
            var cell3 = newRow.insertCell(2);
            cell3.innerHTML = String(checkoutItem.qty);
            cell1.setAttribute('style', 'flex: 1;  text-align: center');
            cell2.setAttribute('style', 'flex: 1;  text-align: center');
            cell3.setAttribute('style', 'flex: 1; text-align: center');
            newRow.setAttribute("style", "display : flex; display-direction: row; align-items: center; height: 50px; padding: 5px; font-family: Unica One, cursive; font-weight: 600; font-size: larger");
        });
        var newRow = body.insertRow(-1);
        var cell1 = newRow.insertCell(0);
        cell1.setAttribute('style', 'flex: 1;  text-align: center; font-family: Bebas Neue, cursive; font-size: xx-large; font-weight: 900;');
        cell1.innerHTML = 'Total';
        var cell2 = newRow.insertCell(1);
        cell2.setAttribute('style', 'flex: 1;  text-align: center; font-family: Bebas Neue, cursive; font-size: xx-large; font-weight: 900;');
        cell2.innerHTML = "$ " + total_1;
        var cell3 = newRow.insertCell(2);
        var button_container = document.createElement('div');
        button_container.setAttribute('style', 'display: flex; flex-direction: row; column-gap: 5px;');
        cell3.setAttribute('style', 'flex: 1;  text-align: center');
        var checkout_button = document.createElement('button');
        checkout_button.classList.add('btn-primary');
        checkout_button.innerHTML = 'checkout';
        checkout_button.onclick = function () {
            remove_all_from_checkout();
            document.getElementById('checkout').remove();
        };
        var delete_button = document.createElement('button');
        delete_button.classList.add('btn-primary');
        delete_button.innerHTML = 'cancel';
        delete_button.onclick = function () {
            remove_all_from_checkout();
            document.getElementById('checkout').remove();
        };
        button_container.appendChild(checkout_button);
        button_container.appendChild(delete_button);
        cell3.appendChild(button_container);
        newRow.setAttribute("style", "display : flex; display-direction: row; align-items: center; height: 50px; padding: 5px;");
    }
    else {
        document.getElementById('checkout').remove();
    }
}
//--------------------------------------------market_function---------------------------------------------------
function populateMarket() {
    products.forEach(function (product) {
        var image = document.createElement('img');
        image.setAttribute('style', 'height: 100%; width: 100%');
        image.src = product.src;
        var imageContainer = document.createElement('div');
        imageContainer.setAttribute('style', 'flex:2; border: black 3px solid; height: 300px; width: 300px');
        imageContainer.appendChild(image);
        var name_price_container = document.createElement('div');
        name_price_container.setAttribute('style', 'flex: 1; display: flex; flex-direction: row; padding: 5px; max-width: fit-content; font-family: Unica One, cursive; font-weight: 600; font-size: larger');
        var name = document.createElement('div');
        name.setAttribute('style', 'padding: 5px;');
        name.innerHTML = product.name;
        var price = document.createElement('div');
        price.setAttribute('style', 'padding: 5px;');
        price.innerHTML = String('$' + product.price);
        name_price_container.appendChild(name);
        name_price_container.appendChild(price);
        var description = document.createElement('div');
        description.setAttribute('style', 'padding: 5px; flex: 4; max-width: fit-content;');
        description.innerHTML = product.description;
        var add_button = document.createElement('button');
        add_button.classList.add('btn-primary');
        add_button.innerHTML = 'add to cart';
        add_button.onclick = function () {
            add_to_cart(product);
        };
        var p = document.createElement('div');
        p.setAttribute("style", 'flex: 1; display: flex; justify-content: center; align-items: center; flex-direction: column; padding: 10px; max-width: fit-content; border: black 3px solid; border-radius: 10px; background-color: #D4E9F4');
        var market = document.getElementById('market');
        p.appendChild(imageContainer);
        p.appendChild(name_price_container);
        p.appendChild(description);
        p.appendChild(add_button);
        market.appendChild(p);
    });
}
//--------------------------------------------cart_function---------------------------------------------------
function populateCart() {
    var _this = this;
    var cart = retrieveCart();
    cart.forEach(function (cartItem) {
        var image = document.createElement('img');
        image.setAttribute('style', 'height: 100%; width: 100%');
        image.src = cartItem.src;
        var imageContainer = document.createElement('div');
        imageContainer.setAttribute('style', 'flex:2; border: black 3px solid; height: 300px; width: 300px');
        imageContainer.appendChild(image);
        var name_price_qty_container = document.createElement('div');
        name_price_qty_container.setAttribute('style', 'flex: 1; display: flex; flex-direction: row; padding: 5px; max-width: fit-content; font-family: Unica One, cursive; font-weight: 600; font-size: larger');
        var name = document.createElement('div');
        name.setAttribute('style', 'padding: 5px;');
        name.innerHTML = cartItem.name;
        var price = document.createElement('div');
        price.setAttribute('style', 'padding: 5px;');
        price.innerHTML = String('$' + cartItem.price);
        var qty = document.createElement('div');
        qty.setAttribute('style', 'padding: 5px;');
        qty.innerHTML = String('qty: ' + cartItem.qty);
        name_price_qty_container.appendChild(name);
        name_price_qty_container.appendChild(price);
        name_price_qty_container.appendChild(qty);
        var description = document.createElement('div');
        description.setAttribute('style', 'padding: 5px; flex: 4; max-width: fit-content;');
        description.innerHTML = cartItem.description;
        var button_container = document.createElement('div');
        button_container.setAttribute('style', ' display: flex; justify-content: center; align-items: center; flex-direction: column; row-gap: 5px; padding: 5px');
        var delete_button = document.createElement('button');
        delete_button.setAttribute('style', 'flex: 1;');
        delete_button.classList.add('btn-primary');
        delete_button.innerHTML = 'delete';
        delete_button.onclick = function () {
            _this.remove_from_Cart(cartItem, cart);
            document.getElementById(String(cartItem.id)).remove();
        };
        var add_button = document.createElement('button');
        add_button.setAttribute('style', 'flex: 1;');
        add_button.classList.add('btn-primary');
        add_button.innerHTML = 'add to checkout';
        add_button.onclick = function () {
            document.getElementById(String(cartItem.id)).remove();
            add_single_cartItem_to_checkout(cartItem, cart);
        };
        button_container.appendChild(add_button);
        button_container.appendChild(delete_button);
        var p = document.createElement('div');
        p.setAttribute("style", 'flex: 1; display: flex; justify-content: center; align-items: center; flex-direction: column; padding: 10px; max-width: fit-content; border: black 3px solid; border-radius: 10px; background-color: #D4E9F4');
        p.id = String(cartItem.id);
        var market = document.getElementById('cart');
        p.appendChild(imageContainer);
        p.appendChild(name_price_qty_container);
        p.appendChild(description);
        p.appendChild(button_container);
        market.appendChild(p);
    });
}
//--------------------------------------------checkout_function---------------------------------------------------
