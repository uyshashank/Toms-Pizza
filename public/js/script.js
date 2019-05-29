function addToCart(id){
    let pizza = id.name; 
}

function showBTN(spanThis){
    let spanBlockValue = spanThis.attributes[1].value;    
    let btn = "addToCartBtn"+spanBlockValue;
    document.getElementById(btn).style.visibility = "visible";
}

function hideBTN(spanThis){
    let spanBlockValue = spanThis.attributes[1].value;    
    let btn = "addToCartBtn"+spanBlockValue;   
    document.getElementById(btn).style.visibility = "hidden";
}

function activate(btn1, btn2, btn3){        
    document.getElementById(btn1).classList.add('active');
    document.getElementById(btn2).classList.remove('active');
    document.getElementById(btn3).classList.remove('active');
}