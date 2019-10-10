window.addEventListener('load', function() {
    var editor;

});
ContentTools.StylePalette.add([
    new ContentTools.Style('Author', 'author', ['p'])
]);
editor = ContentTools.EditorApp.get();
editor.init('*[data-editable]', 'data-name');
editor.addEventListener('saved', function (ev) {
    var name, payload, regions, xhr;

    // Check that something changed
    regions = ev.detail().regions;
    if (Object.keys(regions).length == 0) {
        return;
    }

    // Set the editor as busy while we save our changes
    this.busy(true);
   
   // Collect the contents of each region into a FormData instance
   payload = new FormData();
   payload.append('usuario', document.querySelector('meta[name=usuario]').getAttribute('content') );
   //payload.append('regions', JSON.stringify(regions));
console.log(regions.contenidoPrincipal);
    // Send the update content to the server to be saved
        var parametros = 'contenidoPrincipal='+regions.contenidoPrincipal+'&contenidoImg='+regions.contenidoImg+'&contenidoTitulo='+regions.contenidoTitulo+'&contenidoTexto='+regions.contenidoTexto;
        console.log(parametros);
        console.log(payload.getAll('usuario'));
        
        
$.ajax({
    url:"/dashboard/contenido/"+payload.getAll('usuario'),
    method:"PUT",
    data:parametros,
    dataType:"json",
    success:function(res){
        console.log(res);
        editor.busy(false);
        new ContentTools.FlashUI('ok');
    },
    error:function(error){
        console.error(error);
        new ContentTools.FlashUI('no');
    }
});
});

function CargarDatos() {
    var id = $_POST('id');
    $.ajax({
        url:"/dashboard/"+id,
        method:"GET",
        data:parametros,
        dataType:"json",
        success:function(res){
            console.log(res);
            document.getElementById('contenidoPrincipal').innerHTML = res.contenido.contenidoPrincipal;
        },
        error:function(error){
            console.error(error);
            
        }
    });
}
n =  new Date();
//Año
y = n.getFullYear();
//Mes
m = n.getMonth() + 1;
//Día
d = n.getDate();

//Lo ordenas a gusto.
document.getElementById("date").innerHTML = d + "/" + m + "/" + y;



