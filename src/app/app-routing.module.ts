import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './features/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './shared/components/list/list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: LayoutComponent,
    children: [{ path: '', component: HomeComponent}]
  },
  {
    path: 'list',
    component: LayoutComponent,
    children: [
      { path: ':id', component: ListComponent},
      { path: '', redirectTo: '/home', pathMatch: 'full'},
    ]
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
