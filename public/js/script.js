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