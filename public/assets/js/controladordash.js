

function CargarInformacion(){
   
    $.ajax({
        url:"/login/",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log(res);
            
            document.getElementById('nombre').innerHTML= `<p>${res[0].nombreCompleto}</p>`;
            document.getElementById('modal-2-content').innerHTML = `
                <p>${res[0].nombreCompleto}      
            `;
            
            if (res[0].perfilImg==undefined) {
                document.getElementById('imgP').innerHTML = `<img id="imgP" src="https://pages.theascent.com/hubfs/add%20authorized%20user.jpg">`;
            document.getElementById('avatar').innerHTML = `<img id="avatar" style="float: left;" src="https://pages.theascent.com/hubfs/add%20authorized%20user.jpg">
            <span>Cuenta</span>`;
            }else{
                document.getElementById('imgP').innerHTML = `<img id="imgP" src="./assets/img/upload/${res[0].perfilImg}">`;
            document.getElementById('avatar').innerHTML = `<img id="avatar" style="float: left;" src="./assets/img/upload/${res[0].perfilImg}">
            <span>Cuenta</span>`;
            }
            
        },
        error:function(error){
            console.error('error');
            window.location.href = "/login.html";
        }
    });
    
}

function abrirPost(id) {
    window.open('http://localhost:3333/dashboard/editar/'+id, '_blank');
}

function actualizarUsuario(){
    //let parametros = `usuario=${$('#usuario').val()}&password=${$('#password').val()}`;
    let parametros = $('#formActualizar').serialize();
    let idUsuario = document.getElementById('idUsuario').value
    //Retorna el URLEncoded utilizando el name de las etiquetas
    /*var f = new FormData();
    f.append('usuario',document.getElementById('usuario').value);
    f.append('password',document.getElementById('password').value);*/
    console.log(parametros);
    console.log(idUsuario);
    $.ajax({
        url:"login/"+idUsuario,
        method:"PUT", //GET
        data:parametros, //URLEncoded
        dataType:'json', //html,text,xml,json (por defecto es html)
        success:function(res){
            console.log('Respuesta del servidor: ');
            console.log(res);
            CargarInformacion();
            
        },
        error:function(error){
            console.error(error);
        }
    });
}
function actualizarcontenido(idcontenido){
    let parametros = `titulo=${$('#titulomodal').val()}&descripcion=${$('#descripcionmodal').val()}&favicon=${$('#favicon').val()}`;
   
    //Retorna el URLEncoded utilizando el name de las etiquetas
    /*var f = new FormData();
    f.append('usuario',document.getElementById('usuario').value);
    f.append('password',document.getElementById('password').value);*/
    console.log(parametros);
   
    $.ajax({
        url:"dashboard/"+idcontenido,
        method:"PUT", //GET
        data:parametros, //URLEncoded
        dataType:'json', //html,text,xml,json (por defecto es html)
        success:function(res){
            console.log('Respuesta del servidor: ');
            console.log(res);
            CargarTableros();
            
            
            $( "#closemodal" ).click();
           
        },
        error:function(error){
            console.error(error);
        }
    });
}

function borrarcontenido(idcontenido){
    
   
    $.ajax({
        url:"dashboard/"+idcontenido,
        method:"DELETE", //GET
        dataType:'json', //html,text,xml,json (por defecto es html)
        success:function(res){
            console.log('Respuesta del servidor: ');
            console.log(res);
            CargarTableros();
            
            
            $( "#closemodal" ).click();
           
        },
        error:function(error){
            console.error(error);
        }
    });
}
function subirFavicon(idcontenido){
    
   
    //Retorna el URLEncoded utilizando el name de las etiquetas
    var f = new FormData();
    f.append('file',$( '#upload' )[0].files[0]);
   
    
    
    $.ajax({
      url: '/subir',
      data: f,
      processData: false,
      contentType: false,
      type: 'POST',
      success:function(res){
        console.log(res);
        //alert(res.filename);
        $('#favicon').val(res.filename);
        //document.getElementById('favicon').value(res.filename);
       
    },
    error:function(error){
        console.error(error);
    }
    });
   
}

function subirImgPerfil(idcontenido){
    
   
    //Retorna el URLEncoded utilizando el name de las etiquetas
    var f = new FormData();
    f.append('file',$( '#imgPerfil' )[0].files[0]);
   
    
    
    $.ajax({
      url: '/subir',
      data: f,
      processData: false,
      contentType: false,
      type: 'POST',
      success:function(res){
        console.log(res);
        //alert(res.filename);
       // $('#perfilImg').val(res.filename);
        document.getElementById('perfilImg').value = res.filename;
       
        //document.getElementById('favicon').value(res.filename);
       
    },
    error:function(error){
        console.error(error);
    }
    });
   
}

function CargarTableros(){
            document.getElementById('tableros').innerHTML = '';
            $.ajax({
                url:"/dashboard/",
                method:"GET",
                dataType:"json",
                success:function(res){
                    console.log(res);
                    
                   for (let index = 0; index < res.length; index++) {
                        let color=randomColor({luminosity: 'dark', count: 1});
                       
                        document.getElementById('tableros').innerHTML += `
                        <div class="dash" >
                        <div class="product-name">
                            <span>${res[index].titulo}</span>
                            <h6>${res[index].url}</h6>
                        </div>
                        <div class="overlay" style="background-color:${color}">
                        <div class="detail" onclick="abrirModal('${res[index]._id}') " style="margin-bottom: 30px;">
                            <span>Detalles</span>
                            
                        </div>
                        <div  class="pencil">
                        <a  onclick="abrirPost('${res[index]._id}')">
                            <span class="fa fa-pencil" style="color:white"></span>
                            <span style="color:white">EDITAR</span>
                            </a>
                            </div>
                    </div>
                   </div>
                            `;
        }
                    document.getElementById('tableros').innerHTML += `<div class="dash ">
                           <a href="plantillas.html"  rel="noopener noreferrer">
                           <i class="fas fa-plus" style="font-size:70px"></i>
                           
                           
                        </a>
                        <h2>Crear Nuevo</h2>
                       </div>`;
                       
                },
                error:function(error){
                    console.error(error);
                }
            });
            
}CargarTableros();

function AbrirContenido(id) {
    
    
            window.location.href = '/dashboard/editar/'+id;
     
}

function abrirModal(codigo){
    document.getElementById('modal-1-content').innerHTML = '';

    $.ajax({
        url:"dashboard/"+codigo,
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log(res);
                   
                   document.getElementById('modal-1-content').innerHTML = `
                   <header class="modal__header">
            <h2 class="modal__title" id="modal-1-title">
              Post
            </h2>
            <button class="modal__close" aria-label="Close modal" data-micromodal-close id="closemodal"></button>
          </header>
          <main class="modal__content container" >
                    <div class="row">
                    <div class="col-lg-4 nombre-post">
                    <label for="titulo">Titulo </label>
                    <input class="form-control"type="text" name="titulo" id="titulomodal">
                  
                        <hr>
                        
                        
                    </div>
                    <div class="col-lg-8 de" >
                    <label for="descripcionmodal">Descripcion: </label>
                    <textarea class="form-control"  id="descripcionmodal" cols="30" rows="5"></textarea>
                    
                    </div>
                  </div>
                  <div class="row url" style="margin-top: 30px;">
                    <div class="col-lg-12">
                    <div style="float: right;
                    width: 105px;
                    margin-right: 15rem;">
                        <img class="img-responsive img-fluid" src="../../assets/img/upload/${res[0].favicon}" alt="">
                    </div>
                    <div class="custom-file-upload ">
                    <input type="hidden" id="favicon">
                    <label for="file">Favicon: </label>
                    <input type="file"  id="upload" name="myfiles[]" multiple onchange="subirFavicon('${res[0]._id}')" />
                </div>
                   
                      <h4>URL:</h4>
                      <br>
                      <a href="http://localhost:3333/dashboard/contenido/${res[0]._id}">http://localhost:3333/dashboard/contenido/${res[0]._id}</a>
                     
                    </div>
                    <br>
                    
                  </div>
                  </main>
          <footer class="modal__footer">
            <button class="modal__btn modal__btn-primary" onclick="actualizarcontenido('${res[0]._id}')">Actualizar </button>
            <button class="modal__btn modal__btn-primary" onclick="borrarcontenido('${res[0]._id}')">Borrar </button>
            
          </footer>
                        `;
                        document.getElementById('titulomodal').value= res[0].titulo;
                        document.getElementById('descripcionmodal').value= res[0].descripcion;

                
                
        },
        error:function(error){
            console.error(error);
        }
    });
           
              

    MicroModal.show('modal-1');
}

function abrirModalPerfil(){
    document.getElementById('modal-2-content').innerHTML = '';

    $.ajax({
        url:"login/",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log(res);
                   
                   document.getElementById("modal-2-content").innerHTML = `
                                    
<div class="container bootstrap snippet">
<div class="row">
  <div class="col-12" style="margin-bottom: 20px"><h1> ${res[0].nombreCompleto}</h1></div>
 
</div>
<div class="row">
  <div class="col-sm-3">
          

  <div class="text-center">
  <div id="avatar2">
  <img src="./assets/img/upload/${res[0].perfilImg}" class="avatar img-circle img-thumbnail" alt="avatar">
  </div>
   
    <div style="position: relative;overflow: hidden;margin-top: 5px" class="file btn btn-lg btn-primary">
      Cambiar Imagen Perfil
      <input style=" position: absolute;font-size: 50px;opacity: 0;right: 0;top: 0;" type="file" name="file" id="imgPerfil" onchange="subirImgPerfil('${res[0]._id}')"/>
      
    </div>
  </div></hr><br>

           
     
      
      
      <ul class="list-group">
        <li class="list-group-item text-muted">Actividad</i></li>
        <li class="list-group-item text-right"><span class="pull-left"><strong>Likes</strong></span> 13</li>
        <li class="list-group-item text-right"><span class="pull-left"><strong>Posts</strong></span> 37</li>
        <li class="list-group-item text-right"><span class="pull-left"><strong>Seguidores</strong></span> 78</li>
      </ul> 
           
      
      
    </div>
  <div class="col-sm-9">
        <h3>Informacion Personal</h3>

          
      <div class="tab-content">
        <div class="tab-pane active" id="home">
            <hr>
              <form class="form" action="##" method="post" id="formActualizar">
              <div class="form-group" style="display:none">
                  
                 
                      <div class="col-xs-6">
                          <label for="nombreCompleto"><h4>Nombre Completo</h4></label>
                          <input type="text" class="form-control" name="perfilImg" id="perfilImg" placeholder="" title="enter your first name if any.">
                      </div>
                  </div>
                  <div class="form-group">
                  
                  <input type="hidden" id="idUsuario">
                      <div class="col-xs-6">
                          <label for="nombreCompleto"><h4>Nombre Completo</h4></label>
                          <input type="text" class="form-control" name="nombreCompleto" id="nombreCompleto" placeholder="" title="enter your first name if any.">
                      </div>
                  </div>

                  <div class="form-group">
                      
                      <div class="col-xs-6">
                        <label for="nombreUsuario"><h4>Usuario</h4></label>
                          <input type="text" class="form-control" name="nombreUsuario" id="nombreUsuario" placeholder="" title="enter your last name if any.">
                      </div>
                  </div>
      
                  <div class="form-group">
                      
                      <div class="col-xs-6">
                          <label for="telefono"><h4>Telefono</h4></label>
                          <input type="text" class="form-control" name="telefono" id="telefono" placeholder="" title="enter your telefono number if any.">
                      </div>
                  </div>
      
                  
                  <div class="form-group">
                      
                      <div class="col-xs-6">
                          <label for="correo"><h4>Correo</h4></label>
                          <input type="correo" class="form-control" name="correo" id="correo"  title="enter your email.">
                      </div>
                  </div>
                 
                  <div class="form-group">
                      
                      <div class="col-xs-6">
                          <label for="contraseña"><h4>Contraseña</h4></label>
                          <input type="contraseña" class="form-control" name="contrasena" id="contrasena"  title="enter your contraseña.">
                      </div>
                  </div>
                  <div class="form-group">
                      
                      <div class="col-xs-6">
                        <label for="contraseña2"><h4>Verificar</h4></label>
                          <input type="contraseña" class="form-control" name="contrasena2" id="contrasena2"  title="enter your contraseña2.">
                      </div>
                  </div>
                  <div class="form-group">
                       <div class="col-xs-12">
                            <br>
                            <button class="btn btn-lg btn-success" type="button" onclick="actualizarUsuario()"> GUARDAR</button>
                             <button class="btn btn-lg" type="reset"> RESET</button>
                        </div>
                  </div>
            </form>
          
          <hr>
          
         </div>
         
           
          </div>
      </div>

    </div>
</div>
                        `;
                        document.getElementById('nombreCompleto').value = res[0].nombreCompleto;
                        document.getElementById('correo').value = res[0].correo;
                        document.getElementById('idUsuario').value = res[0]._id;
                        document.getElementById('perfilImg').value = res[0].perfilImg;
                        if (res[0].perfilImg==undefined) {
                            
                        document.getElementById('avatar2').innerHTML = `<img  class="avatar img-circle img-thumbnail" alt="avatar" src="https://pages.theascent.com/hubfs/add%20authorized%20user.jpg">`;
                        }else{
                            document.getElementById('avatar2').innerHTML = `<img src="./assets/img/upload/${res[0].perfilImg}" class="avatar img-circle img-thumbnail" alt="avatar">`;
                       
                        
                        }
              

                
                
        },
        error:function(error){
            console.error(error);
        }
    });
           
              

    MicroModal.show('modal-2');
}