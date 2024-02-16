const BASEURL = "assets/data/";

// Function for AJAX callback
function ajaxCallBack(url, result) {
    $.ajax({
        url: url,
        method: "get",
        dataType: "json",
        success: result,
        error: function (xhr) {
            console.log(xhr);
        }
    });
}

// Function for header navigation
function header(data) {
    let html = ` <div class="container">
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
        <ul class="navbar-nav" id="pocetna">`;
    let activeLi = 0;
    let klasa = "";
    let brojProizvoda = getLS("brojProizvodaLS");
    for (link of data) {
        if (link.href == "cart.html") {
            if (brojProizvoda == null) {
                html += `<li class="${klasa} nav-item"><a class="nav-link" href="${link.href}">${link.text}<span id="broj-proizvoda">0 products</span></a></li>`;
            } else {
                html += `<li class="${klasa} nav-item"><a class="nav-link" href="${link.href}">${link.text}<span id="broj-proizvoda">${brojProizvoda}</span></a></li>`;
            }
        } else {
            html += `<li class="${klasa} nav-item"><a class="nav-link" href="${link.href}">${link.text}</a></li>`;
        }
    }
    html += `</ul></div></div>`;
    $("#navigation").html(html);
}

// Function for footer
function ispisFootera() {
    let html = `
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
</div>`;
    $("footer").html(html);
}

// Function for local storage
function setLS(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getLS(key) {
    return JSON.parse(localStorage.getItem(key));
}

// Function to display cart data
function displayCartData() {
    let productInfo = getLS("svekarteLS");
    let productsCartLS = getLS("cart");
    productInfo = productInfo.filter(p => {
        for (let product of productsCartLS) {
            if (p.id == product.id) {
                p.quantity = product.qty;
                return true;
            }
        }
    });
}

// Function to generate table
function generateTable() {
    let html = `
    <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Product</th>
      <th scope="col">Image</th>
      <th scope="col">Qty</th>
      <th scope="col">Price</th>
      <th scope="col">Total</th>
      <th scope="col">Remove</th>
    </tr>
  </thead>
  <tbody>`;
    for (let p of productInfo) {
        html += `    
            <tr>
                <th scope="row">${p.name}</th>
                <td><img src="${p.image}" alt="${p.name}" class="image-cart"/></td>
                <td>${p.quantity}</td>
                <td>$${p.price.new}</td>
                <td>$${parseFloat(p.price.new) * p.quantity}</td>
                <td><button onclick="removeFromCart(${p.id})" class="btn" value="remove">remove</button></td>
            </tr>`;
    }
    html += `
    </tbody>
    </table>`;
    $("#products").html(html);
}

// Function to remove from cart
function removeFromCart(id) {
    let korpa = getLS("cart");
    let filtered = korpa.filter(p => p.id != id);
    setLS("cart", filtered);
    displayCartData();
    printNumberOfProducts();
    location.reload();
}

// Function to print number of products
function printNumberOfProducts() {
    let productsCart = getLS("cart");
    if (productsCart == null) {
        $("#broj-proizvoda").html("(0 products)");
    } else {
        quantity = productsCart.length;
        let numberOfProducts = quantity;
        let txt = quantity + " ";

        if (numberOfProducts == 1) {
            txt = quantity + " " + "product";
        } else {
            txt = quantity + " products";
        }
        setLS("brojProizvodaLS", txt);
        $("#broj-proizvoda").html(`${txt}`);
    }
}

// Function to toggle menu
function toggleMenu() {
    const navigationMenu = document.querySelector('#navbarNav');
    navigationMenu.classList.toggle('show');
}

// Event listener for toggling the menu
document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.querySelector('.navbar-toggler');
    menuButton.addEventListener('click', toggleMenu);
});

// Functions from author.js
function showMoreAuthor() {
    $('#showMoreAuthor').css("display", "none");
    $('#btnPrikaziViseAutor').click(function (e) {
        e.preventDefault();
        if ($('#showMoreAuthor').is(':visible')) {
            $('#showMoreAuthor').slideUp();
            $(this).val('Show More');
        } else {
            $('#showMoreAuthor').slideDown();
            $(this).val('Show Less');
        }
    });
}

// Functions from cart.js
function cartFunctions() {
    const BASEURL ="assets/data/"
window.onload = function(){
//dinamicko ispisivanje navigacije
ajaxCallBack(BASEURL+"menu.json",function(result){
    header(result);
});
ispisFootera();
}
//ispis i brisanje proizvoda u korpi 
$(document).ready(function(){
let productsCartLS=getLS("cart");

if (productsCartLS==null || productsCartLS.length<1){
    $("#products").html(`<div id="greskaShop"><h1>Your shopping cart is empty!</h1></div>`);
}
else{
    displayCartData();
    generateTable(productInfo);
}
});
var productsCartLS=getLS("cart");
//funkcija za dohvatanje proizvoda za korpu


function displayCartData(){
    productInfo=getLS("svekarteLS");
    //console.log(productInfo);
    productInfo=productInfo.filter(p=>{
        for(let product of productsCartLS){
            if(p.id == product.id){
                p.quantity=product.qty;
                return true;
            }
        }
    })
    //console.log(productInfo);
}

function generateTable(){
    let html=`
    <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Product</th>
      <th scope="col">Image</th>
      <th scope="col">Qty</th>
      <th scope="col">Price</th>
      <th scope="col">Total</th>
      <th scope="col">Remove</th>
    </tr>
  </thead>
  <tbody>`
  for(let p of productInfo){
    html+=`    
            <tr>
                <th scope="row">${p.name}</th>
                <td><img src="${p.image}" alt="${p.name}" class="image-cart"/></td>
                <td>${p.quantity}</td>
                <td>$${p.price.new}</td>
                <td>$${parseFloat(p.price.new)*p.quantity}</td>
                <td><button onclick="removeFromCart(${p.id})" class="btn" value="remove">remove</button></td>
            </tr>
            `
  }
    html+=`
    </tbody>
    </table>
    `
    $("#products").html(html);
}
function removeFromCart(id){
    let korpa=getLS("cart");
    let filtered=korpa.filter(p=>p.id != id);
    setLS("cart",filtered);
    displayCartData();
    printNumberOfProducts();
    location.reload();
}



var quantity=0;
function printNumberOfProducts(){
    let productsCart = getLS("cart");
    if(productsCart == null){
        $("#broj-proizvoda").html("(0 products)");
       // console.log("problem?");
    }
    else{
            quantity=productsCart.length;
        let numberOfProducts = quantity;
        let txt = quantity+" ";

        if(numberOfProducts == 1){
            txt = quantity+" "+"product";
        }
        else{
            txt =quantity+" products";
        }
        setLS("brojProizvodaLS",txt);
        $("#broj-proizvoda").html(`${txt}`)
    }
}
}

// Functions from contact.js
function contactFunctions() {
    //FORMA 

   //ISPIS DATUMA

    //Ispis Godina
    var nizGodina = [];
    for(let i=2023;i>1929;i--){
        nizGodina.push(i);
    }
    
    var godineIspis = "<select id='godina'>";
    godineIspis += "<option>Year</option>";
    for (let i in nizGodina) {
        godineIspis += "<option>"+nizGodina[i]+"</option>";
    }
    godineIspis += "</select>";
    document.getElementById("ddlYear").innerHTML = godineIspis;
    
        //Ispis meseci
    var nizMeseca = [];
    for(let i = 12; i>0;i--){
        nizMeseca.push(i);
    }
    
    var meseciIspis = "<select id='mesec'>";
    meseciIspis += "<option>Month</option>";
    for (let i in nizMeseca) {
        meseciIspis += "<option>"+nizMeseca[i]+"</option>";
    }
    meseciIspis += "</select>";
    document.getElementById("ddlMonth").innerHTML = meseciIspis;
    
        //Ispis dana
     var nizDana = [];
    for(let i = 31; i>0;i--){
        nizDana.push(i);
    }
    var daniIspis = "<select id='dan'>";
    daniIspis += "<option>Day</option>";
        for (let i in nizDana) {
            daniIspis += "<option>"+nizDana[i]+"</option>";
        }
        daniIspis += "</select>";
        document.getElementById("ddlDay").innerHTML = daniIspis;
    
//REGULARNI IZRAZI

document.getElementById("submitForme").addEventListener("click",function(){
    //dohvatanje vrednosti iz forme
    var ime =   document.getElementById("firstName").value.trim();
    var prezime = document.getElementById("lastName").value.trim();
    var email = document.getElementById("email").value.trim();
    var confirmEmail = document.getElementById("emailConfirm").value.trim();
    var godine = document.getElementById("godina").value;
    var meseci = document.getElementById("mesec").value;
    var dani = document.getElementById("dan").value;
    var pol = document.getElementsByName("Pol");

    //dohvatanje divova za erore
    var imeGreska = document.getElementById("firstNameError");
    var prezimeGreska = document.getElementById("lastNameError");
    var emailGreska = document.getElementById("emailError");
    var confirmEmailGreska = document.getElementById("emailConfirmError");
    var godineGreska = document.getElementById("godineError");
    var meseciGreska = document.getElementById("meseciError");
    var daniGreska = document.getElementById("daniError");
    var polGreska = document.getElementById("radioButtonError");

    //regex

    var regexIme = /^[A-Z][a-z]{2,15}$/;
    var regexPrezime = /^[A-Z][a-z]{2,15}$/;
    var regexEmail = /^[a-z]+[\.\-\_\!a-z\d]*\@[a-z]{2,10}(\.[a-z]{2,3}){1,2}$/;
    var regexConfirmEmail = /^[a-z]+[\.\-\_\!a-z\d]*\@[a-z]{2,10}(\.[a-z]{2,3}){1,2}$/;

    //PROVERA
    //ime
    if(ime==""){
        imeGreska.innerHTML = "This field is required!";
        document.getElementById("firstName").style.borderBottom = "3px solid red";
    }
    else if(!regexIme.test(ime)){
        imeGreska.innerHTML = "Enter valid name!";
        document.getElementById("firstName").style.borderBottom = "3px solid red";
    }else{
        imeGreska.innerHTML = "";
        document.getElementById("firstName").style.borderBottom = "3px solid green";
    }

    //prezime
    if(prezime==""){
        prezimeGreska.innerHTML = "This field is required!";
        document.getElementById("lastName").style.borderBottom = "3px solid red";
    }
    else if(!regexPrezime.test(prezime)){
        prezimeGreska.innerHTML = "Enter valid lastname!";
        document.getElementById("lastName").style.borderBottom = "3px solid red";
    }else{
        prezimeGreska.innerHTML = "";
        document.getElementById("lastName").style.borderBottom = "3px solid green";
    }

    //email
    if(email==""){
        emailGreska.innerHTML = "This field is required!";
        document.getElementById("email").style.borderBottom = "3px solid red";
    }
    else if(!regexEmail.test(email)){
        emailGreska.innerHTML = "Enter valid e-mail!";
        document.getElementById("email").style.borderBottom = "3px solid red";
    }else{
        emailGreska.innerHTML = "";
        document.getElementById("email").style.borderBottom = "3px solid green";
    }

    //confirmEmail
    if(confirmEmail==""){
        confirmEmailGreska.innerHTML = "This field is required!";
        document.getElementById("emailConfirm").style.borderBottom = "3px solid red";
    }
    else if(email!=confirmEmail){
        confirmEmailGreska.innerHTML = "Please confirm with correct e-mail!";
        document.getElementById("emailConfirm").style.borderBottom = "3px solid red";
    }
    else{
        confirmEmailGreska.innerHTML = "";
        document.getElementById("emailConfirm").style.borderBottom = "3px solid green";
    }

    //godine
    if(godine == "Year") {
        godineGreska.classList.add("showError");
    } else {
        godineGreska.classList.remove("showError");
        console.log("Izabrana godina");
    }
    //meseci
    if(meseci == "Month") {
        meseciGreska.classList.add("showError");
    } else {
        meseciGreska.classList.remove("showError");
        console.log("Izabran mesec");
    }

    //dani
    if(dani == "Day") {
        daniGreska.classList.add("showError");
    } else {
        daniGreska.classList.remove("showError");
        console.log("Izabran dan");
    }

    //POL
    let isValidPol = false;

    for(let i=0; i< pol.length; i++){
        if(pol[i].checked){
            isValidPol = true;
            break;
        }
    }

    if(!isValidPol){
        polGreska.innerHTML = "Please choose gender!";
    }
    else {
        polGreska.innerHTML = "";
        console.log("Izabran pol");
    }

})

function setLS(key,value){
    localStorage.setItem(key,JSON.stringify(value));
}
function getLS(key){
    return JSON.parse(localStorage.getItem(key));
}
}

// Functions from main.js

function mainFunctions() {
     //button Prikazi vise za about
  $('#showMoreTextAbout').css("display", "none");
  $('#btnPrikaziVise').click(function (e) {
      e.preventDefault();
      if ($('#showMoreTextAbout').is(':visible')) {
          $('#showMoreTextAbout').slideUp();
          $(this).val('Show More');
      } else {
          $('#showMoreTextAbout').slideDown();
          $(this).val('Show Less');
      }
  });


     //dodavanje boje texta na p tagove u about-u
$("#specializationBlok p").addClass("orangeTextColor");

     //SLIDER
var i = 0;
var nizSlika = ["banner-01", "banner-02", "banner-03"];

function imageSlider(){
    var slider=document.getElementById("slider");
    slider.style.opacity = 1;
    setTimeout(() => {
        slider.style.opacity = 0.9;
    }, 3400);
    setTimeout(() => {
        slider.style.opacity = 0.85;
    }, 3500);
    setTimeout(() => {
        slider.style.opacity = 0.8;
    }, 3600);
    setTimeout(() => {
        slider.style.opacity = 0.75;
    }, 3700);
    setTimeout(() => {
        slider.style.opacity = 0.7;
    }, 3800);
    setTimeout(() => {
        slider.style.opacity = 0.65;
    }, 3900);
    slider.style.backgroundImage = "url('assets/img/"+nizSlika[i]+".jpg')";
    slider.style.opacity=0.65;
    setTimeout(() => {
        slider.style.opacity = 0.7;
    }, 100);
    setTimeout(() => {
        slider.style.opacity = 0.75;
    }, 200);
    setTimeout(() => {
        slider.style.opacity = 0.8;
    }, 300);
    setTimeout(() => {
        slider.style.opacity = 0.85;
    }, 400);
    setTimeout(() => {
        slider.style.opacity = 0.95;
    }, 500);
    setTimeout(() => {
        slider.style.opacity = 1;
    }, 600);
    if(i < nizSlika.length-1){
        i++;
    }
    else{
        i=0;
    }

    setTimeout(imageSlider, 4000);
}
imageSlider();
}

// Functions from store.js
function storeFunctions() {
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
    let brojProizvoda=getLS("brojProizvodaLS");
    for (link of data){
        if (link.href=="cart.html"){
            if(brojProizvoda==null){
                html+=`<li class="${klasa} nav-item"><a class="nav-link" href="${link.href}">${link.text}<span id="broj-proizvoda">0 products</span></a></li>`
            }
            else{
                html+=`<li class="${klasa} nav-item"><a class="nav-link" href="${link.href}">${link.text}<span id="broj-proizvoda">${brojProizvoda}</span></a></li>`
            }
    }
    else {
        html+=`<li class="${klasa} nav-item"><a class="nav-link" href="${link.href}">${link.text}</a></li>`
    }
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
        $('.cartAdd').click(addToCart);
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

//korpa 
function addToCart(){
    let idP = $(this).data("id");
    // console.log(idP)

    let productsCart = getLS("cart");
    if(productsCart == null){
        addFirstItemToCart();
        printNumberOfProducts();
    }
    else{
        if(productIsAlreadyInCart()){
            updateQty();
            printNumberOfProducts();
        }
        else{
            addItemToCart();
            printNumberOfProducts();
        }
    }

    function addFirstItemToCart(){
        let products = [
            {
                id: idP,
                qty: 1
            }
        ];

        setLS("cart", products);
    }

    function productIsAlreadyInCart(){
        return productsCart.filter(el => el.id == idP).length;
    }

    function updateQty(){
        let productsLS = getLS("cart");
        for(let p of productsLS){
            if(p.id == idP){
                p.qty++;
                break;
            }
        }

        setLS("cart", productsLS);
    }

    function addItemToCart(){
        let productLS = getLS("cart");

        productLS.push({
            id: idP,
            qty: 1
        });

        setLS("cart", productLS);
    }
}
var quantity=0;
function printNumberOfProducts(){
    let productsCart = getLS("cart");
    if(productsCart == null){
        $("#broj-proizvoda").html("(0 products)");
        console.log("problem?");
    }
    else{   
        // quantity=0;
        // for(let i=0;i<productsCart.length;i++){
        //     quantity+=productsCart[i].qty;
        // }
        quantity=productsCart.length;
        let numberOfProducts = quantity;
        let txt = quantity+" ";

        if(numberOfProducts == 1){
            txt = quantity+" "+"product";
        }
        else{
            txt =quantity+" products";
        }
        setLS("brojProizvodaLS",txt);
        $("#broj-proizvoda").html(`${txt}`)
    }
}


}

// Call the page-specific functions based on the page
const currentPage = window.location.pathname;
if (currentPage.includes("author.html")) {
    ajaxCallBack(BASEURL + "menu.json", header);
    ispisFootera();
    showMoreAuthor();
} else if (currentPage.includes("cart.html")) {
    ajaxCallBack(BASEURL + "menu.json", header);
    ispisFootera();
    cartFunctions();
} else if (currentPage.includes("contact.html")) {
    ajaxCallBack(BASEURL + "menu.json", header);
    ispisFootera();
    contactFunctions();
} else if (currentPage.includes("index.html")) {
    ajaxCallBack(BASEURL + "menu.json", header);
    ispisFootera();
    mainFunctions();
} else if (currentPage.includes("store.html")) {
    ajaxCallBack(BASEURL + "menu.json", header);
    ispisFootera();
    storeFunctions();
}else{
    ajaxCallBack(BASEURL + "menu.json", header);
    ispisFootera();
    mainFunctions();
} 
