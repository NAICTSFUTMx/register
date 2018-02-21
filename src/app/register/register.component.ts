import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as firebase from 'firebase';

import { LoginComponent } from "../login/login.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

      email: string;
      fullname: string;
      password: string;
      phone: string;
      matric: string;
      success = false;
      teller: any;
      picture: any;
      filestring: any;
      teller_data: any;
      profile_data: any;
      images: Array<any> = [
            {
                  'image': '../assets/freshers.jpeg',
                  'title': 'Freshers Party',
                  'link': 'naictsfutmx.com',
                  'linkText': 'vote'
            },
            {
                  'image': '../assets/hashcode.jpeg',
                  'title': 'Google Hashcode 2018',
                  'link': 'naictsfutmx.com',
                  'linkText': 'register'
            }
      ];
      loading: boolean;
  constructor(private router: Router) {
      
  }

  ngOnInit() {}

  validateForm() {
        const form = document.forms['ngForm'];
      if (form['email'].value !== '' && form['email'].value != null &&
          form['teller'].value !== '' && form['teller'].value != null &&
          form['picture'].value !== '' && form['picture'].value != null &&
          form['password'].value !== '' && form['password'].value != null &&
          form['fullname'].value !== '' && form['fullname'].value != null &&
      //     form['matric'].value !== '' || form['matric'].value != null ||
          form['phone'].value !== '' || form['phone'].value != null &&
          form['matric'].value.match(/^\d\d\d\d\/([1]|[2])\/\d+(([c][t])|([C][T])|([i][t])|([I][T])|([c][s])|([C][S]))$/) !== null &&
          form['phone'].value.match(/^\d{11,}$/) !== null) {
            this.register();
      } else if (form['matric'].value.match(/^\d\d\d\d\/([1]|[2])\/\d+(([c][t])|([C][T])|([i][t])|([I][T])|([c][s])|([C][S]))$/) == null) {
            alert('Invalid matric number');
      } else if (form['phone'].value.match(/^\d{11,}$/) == null) {
            alert('Invalid phone number');
      } else if (form['password'].value.length < 6) {
            alert('Password needs to be at least 8 characters long');
      } else if (form['teller'].value === '') {
            alert('Please add a copy of your registration teller');
      } else {
            alert('All fields are required');
      }
  }

  getTeller(event) { 
      this.teller_data = event.target.files; 
      var reader = new FileReader(); 
      reader.onload = this._handleReaderLoaded.bind(this); 
      reader.readAsBinaryString(this.teller_data[0]); 
      console.log('Teller: ', this.teller_data[0])
  } 

  getPicture(event) { 
      this.profile_data = event.target.files; 
      var reader = new FileReader(); 
      reader.onload = this._handleReaderLoaded.bind(this); 
      reader.readAsBinaryString(this.profile_data[0]); 
      console.log('Picture: ', this.profile_data[0])
  } 

  _handleReaderLoaded(readerEvt) { 
      var binaryString = readerEvt.target.result; 
      this.filestring = btoa(binaryString);  // Converting binary string data. 
 }

 login() {
      this.router.navigate(['/login']).then(() => {
            console.log('login screen reached')
      })
 }

  register() {
        this.loading = true;
      //   alert(this.email + ' ' + this.fullname + ' ' + this.matric + ' ' + this.password + ' ' + this.phone);
      // window.location.href = 'https://naictsfutmx.github.io';
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(() => {
            firebase.database().ref('Registered Students/' + this.fullname).set({
                  matric_no: this.matric,
                  fullname: this.fullname,
                  email: this.email,
                  phone_no: this.phone,
                  status: 'pending'
            }).then(() => {
                  // upload images
                  this.upload().then(() => {
                        alert('Registration Successful');
                        this.loading = false;
                        // navigate to login with needed params
                        const user = {
                              fullname: this.fullname,
                              email: this.email,
                              password: this.password
                        }
                        this.router.navigate(['/login', user])
                  }).catch((err: Error) => {
                        alert('Upload error: ' + err.message)
                        this.loading = false;
                  })
            }).catch((err: Error) => {
                  alert('Saving error: ' + err.message);
                  this.loading = false;
            });
      }).catch((err: Error) => {
            alert('Auth error: ' + err.message);
            this.loading = false;
      });
  }

 upload() {
       return new Promise((resolve, reject) => {
            console.log(this.teller_data[0], this.profile_data[0])
            firebase.storage().ref('/' + this.matric + '/teller.jpg').put(this.teller_data[0]).then(() => {
                  alert('Teller Upload Successful');
                  this.loading = false;
            }).catch((err: Error) => {
                  alert('Teller Failure: ' + err.message);
                  this.loading = false;
            });
            // upload profile picture
      firebase.storage().ref('/' + this.matric + '/profile.jpg').put(this.profile_data[0]).then(() => {
            alert('Picture Upload Successful');
            this.loading = false;
      }).catch((err: Error) => {
            alert('Picture Failure: ' + err.message);
            this.loading = false;
      });
       })
 }

}
