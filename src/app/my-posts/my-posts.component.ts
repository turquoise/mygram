import { Component, OnInit } from '@angular/core';
import { MyfireService } from '../shared/myfire.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  constructor(
    private myfire: MyfireService,
    private notifier: NotificationService
  ) { }

  ngOnInit() {
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

}
