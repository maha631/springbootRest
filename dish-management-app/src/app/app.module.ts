import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';  // Assure-toi d'importer SidebarComponent

import { routes } from './app.routes';
import { DishListComponent } from './components/dish-list/dish-list.component'; // Import standalone component

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    DishListComponent, // Import the standalone component here
    SidebarComponent
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
