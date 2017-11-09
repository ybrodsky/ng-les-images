import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { ImageService } from './les-image.service';
import { NgbdModalContent } from './modal-content';

@Component({
  selector: 'les-image',
  template: `
  	<div class="form-group">
			<button class="btn btn-outline-primary" (click)="open()">
				Importar imagenes
			</button>
		</div>
  `,
  styles: [`

  `]
})
export class LesImageComponent implements OnInit {
	@Output() onSelected = new EventEmitter<any>();

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
  }

  open() {
  	const modalRef = this.modalService.open(NgbdModalContent, {size: 'lg'});
  	modalRef.result.then((result) => {
  		this.onSelected.next(result);
  	}, (r) => {

  	});
  }

}
