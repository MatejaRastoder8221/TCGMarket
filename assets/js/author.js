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

    //button Prikazi vise za autora
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

    function setLS(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    }
    function getLS(key){
        return JSON.parse(localStorage.getItem(key));
    }