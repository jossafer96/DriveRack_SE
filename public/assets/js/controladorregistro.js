var Inputs = [
    {id:'nombre', valido:false},
	{id:'correo', valido:false},
	{id:'contrasena', valido:false},
	{id:'contrasenarep', valido:false}
	
];

function registrarUsuario(){
    
    let persona = validarInputs();
    if (persona==null || persona == undefined){
        return;}
    
	console.log(persona);
	location.href="http://localhost:3333/Dashboard.html";
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
        document.getElementById(id).innerHTML='';
	document.getElementById(id).innerHTML='';
    }
}

function marcarInputContrasena(){
	document.getElementById("contrasena").innerHTML='';
	document.getElementById("contrasenarep").innerHTML='';
        document.getElementById("contrasena").classList.remove('is-valid');
		document.getElementById("contrasena").classList.add('is-invalid');
		document.getElementById("contrasenarep").classList.remove('is-valid');
		document.getElementById("contrasenarep").classList.add('is-invalid');
    
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
	let contra1 = document.getElementById('contrasena').value;
	let contra2 = document.getElementById('contrasenarep').value;
	if (contra1==contra2) {
		let generoInput = document.querySelector('input[type="radio"][name="genero"]:checked');
	
    let persona = {
		nombre: document.getElementById('nombre').value,
		correo: document.getElementById('correo').value,
		contrasena:(contra1==contra2)?document.getElementById('contrasena').value:"" ,
        genero:  (generoInput==null)?"":generoInput.value
        
    }

    return persona;
	}else{
		marcarInputContrasena();
	}
	
}