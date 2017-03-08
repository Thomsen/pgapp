
import { Component } from '@angular/core';

import { NavController, ModalController, Platform, ActionSheetController, AlertController } from 'ionic-angular';

import { BadgePage } from './badges';

@Component({
  templateUrl: 'demo.html'
})

export class DemoPage {

  person: any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController,
    public alertCtrl: AlertController
    //public badgePage: BadgePage
  ) {
    this.person = {
      name: 'thom',
      age: 18
    }
  }

  ionViewDidLoad() {
    try {
      throw new Error('demo error');
    } catch (error) {
      console.log('demo error: ' + error);
    }
  }

  badgePage: any = BadgePage;

  showBadge() {
    this.navCtrl.push(this.badgePage, {});
  }

  showModal() {
    let badgeModal = this.modalCtrl.create(this.badgePage);
    badgeModal.present();
  }
  openMenu() {

    function showModal2() {
      let badgeModal = this.modalCtrl.create(this.badgePage);  // this.badgePage not available
      badgeModal.present();
    }

    let actionSheet = this.actionsheetCtrl.create({
      title: 'Menu',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Share',
          role: '',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            console.log("share clicked");
          }
        },
        {
          text: 'badge',
          icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
          handler: () => {
            this.showBadge();
          }
        },
        {
          text: 'modal',
          icon: !this.platform.is('ios') ? 'add' : null,
          handler: () => {
            this.showModal();
          }
        }
        ]
    })
    actionSheet.present();
  }

  doAlert() {
    let alert = this.alertCtrl.create({
      title: 'New Alert',
      message: 'alert message',
      inputs: [
        {
          name: 'title',
          placeholder: 'holder',
        }
        ],
      buttons: ['cancel', {
        text: 'ok',
        handler: data => {
          console.log('ok clicked ' + JSON.stringify(data));
        }
      }]
    });
    alert.present();
  }
}
