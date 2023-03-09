const BASEURL ="assets/data/"

window.onload = function(){
imageSlider();
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
    document.getElementById("slider").style.backgroundImage = "url('assets/img/"+nizSlika[i]+".jpg')";

    if(i < nizSlika.length-1){
        i++;
    }
    else{
        i=0;
    }

    setTimeout("imageSlider()", 2600);
}


