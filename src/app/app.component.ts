import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){
      firebase.initializeApp({
            apiKey: "AIzaSyDTguh9S4yHIxnResQuymZp0Ha-j2CM-Hs",
            authDomain: "registration-portal.firebaseapp.com",
            databaseURL: "https://registration-portal.firebaseio.com",
            projectId: "registration-portal",
            storageBucket: "registration-portal.appspot.com",
            messagingSenderId: "458038453644"
      })
  }
}
