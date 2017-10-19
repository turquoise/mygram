import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { FollowingComponent } from './following/following.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MyPostsComponent } from './my-posts/my-posts.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'allposts', component: AllPostsComponent },
  { path: 'following', component: FollowingComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'myposts', component: MyPostsComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
