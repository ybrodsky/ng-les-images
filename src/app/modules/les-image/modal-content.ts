import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  selectedImages: any = {};
  images: Array<any> = [];
  total: number = 0;
  page: number = 1;
  perPage: number = 12;

  Math: any = Math;
  params: any = {
  	tags: '',
  	all: true
  }
  baseURL: string;

  constructor(public activeModal: NgbActiveModal, private imageService: ImageService) {
  	this.baseURL = imageService.getImageBaseURL();
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

  search(page) {
  	this.page = page;

  	let query: URLSearchParams = new URLSearchParams();
  	query.set('limit', String(this.perPage));
  	query.set('skip', String(this.perPage * (page - 1)));

  	if(this.params.tags) {
  		query.set('where', JSON.stringify({
  			tags: {'$all': this.params.tags.split(',')}
  		}))
  	}

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