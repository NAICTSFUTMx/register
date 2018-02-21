import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import * as firebase from 'firebase'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

      email: string;
      password: string;
      fullname: string;
      loading: boolean;
      success: boolean;
  constructor(private router: Router, private activeRoute: ActivatedRoute) {
        this.activeRoute.params.subscribe((params) => {
              this.email = params.email
              console.log('Email', this.email)
              this.password = params.password
              console.log('Password', this.password)
              this.fullname = params.fullname
              console.log('Fullname', this.fullname)
        }) 
      // firebase.initializeApp({
      //       apiKey: "AIzaSyDTguh9S4yHIxnResQuymZp0Ha-j2CM-Hs",
      //       authDomain: "registration-portal.firebaseapp.com",
      //       databaseURL: "https://registration-portal.firebaseio.com",
      //       projectId: "registration-portal",
      //       storageBucket: "registration-portal.appspot.com",
      //       messagingSenderId: "458038453644"
      // })
  }

  login() {
        this.loading = true
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
            this.success = true; // show success alert
            // route to dashboard with required params
            const user = {
                  fullname: this.fullname,
                  email: this.email
            }
            this.router.navigate(['/dashboard', user]).then(() => {
                  // alert('routing successful')
                  this.loading = false
            }).catch((err: Error) => {
                  alert(err.message)
                  this.loading = false
            })
      }).catch((err: Error) => {
            alert(err.message)
            this.loading = false
            this.success = false
      })
  }
  ngOnInit() {
  }

}
