
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DishService } from '../../services/dish.service';
import { Dish } from '../../models/dish.model'; // Assure-toi que tu as bien importé ton interface Dish
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-dish-edit',
  standalone: true,
  imports: [CommonModule, FormsModule], // Import FormsModule pour ngModel
  templateUrl: './dish-edit.component.html',
  styleUrls: ['./dish-edit.component.css']
})
export class DishEditComponent implements OnInit {
  dish: Dish = {
    id: 0,  // Id du plat à modifier
    entree: '',
    mainCourse: '',
    sideDish: '',
    dessert: ''
  };

  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const dishId = Number(this.route.snapshot.paramMap.get('id'));  // Récupère l'ID du plat à modifier depuis l'URL
    if (dishId) {
      this.dishService.getDishById(dishId).subscribe({
        next: (dish) => {
          this.dish = dish;  // Charge les données du plat dans le formulaire
          console.log("Plat récupéré :", this.dish);  // Vérifie dans la console si les données sont chargées correctement
        },
        error: (error) => {
          console.error("Erreur lors de la récupération du plat", error);
        }
      });
    }
  }
  

  editDish() {
    console.log("Plat à mettre à jour :", this.dish);  // Vérifie si les données sont bien présentes
    this.dishService.updateDish(this.dish).subscribe({
      next: (response) => {
        console.log('Dish updated successfully:', response);
        alert('Dish updated successfully!');
        this.router.navigate(['/dishes']);  // Redirige vers la liste des plats après modification
      },
      error: (error) => {
        console.error('Error updating dish:', error);
        alert('Failed to update dish!');
      }
    });
  }
  
}
