import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class CountryNewsProvider {

  private countryNewsArray = [];

  private countryNewsJ = {
    article: {
      urlToImage: '',
      title: '',
      description: '',
      url: '',
    }
  }


  private apiKey: string = "847870797fc442c69c03bcdebb0fcb60";

  constructor(private http: HttpClient, private storage: Storage) {
    console.log('Hello CountryNewsProvider Provider');
  }

  //Pass CCA2 and APIKEY and it will return top 5 stories
  getCountryNewsFromAPI(cca2: string): void {
    this.http.get('https://newsapi.org/v2/top-headlines?country=' + cca2 + "&pagesize=" + 5 +  '&apiKey=' + this.apiKey).subscribe(data => {
      let countryNews = data;
      this.packCountryNews(countryNews);
  });
  }

  //Pack Country News into Array and Set to storage
  packCountryNews(countryNews: any): void {
    // console.log(countryNews.articles[0].urlToImage.toString());
    for(let i = 0; i < 5; i++) {
    this.countryNewsJ.article.urlToImage = countryNews.articles[i].urlToImage;
    this.countryNewsJ.article.title = countryNews.articles[i].title;
    this.countryNewsJ.article.description = countryNews.articles[i].description;
    this.countryNewsJ.article.url = countryNews.articles[i].url;
    this.countryNewsArray.push(this.countryNewsJ);
    }
    this.storage.set('countryNews', this.countryNewsArray);
  }
}
