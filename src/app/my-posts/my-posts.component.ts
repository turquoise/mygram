import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyfireService } from '../shared/myfire.service';
import { NotificationService } from '../shared/notification.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit, OnDestroy {
  personalPostsRef: any;
  postLists: any = [];

  constructor(
    private myfire: MyfireService,
    private notifier: NotificationService
  ) { }

  ngOnInit() {
    const uid = firebase.auth().currentUser.uid;
    this.personalPostsRef = this.myfire.getUserPostsRef(uid);
    this.personalPostsRef.on('child_added', data => {
      this.postLists.push({
        key: data.key,
        data: data.val()
      });

    });
  }

  onFileSelection(event) {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.myfire.uploadFile(file)
        .then( data => {
          // to do
          this.notifier.display('success', 'Picture Successfully uploaded!');
          console.log(data['fileUrl']);
          this.myfire.handleImageUpload(data);
        })
        .catch( err => {
          this.notifier.display('error ', err.message);
        })
    }

  }

  ngOnDestroy() {
    this.personalPostsRef.off();
  }

}
