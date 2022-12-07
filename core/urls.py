from django.urls import path
from .views import HomeView, CrearProducto, EditarProducto, RecuperarProducto, EliminarProducto

app_name = 'core'

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('crear-producto/', CrearProducto, name='crear-producto'),
    path('editar-producto/', EditarProducto, name='editar-producto'),
    path('eliminar-producto/', EliminarProducto, name='eliminar-producto'),
    path('recuperar-producto/', RecuperarProducto, name='recuperar-producto')
]