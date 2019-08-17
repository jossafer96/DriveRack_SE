var Tableros = [];
(()=>{
 
  let textosDePrueba=[
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
      "Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
      "Quaerat quod qui molestiae sequi, sint aliquam omnis quos voluptas?",
      "Non impedit illum eligendi voluptas. Delectus nisi neque aspernatur asperiores.",
      "Ducimus, repellendus voluptate quo veritatis tempora recusandae dolorem optio illum."
  ]
 
  
  let contador = 1;
  
      for (let j=0;j<10;j++){//Generar 10 apps por categoria
          let Tablero = {
              codigo:contador,
              nombre:"Tablero "+contador,
              url:"www."+contador+".com",
              descripcion:textosDePrueba[Math.floor(Math.random() * (5 - 1))],
              icono:"",
              Vistas:1000,
              desarrollador:`Desarrollador ${(j+1)*(j+1)}`

          };
          contador++;
          Tableros.push(Tablero);
      }
  console.log(Tableros);
  CargarTableros();
})();

function CargarTableros(){
            document.getElementById('tableros').innerHTML = '';
            for (let index = 0; index < Tableros.length; index++) {
                let color=randomColor({luminosity: 'dark', count: 1});
               
                document.getElementById('tableros').innerHTML += `
                <div class="dash" >
                <div class="product-name">
                    <span>${Tableros[index].nombre}</span>
                    <h6>${Tableros[index].url}</h6>
                </div>
                <div class="overlay" style="background-color:${color}">
                <div class="detail" onclick="abrirModal(${Tableros[index].codigo})">
                    <span>Detalles</span>
                    
                </div>
                <div class="pencil">
                <a  href="http://localhost:3333/editor.html">
                    <span class="fa fa-pencil" style="color:white"></span>
                    </a>
                    </div>
            </div>
           </div>
                    `;
}
            document.getElementById('tableros').innerHTML += `<div class="dash ">
                   <a href="editor.html"  rel="noopener noreferrer">
                   <i class="fas fa-plus" style="font-size:70px"></i>
                   
                   
                </a>
                <h2>Crear Nuevo</h2>
               </div>`;
}
function abrirModal(codigo){
    document.getElementById('modal-1-content').innerHTML = '';
            for (let index = 0; index < Tableros.length; index++) {
                if (codigo==Tableros[index].codigo) {
                    document.getElementById('modal-1-content').innerHTML = `
                    <div class="row">
                    <div class="col-lg-4 nombre-post">
                    ${Tableros[index].nombre}
                        <hr>
                        <div class="vistas text-muted">
                          <i class="far fa-eye"> </i>
                          Visitas: ${Tableros[index].Vistas}
                          <br>
                          <i class="fas fa-weight-hanging"> </i>
                          Tamano: 134kb
                        </div>
                        
                    </div>
                    <div class="col-lg-8 de" >
                    ${Tableros[index].descripcion}
                    </div>
                  </div>
                  <div class="row url" style="margin-top: 30px;">
                    <div class="col-lg-12">
                      <h6>URL:</h6>
                      <br>
                      <a href="#">${Tableros[index].url}</a>
                     
                    </div>
                    <br>
                  </div>
                        `;
                }
              
}
    MicroModal.show('modal-1');
}