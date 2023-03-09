const BASEURL ="assets/data/"

window.onload = function(){
//dinamicko ispisivanje navigacije
ajaxCallBack(BASEURL+"menu.json",function(result){
    header(result);
});
ispisFootera();
}
//f-ja za ispis navigacije
function header(data){
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
    
    for (link of data){
        html+=`<li class="nav-item"><a class="nav-link" href="${link.href}">${link.text}</a></li>`
    }
    html+=`</ul></div></div>`
    $("#navigation").html(html);
}
//ispis footera
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