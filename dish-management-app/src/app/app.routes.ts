import { Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DishAddComponent } from './components/dish-add/dish-add.component';
import { DishEditComponent } from './components/dish-edit/dish-edit.component';
import { DishListComponent } from './components/dish-list/dish-list.component';

export const routes: Routes = [
  { path: 'dishes', component: DishListComponent },
  { path: 'dishes/add', component: DishAddComponent },
  { path: 'dishes/edit/:id', component: DishEditComponent }, // Nouvelle route pour l'édition
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
