from django.views.generic import TemplateView
from django.http import JsonResponse
from .models import Producto
from django.contrib.auth.mixins import LoginRequiredMixin

class HomeView(LoginRequiredMixin,TemplateView):
    template_name = 'pages/index.html'

    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Inicio | Crud'
        return context

    def get(self, request, *args, **kwargs):

        is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'

        productos = list(Producto.objects.filter(estatus=1).values())

        productos_inactivos = list(Producto.objects.filter(estatus=2).values())

        if is_ajax:
            return JsonResponse({'productos': productos, 'productos_inactivos': productos_inactivos}, status=200, safe=False)
        
        return self.render_to_response(self.get_context_data())

def CrearProducto(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest' and request.method == 'POST':

        nombre = request.POST.get('nombreProducto')
        comentarios = request.POST.get('Comentarios')
        descripcion = request.POST.get('descripcionProducto')
        categoria = request.POST.get('categoria')
        estatus = request.POST.get('estatus')

        producto = Producto()
        producto.nombreProducto = nombre
        producto.Comentarios = comentarios
        producto.descripcionProducto = descripcion
        producto.categoria = categoria
        producto.estatus = estatus
        producto.save()
        

        return JsonResponse({'message': 'Producto creado correctamente'}, status=200)

def EditarProducto(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest' and request.method == 'POST':

        id = request.POST.get('idProducto')
        nombre = request.POST.get('nombreProducto')
        comentarios = request.POST.get('Comentarios')
        descripcion = request.POST.get('descripcionProducto')
        categoria = request.POST.get('categoria')
        estatus = request.POST.get('estatus')

        producto = Producto.objects.get(idProducto=id)
        producto.nombreProducto = nombre
        producto.Comentarios = comentarios
        producto.descripcionProducto = descripcion
        producto.categoria = categoria
        producto.estatus = estatus
        producto.save()

        return JsonResponse({'message': 'Producto editado correctamente'}, status=200)

def EliminarProducto(request):
    
        if request.headers.get('x-requested-with') == 'XMLHttpRequest' and request.method == 'POST':
    
            id = request.POST.get('idProducto')
    
            producto = Producto.objects.get(idProducto=id)
            producto.estatus = 2
            producto.save()
    
            return JsonResponse({'message': 'Producto eliminado correctamente'}, status=200)

def RecuperarProducto(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest' and request.method == 'POST':

        id = request.POST.get('idProducto')

        producto = Producto.objects.get(idProducto=id)
        producto.estatus = 1
        producto.save()

        return JsonResponse({'message': 'Producto recuperado correctamente'}, status=200)
