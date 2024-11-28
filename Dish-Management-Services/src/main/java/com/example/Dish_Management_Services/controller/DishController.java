package com.example.Dish_Management_Services.controller;

import com.example.Dish_Management_Services.entity.Dish;
import com.example.Dish_Management_Services.service.DishService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dishes")
public class DishController {

    private final DishService dishService;

    public DishController(DishService dishService) {
        this.dishService = dishService;
    }

    // Obtenir tous les plats
    @GetMapping
    public List<Dish> getAllDishes() {
        return dishService.getAllDishes();
    }

    // Obtenir un plat par ID
    @GetMapping("/{id}")
    public ResponseEntity<Dish> getDishById(@PathVariable Long id) {
        Dish dish = dishService.getDishById(id);
        return dish != null ? ResponseEntity.ok(dish) : ResponseEntity.notFound().build();
    }

    // Ajouter un nouveau plat avec ses composants
    @PostMapping("/add")
    public ResponseEntity<Dish> createDishWithComponents(@RequestBody Dish dish) {
        // Enregistrer le plat dans la base de données
        Dish createdDish = dishService.createDish(dish);
        return ResponseEntity.ok(createdDish);
    }

    // Mettre à jour un plat par ID
    @PutMapping("/{id}")
    public ResponseEntity<Dish> updateDish(@PathVariable Long id, @RequestBody Dish dish) {
        Dish updatedDish = dishService.updateDish(id, dish);
        return updatedDish != null ? ResponseEntity.ok(updatedDish) : ResponseEntity.notFound().build();
    }

    // Supprimer un plat par ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDish(@PathVariable Long id) {
        dishService.deleteDish(id);
        return ResponseEntity.noContent().build();
    }
}
