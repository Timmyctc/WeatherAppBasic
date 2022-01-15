import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WeatherProvider } from '../../providers/weather/weather';
import { CityDataProvider } from '../../providers/city-data/city-data';
import { CountryNewsProvider } from '../../providers/country-news/country-news';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { ICityData } from '../../app/CityDataInterface';
import { IWeather } from '../../app/WeatherDataInterface';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public loadedWeather: IWeather[];
  public loadedCityData: ICityData;
  public loadedNews = [];

  //instance vars
  private cityName: string;
  private units: string;
  private title: string = 'Settings';
  buttonDisabled: boolean = true;

  //TODO
  private loadedCity: string;

  constructor(private navCtrl: NavController, private storage: Storage, private weatherService: WeatherProvider, private cityDataService: CityDataProvider,
    private newsProvider: CountryNewsProvider, private ds: DataServiceProvider) {
  }

  ionViewDidLoad() {

  }

  ionViewDidEnter() {
    this.storage.get('city').then((val) => {
      if (val == null) {
        this.cityName = "";
      } else {
        this.cityName = val;
      }
    });
    this.storage.get('units').then((val) => {
      if (val == null) {
        this.units = "M";
      } else {
        this.units = val;
      }
    });
  }

  getCityData() {
    let promise = new Promise<void>((resolve, reject) => {
      this.cityDataService.getCityDataFromAPI(this.cityName)
        .toPromise()
        .then(
          res => { // Success - has returned city data

            this.getWeatherData(res); //Pass the city data to getWeatherData
            this.getCountryNews(res); //Pass the city data to getCountryNews
            this.ds.packCityInfo(res);  //Put the CityInfo into storage

            // this.storage.set('cityInfo', res);
            resolve();
          }
        )
        .catch(
          error => alert(error.message)
        );
    })
    return promise;
  }

  getWeatherData(data: Object) {
    let promise = new Promise<void>((resolve, reject) => {
      this.weatherService.getWeatherFromApiCoordinates(data[0].latlng[0], data[0].latlng[1], this.units)
        .toPromise()
        .then(
          res => { // Success
            let loadedWeather = res;
            this.ds.packWeatherData(loadedWeather);
            resolve();
          }
        )
        .catch(error => alert(error.message));
    })
    return promise;
  }



  getCountryNews(data: Object) {
    let promise = new Promise<void>((resolve, reject) => {
      this.newsProvider.getCountryNewsFromAPI(data[0].cca2)
        .toPromise()
        .catch(
          err => {
            //Error
            reject(err);
          })
        .then(
          res => { // Success
            let loadedNews = res;
            this.ds.packCountryNews(loadedNews);
            resolve();
          }, err => {
            //Error
            reject(err);
          }
        )
        .catch(error => alert(error.message));
    })
    return promise;
  }


  saveSettings() {
    this.storage.set('city', this.cityName);
    this.storage.set('units', this.units);
    this.getCityData();

  }//end saveSettings
}
