// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface Dish {
//   id: number;
//   entree: string;
//   mainCourse: string;
//   sideDish: string;
//   dessert: string;
// }

// @Injectable({
//   providedIn: 'root', // Pas besoin de configuration supplémentaire ici
// })
// export class DishService {
//   private apiUrl = 'http://localhost:8085/dishes';
//   private apiUrlAdd = "http://localhost:8085/dishes/add"
//   constructor(private http: HttpClient) {}

//   getDishes(): Observable<Dish[]> {
//     return this.http.get<Dish[]>(this.apiUrl);
//   }
//   addDish(dish: any): Observable<any> {
//     return this.http.post<any>(this.apiUrlAdd, dish);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Dish {
  id: number;
  entree: string;
  mainCourse: string;
  sideDish: string;
  dessert: string;
}

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private apiUrl = 'http://localhost:8085/dishes';
  private apiUrlAdd = 'http://localhost:8085/dishes/add';

  constructor(private http: HttpClient) {}

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.apiUrl);
  }

  getDishById(id: number): Observable<Dish> {
    return this.http.get<Dish>(`${this.apiUrl}/${id}`); // Récupère un plat par son ID
  }
  deleteDish(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addDish(dish: any): Observable<any> {
    return this.http.post<any>(this.apiUrlAdd, dish);
  }

  updateDish(dish: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${dish.id}`, dish); // Utilisation de l'ID pour l'update
  }
  
}
