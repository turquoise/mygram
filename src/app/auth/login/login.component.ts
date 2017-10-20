import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { NotificationService } from '../../shared/notification.service';
import { MyfireService } from '../../shared/myfire.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private notifier: NotificationService,
    private myfire: MyfireService
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then( userData => {
        if (userData.emailVerified) {
          console.log('next');
          return this.myfire.getUserFromDatabase(userData.uid);

        } else {
          const message = `Your email is not yet verified.`;
          this.notifier.display('error', message);
          firebase.auth().signOut();
        }
      })
      .then( userDataFromDatabase => {
        if (userDataFromDatabase) {
          console.log(userDataFromDatabase);
        }
      })
      .catch( err => {
        this.notifier.display('error', err.message);
      });

  }

}
