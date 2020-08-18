import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangelogComponent } from './changelog/changelog.component';

const routes: Routes = [
  { path: '', redirectTo: '/details', pathMatch: 'full' },
  { path: 'details', component: ChangelogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
