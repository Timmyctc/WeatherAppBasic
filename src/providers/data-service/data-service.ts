import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class DataServiceProvider {

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello DataServiceProvider Provider');
  }

  //Obj to store city info
  private cityInfo = {
    cca2: "",
    commonName: "",
    flag: "",
    lat: 0,
    lng: 0
  };

  // Object to store weather data
  private weatherInfo = {
    city: '',
    temp: '',
    description: '',
    icon: '',
    wind_cdir_full: '',
  }

  private countryNewsArray = [];

  //Obj to store country news
  private countryNews = {
    article: {
      urlToImage: '',
      title: '',
      description: '',
      url: '',
    }
  }

  packCityInfo(cityData: any) {

    this.cityInfo.cca2 = (cityData[0].cca2);
    this.cityInfo.commonName = (cityData[0].name.common);
    this.cityInfo.flag = (cityData[0].flags.png);
    this.cityInfo.lat = (cityData[0].latlng[0]);
    this.cityInfo.lng = (cityData[0].latlng[1]);

    this.storage.set("cityInfo", this.cityInfo);
  }



  packWeatherData(currentWeather: any) {
    this.weatherInfo.city = currentWeather.data[0].city_name;
    this.weatherInfo.temp = currentWeather.data[0].temp;
    this.weatherInfo.description = currentWeather.data[0].weather.description;
    this.weatherInfo.icon = this.getIcon(currentWeather.data[0].weather.icon);
    this.weatherInfo.wind_cdir_full = currentWeather.data[0].wind_cdir_full;

    this.storage.set('weatherInfo', this.weatherInfo);
  }

  //return the icon from weatherbit api
  getIcon(icon: string) {
    return 'https://www.weatherbit.io/static/img/icons/' + icon + '.png';
  }


  //Pack Country News into Array and Set to storage
  packCountryNews(countryNewsObject: any) {
    //  for(let i = 0; i < 5; i++) {
    //   this.countryNews.article.urlToImage = countryNewsObject.articles[i].urlToImage;
    //   this.countryNews.article.title = countryNewsObject.articles[i].title;
    //   this.countryNews.article.description = countryNewsObject.articles[i].description;
    //   this.countryNews.article.url = countryNewsObject.articles[i].url;
    //   this.countryNewsArray.push(this.countryNews);
    //  }
    this.storage.set('countryNews', countryNewsObject);
  }

}
