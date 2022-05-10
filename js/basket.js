AOS.init();
let basket = JSON.parse(localStorage.getItem('basket'));
if(localStorage.getItem('basket') == null) {
    localStorage.setItem('basket',JSON.stringify([]));  
};
function CountBasket(){
    let basket = JSON.parse(localStorage.getItem('basket'));
    let count = basket.length;
    document.getElementById('counterStrike').innerHTML = count;
    
}
CountBasket();
if(basket.length==0){
    $("#basket .null").css("display","block")
}
else{
    $("#basket .null").css("display","none")
    $("#basket .basketFull").css("display","block")
}
let x='';
let total=0;
basket.forEach(prod=>{
    let subtotal=Math.max(prod.Count*prod.Price);
    total+=subtotal;
    let allsubtotal=Math.max(total)
    x+=`
    <div class="col-lg-6"><img src="${prod.Src}" alt=""></div>
    <div class="col-lg-1">${prod.Price}</div>
    <div class="col-lg-2">${prod.Count}</div>
    <div class="col-lg-2">${subtotal}</div>
    <div class="col-lg-1" data-remove=${prod.Id}><i class="fa-solid fa-x removeProduct"></i></div>
    `
    document.getElementById('productsBasket').innerHTML = x;
    document.getElementById('subtotal').innerHTML=allsubtotal;
})
$(".removeProduct").click(function(e){
    let basket = JSON.parse(localStorage.getItem('basket'));
    let id=e.target.parentElement.getAttribute('data-remove');
    basket.forEach(prod=>{
        if(prod.Id==id){
           basket.splice(basket,1)
        }
    })
    localStorage.setItem('basket',JSON.stringify(basket));
    location.reload();
})  
