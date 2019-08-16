var Inputs = [
    {id:'correo', valido:false},
    {id:'contrasena', valido:false}
];

function registrarUsuario(){
    
    let persona = validarInputs();
    if (persona==null || persona == undefined){
        return;}
    
    console.log(persona);
}

function validarInputVacio(id){
    let resultado = (document.getElementById(id).value=="")?false:true;
    marcarInput(id,resultado);
    return resultado; 
    
}



function marcarInput(id, valido){
    if (valido){
        document.getElementById(id).classList.remove('is-invalid');
        document.getElementById(id).classList.add('is-valid');
    }else{
        document.getElementById(id).classList.remove('is-valid');
        document.getElementById(id).classList.add('is-invalid');
    }
}

function validarInputs(){
    for (let i = 0; i<Inputs.length; i++){
        Inputs[i].valido = validarInputVacio(Inputs[i].id);
    }
    
    
    for (let i = 0; i<Inputs.length; i++){
        if (!Inputs[i].valido){
           
            return;
        } 
          
    }        
   
    
    
    let persona = {
        correo: document.getElementById('correo').value,
        contrasena: document.getElementById('contrasena').value
        
    }

    return persona;
}