import { NgModule, ModuleWithProviders }         from '@angular/core';
import { CommonModule }                          from '@angular/common';
import { BrowserModule }                         from '@angular/platform-browser';
import { BrowserAnimationsModule }               from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule }      from '@angular/forms';
import {
  Http, HttpModule,
  RequestOptions, XHRBackend
}                                                from '@angular/http';

import { LesImageComponent }                     from './les-image.component';
import { LesImageItemComponent }                 from './les-image-item.component';

import { NgbdModalContent }                      from './modal-content';
import { ImageService }                          from './les-image.service';
import { NgbModule }                             from '@ng-bootstrap/ng-bootstrap';
//import { FileUploadModule }                      from "ng2-file-upload/file-upload/file-upload.module";
import { TagInputModule }                        from 'ngx-chips';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot(),
    //FileUploadModule,
    TagInputModule, BrowserAnimationsModule
  ],
  declarations: [LesImageComponent, LesImageItemComponent, NgbdModalContent],
  exports: [LesImageComponent, LesImageItemComponent],
  entryComponents: [NgbdModalContent],
  providers: [ImageService]
})
export class LesImageModule {
  static forRoot(config: any): ModuleWithProviders {
    return {
      ngModule: LesImageModule,
      providers: [ImageService, {provide: 'config', useValue: config}]
    };
  }
}
