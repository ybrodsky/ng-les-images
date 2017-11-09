import {Component, Injectable, Injector, Inject} from '@angular/core';
import {Http, URLSearchParams, Headers} from '@angular/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ImageService {

  constructor(@Inject('config') private config:any, private http: Http) {  }

  fetch(query): any {
  	return this.http.get(this.config.api, {search: query}).toPromise();
  }

  getApiURL(): string {
  	return this.config.api;
  }

  getImageBaseURL(): string {
  	return this.config.imageSrc;
  }
}