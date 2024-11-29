// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { DishService, Dish } from '../../services/dish.service';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-dish-list',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   templateUrl: './dish-list.component.html',
//   styleUrls: ['./dish-list.component.css'],
// })
// export class DishListComponent implements OnInit {
//   dishes: Dish[] = []; // Tableau pour stocker les plats
//   loading = true; // Indicateur de chargement
//   error = ''; // Message d'erreur

//   constructor(private dishService: DishService) {}

//   ngOnInit(): void {
//     this.fetchDishes();
//   }

//   // Méthode pour récupérer les plats depuis le backend
//   fetchDishes(): void {
//     this.dishService.getDishes().subscribe({
//       next: (data) => {
//         this.dishes = data;
//         this.loading = false;
//       },
//       error: (err) => {
//         console.error('Erreur lors du chargement des plats :', err);
//         this.error = 'Impossible de charger les plats. Veuillez réessayer plus tard.';
//         this.loading = false;
//       },
//     });
//   }

//   // Méthode pour supprimer un plat
//   deleteDish(id: number): void {
//     if (confirm('Êtes-vous sûr de vouloir supprimer ce plat ?')) {
//       this.dishService.deleteDish(id).subscribe({
//         next: () => {
//           alert('Plat supprimé avec succès!');
//           this.fetchDishes(); // Rafraîchir la liste après suppression
//         },
//         error: (error) => {
//           console.error('Erreur lors de la suppression du plat:', error);
//           alert('Échec de la suppression du plat!');
//         },
//       });
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';
import { DishService, Dish } from '../../services/dish.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { ActivatedRoute, Router } from '@angular/router';import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dish-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css'],
})
export class DishListComponent implements OnInit {
  dishes: Dish[] = []; // Tous les plats récupérés
  paginatedDishes: Dish[] = []; // Plats affichés pour la page active
  currentPage: number = 1; // Page actuelle
  itemsPerPage: number = 3; // Nombre de plats par page
  totalPages: number = 0; // Total de pages nécessaires
  currentDish: Dish = { id: 0, entree: '', mainCourse: '', sideDish: '', dessert: '' };
  isEditMode = false; // Mode édition ou ajout
totalPagesArray: any;

  constructor(private dishService: DishService) {}

  ngOnInit(): void {
    this.fetchDishes();
  }

  fetchDishes(): void {
    this.dishService.getDishes().subscribe({
      next: (data) => {
        this.dishes = data;
        this.updatePagination();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des plats :', err);
      },
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.dishes.length / this.itemsPerPage);
    this.changePage(this.currentPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedDishes = this.dishes.slice(startIndex, endIndex);
  }

  // Ouvrir le modal pour ajouter un plat
  openAddDishModal(): void {
    this.isEditMode = false;
    this.currentDish = { id: 0, entree: '', mainCourse: '', sideDish: '', dessert: '' };
    new bootstrap.Modal(document.getElementById('dishModal')!).show();
  }

  // Ouvrir le modal pour éditer un plat existant
  openEditDishModal(dish: Dish): void {
    this.isEditMode = true;
    this.currentDish = { ...dish };
    new bootstrap.Modal(document.getElementById('dishModal')!).show();
  }

  // Sauvegarder un plat (ajouter ou mettre à jour)
  saveDish(): void {
    if (this.isEditMode) {
      this.dishService.updateDish(this.currentDish).subscribe({
        next: () => {
          alert('Dish updated successfully!');
          this.fetchDishes();
          bootstrap.Modal.getInstance(document.getElementById('dishModal')!)!.hide();
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du plat :', err);
        },
      });
    } else {
      this.dishService.addDish(this.currentDish).subscribe({
        next: () => {
          alert('Dish added successfully!');
          this.fetchDishes();
          bootstrap.Modal.getInstance(document.getElementById('dishModal')!)!.hide();
        },
        error: (err) => {
          console.error('Erreur lors de l’ajout du plat :', err);
        },
      });
    }
  }

  // Suppression d'un plat
  deleteDish(id: number): void {
    if (confirm('Are you sure you want to delete this dish?')) {
      this.dishService.deleteDish(id).subscribe({
        next: () => {
          alert('Deleted! The dish has been deleted.');
          this.fetchDishes(); // Rafraîchit la liste des plats
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du plat :', err);
        },
      });
    }
  }
}
