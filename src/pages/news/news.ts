import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  private noNews: boolean = false;
  private cca2: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

  private News = [];

  ionViewDidEnter() {
    this.storage.get("countryNews").then((data) => {
        this.News = data;
        if(data.articles.length == 0){
          this.noNews = true;
          console.log(this.noNews)
        }
        // console.log(data);
    }).catch((err) => {
      console.log(err);
    });

    this.storage.get("cityInfo").then((data) => {
      this.cca2 = data.cca2;
    }
    ).catch((err) => {
      console.log(err);
    }
    );
  }
}
