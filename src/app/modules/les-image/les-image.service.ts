import {Component, Injectable, Injector, Inject} from '@angular/core';
import {Http, URLSearchParams, Headers} from '@angular/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ImageService {

  constructor(@Inject('config') private config:any, private http: Http) {  }

  fetch(query): any {
  	return this.http.get(this.getApiURL(), {search: query}).toPromise();
  }

  save(data): any {
    const headers = new Headers();
    headers.append('jwt', localStorage.getItem('token'));

    return this.http.post(this.getApiURL(), data, { headers }).toPromise();
  }

  getApiBaseURL(): string {
    return this.config.api;
  }

  getApiURL(): string {
  	return this.config.api + 'api/images';
  }

  getImageBaseURL(): string {
  	return this.config.aws;
  }

  getDefaultBucket(): string {
    return this.config.bucket;
  }
}
