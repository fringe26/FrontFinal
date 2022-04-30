AOS.init();
$('.slider-all').slick({
    dots: false,
    arrows: true,
    speed: 1000,
    autoplay: false,
    pauseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<i class="fa-solid fa-angle-left left_arrow">',
    nextArrow: '<i class="fa-solid fa-angle-right right_arrow">',
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            },
        }
    ]
});


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
let products = [];
async function InsertHtml(count,id) {
    products = await GetProduct(count);
    let x=``;
    products.forEach(prod=>{
       x+=Draw(prod,count);
    })
    document.querySelector(id).innerHTML = x;

}
function Draw(prod,count){
    let x=``;
    let oldPrice='';
    let weight='';
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
    if(prod.price.oldprice!=""){
        oldPrice="$" + prod.price.oldprice;
    }
    let rating = '';
        for (let i = 0; i < prod.rating; i++) {
            rating += `
                <i class="fa-solid fa-star"></i>
                `
            }
        x += `
        <div class="prod col-lg-${col} col-6">
        <div class="image">
            <img class="img-fluid" src="${prod.picture.indexpage}" alt="">
        </div>
        <div class="product-buttons">
        <a class="d-block" href="">
            <i class="fa-solid fa-maximize"></i>   
        </a>
        <a class="d-block" href=""><i class="fa-brands fa-gratipay"></i></a>
        </div>
        <div class="p-info">
            <a class="d-block prod-name" href="#">${prod.name}</a>
            <span class="prod-weight">${weight}</span>
            <span class="m-0 prod-stock">${prod.stock}</span>
            <span class="prod-rating">${rating}</span>
            <span class="text-decoration-line-through old-price">${oldPrice}</span>
            <span class="new-price">${"$" + prod.price.newprice}</span>
            <div class="addToCard">
                <a href="">Add to cart</a>
            </div>
        </div>
        </div>
        `
        
        return x;
}
InsertHtml(6,"#timemanagerProduct");
InsertHtml(5,"#productsIndex");
InsertHtml(10,'#shipProducts');
InsertHtml(1,"#timemanagerProductDeals");


var countDownDate = new Date("June 11, 2022 15:37:25").getTime();
var x = setInterval(function () {

    var now = new Date().getTime();

    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timedown").innerHTML = `<span>${days}</span><span>${hours}</span><span>${minutes}</span><span>${seconds}</span>`;
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("timedown").innerHTML = "EXPIRED";
    }
}, 1000);
function addCard(event){
    event.preventDefault();
    let id=event.target.getAttribute("data-id");
    GetProductByID(id);
}

