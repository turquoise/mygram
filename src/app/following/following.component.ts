import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import * as _ from 'lodash';
import { MyfireService } from '../shared/myfire.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit, OnDestroy {

  refArray: any = [];
  postList: any = [];

  constructor(private myfire: MyfireService ) { }

  ngOnInit() {
    const uid = firebase.auth().currentUser.uid;
    const followRef = firebase.database().ref('follow').child(uid);

    followRef.once('value', data => {
      const uidListOfOtherUsers = _.keys(data.val());
      this.getPostsFromOtherUsers(uidListOfOtherUsers);
    });
  }

  getPostsFromOtherUsers(uidList) {
    for (let count = 0; count < uidList.length; count ++) {
      this.refArray[count] = this.myfire.getUserPostsRef(uidList[count]);
      this.refArray[count].on('child_added', data => {
        this.postList.push({
          key: data.key,
          data: data.val()
        });
      });
    }
  }

  ngOnDestroy() {
    _.forEach(this.refArray, ref => {
      if ( ref && typeof(ref) === 'object') {
        ref.off();
      }
    });
  }

}
