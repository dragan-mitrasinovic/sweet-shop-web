import { Comment } from "../app/models/comment";
import { Item } from "../app/models/item";
import { Notification } from "../app/models/notification";
import { Order } from "../app/models/order";
import { Product } from "../app/models/product";
import { User } from "../app/models/user";

let users: User[] = [];
let orders: Order[] = [];
let products: Product[] = [];

let usernames: string[] = ["dragan", "bogdan", "maja"];
let random_comments: string[] = [
    "Vrlo slatko, preporucujem",
    "Prelep slag, odlicno testo",
    "Izgleda isto kao na slici, sjajno",
    "Harmonija ukusa, narucicu opet",
    "Preslatko, samo za one koji vole secer",
    "Sjajno vazdusasto testo, svidja mi se",
    "Malo manje slaga bi trebalo, ima dosta",
    "Omiljena poslastica",
    "Bas mi se dopada, svaka cast"
];

export function init() {
    let inited = localStorage.getItem("inited");
    if (inited != null && JSON.parse(inited) == true) return;

    user_init();
    product_init();
    comments_init();
    orders_init();
    notification_init();

    localStorage.setItem("inited", JSON.stringify(true));
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("orders", JSON.stringify(orders));
}

function user_init() {
    users.push(new User(
        "Dragan",
        "Mitrasinovic",
        "0617231405",
        "Tosin Bunar, Zemun",
        "dragan",
        "123",
        false
    ));

    users.push(new User(
        "Bogdan",
        "Rsumovic",
        "0617230000",
        "Tosin Bunar, Zemun",
        "bogdan",
        "123",
        false
    ));

    users.push(new User(
        "Maja",
        "Mitrasinovic",
        "060777777",
        "Kralja Petra, Uzice",
        "maja",
        "123",
        false
    ));

    users.push(new User(
        "Marija",
        "Punt",
        "0690000000",
        "ETF",
        "marija",
        "123",
        true
    ));
}

function product_init() {
    products.push(new Product(
        "Oreo mafin",
        "cupcake",
        "Mafin punjen oreo komadicima, sa belom glazurom na vrhu",
        300,
        "../../assets/products/cupcake1.jpg",
        "Oreo keks, mleko, slag, secer, brasno, cokolada"
    ));

    products.push(new Product(
        "Mafin sa pomorandzom",
        "cupcake",
        "Magin od vazdusastog testa, sa slagom sa ekstraktom pomorandze i kriskom pomomrandze na vrhu",
        250,
        "../../assets/products/cupcake2.jpg",
        "Pomorandza, slag, maslac, brasno, jaja, zuti secer, kokosovo mleko"
    ));

    products.push(new Product(
        "Mafin sa jagodom",
        "cupcake",
        "Magin od vazdusastog testa, sa slagom sa roze slagom sa ukusom jagode i jagodicom na vrhu",
        180,
        "../../assets/products/cupcake3.jpg",
        "Jagoda, roze boja za kolace, slag, brasno, jaja, mleko, secer, so"
    ));

    products.push(new Product(
        "Mafin sa cokoladom",
        "cupcake",
        "Cokoladni mafin, sa testom od cokolade i cokoladnim prelivom posut cokoladnim mrvicama",
        230,
        "../../assets/products/cupcake4.jpg",
        "Crna cokolada, mlecna cokolada, brasno, mleko, jaja, cokoladne mrvice"
    ));

    products.push(new Product(
        "Pauk oreo mafin",
        "cupcake",
        "Mafin sa temom noci vestica, u obliku pauka, sa ukusom orea",
        350,
        "../../assets/products/cupcake5.jpg",
        "Bela cokolada, beli oreo krem, oreo keks, mleko, puter, jaja, prasak za pecivo, usecerene oci, cokolada"
    ));

    products.push(new Product(
        "Princeza mafin",
        "cupcake",
        "Slatki mafin sa sljokicama, posut jos i zvezdicama i perlama, sa sarenom glazurom i obojenim testom",
        280,
        "../../assets/products/cupcake6.jpg",
        "Bela cokolada, secer, maline, jestive sljokice, zvezdice i perle, jaja, mleko, brasno, puter"
    ));

    products.push(new Product(
        "Bela vocna torta",
        "cake",
        "Torta sa belim slagom, primerena za vencanja i druge proslave, sa vestackim ruzama od secera",
        1500,
        "../../assets/products/cake1.jpg",
        "Slag, visnja, jagoda, malina, bela cokolada, secerne ruze, secer, puter, cokoladne kore za tortu"
    ));

    products.push(new Product(
        "Crna cokolada torta",
        "cake",
        "Torta od crne cokolade, bogata cokoladnim musom iznutra, sa rendanom crnom cokoladom preko, prelivom od cokolade i tresnjicama",
        1350,
        "../../assets/products/cake3.jpg",
        "Slag, tresnje, crna cokolada, noissette, lesnik, secer, cokoladni preliv od crne cokolade, rendana crna cokolada"
    ));

    products.push(new Product(
        "Ukrasena tresnja torta",
        "cake",
        "Savrsena torta za mladence, sa tresnjicama, crvenim slagom kao ukrasom i roze slagom",
        1700,
        "../../assets/products/cake2.jpg",
        "Slag, roze boja za kolace, crvena boja za kolace, secer, mleko, crna cokolada, vestacke ruze od secera"
    ));

    products.push(new Product(
        "Sarena party torta",
        "cake",
        "Torta sa sarenim testom, slagom i prelivima, sa keksicima na vrhu punjenim roze slagom, savrsena za decje rodjendane",
        1890,
        "../../assets/products/cake4.jpg",
        "Boja za kolace, cokolada, keksici, slag, puter, jaja, secer, brasno, cimet, preliv sa borovnicama"
    ));

    products.push(new Product(
        "Oreo torta",
        "cake",
        "Omiljena torta kupaca, torta sa oreo slagom, oreo prelivom, oreo keksicima i punjena belim oreo kremom",
        2500,
        "../../assets/products/cake5.jpg",
        "Oreo keks, crne oreo mrvice, slag, beli oreo krem, mlecna cokolada, oreo slag, secer, preliv od mlecne cokolade, beli cokoladni mus, mleko"
    ));

    products.push(new Product(
        "Slatka sirena torta",
        "cake",
        "Torta neznih boja, sa ukrasima od slaga i vestackim secernim keksicima na vrhu, iznutra od vanile, plazme i banane",
        2100,
        "../../assets/products/cake6.jpg",
        "Slag, boja za testo, boja za slag, secerni ukrasi, vanila, mlevena plazma, plazma, banana, secer, mleko"
    ));
}

function comments_init() {
    for (let i = 0; i < products.length; i++) {
        let comments_number = Math.floor(Math.random() * 2) + 1;

        for (let j = 0; j < comments_number; j++) {
            let rng_index = Math.floor(Math.random() * random_comments.length);

            products[i].comments.push(new Comment(
                usernames[j],
                random_comments[rng_index])
            );
        }
    }
}

function notification_init() {
    for (let i = 0; i < orders.length; i++) {
        users[Math.trunc(i / 2)].nots.push(new Notification(
            "Vasa porudzbina je primljena", orders[i]
        ));
        users[3].nots.push(new Notification(
            "Stigla vam je porudzbina", orders[i]
        ));
    }
}

function orders_init() {
    for (let i = 0; i < 6; i++) {
        let order = new Order(usernames[Math.trunc(i / 2)]);
        order.ordered = true;

        let rng_items = Math.floor(Math.random() * 5) + 1;
        let d = 0;

        for (let j = 0; j < rng_items; j++) {
            let rng_cnt = Math.floor(Math.random() * 10) + 1;
            let rng_i = Math.floor(Math.random() * 2) + 1;
            d += rng_i;
            order.items.push(new Item(rng_cnt, products[d]));
        }
        orders.push(order);
    }
}
