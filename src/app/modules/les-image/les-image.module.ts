import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';
import {
  Http, HttpModule,
  RequestOptions, XHRBackend
}                                            from '@angular/http';

import { LesImageComponent } from './les-image.component';
import { NgbdModalContent } from './modal-content';
import { ImageService } from './les-image.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  declarations: [LesImageComponent, NgbdModalContent],
  exports: [LesImageComponent],
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
