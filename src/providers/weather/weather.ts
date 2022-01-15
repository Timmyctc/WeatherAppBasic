import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';


@Injectable()
export class WeatherProvider {

  //API Key
  private apiKey: string = "bd843da346b140f3a4a57a14309d480c";

  constructor(private http: HttpClient, private storage: Storage) {
    console.log('Hello weather');
  }

  //Get Weather Data from Lat Lon
  getWeatherFromApiCoordinates(lat: number, lon: number, units: string) {
    return this.http.get('https://api.weatherbit.io/v2.0/current?lat=' + lat + '&lon=' + lon + "&key=" + this.apiKey + '&units=' + units)
      .catch((err: HttpErrorResponse) => {
        return Observable.throw(err.message);
      });

  }
}