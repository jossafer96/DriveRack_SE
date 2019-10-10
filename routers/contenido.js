var express = require("express");
var session = require("express-session");
var router = express.Router();
var contenido = require("../models/contenido");
var usuario = require("../models/usuario");


//Obtener los contenidos de un USUARIO logeado
router.get("/",function(req,res){
    if (!req.session.user) {
       res.redirect("/login/logout");
       
    }else{
    contenido.find({idUsuario:req.session.user})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
}
});

router.get("/:id",function(req,res){
    
    contenido.find({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Obtener los contenidos de un USUARIO logeado
router.get("/editar/:id",function(req,res){
    contenido.find({_id:req.params.id})
    .then(data=>{
            
                if (data[0].contenido.contenidoPrincipal=='undefined') {
                    var contenidoPrincipal=`<h2>Blog Details</h2>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><span>Blog Details</span></li>
                    </ul>`;
                }else{
                    var contenidoPrincipal=data[0].contenido.contenidoPrincipal;
                };

                if (data[0].contenido.contenidoImg=='undefined') {
                    var contenidoImg=`<img src="../../contenidos/assets/img/blog/blog-big-img.jpg" alt="blog thumbnail">`;
                }else{
                    var contenidoImg=data[0].contenido.contenidoImg;
                };

                if (data[0].contenido.contenidoTitulo=='undefined') {
                    var contenidoTitulo=`<p >Work For Success</p>`;
                }else{
                    var contenidoTitulo=data[0].contenido.contenidoTitulo;
                };

                if (data[0].contenido.contenidoTexto=='undefined') {
                    var contenidoTexto=` <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit sed diam nonummy nibh euismod tincid unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit.
                        <br>
                        <br>Lorem ipsum dolor sit amet, consectetuer adipiscing elit sed diam nonummy nibh euismod tincid unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.</p>`;
                }else{
                    var contenidoTexto=data[0].contenido.contenidoTexto;
                };
                if (data[0].plantilla=='blog-details') {
                data[0].html= `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title> ${data[0].titulo}</title>
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="usuario" content="${data[0]._id}">
                  
                    <script>document.getElementsByTagName("html")[0].className += " js";</script>
                    <link rel="stylesheet" href="../../contenidos/assets/css/bootstrap.min.css">
                    <link rel="stylesheet" href="../../contenidos/assets/css/jquery-ui.css">
                    <link rel="stylesheet" href="../../contenidos/assets/css/font-awesome.min.css">
                    <link rel="stylesheet" href="../../contenidos/assets/css/owl.carousel.min.css">
                    <link rel="stylesheet" href="../../contenidos/assets/css/slicknav.min.css">
                    <link rel="stylesheet" href="../../contenidos/assets/css/magnificpopup.css">
                    <link rel="stylesheet" href="../../contenidos/assets/css/jquery.mb.YTPlayer.min.css">
                    <link rel="stylesheet" href="../../contenidos/assets/css/typography.css">
                    <link rel="stylesheet" href="../../contenidos/assets/css/style.css">
                    <link rel="stylesheet" href="../../contenidos/assets/css/responsive.css">
                    <link rel="stylesheet" type="text/css" href="../../assets/css/content-tools.min.css">
                    <link rel="shortcut icon" type="image/png" href="../../assets/img/upload/${data[0].favicon}">
                    <style>
                        .author {
                            font-style: italic;
                            font-weight: bold;
                        }
                    </style>
                </head>
                <body >
                        <div class="crumbs-area">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-xs-12">
                                            <div id="contenidoPrincipal" data-name="contenidoPrincipal" data-editable class="crumbs-inner">
                                            ${contenidoPrincipal}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="blog-details ptb--120">
        <div class="container">
            <div class="row">
                <!-- blog details area start -->
                <div class="col-md-8 col-sm-8 col-xs-12">
                    <div  class="blog-info">
                        <div data-name="contenidoImg" data-editable class="blog-thumbnail">

                        ${contenidoImg}
                        </div>
                        <h2 data-name="contenidoTitulo" data-editable class="blog-title">
                       
                        ${contenidoTitulo}
                        
                        </h2>
                        <div  class="blog-meta">
                            <ul>
                                <li id="date"></li>
                                
                            </ul>
                        </div>
                        <div data-name="contenidoTexto" data-editable class="blog-summery">
                        
                        ${contenidoTexto}
                           
                           
                        </div>
                    </div>
                   
                    <!-- comment area end -->
                    <!-- leave comment area start -->
                    <div class="leave-comment">
                        <div class="comment-title">
                            <h4>Leave a Comments</h4>
                        </div>
                        <div class="row">
                            <form action="#" id="contact-form">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input placeholder="Name" id="name" type="text">
                                    <input placeholder="Email" id="email" type="text">
                                    <input placeholder="Website" id="website" type="text">
                                </div>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <textarea name="msg" id="message" placeholder="Message"></textarea>
                                </div>
                                <div class="col-xs-12">
                                    <input value="send message" id="comment-submit" type="submit">
                                </div>
                            </form>
                        </div>
                    </div>
                    <!-- leave comment area end -->
                </div>
                <!-- blog details area end -->
                <!-- sidebar area start -->
                <div class="col-md-4 col-sm-4 col-xs-12">
                    <div class="sidebar--area">
                        <!-- widget search area start -->
                        <div class="widget widget-search">
                            <form action="#">
                                <input type="text" placeholder="Search here">
                                <button type="submit" id="search-submit"><i class="fa fa-search"></i></button>
                            </form>
                        </div>
                        <!-- widget search area end -->
                        
                        <!-- widget recent post area end -->
                        <!-- widget categoriy area start -->
                        <div class="widget widget-category">
                            <div class="widget-title">
                                <h2>Categories</h2>
                            </div>
                            <div class="widget--category-list">
                                <ul>
                                    <li><a href="#"> Technology <span>(07)</span></a></li>
                                    <li><a href="#">Mobile Apps <span>(10)</span></a></li>
                                    <li><a href="#">Cognitive Science <span>(08)</span></a></li>
                                    <li><a href="#">Artificial Intelligence <span>(27)</span></a></li>
                                    <li><a href="#">Product Updates <span>(03)</span></a></li>
                                </ul>
                            </div>
                        </div>
                        <!-- widget categoriy area end -->
                        <!-- widget archive area start -->
                        <div class="widget widget-archive">
                            <div class="widget-title">
                                <h2>Archive</h2>
                            </div>
                            <div class="widget--archive-list">
                                <ul>
                                    <li><a href="#">Jul 2017 <span>(07)</span></a></li>
                                    <li><a href="#">Jan 2016 <span>(10)</span></a></li>
                                    <li><a href="#">Jul 2015 <span>(08)</span></a></li>
                                    <li><a href="#">Jan 2014 <span>(27)</span></a></li>
                                    <li><a href="#">Jul 2013 <span>(03)</span></a></li>
                                </ul>
                            </div>
                        </div>
                        <!-- widget archive area end -->
                        <!-- widget tags area start -->
                       
                        <!-- widget tags area end -->
                    </div>
                </div>
                <!-- sidebar area end -->
            </div>
        </div>
    </div>
                       
                    <script src="../../contenidos/assets/js/jquery-3.2.0.min.js"></script>
                    <script src="../../assets/js/content-tools.min.js"></script>
                    <script src="../../assets/js/editor.js"></script>

                    
                    
                </body>
                </html>`;
           }else if (data[0].plantilla=='blog') {
            data[0].html= `
            <!DOCTYPE html>
<html lang="en">

<head>
    <!--- Basic Page Needs  -->
    <meta charset="utf-8">
    <title>${data[0].titulo}</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Mobile Specific Meta  -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="usuario" content="${data[0]._id}">
    <!-- CSS -->
    <link rel="stylesheet" href="../../contenidos/assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/jquery-ui.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/font-awesome.min.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/owl.carousel.min.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/slicknav.min.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/magnificpopup.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/jquery.mb.YTPlayer.min.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/typography.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/style.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/responsive.css">
    <link rel="stylesheet"  type="text/css" href="../../assets/css/content-tools.min.css">
    <!-- Favicon -->
    <link rel="shortcut icon" type="image/png" href="../../assets/img/upload/${data[0].favicon}">
   
</head>

<body>
   
    <!-- crumbs area start -->
    <div class="crumbs-area">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <div data-name="contenidoPrincipal" data-editable class="crumbs-inner">
                    ${contenidoPrincipal}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- crumbs area end -->
    <!-- blog post area start -->
    <div class="blog-post-area">
        <div class="container">
            <div class="row">
                <div class="blog-list">
                    <div class="col-md-4 col-sm-6 col-xs-12">
                        <div class="list-item">
                            <div data-name="contenidoImg" data-editable class="blog-thumbnail">
                            ${contenidoImg}
                            </div>
                            <h2 data-name="contenidoTitulo" data-editable class="blog-title">
                            ${contenidoTitulo}
                            </h2>
                            <div class="blog-meta">
                                <ul>
                                <li id="date"></li>
                                </ul>
                            </div>
                            <div data-name="contenidoTexto" data-editable class="blog-summery">
                            ${contenidoTexto}
                            </div>
                            <a href="blog.html" class="read-more">Read More</a>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    </div>
    <!-- blog post area end -->
    <!-- pagination area start -->
    <div class="pagination-area">
        <div class="container">
            <div class="pagination">
                <ul>
                    <li><a href="#">OLDER POSTS</a></li>
                    <li><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><span>3</span></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">NEWER POSTS</a></li>
                </ul>
            </div>
        </div>
    </div>
    <!-- pagination area end -->


    <!-- Scripts -->
    <script src="../../contenidos/assets/js/jquery-3.2.0.min.js"></script>
    <script src="../../contenidos/assets/js/jquery-ui.js"></script>
    <script src="../../contenidos/assets/js/bootstrap.min.js"></script>
    <script src="../../contenidos/assets/js/jquery.slicknav.min.js"></script>
    <script src="../../contenidos/assets/js/owl.carousel.min.js"></script>
    <script src="../../contenidos/assets/js/magnific-popup.min.js"></script>
    <script src="../../contenidos/assets/js/counterup.js"></script>
    <script src="../../contenidos/assets/js/jquery.waypoints.min.js"></script>
    <script src="../../contenidos/assets/js/jquery.mb.YTPlayer.min.js"></script>
    <script src="../../contenidos/assets/js/theme.js"></script>
    <script src="../../assets/js/content-tools.min.js"></script>
    <script src="../../assets/js/editor.js"></script>
</body>

</html>`;
       }else if (data[0].plantilla=='blog-left-sidebar') {
        data[0].html= `
        <!DOCTYPE html>
<html lang="en">

<head>
    <!--- Basic Page Needs  -->
    <meta charset="utf-8">
    <title>${data[0].titulo}</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Mobile Specific Meta  -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="usuario" content="${data[0]._id}">
    <!-- CSS -->
    <link rel="stylesheet" href="../../contenidos/assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/jquery-ui.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/font-awesome.min.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/owl.carousel.min.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/slicknav.min.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/magnificpopup.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/jquery.mb.YTPlayer.min.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/typography.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/style.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/responsive.css">
    <link rel="stylesheet"  type="text/css" href="../../assets/css/content-tools.min.css">
    <!-- Favicon -->
    <link rel="shortcut icon" type="image/png" href="../../assets/img/upload/${data[0].favicon}">
    
</head>

<body>
   
    <!-- crumbs area start -->
    <div class="crumbs-area">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <div data-name="contenidoPrincipal" data-editable class="crumbs-inner">
                    ${contenidoPrincipal}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- crumbs area end -->
    <!-- blog post area start -->
    <div class="blog-post-area bp-with-sidebar flex-left-sidebar pb--100">
        <div class="container">
            <div class="row">
                <!-- sidebar area start -->
                <div class="col-md-4 col-sm-4 col-xs-12">
                    <div class="sidebar--area">
                        <!-- widget search area start -->
                        <div class="widget widget-search">
                            <form action="#">
                                <input type="text" placeholder="Search here">
                                <button type="submit" id="search-submit"><i class="fa fa-search"></i></button>
                            </form>
                        </div>
                        <!-- widget search area end -->
                        <!-- widget recent post area start -->
                      
                        <!-- widget recent post area end -->
                        <!-- widget categoriy area start -->
                        <div class="widget widget-category">
                            <div class="widget-title">
                                <h2>Categories</h2>
                            </div>
                            <div class="widget--category-list">
                                <ul>
                                    <li><a href="#"> Technology <span>(07)</span></a></li>
                                    <li><a href="#">Mobile Apps <span>(10)</span></a></li>
                                    <li><a href="#">Cognitive Science <span>(08)</span></a></li>
                                    <li><a href="#">Artificial Intelligence <span>(27)</span></a></li>
                                    <li><a href="#">Product Updates <span>(03)</span></a></li>
                                </ul>
                            </div>
                        </div>
                        <!-- widget categoriy area end -->
                        <!-- widget archive area start -->
                        <div class="widget widget-archive">
                            <div class="widget-title">
                                <h2>Archive</h2>
                            </div>
                            <div class="widget--archive-list">
                                <ul>
                                    <li><a href="#">Jul 2017 <span>(07)</span></a></li>
                                    <li><a href="#">Jan 2016 <span>(10)</span></a></li>
                                    <li><a href="#">Jul 2015 <span>(08)</span></a></li>
                                    <li><a href="#">Jan 2014 <span>(27)</span></a></li>
                                    <li><a href="#">Jul 2013 <span>(03)</span></a></li>
                                </ul>
                            </div>
                        </div>
                        <!-- widget archive area end -->
                        
                        <!-- widget tags area end -->
                    </div>
                </div>
                <!-- sidebar area end -->
                <!-- blog list area start -->
                <div class="col-md-8 col-sm-8 col-xs-12">
                    <div class="row">
                        <div class="blog-list">
                            <div class="col-md-6 col-sm-12 col-xs-12">
                                <div class="list-item">
                                    <div data-name="contenidoImg" data-editable class="blog-thumbnail">
                                    ${contenidoImg}
                                    </div>
                                    <h2 data-name="contenidoTitulo" data-editable class="blog-title">
                                    ${contenidoTitulo}
                                    </h2>
                                    <div class="blog-meta">
                                        <ul>
                                        <li id="date"></li>
                                        </ul>
                                    </div>
                                    <div data-name="contenidoTexto" data-editable class="blog-summery">
                                    ${contenidoTexto}
                                    </div>
                                    <a href="blog.html" class="read-more">Read More</a>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <!-- pagination area start -->
                    <div class="pagination">
                        <ul>
                            <li><a href="#">OLDER POSTS</a></li>
                            <li><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><span>3</span></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">NEWER POSTS</a></li>
                        </ul>
                    </div>
                    <!-- pagination area end -->
                </div>
                <!-- blog list area end -->
            </div>
        </div>
    </div>
  
    <!-- Scripts -->
    <script src="../../contenidos/assets/js/jquery-3.2.0.min.js"></script>
    <script src="../../contenidos/assets/js/jquery-ui.js"></script>
    <script src="../../contenidos/assets/js/bootstrap.min.js"></script>
    <script src="../../contenidos/assets/js/jquery.slicknav.min.js"></script>
    <script src="../../contenidos/assets/js/owl.carousel.min.js"></script>
    <script src="../../contenidos/assets/js/magnific-popup.min.js"></script>
    <script src="../../contenidos/assets/js/counterup.js"></script>
    <script src="../../contenidos/assets/js/jquery.waypoints.min.js"></script>
    <script src="../../contenidos/assets/js/jquery.mb.YTPlayer.min.js"></script>
    <script src="../../contenidos/assets/js/theme.js"></script>
    <script src="../../assets/js/content-tools.min.js"></script>
    <script src="../../assets/js/editor.js"></script>
</body>

</html>`;
   }else if (data[0].plantilla=='blog-with-sidebar') {
    data[0].html= `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <!--- Basic Page Needs  -->
        <meta charset="utf-8">
        <title>${data[0].titulo}</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!-- Mobile Specific Meta  -->
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <meta name="usuario" content="${data[0]._id}">
        <!-- CSS -->
        <link rel="stylesheet" href="../../contenidos/assets/css/bootstrap.min.css">
        <link rel="stylesheet" href="../../contenidos/assets/css/jquery-ui.css">
        <link rel="stylesheet" href="../../contenidos/assets/css/font-awesome.min.css">
        <link rel="stylesheet" href="../../contenidos/assets/css/owl.carousel.min.css">
        <link rel="stylesheet" href="../../contenidos/assets/css/slicknav.min.css">
        <link rel="stylesheet" href="../../contenidos/assets/css/magnificpopup.css">
        <link rel="stylesheet" href="../../contenidos/assets/css/jquery.mb.YTPlayer.min.css">
        <link rel="stylesheet" href="../../contenidos/assets/css/typography.css">
        <link rel="stylesheet" href="../../contenidos/assets/css/style.css">
        <link rel="stylesheet" href="../../contenidos/assets/css/responsive.css">
        <link rel="stylesheet"  type="text/css" href="../../assets/css/content-tools.min.css">
        <!-- Favicon -->
        <link rel="shortcut icon" type="image/png" href="../../assets/img/upload/${data[0].favicon}">
        
    </head>
    
    <body>
        <!-- crumbs area start -->
        <div class="crumbs-area">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <div data-name="contenidoPrincipal" data-editable class="crumbs-inner">
                        ${contenidoPrincipal}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- crumbs area end -->
        <!-- blog post area start -->
        <div class="blog-post-area bp-with-sidebar pb--100">
            <div class="container">
                <div class="row">
                    <!-- blog list area start -->
                    <div class="col-md-8 col-sm-8 col-xs-12">
                        <div class="row">
                            <div class="blog-list">
                                <div class="col-md-6 col-sm-12 col-xs-12">
                                    <div  class="list-item">
                                        <div data-name="contenidoImg" data-editable class="blog-thumbnail">
                                        ${contenidoImg}
                                        </div>
                                        <h2 data-name="contenidoTitulo" data-editable class="blog-title">
                                        ${contenidoTitulo}
                                        </h2>
                                        <div class="blog-meta">
                                            <ul>
                                            <li id="date"></li>
                                            </ul>
                                        </div>
                                        <div data-name="contenidoTexto" data-editable class="blog-summery">
                                        ${contenidoTexto}
                                        </div>
                                        <a href="blog.html" class="read-more">Read More</a>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                        <!-- pagination area start -->
                        <div class="pagination">
                            <ul>
                                <li><a href="#">OLDER POSTS</a></li>
                                <li><a href="#">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><span>3</span></li>
                                <li><a href="#">4</a></li>
                                <li><a href="#">NEWER POSTS</a></li>
                            </ul>
                        </div>
                        <!-- pagination area end -->
                    </div>
                    <!-- blog list area end -->
                    <!-- sidebar area start -->
                    <div class="col-md-4 col-sm-4 col-xs-12">
                        <div class="sidebar--area">
                            <!-- widget search area start -->
                            <div class="widget widget-search">
                                <form action="#">
                                    <input type="text" placeholder="Search here">
                                    <button type="submit" id="search-submit"><i class="fa fa-search"></i></button>
                                </form>
                            </div>
                            <!-- widget search area end -->
                            
                            <!-- widget recent post area end -->
                            <!-- widget categoriy area start -->
                            <div class="widget widget-category">
                                <div class="widget-title">
                                    <h2>Categories</h2>
                                </div>
                                <div class="widget--category-list">
                                    <ul>
                                        <li><a href="#"> Technology <span>(07)</span></a></li>
                                        <li><a href="#">Mobile Apps <span>(10)</span></a></li>
                                        <li><a href="#">Cognitive Science <span>(08)</span></a></li>
                                        <li><a href="#">Artificial Intelligence <span>(27)</span></a></li>
                                        <li><a href="#">Product Updates <span>(03)</span></a></li>
                                    </ul>
                                </div>
                            </div>
                            <!-- widget categoriy area end -->
                            <!-- widget archive area start -->
                            <div class="widget widget-archive">
                                <div class="widget-title">
                                    <h2>Archive</h2>
                                </div>
                                <div class="widget--archive-list">
                                    <ul>
                                        <li><a href="#">Jul 2017 <span>(07)</span></a></li>
                                        <li><a href="#">Jan 2016 <span>(10)</span></a></li>
                                        <li><a href="#">Jul 2015 <span>(08)</span></a></li>
                                        <li><a href="#">Jan 2014 <span>(27)</span></a></li>
                                        <li><a href="#">Jul 2013 <span>(03)</span></a></li>
                                    </ul>
                                </div>
                            </div>
                            <!-- widget archive area end -->
                            <!-- widget tags area start -->
                            
                            <!-- widget tags area end -->
                        </div>
                    </div>
                    <!-- sidebar area end -->
                </div>
            </div>
        </div>
        <!-- blog post area end -->
    
    
        <!-- Scripts -->
        <script src="../../contenidos/assets/js/jquery-3.2.0.min.js"></script>
        <script src="../../contenidos/assets/js/jquery-ui.js"></script>
        <script src="../../contenidos/assets/js/bootstrap.min.js"></script>
        <script src="../../contenidos/assets/js/jquery.slicknav.min.js"></script>
        <script src="../../contenidos/assets/js/owl.carousel.min.js"></script>
        <script src="../../contenidos/assets/js/magnific-popup.min.js"></script>
        <script src="../../contenidos/assets/js/counterup.js"></script>
        <script src="../../contenidos/assets/js/jquery.waypoints.min.js"></script>
        <script src="../../contenidos/assets/js/jquery.mb.YTPlayer.min.js"></script>
        <script src="../../contenidos/assets/js/theme.js"></script>
        <script src="../../assets/js/content-tools.min.js"></script>
        <script src="../../assets/js/editor.js"></script>
    </body>
    
    </html>`;
}
      
        res.send(data[0].html);
    })
    .catch(error=>{
        res.send(error);
    });
});


//Obtener los contenidos de un USUARIO logeado
router.get("/contenido/:id",function(req,res){
    contenido.find({_id:req.params.id})
    .then(data=>{
            
                if (data[0].contenido.contenidoPrincipal=='undefined') {
                    var contenidoPrincipal=`<h2>Blog Details</h2>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><span>Blog Details</span></li>
                    </ul>`;
                }else{
                    var contenidoPrincipal=data[0].contenido.contenidoPrincipal;
                };

                if (data[0].contenido.contenidoImg=='undefined') {
                    var contenidoImg=`<img src="../../contenidos/assets/img/blog/blog-big-img.jpg" alt="blog thumbnail">`;
                }else{
                    var contenidoImg=data[0].contenido.contenidoImg;
                };

                if (data[0].contenido.contenidoTitulo=='undefined') {
                    var contenidoTitulo=`<p >Work For Success</p>`;
                }else{
                    var contenidoTitulo=data[0].contenido.contenidoTitulo;
                };

                if (data[0].contenido.contenidoTexto=='undefined') {
                    var contenidoTexto=` <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit sed diam nonummy nibh euismod tincid unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit.
                        <br>
                        <br>Lorem ipsum dolor sit amet, consectetuer adipiscing elit sed diam nonummy nibh euismod tincid unt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.</p>`;
                }else{
                    var contenidoTexto=data[0].contenido.contenidoTexto;
                };
                if (data[0].plantilla=='blog-details') {
                data[0].html= `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title> ${data[0].titulo}</title>
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="usuario" content="5d83c7ad3dde242980e84a6f">
                    <link rel="shortcut icon" type="image/png" href="./contenidos/assets/img/icon/favicon.ico">
                    <script>document.getElementsByTagName("html")[0].className += " js";</script>
                    <link rel="stylesheet" href="../../contenidos/assets/css/bootstrap.min.css">
                    <link rel="stylesheet" href="../../contenidos/assets/css/jquery-ui.css">
                    <link rel="stylesheet" href="../../contenidos/assets/css/font-awesome.min.css">
                    <link rel="stylesheet" href="../../contenidos/assets/css/owl.carousel.min.css">
                    <link rel="stylesheet" href="../../contenidos/assets/css/slicknav.min.css">
                    <link rel="stylesheet" href="../../contenidos/assets/css/magnificpopup.css">
                    <link rel="stylesheet" href="../../contenidos/assets/css/jquery.mb.YTPlayer.min.css">
                    <link rel="stylesheet" href="../../contenidos/assets/css/typography.css">
                    <link rel="stylesheet" href="../../contenidos/assets/css/style.css">
                    <link rel="stylesheet" href="../../contenidos/assets/css/responsive.css">
                   
                    <link rel="shortcut icon" type="image/png" href="../../assets/img/upload/${data[0].favicon}">
                    <style>
                        .author {
                            font-style: italic;
                            font-weight: bold;
                        }
                    </style>
                </head>
                <body >
                        <div class="crumbs-area">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-xs-12">
                                            <div id="contenidoPrincipal" data-name="contenidoPrincipal" data-editable class="crumbs-inner">
                                            ${contenidoPrincipal}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="blog-details ptb--120">
        <div class="container">
            <div class="row">
                <!-- blog details area start -->
                <div class="col-md-8 col-sm-8 col-xs-12">
                    <div  class="blog-info">
                        <div data-name="contenidoImg" data-editable class="blog-thumbnail">

                        ${contenidoImg}
                        </div>
                        <h2 data-name="contenidoTitulo" data-editable class="blog-title">
                       
                        ${contenidoTitulo}
                        
                        </h2>
                        <div  class="blog-meta">
                            <ul>
                            <li id="date"></li>
                            </ul>
                        </div>
                        <div data-name="contenidoTexto" data-editable class="blog-summery">
                        
                        ${contenidoTexto}
                           
                           
                        </div>
                    </div>
                   
                    <!-- comment area end -->
                    <!-- leave comment area start -->
                    <div class="leave-comment">
                        <div class="comment-title">
                            <h4>Leave a Comments</h4>
                        </div>
                        <div class="row">
                            <form action="#" id="contact-form">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input placeholder="Name" id="name" type="text">
                                    <input placeholder="Email" id="email" type="text">
                                    <input placeholder="Website" id="website" type="text">
                                </div>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <textarea name="msg" id="message" placeholder="Message"></textarea>
                                </div>
                                <div class="col-xs-12">
                                    <input value="send message" id="comment-submit" type="submit">
                                </div>
                            </form>
                        </div>
                    </div>
                    <!-- leave comment area end -->
                </div>
                <!-- blog details area end -->
                <!-- sidebar area start -->
                <div class="col-md-4 col-sm-4 col-xs-12">
                    <div class="sidebar--area">
                        <!-- widget search area start -->
                        <div class="widget widget-search">
                            <form action="#">
                                <input type="text" placeholder="Search here">
                                <button type="submit" id="search-submit"><i class="fa fa-search"></i></button>
                            </form>
                        </div>
                        <!-- widget search area end -->
                        
                        <!-- widget recent post area end -->
                        <!-- widget categoriy area start -->
                        <div class="widget widget-category">
                            <div class="widget-title">
                                <h2>Categories</h2>
                            </div>
                            <div class="widget--category-list">
                                <ul>
                                    <li><a href="#"> Technology <span>(07)</span></a></li>
                                    <li><a href="#">Mobile Apps <span>(10)</span></a></li>
                                    <li><a href="#">Cognitive Science <span>(08)</span></a></li>
                                    <li><a href="#">Artificial Intelligence <span>(27)</span></a></li>
                                    <li><a href="#">Product Updates <span>(03)</span></a></li>
                                </ul>
                            </div>
                        </div>
                        <!-- widget categoriy area end -->
                        <!-- widget archive area start -->
                        <div class="widget widget-archive">
                            <div class="widget-title">
                                <h2>Archive</h2>
                            </div>
                            <div class="widget--archive-list">
                                <ul>
                                    <li><a href="#">Jul 2017 <span>(07)</span></a></li>
                                    <li><a href="#">Jan 2016 <span>(10)</span></a></li>
                                    <li><a href="#">Jul 2015 <span>(08)</span></a></li>
                                    <li><a href="#">Jan 2014 <span>(27)</span></a></li>
                                    <li><a href="#">Jul 2013 <span>(03)</span></a></li>
                                </ul>
                            </div>
                        </div>
                        <!-- widget archive area end -->
                        <!-- widget tags area start -->
                       
                        <!-- widget tags area end -->
                    </div>
                </div>
                <!-- sidebar area end -->
            </div>
        </div>
    </div>
                       
                    <script src="../../contenidos/assets/js/jquery-3.2.0.min.js"></script>
                    
                    
                </body>
                </html>`;
           }else if (data[0].plantilla=='blog') {
            data[0].html= `
            <!DOCTYPE html>
<html lang="en">

<head>
    <!--- Basic Page Needs  -->
    <meta charset="utf-8">
    <title>${data[0].titulo}</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Mobile Specific Meta  -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <!-- CSS -->
    <link rel="stylesheet" href="../../contenidos/assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/jquery-ui.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/font-awesome.min.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/owl.carousel.min.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/slicknav.min.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/magnificpopup.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/jquery.mb.YTPlayer.min.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/typography.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/style.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/responsive.css">
    
    <!-- Favicon -->
    <link rel="shortcut icon" type="image/png" href="../../assets/img/upload/${data[0].favicon}">
   
</head>

<body>
   
    <!-- crumbs area start -->
    <div class="crumbs-area">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <div data-name="contenidoPrincipal" data-editable class="crumbs-inner">
                    ${contenidoPrincipal}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- crumbs area end -->
    <!-- blog post area start -->
    <div class="blog-post-area">
        <div class="container">
            <div class="row">
                <div class="blog-list">
                    <div class="col-md-4 col-sm-6 col-xs-12">
                        <div class="list-item">
                            <div data-name="contenidoImg" data-editable class="blog-thumbnail">
                            ${contenidoImg}
                            </div>
                            <h2 data-name="contenidoTitulo" data-editable class="blog-title">
                            ${contenidoTitulo}
                            </h2>
                            <div class="blog-meta">
                                <ul>
                                <li id="date"></li>
                                </ul>
                            </div>
                            <div data-name="contenidoTexto" data-editable class="blog-summery">
                            ${contenidoTexto}
                            </div>
                            <a href="blog.html" class="read-more">Read More</a>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    </div>
    <!-- blog post area end -->
    <!-- pagination area start -->
    <div class="pagination-area">
        <div class="container">
            <div class="pagination">
                <ul>
                    <li><a href="#">OLDER POSTS</a></li>
                    <li><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><span>3</span></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">NEWER POSTS</a></li>
                </ul>
            </div>
        </div>
    </div>
    <!-- pagination area end -->


    <!-- Scripts -->
    <script src="../../contenidos/assets/js/jquery-3.2.0.min.js"></script>
    <script src="../../contenidos/assets/js/jquery-ui.js"></script>
    <script src="../../contenidos/assets/js/bootstrap.min.js"></script>
    <script src="../../contenidos/assets/js/jquery.slicknav.min.js"></script>
    <script src="../../contenidos/assets/js/owl.carousel.min.js"></script>
    <script src="../../contenidos/assets/js/magnific-popup.min.js"></script>
    <script src="../../contenidos/assets/js/counterup.js"></script>
    <script src="../../contenidos/assets/js/jquery.waypoints.min.js"></script>
    <script src="../../contenidos/assets/js/jquery.mb.YTPlayer.min.js"></script>
    <script src="../../contenidos/assets/js/theme.js"></script>
    
    <script src="../../assets/js/editor.js"></script>
</body>

</html>`;
       }else if (data[0].plantilla=='blog-left-sidebar') {
        data[0].html= `
        <!DOCTYPE html>
<html lang="en">

<head>
    <!--- Basic Page Needs  -->
    <meta charset="utf-8">
    <title>${data[0].titulo}</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Mobile Specific Meta  -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <!-- CSS -->
    <link rel="stylesheet" href="../../contenidos/assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/jquery-ui.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/font-awesome.min.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/owl.carousel.min.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/slicknav.min.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/magnificpopup.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/jquery.mb.YTPlayer.min.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/typography.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/style.css">
    <link rel="stylesheet" href="../../contenidos/assets/css/responsive.css">
    
    <!-- Favicon -->
    <link rel="shortcut icon" type="image/png" href="../../assets/img/upload/${data[0].favicon}">
    
</head>

<body>
   
    <!-- crumbs area start -->
    <div class="crumbs-area">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <div data-name="contenidoPrincipal" data-editable class="crumbs-inner">
                    ${contenidoPrincipal}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- crumbs area end -->
    <!-- blog post area start -->
    <div class="blog-post-area bp-with-sidebar flex-left-sidebar pb--100">
        <div class="container">
            <div class="row">
                <!-- sidebar area start -->
                <div class="col-md-4 col-sm-4 col-xs-12">
                    <div class="sidebar--area">
                        <!-- widget search area start -->
                        <div class="widget widget-search">
                            <form action="#">
                                <input type="text" placeholder="Search here">
                                <button type="submit" id="search-submit"><i class="fa fa-search"></i></button>
                            </form>
                        </div>
                        <!-- widget search area end -->
                        <!-- widget recent post area start -->
                      
                        <!-- widget recent post area end -->
                        <!-- widget categoriy area start -->
                        <div class="widget widget-category">
                            <div class="widget-title">
                                <h2>Categories</h2>
                            </div>
                            <div class="widget--category-list">
                                <ul>
                                    <li><a href="#"> Technology <span>(07)</span></a></li>
                                    <li><a href="#">Mobile Apps <span>(10)</span></a></li>
                                    <li><a href="#">Cognitive Science <span>(08)</span></a></li>
                                    <li><a href="#">Artificial Intelligence <span>(27)</span></a></li>
                                    <li><a href="#">Product Updates <span>(03)</span></a></li>
                                </ul>
                            </div>
                        </div>
                        <!-- widget categoriy area end -->
                        <!-- widget archive area start -->
                        <div class="widget widget-archive">
                            <div class="widget-title">
                                <h2>Archive</h2>
                            </div>
                            <div class="widget--archive-list">
                                <ul>
                                    <li><a href="#">Jul 2017 <span>(07)</span></a></li>
                                    <li><a href="#">Jan 2016 <span>(10)</span></a></li>
                                    <li><a href="#">Jul 2015 <span>(08)</span></a></li>
                                    <li><a href="#">Jan 2014 <span>(27)</span></a></li>
                                    <li><a href="#">Jul 2013 <span>(03)</span></a></li>
                                </ul>
                            </div>
                        </div>
                        <!-- widget archive area end -->
                        
                        <!-- widget tags area end -->
                    </div>
                </div>
                <!-- sidebar area end -->
                <!-- blog list area start -->
                <div class="col-md-8 col-sm-8 col-xs-12">
                    <div class="row">
                        <div class="blog-list">
                            <div class="col-md-6 col-sm-12 col-xs-12">
                                <div class="list-item">
                                    <div data-name="contenidoImg" data-editable class="blog-thumbnail">
                                    ${contenidoImg}
                                    </div>
                                    <h2 data-name="contenidoTitulo" data-editable class="blog-title">
                                    ${contenidoTitulo}
                                    </h2>
                                    <div class="blog-meta">
                                        <ul>
                                        <li id="date"></li>
                                        </ul>
                                    </div>
                                    <div data-name="contenidoTexto" data-editable class="blog-summery">
                                    ${contenidoTexto}
                                    </div>
                                    <a href="blog.html" class="read-more">Read More</a>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <!-- pagination area start -->
                    <div class="pagination">
                        <ul>
                            <li><a href="#">OLDER POSTS</a></li>
                            <li><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><span>3</span></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">NEWER POSTS</a></li>
                        </ul>
                    </div>
                    <!-- pagination area end -->
                </div>
                <!-- blog list area end -->
            </div>
        </div>
    </div>
  
    <!-- Scripts -->
    <script src="../../contenidos/assets/js/jquery-3.2.0.min.js"></script>
    <script src="../../contenidos/assets/js/jquery-ui.js"></script>
    <script src="../../contenidos/assets/js/bootstrap.min.js"></script>
    <script src="../../contenidos/assets/js/jquery.slicknav.min.js"></script>
    <script src="../../contenidos/assets/js/owl.carousel.min.js"></script>
    <script src="../../contenidos/assets/js/magnific-popup.min.js"></script>
    <script src="../../contenidos/assets/js/counterup.js"></script>
    <script src="../../contenidos/assets/js/jquery.waypoints.min.js"></script>
    <script src="../../contenidos/assets/js/jquery.mb.YTPlayer.min.js"></script>
    <script src="../../contenidos/assets/js/theme.js"></script>
    
    <script src="../../assets/js/editor.js"></script>
</body>

</html>`;
   }else if (data[0].plantilla=='blog-with-sidebarg') {
    data[0].html= `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <!--- Basic Page Needs  -->
        <meta charset="utf-8">
        <title>${data[0].titulo}</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!-- Mobile Specific Meta  -->
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <!-- CSS -->
        <link rel="stylesheet" href="../../contenidos/assets/css/bootstrap.min.css">
        <link rel="stylesheet" href="../../contenidos/assets/css/jquery-ui.css">
        <link rel="stylesheet" href="../../contenidos/assets/css/font-awesome.min.css">
        <link rel="stylesheet" href="../../contenidos/assets/css/owl.carousel.min.css">
        <link rel="stylesheet" href="../../contenidos/assets/css/slicknav.min.css">
        <link rel="stylesheet" href="../../contenidos/assets/css/magnificpopup.css">
        <link rel="stylesheet" href="../../contenidos/assets/css/jquery.mb.YTPlayer.min.css">
        <link rel="stylesheet" href="../../contenidos/assets/css/typography.css">
        <link rel="stylesheet" href="../../contenidos/assets/css/style.css">
        <link rel="stylesheet" href="../../contenidos/assets/css/responsive.css">
        
        <!-- Favicon -->
        <link rel="shortcut icon" type="image/png" href="../../assets/img/upload/${data[0].favicon}">
        
    </head>
    
    <body>
        <!-- crumbs area start -->
        <div class="crumbs-area">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <div data-name="contenidoPrincipal" data-editable class="crumbs-inner">
                        ${contenidoPrincipal}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- crumbs area end -->
        <!-- blog post area start -->
        <div class="blog-post-area bp-with-sidebar pb--100">
            <div class="container">
                <div class="row">
                    <!-- blog list area start -->
                    <div class="col-md-8 col-sm-8 col-xs-12">
                        <div class="row">
                            <div class="blog-list">
                                <div class="col-md-6 col-sm-12 col-xs-12">
                                    <div  class="list-item">
                                        <div data-name="contenidoImg" data-editable class="blog-thumbnail">
                                        ${contenidoImg}
                                        </div>
                                        <h2 data-name="contenidoTitulo" data-editable class="blog-title">
                                        ${contenidoTitulo}
                                        </h2>
                                        <div class="blog-meta">
                                            <ul>
                                            <li id="date"></li>
                                            </ul>
                                        </div>
                                        <div data-name="contenidoTexto" data-editable class="blog-summery">
                                        ${contenidoTexto}
                                        </div>
                                        <a href="blog.html" class="read-more">Read More</a>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                        <!-- pagination area start -->
                        <div class="pagination">
                            <ul>
                                <li><a href="#">OLDER POSTS</a></li>
                                <li><a href="#">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><span>3</span></li>
                                <li><a href="#">4</a></li>
                                <li><a href="#">NEWER POSTS</a></li>
                            </ul>
                        </div>
                        <!-- pagination area end -->
                    </div>
                    <!-- blog list area end -->
                    <!-- sidebar area start -->
                    <div class="col-md-4 col-sm-4 col-xs-12">
                        <div class="sidebar--area">
                            <!-- widget search area start -->
                            <div class="widget widget-search">
                                <form action="#">
                                    <input type="text" placeholder="Search here">
                                    <button type="submit" id="search-submit"><i class="fa fa-search"></i></button>
                                </form>
                            </div>
                            <!-- widget search area end -->
                            
                            <!-- widget recent post area end -->
                            <!-- widget categoriy area start -->
                            <div class="widget widget-category">
                                <div class="widget-title">
                                    <h2>Categories</h2>
                                </div>
                                <div class="widget--category-list">
                                    <ul>
                                        <li><a href="#"> Technology <span>(07)</span></a></li>
                                        <li><a href="#">Mobile Apps <span>(10)</span></a></li>
                                        <li><a href="#">Cognitive Science <span>(08)</span></a></li>
                                        <li><a href="#">Artificial Intelligence <span>(27)</span></a></li>
                                        <li><a href="#">Product Updates <span>(03)</span></a></li>
                                    </ul>
                                </div>
                            </div>
                            <!-- widget categoriy area end -->
                            <!-- widget archive area start -->
                            <div class="widget widget-archive">
                                <div class="widget-title">
                                    <h2>Archive</h2>
                                </div>
                                <div class="widget--archive-list">
                                    <ul>
                                        <li><a href="#">Jul 2017 <span>(07)</span></a></li>
                                        <li><a href="#">Jan 2016 <span>(10)</span></a></li>
                                        <li><a href="#">Jul 2015 <span>(08)</span></a></li>
                                        <li><a href="#">Jan 2014 <span>(27)</span></a></li>
                                        <li><a href="#">Jul 2013 <span>(03)</span></a></li>
                                    </ul>
                                </div>
                            </div>
                            <!-- widget archive area end -->
                            <!-- widget tags area start -->
                            
                            <!-- widget tags area end -->
                        </div>
                    </div>
                    <!-- sidebar area end -->
                </div>
            </div>
        </div>
        <!-- blog post area end -->
    
    
        <!-- Scripts -->
        <script src="../../contenidos/assets/js/jquery-3.2.0.min.js"></script>
        <script src="../../contenidos/assets/js/jquery-ui.js"></script>
        <script src="../../contenidos/assets/js/bootstrap.min.js"></script>
        <script src="../../contenidos/assets/js/jquery.slicknav.min.js"></script>
        <script src="../../contenidos/assets/js/owl.carousel.min.js"></script>
        <script src="../../contenidos/assets/js/magnific-popup.min.js"></script>
        <script src="../../contenidos/assets/js/counterup.js"></script>
        <script src="../../contenidos/assets/js/jquery.waypoints.min.js"></script>
        <script src="../../contenidos/assets/js/jquery.mb.YTPlayer.min.js"></script>
        <script src="../../contenidos/assets/js/theme.js"></script>
       
    </body>
    
    </html>`;
}
      
        res.send(data[0].html);
    })
    .catch(error=>{
        res.send(error);
    });
});




//Peticion para guardar un nuevo USUARIO
router.post("/", function(req, res){
   
    var p = new contenido({
        titulo: req.body.titulo,
        url:req.body.url,
        idUsuario:req.body.id,
        descripcion:req.body.descripcion,
        visitas:req.body.visitas

            
    });


    p.save()
    .then(obj=>{
        res.send({status:1,mensaje:"contenido agregado con éxito",obj});
        
    })
    .catch(error=>{
        res.send({status:0,mensaje:"error al agregar contenido",obj});
    });

});


//Peticion para actualizar un registro
router.put("/:id",function(req,res){
    contenido.update(
        {_id:req.params.id},
        {
            titulo:req.body.titulo,
            descripcion:req.body.descripcion,
            favicon:req.body.favicon
            
        }
    ).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });//El primero son los filtros, el segundo son los campos
});

//Peticion para actualizar un registro
router.put("/contenido/:id",function(req,res){
    contenido.update(
        {_id:req.params.id},
        {

            contenido:{
                contenidoPrincipal:req.body.contenidoPrincipal,
                contenidoImg:req.body.contenidoImg,
                contenidoTitulo:req.body.contenidoTitulo,
                contenidoTexto:req.body.contenidoTexto
            }
            
        }
    ).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });//El primero son los filtros, el segundo son los campos
});


//Peticion para guardar un nuevo CONTENIDO
router.post("/contenido/:plantilla", function(req, res){
    var p = new contenido({
        titulo:req.params.plantilla,
        plantilla:req.params.plantilla,
        url:'http://localhost:3333/dashboard/editar/',
        idUsuario:req.session.user,
        descripcion:'',
        visitas:'',
        contenido:{
            contenidoPrincipal:'undefined',
            contenidoImg:'undefined',
            contenidoTitulo:'undefined',
            contenidoTexto:'undefined'
        },
        html:""
        

            
    });
    p.save()
    .then(obj=>{
        res.send({status:1,mensaje:"contenido agregado con éxito",obj});
        
    })
    .catch(error=>{
        res.send({status:0,mensaje:"error al agregar contenido",obj});
    });

});

router.delete('/:id', function (req, res) {
    contenido.remove({
        _id: req.params.id
    }, function (err, user) {
        if (err) return res.send(err);
        res.json({ message: 'Deleted' });
    });

   });

module.exports = router;