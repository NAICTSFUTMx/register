import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import * as firebase from 'firebase';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

      hasProfile: boolean = false;
      profile: any;
      fullname: string = '{{fullname}}';
      email: string = '{{email}}';
      status: string = 'pending';
      matric: string;
      phone: string = '{{070 xxxx xxxx}}';
      dept: string = 'none';
      level: string = 'none';
      loading: boolean;
      success: boolean;
  constructor(private activeRoute: ActivatedRoute, private modal: NgbModal) {
        this.loading = true
      this.activeRoute.params.subscribe((params) => { 
            this.fullname = params.fullname;
            this.email = params.email
            //   get info from firebase
            firebase.database().ref('Registered Students/' + params.fullname).once('value', (snap) => {
                  console.log(snap.val())
                  this.status = snap.val().status
                  console.log('Status', this.status)
                  this.matric = snap.val().matric_no
                  console.log('Matric', this.matric)
                  this.phone = snap.val().phone_no
                  console.log('Phone', this.phone)
                  this.dept = snap.val().dept
                  console.log('Department', this.dept)
                  this.level = snap.val().level
                  console.log('Level', this.level)
                  this.loading = false
            })
            // get picture from firebase storage
            firebase.storage().ref('/' + this.matric + '/').child('profile.jpg').getDownloadURL().then((res) => {
                  this.profile = res
                  console.log('Photo URL', res)
                  this.hasProfile = true
            }) 
      })
  }

  edit(content){
      this.modal.open(content)
  }

  save() {
        this.loading = true
        firebase.database().ref('Registered Students/' + this.fullname).push({
              dept: this.dept,
              level: this.level
        }).then(() => {
              this.success = true
              this.loading = false
        }, (err: Error) => {
              alert('Error: ' + err.message)
              this.success = false
              this.loading = false
        })
        console.log('Dept', this.dept)
        console.log('Level', this.level)
  }

  ngOnInit() {
     
  }

}
