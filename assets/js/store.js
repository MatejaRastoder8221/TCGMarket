const BASEURL ="assets/data/"

window.onload = function(){
    //ciscenje localstorage za filter po checkboxu
    setLS("kolekcijaLS",null);
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
    setLS("karteLS",result);
    setLS("svekarteLS",result);
    printCards(result);
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
    let html="<hr/><p>Collections</p>"
    for(kolekcija of data){
        html+=`<a href="#" class="filter-by-collection" data-collectionid="${kolekcija.id}">${kolekcija.name.full}</a><br/><br/>`
    }
    html+=`<a href="#" class="filter-by-collection" data-collectionid="0">All collections</a><br/><br/>`
    html+=`
    <hr/>
    <label for="ddlSort">Sort items</label>
    <select id="sort" title="ddlSort" class="form-control" name="ddlSort">
        <option value="default">Sort by</option>
        <option value="namedescending">Name Descending</option>
        <option value="nameascending">Name Ascending</option>
        <option value="priceasc">Price Ascending</option>
        <option value="pricedesc">Price Descending</option>
    </select>
    <hr/>
    <p>Card type</p>
    <form action="">
        <input type="checkbox" id="spellCard" name="cardType1" value="spell">
        <label class="cardlabel" for="vehicle1">Spell</label><br>
        <input type="checkbox" id="trapCard" name="cardType2" value="trap">
        <label class="cardlabel" for="vehicle2">Trap</label><br>
        <input type="checkbox" id="monsterCard" name="cardType3" value="monster">
        <label class="cardlabel" for="monsterCard">Monster</label><br><br>
    </form>
    `
    $("#collections").html(html);
    $("#collections a").click(filterByCollection);
    
    $("#collections").click(filterByCheck);
    $("#collections").click(sortDdl);
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
                <button type="button" data-id=${karta.id} class="button cartAdd">Add to cart<i class="fa fa-shopping-cart"></i></button>
            </div>
        </div>
    </div>
    </div>
    `
        }
        $("#products").html(html);
        if((document.getElementById("products").innerHTML)==""){
            $("#products").html(`<div id="greskaShop"><h1>That kind of product doesn't exist</h1></div>`);
        }
        setLS("karteLS",data);
        //console.log(data);
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
        <a href="#top" id="backToTop">Back to top</a>
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
        error: function (jqXHR, exception) {
            // console.log(jqXHR);
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            return msg;}
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
            $("#sort").val("default");
            document.getElementById("trapCard").checked = false;
            document.getElementById("spellCard").checked = false;
            document.getElementById("monsterCard").checked = false;
            if (idKolekcije==0){
                printCards(karte);
                setLS("kolekcijaLS",karte);
            }
            else{
                const filtriraneKarte = karte.filter(el=>
                    {
                     if (el.collectionId==idKolekcije)
                     {
                        return true;
                     }   
                    });
                    setLS("kolekcijaLS",filtriraneKarte);
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

//sortiranje po dropdown listi
function sortDdl(){ 
    let karte=getLS("karteLS");
    let stampa;
    if ($("#sort").val()=="namedescending"){
        stampa=karte.sort(function(a,b){
            if(a.name > b.name)
            {
                return -1
            }
            else if(a.name < b.name)
            {
                return 1
            }
            else{
                return 0
            }
        });
}
else if ($("#sort").val()=="nameascending"){
        stampa=karte.sort(function(a,b){
        if(a.name > b.name)
        {
            return 1
        }
        else if(a.name < b.name)
        {
            return -1
        }
        else{
            return 0
        }
    });
}
else if ($("#sort").val()=="priceasc"){
    stampa=karte.sort(function(a,b){
       if(parseFloat(a.price.new) > parseFloat(b.price.new))
       {
           return 1
       }
       else if(parseFloat(a.price.new) < parseFloat(b.price.new))
       {
           return -1
       }
       else{
           return 0
       }
   });
}
else if ($("#sort").val()=="pricedesc"){
    stampa=karte.sort(function(a,b){
       if(parseFloat(a.price.new) > parseFloat(b.price.new))
       {
           return -1
       }
       else if(parseFloat(a.price.new) < parseFloat(b.price.new))
       {
           return 1
       }
       else{
           return 0
       }
   });
}
else{
    stampa = karte;
}
    if(stampa!=null){
        printCards(stampa);
    }
}




//filtriranje po checkboxevima


function filterByCheck(){
    let prikazane=getLS("kolekcijaLS");
    if(prikazane==null){
        prikazane=getLS("svekarteLS");
    }
    let stampa1=[];
    let stampa2=[]; 
    let stampa3=[]; 
    if ($("#spellCard").is(':checked')){
            stampa1=prikazane.filter(e=>e.type=="spell");
    } 
    else {stampa1=[]}
    if ($("#trapCard").is(':checked')){
            stampa2=prikazane.filter(e=>e.type=="trap");
    } 
    else {stampa2=[]}
    if ($("#monsterCard").is(':checked')){
            stampa3=prikazane.filter(e=>e.type=="monster");
    } 
    else {stampa3=[]}
    let stampa=[].concat(stampa1,stampa2,stampa3);
    //console.log("stampa check");
    //console.log(stampa);
    if($("#spellCard").is(':checked') || $("#trapCard").is(':checked') || $("#monsterCard").is(':checked')){
        printCards(stampa);
    }
   else printCards(prikazane);
    
}


