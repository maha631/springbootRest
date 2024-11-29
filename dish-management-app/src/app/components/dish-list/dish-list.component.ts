import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishService, Dish } from '../../services/dish.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dish-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css'],
})
export class DishListComponent implements OnInit {
  dishes: Dish[] = []; // Tableau pour stocker les plats
  loading = true; // Indicateur de chargement
  error = ''; // Message d'erreur

  constructor(private dishService: DishService) {}

  ngOnInit(): void {
    this.fetchDishes();
  }

  // Méthode pour récupérer les plats depuis le backend
  fetchDishes(): void {
    this.dishService.getDishes().subscribe({
      next: (data) => {
        this.dishes = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des plats :', err);
        this.error = 'Impossible de charger les plats. Veuillez réessayer plus tard.';
        this.loading = false;
      },
    });
  }

  // Méthode pour supprimer un plat
  deleteDish(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce plat ?')) {
      this.dishService.deleteDish(id).subscribe({
        next: () => {
          alert('Plat supprimé avec succès!');
          this.fetchDishes(); // Rafraîchir la liste après suppression
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du plat:', error);
          alert('Échec de la suppression du plat!');
        },
      });
    }
  }
}
