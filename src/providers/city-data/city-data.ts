import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class CityDataProvider {


  constructor(public http: HttpClient) { }

  getCityDataFromAPI(cityName: string) {
    return this.http.get('https://restcountries.com/v3.1/capital/' + cityName);
  }

}

