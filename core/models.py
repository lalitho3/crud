from django.db import models

class Producto(models.Model):
    idProducto = models.AutoField('Id', primary_key=True)
    nombreProducto = models.CharField('Nombre del producto', max_length=50)
    Comentarios = models.CharField('Comentarios', max_length=200)
    descripcionProducto = models.CharField('Descripcion del producto', max_length=100)
    categoria = models.PositiveIntegerField('Categoria', default=1)
    estatus = models.PositiveIntegerField('Estatus', default=1)

    class Meta:
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'
        ordering = ['idProducto']

    def __str__(self):
        return self.nombreProducto
