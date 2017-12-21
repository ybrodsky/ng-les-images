import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { ImageService } from './les-image.service';
import { NgbdModalContent } from './modal-content';

@Component({
  selector: 'les-image-item',
  template: `
    <div [class]="containerClass">
      <img style="width: 100%" src="{{getImageURL(image)}}"/>
    </div>
  `,
  styles: [`
    .les-image-item {
      width: inherit;
      cursor: pointer;
    }
  `]
})
export class LesImageItemComponent {
	@Input() image: any;
  @Input() containerClass: string = 'les-image-item';

  baseURL: string;

  constructor(private imageService: ImageService) {
    this.baseURL = imageService.getImageBaseURL();
  }

  getImageURL(image): string {
    return `${this.baseURL}r/${image.bucket}/200x200/${image.name}`;
  }
}
