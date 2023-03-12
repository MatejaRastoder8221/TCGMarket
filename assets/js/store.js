const BASEURL ="assets/data/"

window.onload = function(){
    //search 
    document.getElementById("search").addEventListener("input", filterPosts);
    document.getElementById("search").addEventListener("blur", clearSearch);
//dinamicko ispisivanje navigacije
ajaxCallBack(BASEURL+"menu.json",function(result){
header(result);
});
//podaci iz collections.json
ajaxCallBack(BASEURL+"collections.json",function(result){
    //console.log(result);
    printCollections(result)
});
//podaci iz cards.json
ajaxCallBack(BASEURL+"cards.json",function(result){
    //console.log(result);
    printCards(result);
    setLS("karteLS",result);
});
//pozivanje funkcije za ispis footera
ispisFootera();
}
//f-ja za ispis navigacije
function header(data){
    let html=` <div class="container">
    <a href="index.html"><img class="d-inline-block align-top"src="assets/img/logobanner.png" alt="banner"/></a>
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
    let activeLi=0;
    let klasa="";
    for (link of data){
        if(activeLi == 1){
            klasa="active";
        }
        else{
            klasa="";
        }
        html+=`<li class="${klasa} nav-item"><a class="nav-link" href="${link.href}">${link.text}</a></li>`
        activeLi++;
    }
    html+=`</ul></div></div>`
    $("#navigation").html(html);
}
//f-ja za ispis kolekcija na shop stranici 
function printCollections(data){
    let html="<p>Collections</p><hr/>"
    for(kolekcija of data){
        html+=`<a href="#" class="filter-by-collection" data-collectionid="${kolekcija.id}">${kolekcija.name.full}</a><br/><br/>`
    }
    html+=`<a href="#" class="filter-by-collection" data-collectionid="0">All collections</a><br/><br/>`
    html+=`<input type="checkbox" id="k1" name="LOB" value="legend">
    <label for="LOB"> LOB </label><br>
    <input type="checkbox" id="k2" name="GFP2" value="ghost">
    <label for="GFP2"> GFP2 </label><br>
    <input type="checkbox" id="k3" name="MP21" value="magic">
    <label for="MP21"> MP21 </label><br>
    <select id="sort" class="form-control">
        <option value="namedescending">Name Descending</option>
        <option value="nameascending">Name Ascending</option>
    </select>`
    $("#collections").html(html);
    $("#collections a").click(filterByCollection);
    $("#collections ").change(filterByCheck);

}
//funkcija za ispis karata tj. proizvoda 
function printCards(data){
    let html=""
    for(karta of data){
        html+=`
        <div class="col-md-3 col-sm-6 container-fluid">
        <div class="card">
            <img src="${karta.image}" alt="${karta.name}" class="card-image-top img-fluid">
            <div class="card-body d-flex flex-column">
                <h5 class="text-center">${karta.name}</h5>
        `
        if(karta.price.old==null){
            html+=`<p class="card-text text-center">$${karta.price.new}</p>`
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

//search
function filterPosts(){
    const unosKorisnika = this.value;
    $.ajax({
        url: "assets/data/cards.json",
        method: "get",
        dataType: "json",
        success:function(karte){
            const filtriraneKarte = karte.filter(el=>
            {
             if (el.name.toLowerCase().indexOf(unosKorisnika.toLowerCase()) !== -1)
             {
                return true;
             }   
            });
            printCards(filtriraneKarte);
        },
        error: function(xhr){console.log(xhr);}
    });
}

//filtriranje po kategorijama
function filterByCollection(e){
    e.preventDefault();
    const idKolekcije=this.dataset.collectionid;
    $.ajax({
        url: "assets/data/cards.json",
        method: "get",
        dataType: "json",
        success:function(karte){
            if (idKolekcije==0){
                printCards(karte);
            }
            else{
                const filtriraneKarte = karte.filter(el=>
                    {
                     if (el.collectionId==idKolekcije)
                     {
                        return true;
                     }   
                    });
                    printCards(filtriraneKarte);
            }

        },
        error: function(xhr){console.log(xhr);}
    });
}

//ciscenje search
function clearSearch(){
    $(this).val("");
}

function setLS(key,value){
    localStorage.setItem(key,JSON.stringify(value));
}
function getLS(key){
    return JSON.parse(localStorage.getItem(key));
}
var karte=getLS("karteLS");


function filterByCheck(){
    let stampa=karte; 
    if ($("#k1").is(':checked')){
        stampa=karte.filter(e=>e.collectionId==1);
    } 
    if ($("#k2").is(':checked')){
        stampa=karte.sort(function(a,b){
            if(a.name > b.name)
            {
                return 1
            }
            else {return -1}
        });
    }
    if ($("#k3").is(':checked')){
        stampa=karte.sort(function(a,b){
            if(a.price.new > b.price.new)
            {
                return 1
            }
            else {return -1}
        });
    }
    if (stampa != null){
        printCards(stampa);
    }
}


