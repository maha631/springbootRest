import { Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DishListComponent } from './components/dish-list/dish-list.component';

export const routes: Routes = [
  { path: 'dishes', component: DishListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
