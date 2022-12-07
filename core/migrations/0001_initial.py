# Generated by Django 4.1.4 on 2022-12-07 15:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('idProducto', models.AutoField(primary_key=True, serialize=False, verbose_name='Id')),
                ('nombreProducto', models.CharField(max_length=50, verbose_name='Nombre del producto')),
                ('Comentarios', models.CharField(max_length=200, verbose_name='Comentarios')),
                ('descripcionProducto', models.CharField(max_length=100, verbose_name='Descripcion del producto')),
                ('categoria', models.PositiveIntegerField(default=1, verbose_name='Categoria')),
                ('estatus', models.PositiveIntegerField(default=1, verbose_name='Estatus')),
            ],
            options={
                'verbose_name': 'Producto',
                'verbose_name_plural': 'Productos',
                'ordering': ['idProducto'],
            },
        ),
    ]
