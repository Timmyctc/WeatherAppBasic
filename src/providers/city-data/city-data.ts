import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class CityDataProvider {

  //private cityInfoArray = [];

  // Object to store city info
  private cityInfo = {
    cca2: "",
    commonName: "",
    flag: "",
    lat:  0,
    lng: 0
  };



  

  constructor(public http: HttpClient, private storage: Storage) {  }

  getCityDataFromAPI(cityName: string): void {
    this.http.get('https://restcountries.com/v3.1/capital/' + cityName).subscribe(data => {
      let cityData = data;
      this.packCityInfo(cityData);
    });

  }

  // console.log(cityData[0].latlng);
  //     let x = cityData[0].latlng[0];
  //     let y = cityData[0].latlng[1];

  
  packCityInfo(cityData: any): void {
    this.cityInfo.cca2 = (cityData[0].cca2);
    this.cityInfo.commonName = (cityData[0].name.common);
    this.cityInfo.flag = (cityData[0].flags.png);
    this.cityInfo.lat = (cityData[0].latlng[0]);
    this.cityInfo.lng = (cityData[0].latlng[1]);
  
    //TODO Debug
    console.log(this.cityInfo.flag);
    console.log(cityData[0].cca2);
    console.log(this.cityInfo);
    this.storage.set('cityInfo', this.cityInfo);
  }


}
