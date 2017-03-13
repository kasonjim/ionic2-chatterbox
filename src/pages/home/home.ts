import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { HTTP } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username
  message
  roomname

  serverURL
  headers
  allMessages

  constructor(public navCtrl: NavController) {
    this.serverURL = ''; // FILL ME IN

    this.username = '';
    this.message = '';
    this.roomname = 'lobby';
    this.allMessages = [
      { username: 'test user', text: 'hello world', roomname: 'lobby' }
    ];
  }

  ionViewDidEnter() {
    HTTP.setHeader('X-Parse-Application-Id', '');	// FILL ME IN
    HTTP.setHeader('X-Parse-REST-API-Key', '');		// FILL ME IN
  }

  getMessages() {
    HTTP.get(this.serverURL, { order: '-createdAt' }, {})
      .then( data => {
        this.allMessages = JSON.parse(data.data).results;
      })
      .catch( err => {
        console.log('error', err.error)
      })

  }

  postMessage() {
    let messageObj = {
      username: this.username + ' (mobile)',
      text: this.message,
      roomname: this.roomname
    };

    HTTP.post(this.serverURL, messageObj, {})
      .then( data => {
        this.message = '';
        this.getMessages();
      })
      .catch( err => {
        console.log('error', err.error)
      })

  }

}
