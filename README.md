```
  imports: [
  	...
    LesImageModule.forRoot({
    	api: 'image api url',
    	aws: 'lambda url',
      bucket: 'bucket por defecto'
  	}),
  ],
```

onSelected es la funcion donde caen las imagenes que se seleccionan

```<les-image (onSelected)="onSelected($event)" [btnClass]="'btn btn-primary'"></les-image>```

item para mostrar las imagenes seleccionadas

```
<div class="row">
	<div *ngFor="let image of images" class="col-md-3 mb-2">
		<les-image-item [image]="image" [containerClass]="'les-image-item'"></les-image-item>
	</div>
</div>
```