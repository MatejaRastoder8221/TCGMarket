const BASEURL ="assets/data/"

window.onload = function(){
//dinamicko ispisivanje navigacije
ajaxCallBack(BASEURL+"menu.json",function(result){
    let html=` <div class="container">
    <a href="index.html"><img class="d-inline-block align-top"src="assets/img/logobanner.png"/></a>
    <button 
    type="button" 
    data-bs-toggle="collapse" 
    data-bs-target="#navbarNav" 
    class="navbar-toggler" 
    aria-controls="navbarNav" 
    aria-expanded="false" 
    aria-label="Toggle navigation"
    >
        Menu
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav" id="pocetna">`
    
    for (link of result){
        html+=`<li class="nav-item"><a class="nav-link" href="${link.href}">${link.text}</a></li>`
    }
    html+=`</ul></div></div>`
    $("#navigation").html(html);
});
//podaci iz collections.json
ajaxCallBack(BASEURL+"collections.json",function(result){
    //console.log(result);
    printCollections(result)
});
//podaci iz cards.json
ajaxCallBack(BASEURL+"cards.json",function(result){
    //console.log(result);
    printCards(result)
});
//pozivanje funkcije za ispis footera
ispisFootera();
}
//f-ja za ispis kolekcija na shop stranici 
function printCollections(data){
    let html="<h3>Kolekcije</h3><hr/>"
    for(kolekcija of data){
        html+=`<a href="#" class="filter-by-collection" data-collectionid="${kolekcija.id}">${kolekcija.name.full}</a><br/><br/>`
    }
    $("#collections").html(html);
}
//funkcija za ispis karata tj. proizvoda 
function printCards(data){
    let html=""
    for(karta of data){
        html+=`
        <div class="col-3">
        <div class="card">
            <img src="${karta.image}" alt="${karta.name}" class="card-image-top img-fluid">
            <div class="card-body d-flex flex-column">
                <h5 class="text-center">${karta.name}</h5>
        `
        if(karta.price.old==null){
            html+=`<h5 class="card-text text-center">$${karta.price.new}</h5>`
        }
        else{
            html+=`<p class="card-text text-center">$${karta.price.new}</p>
                   <p class="card-text text-center text-decoration-line-through">$${karta.price.old}</p>`
        }
        html+=`
            <div class="btn mt-auto">
                <button type="button">Add to cart<i class="fa fa-shopping-cart"></i></button>
            </div>
        </div>
    </div>
    </div>
    `
        }
        $("#products").html(html);      
    }
    

//funkcija za ispis footera
function ispisFootera(){
    let html=`
<div class="container-fluid p-5">
<div class="row">
    <div class="col-lg-4 col-12 mb-5 mb-lg-0 text-center">
        <a href="https://www.instagram.com"><i class="fa fa-3x fa-brands fa-instagram"></i></a>
        <a href="https://www.facebook.com"><i class="fa fa-3x fa-brands fa-facebook"></i></a>
        <a href="sitemap.xml"><i class="fa fa-3x fa-sitemap"></i></a>
        <a href="Documentation.pdf"><i class="fa fa-3x fa-file"></i></a>
    </div>
    <div class="col-lg-4 col-12 mb-5 mb-lg-0 text-center">
        <h2 class="blueTextColor"><i class="fa fa-copyright blueTextColor"></i>Mateja Rastoder 82/21</h2>
    </div>
    <div class="col-lg-4 col-12 text-center">
        <a href="#navigation" id="backToTop">Back to top</a>
    </div>
</div>
</div>`
$("footer").html(html);
}
//AJAX CallBack

function ajaxCallBack(url,result){
    $.ajax({
        url: url,
        method: "get",
        dataType: "json",
        success:result,
        error: function(xhr){console.log(xhr);}
    });
}