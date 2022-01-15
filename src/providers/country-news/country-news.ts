import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';


@Injectable()
export class CountryNewsProvider {

  private apiKey: string = "847870797fc442c69c03bcdebb0fcb60";

  constructor(private http: HttpClient, private storage: Storage) {
    console.log('Hello CountryNews');
  }

  //Pass CCA2 and APIKEY and it will return top 5 stories
  getCountryNewsFromAPI(cca2: string) {
    return this.http.get('https://newsapi.org/v2/top-headlines?country=' + cca2 + "&pagesize=" + 5 + '&apiKey=' + this.apiKey)
      .catch((err: HttpErrorResponse) => {
        return Observable.throw(err.message);
      });
  }

}