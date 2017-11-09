import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';

import { LesImageModule } from './modules/les-image/les-image.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    LesImageModule.forRoot({api: 'http://localhost:3006/api/images', imageSrc: 'https://dy7qn3s3w7.execute-api.sa-east-1.amazonaws.com/dev/img/200x200/'}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
