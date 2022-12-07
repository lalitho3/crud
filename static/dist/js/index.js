function dataTable(){
    $('#main_table').DataTable({
        "responsive": true,
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por página",
            "zeroRecords": "No hay registros disponibles",
            "info": "Mostrando página _PAGE_ de _PAGES_",
            "infoEmpty": "No hay registros disponibles",
            "infoFiltered": "(filtrado de _MAX_ registros totales)",
            "search": "Buscar:",
            "paginate": {
                "first":      "Primero",
                "last":       "Último",
                "next":       "Siguiente",
                "previous":   "Anterior"
            },
        }
    })

    $('#inactive_table').DataTable({
        "responsive": true,
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por página",
            "zeroRecords": "No hay registros disponibles",
            "info": "Mostrando página _PAGE_ de _PAGES_",
            "infoEmpty": "No hay registros disponibles",
            "infoFiltered": "(filtrado de _MAX_ registros totales)",
            "search": "Buscar:",
            "paginate": {
                "first":      "Primero",
                "last":       "Último",
                "next":       "Siguiente",
                "previous":   "Anterior"
            },
        }
    })
}

function obtenerProductos() {
    $.ajax({
        url: '/',
        type: 'GET',
        dataType: 'json',
        headers:{
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest', //Necessary to work with request.is_ajax()
        },
        success: function ({productos, productos_inactivos}) {
            $('#main_table').DataTable().clear().draw();
            for (var i = 0; i < productos.length; i++) {
                $('#main_table').DataTable().row.add([
                    productos[i].idProducto,
                    productos[i].nombreProducto,
                    productos[i].Comentarios,
                    productos[i].descripcionProducto,
                    productos[i].categoria,
                    productos[i].estatus,
                    `
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-primary" id="editar">
                                Editar
                            </button>
                            <a type="button" class="btn btn-danger" id="eliminar">
                                <i class="fas fa-trash-alt"></i>
                            </a>
                    </div>
                    `
                ]).draw();
            }

            $('#inactive_table').DataTable().clear().draw();
            for (var i = 0; i < productos_inactivos.length; i++) {
                $('#inactive_table').DataTable().row.add([
                    productos_inactivos[i].idProducto,
                    productos_inactivos[i].nombreProducto,
                    productos_inactivos[i].Comentarios,
                    productos_inactivos[i].categoria,
                    productos_inactivos[i].estatus,
                    `
                        <button type="button" class="btn btn-success" id="activar">
                            Activar
                        </button>

                    `
                ]).draw();
            }
        },
        error: function (data) {
            console.log(data)
        }

    })
}

$('#add').on('click', function(){
    $('#EjemploModal').modal('show');
    $('#EjemploModal').find('h5').text('Crear nuevo Producto');
    $('#nombreProducto').val('');
    $('#comentariosProducto').val('');
    $('#descripcionProducto').val('');
    $('#categoriaProducto').val('');
    $('#estatusProducto').val('');

    })





function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');


function crearProducto(){
    $.ajax({
        url: '/crear-producto/',
        type: 'POST',
        dataType: 'json',
        headers:{
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': csrftoken
        },
        data: {
            'nombreProducto': $('#nombreProducto').val(),
            'Comentarios': $('#comentariosProducto').val(),
            'descripcionProducto': $('#descripcionProducto').val(),
            'categoria': $('#categoriaProducto').val(),
            'estatus': $('#estatusProducto').val(),
        },
        success: function (data) {
            $('#EjemploModal').modal('hide');
            $('#crear_form').trigger('reset');
            obtenerProductos();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: data.message,
                showConfirmButton: false,
                timer: 3000
            })
        },
        error: function (data) {
            console.log(data)
        }

    })
}

$('#crear_form').on('submit', function(e){
    e.preventDefault();
    crearProducto();
})



$('#main_table').on('click', 'tbody tr button', function(){
    $('#ActualizarModal').modal('show');
    $('#ActualizarModal').find('h5').text('Editar Producto');
    const data = $('#main_table').DataTable().row($(this).parents('tr')).data();
    $('#idProducto').val(data[0]);
    $('#nombreProductoAc').val(data[1]);
    $('#comentariosProductoAc').val(data[2]);
    $('#descripcionProductoAc').val(data[3]);
    $('#categoriaProductoAc').val(data[4]);
    $('#estatusProductoAc').val(data[5]);
});

function actualizarProductos(){
    $.ajax({
        url: '/editar-producto/',
        type: 'POST',
        dataType: 'json',
        headers:{
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': csrftoken
        },
        data: {
            'idProducto': $('#idProducto').val(),
            'nombreProducto': $('#nombreProductoAc').val(),
            'Comentarios': $('#comentariosProductoAc').val(),
            'descripcionProducto': $('#descripcionProductoAc').val(),
            'categoria': $('#categoriaProductoAc').val(),
            'estatus': $('#estatusProductoAc').val(),
        },
        success: function (data) {
            $('#ActualizarModal').modal('hide');
            $('#actualizar_form').trigger('reset');
            obtenerProductos();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: data.message,
                showConfirmButton: false,
                timer: 3000
            })
        },
        error: function (data) {
            console.log(data)
        }

    })
}

$('#main_table').on('click', 'tbody tr a', function(){
    const data = $('#main_table').DataTable().row($(this).parents('tr')).data();
    Swal.fire({
        title: '¿Estas seguro de eliminar este producto?',
        text: "Puedes revertir esta acción activando el producto de nuevo",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: '/eliminar-producto/',
                type: 'POST',
                dataType: 'json',
                headers:{
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken': csrftoken
                },
                data: {
                    'idProducto': data[0]
                },
                success: function (data) {
                    obtenerProductos();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: data.message,
                        showConfirmButton: false,
                        timer: 3000
                    })
                },
                error: function (data) {
                    console.log(data)
                }
    
            })
        }
    })
    
});

$('#inactive_table').on('click', 'tbody tr button', function(){
    const data = $('#inactive_table').DataTable().row($(this).parents('tr')).data();
    Swal.fire({
        title: '¿Estas seguro de activar este producto?',
        text: "No podras revertir esta accion",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, activar!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: '/recuperar-producto/',
                type: 'POST',
                dataType: 'json',
                headers:{
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken': csrftoken
                },
                data: {
                    'idProducto': data[0],
                },
                success: function (data) {
                    obtenerProductos();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: data.message,
                        showConfirmButton: false,
                        timer: 3000
                    })
                },
                error: function (data) {
                    console.log(data)
                }

            })
        }
    })

});

$('#actualizar_form').on('submit', function(e){
    e.preventDefault();
    actualizarProductos();
})

$(document).ready(function(){
    dataTable();
    obtenerProductos();
})