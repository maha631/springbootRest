
// import { Component } from '@angular/core';
// import { DishService } from '../../services/dish.service';
// import { CommonModule } from '@angular/common';

// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-dish-add',
//   standalone: true,
//   imports: [CommonModule, FormsModule], 
//   templateUrl: './dish-add.component.html',
//   styleUrls: ['./dish-add.component.css']
// })
// export class DishAddComponent {
//   newDish = {
//     id: 0,  // Id du plat à modifier
//     entree: '',
//     mainCourse: '',
//     sideDish: '',
//     dessert: ''
//   };

//   constructor(private dishService: DishService) {}

//   addDish() {
//     this.dishService.addDish(this.newDish).subscribe({
//       next: (response) => {
//         console.log('Dish added successfully:', response);
//         alert('Dish added successfully!');
        
//       },
//       error: (error) => {
//         console.error('Error adding dish:', error);
//         alert('Failed to add dish!');
//       }
//     });
//   }
// }
import { Component } from '@angular/core';
import { DishService } from '../../services/dish.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import du service Router

@Component({
  selector: 'app-dish-add',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './dish-add.component.html',
  styleUrls: ['./dish-add.component.css']
})
export class DishAddComponent {
  newDish = {
    id: 0,  // Id du plat à modifier
    entree: '',
    mainCourse: '',
    sideDish: '',
    dessert: ''
  };

  constructor(
    private dishService: DishService,
    private router: Router  // Injection du service Router
  ) {}

  addDish() {
    this.dishService.addDish(this.newDish).subscribe({
      next: (response) => {
        console.log('Dish added successfully:', response);
        alert('Dish added successfully!');

        // Redirection vers /dishes après l'ajout
        this.router.navigate(['/dishes']);
      },
      error: (error) => {
        console.error('Error adding dish:', error);
        alert('Failed to add dish!');
      }
    });
  }
}
