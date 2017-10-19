import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


    ngOnInit() {
      const config = {
          apiKey: "AIzaSyCgfZyKhpY6qpqKCyNEcuBhbXldsxKDRAA",
          authDomain: "github-11e53.firebaseapp.com",
          databaseURL: "https://github-11e53.firebaseio.com",
          projectId: "github-11e53",
          storageBucket: "github-11e53.appspot.com",
          messagingSenderId: "425240417578"
        };
        firebase.initializeApp(config);
    }
}
