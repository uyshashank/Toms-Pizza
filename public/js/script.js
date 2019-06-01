function addToCart(id){
    let item = id.name; 
    console.log(item);
}

function activate(btn1, btn2, btn3){        
    document.getElementById(btn1).classList.add('active');
    document.getElementById(btn2).classList.remove('active');
    document.getElementById(btn3).classList.remove('active');
}