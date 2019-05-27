db = db.getSiblingDB("products");
// db.foodItems.drop();
db.foodItems.insertMany([
    [{
        "pr_id": "pza001",
        "pr_name": "African Peri Peri Veg",
        "pr_info": "It is time to wake up to the fierce flavour of peri-peri from South Africa.",
        "pr_price": {
            "size_reg": "205",
            "size_med": "385",
            "size_lrg": "595"
        },
        "pr_img": "pza001.jpg",
        "pr_category": "veg"
    }, {
        "pr_id": "pza002",
        "pr_name": "AUSSIE BARBECUE VEG",
        "pr_info": "Straight from Australian Outback I Paneer I grilled bell peppers I red paprika drizzled with BBQ sauce.",
        "pr_price": {
            "size_reg": "235",
            "size_med": "450",
            "size_lrg": "695"
        },
        "pr_img": "pza002.jpg",
        "pr_category": "veg"
    }, {
        "pr_id": "pza003",
        "pr_name": "JAMAICAN JERK VEG",
        "pr_info": "The spicy tingle of exotic Jamaican Jerk spice along with juicy jalapenos I onion I capsicum",
        "pr_price": {
            "size_reg": "205",
            "size_med": "385",
            "size_lrg": "595"
        },
        "pr_img": "pza003.jpg",
        "pr_category": "veg"
    }, {
        "pr_id": "pza004",
        "pr_name": "INDI TANDOORI PANEER",
        "pr_info": "It is hot. It is spicy. It is oh-so-Indian. Tandoori paneer with capsicum I red paprika I mint mayo",
        "pr_price": {
            "size_reg": "235",
            "size_med": "450",
            "size_lrg": "695"
        },
        "pr_img": "pza004.jpg",
        "pr_category": "veg"
    }, {
        "pr_id": "pza005",
        "pr_name": "ENGLISH CHEDDAR AND VEGGIES",
        "pr_info": "The luscious taste of English Cheddar seasoned with grilled mushrooms I onion",
        "pr_price": {
            "size_reg": "205",
            "size_med": "385",
            "size_lrg": "595"
        },
        "pr_img": "pza005.jpg",
        "pr_category": "veg"
    }, {
        "pr_id": "pza006",
        "pr_name": "AFRICAN PERI PERI CHICKEN",
        "pr_info": "Lip smacking peri-peri flavour straight from South Africa. Peri-peri chicken I grilled bell peppers drizzled with peri-peri sauce",
        "pr_price": {
            "size_reg": "235",
            "size_med": "450",
            "size_lrg": "695"
        },
        "pr_img": "pza006.jpg",
        "pr_category": "non-veg"
    }, {
        "pr_id": "pza007",
        "pr_name": "AUSSIE BARBECUE CHICKEN",
        "pr_info": "Savour the smoky brilliance of Aussie outback with a drizzle of BBQ sauce I juicy meatballs I grilled bell peppers",
        "pr_price": {
            "size_reg": "295",
            "size_med": "490",
            "size_lrg": "880"
        },
        "pr_img": "pza007.jpg",
        "pr_category": "non-veg"
    }, {
        "pr_id": "pza008",
        "pr_name": "JAMAICAN JERK CHICKEN",
        "pr_info": "Seasoned with herbs I exotic Jamaican Jerk spice I BBQ chicken I sausage I onion",
        "pr_price": {
            "size_reg": "295",
            "size_med": "555",
            "size_lrg": "890"
        },
        "pr_img": "pza008.jpg",
        "pr_category": "non-veg"
    }, {
        "pr_id": "pza009",
        "pr_name": "INDI CHICKEN TIKKA",
        "pr_info": "The wholesome flavour of tandoori masala with Chicken tikka I onion I red paprika I mint mayo",
        "pr_price": {
            "size_reg": "295",
            "size_med": "555",
            "size_lrg": "835"
        },
        "pr_img": "pza009.jpg",
        "pr_category": "non-veg"
    }, {
        "pr_id": "pza010",
        "pr_name": "ENGLISH CHEDDAR AND CHICKEN SAUSAGE",
        "pr_info": "Loaded with gooey English Cheddar cheese with Chicken sausage I onion",
        "pr_price": {
            "size_reg": "235",
            "size_med": "455",
            "size_lrg": "685"
        },
        "pr_img": "pza010.jpg",
        "pr_category": "non-veg"
    }],
    [{
        "pr_id": "bgr001",
        "pr_name": "Crispy Veg",
        "pr_price": "45",
        "pr_img": "bgr001.png",
        "pr_category": "veg"
    }, {
        "pr_id": "bgr002",
        "pr_name": "Crispy Veg Supreme",
        "pr_price": "65",
        "pr_img": "bgr002.png",
        "pr_category": "veg"
    }, {
        "pr_id": "bgr003",
        "pr_name": "Crispy Chicken",
        "pr_price": "65",
        "pr_img": "bgr003.png",
        "pr_category": "non-veg"
    }, {
        "pr_id": "bgr004",
        "pr_name": "Toms Pizza Special",
        "pr_price": "79",
        "pr_img": "bgr004.png",
        "pr_category": "veg"
    }, {
        "pr_id": "bgr005",
        "pr_name": "Crispy Chicken Supreme",
        "pr_price": "85",
        "pr_img": "bgr005.png",
        "pr_category": "non-veg"
    }, {
        "pr_id": "bgr006",
        "pr_name": "Grill Chicken",
        "pr_price": "89",
        "pr_img": "bgr006.png",
        "pr_category": "non-veg"
    }, {
        "pr_id": "bgr007",
        "pr_name": "Veg Surprise",
        "pr_price": "99",
        "pr_img": "bgr007.png",
        "pr_category": "veg"
    }, {
        "pr_id": "bgr008",
        "pr_name": "Veg Chilli Cheese Melt",
        "pr_price": "109",
        "pr_img": "bgr008.png",
        "pr_category": "veg"
    }, {
        "pr_id": "bgr009",
        "pr_name": "Chicken Chilli Cheese Melt",
        "pr_price": "119",
        "pr_img": "bgr009.png",
        "pr_category": "non-veg"
    }, {
        "pr_id": "bgr010",
        "pr_name": "Paneer King Melt",
        "pr_price": "129",
        "pr_img": "bgr010.png",
        "pr_category": "veg"
    }],
    [{
        "pr_id": "bvg001",
        "pr_name": "Strawberry Lemonade",
        "pr_info": "Cool down with a Frozen Minute Maid® Strawberry Lemonade. Available for a limited time only.",
        "pr_price": "100",
        "pr_img": "bvg001.png"
    }, {
        "pr_id": "bvg002",
        "pr_name": "Frozen Coke®",
        "pr_info": "Cool down with a Frozen Coke® any time of the year.",
        "pr_price": "90",
        "pr_img": "bvg002.png"
    }, {
        "pr_id": "bvg003",
        "pr_name": "Frosted Frozen Coke®",
        "pr_info": "Cool down with a Frosted Frozen Coke®. It’s a cool and refreshing blend of Frozen Coke®.",
        "pr_price": "99",
        "pr_img": "bvg003.png"
    }, {
        "pr_id": "bvg004",
        "pr_name": "Coca-Cola®",
        "pr_info": "Perfect with any meal, enjoy the genuine taste of Coca-Cola®.",
        "pr_price": "40",
        "pr_img": "bvg004.png"
    }, {
        "pr_id": "bvg005",
        "pr_name": "Diet Coke®",
        "pr_info": "Try a crisp and refreshing no-calorie Diet Coke®.",
        "pr_price": "50",
        "pr_img": "bvg005.png"
    }, {
        "pr_id": "bvg006",
        "pr_name": "Dr Pepper®",
        "pr_info": "Dr Pepper® has 23 exciting flavors for a taste that’s cool, refreshing, and unique.",
        "pr_price": "55",
        "pr_img": "bvg006.png"
    }, {
        "pr_id": "bvg007",
        "pr_name": "Sprite®",
        "pr_info": "Let Sprite® refresh your day with the great taste of lemon-lime.",
        "pr_price": "49",
        "pr_img": "bvg007.png"
    }, {
        "pr_id": "bvg008",
        "pr_name": "Mello Yello®",
        "pr_info": "Enjoy the easy flowing and easy going, smooth citrus taste of Mello Yello®.",
        "pr_price": "99",
        "pr_img": "bvg008.png"
    }, {
        "pr_id": "bvg009",
        "pr_name": "Frozen Fanta Cherry ICEE®",
        "pr_info": "Cool down with a Frozen Fanta Cherry ICEE® any time of the year.",
        "pr_price": "99",
        "pr_img": "bvg009.png"
    }, {
        "pr_id": "bvg010",
        "pr_name": "Iced Tea",
        "pr_info": "Brewed fresh daily, our Iced Tea pairs seamlessly with many menu favorites. ",
        "pr_price": "99",
        "pr_img": "bvg010.png"
    }]
]);