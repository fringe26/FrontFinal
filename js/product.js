AOS.init()
let products = [];
function GetProduct(prodCount) {
    let prodArray = [];
   return fetch('data/products.json')
        .then(response => { return response.json() })
        .then(data => {
                for(let i=0;i<prodCount;i++){
                    let random=Math.floor(Math.random() * data.products.length);
                    prodArray.push(data.products[random])
                }  
             return prodArray;
    });
}
async function main(count,id) {
    products = await GetProduct(count);
    let x=``;
    products.forEach(prod=>{
       x+=DrawProduct(prod,count);
    })
    document.querySelector(id).innerHTML = x;
}
function DrawProduct(prod,count){
    let x=``;
    let oldPrice='';
    let weight='';
    let Brand=''
    let Sku=''
    let Type=''
    if(count>8){
        count=5;
    }
    let col=12/count;
    if(col==2){
        col=4;
    }
    if(col==2.4){
        col=col*10;
    }
    if(prod.weight!=undefined){
        weight=prod.weight+" "+"kg"
    }
    if(prod.brand!=undefined){
        Brand=prod.weight;
    }
    if(prod.price.oldprice!=""){
        oldPrice="$"+prod.price.oldprice;
    }
    if(prod.sku!=""){
        Sku="SKU"+":"+prod.sku
    }
    if(prod.type!=""){
        Type=prod.type;
    }
    let rating = '';
        for (let i = 0; i < prod.rating; i++) {
            rating += `
                <i class="fa-solid fa-star"></i>
                `
            }
        x += `
                    <div class="prod-header">
                        <h3 class="prod-name">${prod.name}</h3>
                        <div class="col-lg-5 justify-content-between">
                        <span class="prod-brand">${Brand}</span>
                        <span class="prod-rating d-inline">${rating}</span>
                        <span class="prod-sku"><span id="sku">${Sku}</span></span>
                        </div>
                    </div>
                    <div class="prod-detail">
                        <div class="row">
                            <div class="col-lg-5 img">
                                <img src="${prod.picture.productpage1}" alt="">
                            </div>
                            <div class="col-lg-4">
                                <span class="text-decoration-line-through old-price">${oldPrice}</span>
                                <span class="new-price ms-2">${"$"+prod.price.newprice}</span>
                                <p class="prod-stock mt-2">${prod.stock}</p>
                                <p class="prod-description">${prod.description}</p>
                                <div class="countProd d-flex mb-4">
                                    <div class="col-lg-6"></div>
                                    <div class="addToCard active">
                                    <a class="addBasket" data-id="${prod.id}" onclick="addCard(event);" href="">Add to cart</a>
                                    </div>
                                </div>
                                <div class="wc d-flex">
                                    <div class="w col-lg-6 ">
                                        <i class="fa-solid fa-heart"></i>
                                        <span>Add to wishlist</span>
                                    </div>
                                    <div class="compare">
                                        <i class="fa-solid fa-compress"></i>
                                        <span>Compare</span>
                                    </div>
                                </div>
                                <p class="prod-type">${Type}</p>
                                <p class="prod-mfg">${prod.mfg}</p>
                                <p class="prod-life">${prod.life}</p>
                                <hr>
                                <p>Category: <span class="prod-category">${prod.category}</span></p>
                                <div class="social mt-5">
                                    <ul class="p-0 d-flex justify-content-between">
                                        <li><i class="fa-brands fa-facebook-f"></i></li>
                                        <li><i class="fa-brands fa-twitter"></i></li>
                                        <li><i class="fa-brands fa-pinterest-p"></i></li>
                                        <li><i class="fa-brands fa-linkedin-in"></i></li>
                                        <li><i class="fa-brands fa-github"></i></li>
                                        <li><i class="fa-brands fa-whatsapp"></i></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="right col-lg-3">
                                <div class="warning">
                                    <p>Covid-19 Info: We keep delivering.</p>
                                </div>
                                <div class="icon-messages">
                                    <ul class="p-0">
                                        <li>
                                            <i class="fa-solid fa-truck"></i>
                                            <p>Free Shipping apply to all orders over $100</p>
                                        </li>
                                        <li>
                                            <i class="fa-solid fa-face-smile"></i>
                                            <p>Guranteed 100% Organic from natural farmas</p>
                                        </li>
                                        <li>
                                            <i class="fa-solid fa-sack-dollar"></i>
                                            <p>1 Day Returns if you change your mind</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
        `
        return x;
}
main(1,"#prodFull")
let buttons=document.querySelectorAll('.prod-fulldesc .top button');
let divs=document.querySelectorAll('.prod-fulldesc .aa');
let startPoint = 0;
for(let button of buttons){
    button.addEventListener('click',function()
    {
        let active=document.querySelector('.activeDisplay');
        startPoint++;
        active.classList.remove('activeDisplay');
        this.classList.add('activeDisplay');
        
        let index=this.getAttribute('data-index');

        for(let div of divs){
            if(div.getAttribute('data-index') === index) {
                div.classList.remove('d-none');
            }
            else{
                div.classList.add('d-none');
            }
        }
    })
}
function addCard(event){
    event.preventDefault();
    let id=event.target.getAttribute("data-id");
    GetProductByID(id);
}
function GetProductByID(id) {
    return fetch('data/products.json')
         .then(response => { return response.json() })
         .then(data => {
                data.products.forEach(prod=>{
                    if(prod.id==id){
                     let basket = JSON.parse(localStorage.getItem('basket'));
                     let data_id = prod.id;
                     let prod_name = prod.name;
                     let prod_price = prod.price.newprice;
                     let prod_img = prod.picture.indexpage;
                     let existProd = basket.find(p => p.Id == data_id);
                     if(existProd == undefined) {
                         basket.push({
                           Id: data_id,
                           Name: prod_name,
                           Price: prod_price,
                           Src: prod_img,
                           Count: 1
                         })
                       }
                       else{
                         existProd.Count += 1;
                       }
                 
                       localStorage.setItem('basket',JSON.stringify(basket));
                    }
                })
                CountBasket();
     } ) 
 }
function CountBasket(){
    let basket = JSON.parse(localStorage.getItem('basket'));
    let count = basket.length;
    document.getElementById('counterStrike').innerHTML = count
}
CountBasket();