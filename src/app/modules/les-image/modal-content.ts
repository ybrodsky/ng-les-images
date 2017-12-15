import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { ImageService } from './les-image.service';

@Component({
  selector: 'ngbd-modal-content',
  styles: [`
  	a, .image, button {cursor: pointer}
  	.image-selected {
  		border: 5px solid rgb(66, 133, 244)
  	}
  	.image-selected .image-icon {
  		display: inherit
  	}
  	.image-icon {
  		position: absolute;
  		top: 20%;
  		left: 20%;
  		color: rgb(66, 133, 244);
  		display: none
  	}
	`],
  templateUrl: './les-image.component.html'
})
export class NgbdModalContent {
	@Output() onDataSubmitted = new EventEmitter<any>();
  @ViewChild('t') t;

  customStyle = {clearButton: {"display": "none"}};
  selectedImages: any = {}; //imagenes que se seleccionaron
  tempImages: Array<any> = []; //imagenes temporales que aun no subidos a aws
  images: Array<any> = []; //imagenes del listado que paginamos
  total: number = 0; //cantidad de imagenes totales
  page: number = 1; //paginas
  perPage: number = 12;

  Math: any = Math;
  params: any = { //parametros del filtro
  	tags: '',
  	all: true,
    bucket: 'les-images-main'
  }
  baseURL: string;
  imageUploadURL: string;
  apiURL: string;

  constructor(public activeModal: NgbActiveModal, private imageService: ImageService) {
  	this.baseURL = imageService.getImageBaseURL();
    this.apiURL = imageService.getApiBaseURL();
    this.imageUploadURL = imageService.getApiURL() + '/upload';
  }

  onUploadFinished(data: any) {
    let response = JSON.parse(data.serverResponse._body);

    this.tempImages.push({
      filename: response.filename,
      url: this.apiURL + 'tmp/' + response.filename,
      tags: [],
      bucket: this.params.bucket || 'les-images-main'
    });
  }

  onRemoved(data: any) {
    let name = JSON.parse(data.serverResponse._body).filename;

    let index = this.tempImages.findIndex((item) => {
      return item.filename === name;
    });

    this.tempImages.splice(index, 1);
  }

  getImageURL(image): string {
    return `${this.baseURL}r/${image.bucket}/200x200/${image.name}`;
  }

  isImageSelected(image) {
  	if(this.selectedImages[image.name]) return true;

  	return false;
  }

  selectImage(image) {
  	if(this.isImageSelected(image)) {
  		delete this.selectedImages[image.name];
  		return;
  	}

  	this.selectedImages[image.name] = image;
  }

  onSubmit() {
    this.imageService.save(this.tempImages).then((response) => {
      let uploadedImages = JSON.parse(response._body);

      uploadedImages.forEach(image => {
        this.selectImage(image);
        this.images.unshift(image);
        this.tempImages = [];
      });

      this.t.select('importar');
    });
  }

  search(page) {
  	this.page = page;

  	let query: URLSearchParams = new URLSearchParams();
    let where: any = {};
  	query.set('limit', String(this.perPage));
  	query.set('skip', String(this.perPage * (page - 1)));

  	if(this.params.tags) {
      where.tags = {'$all': this.params.tags.split(',')};
  	}

    if(this.params.bucket) {
      where.bucket = this.params.bucket;
    }

    query.set('where', JSON.stringify(where));

  	this.imageService.fetch(query)
  		.then((res) => {
  			this.total = parseInt(res.headers.get('x-total-count'));

  			return res.json()
  		})
  		.then((res) => this.images = res);
  }

  close() {
  	this.activeModal.close(Object.keys(this.selectedImages).map(k => this.selectedImages[k]));
  }
}