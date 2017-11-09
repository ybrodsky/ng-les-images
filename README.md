`
  imports: [
  	...
    LesImageModule.forRoot({
    	api: 'image api url',
    	imageSrc: 'lambda url'
  	}),
  ],
`

`<les-image (onSelected)="onSelected($event)"></les-image>`

