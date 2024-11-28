package com.example.Dish_Management_Services.service;

import com.example.Dish_Management_Services.entity.Dish;
import com.example.Dish_Management_Services.repository.DishRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DishService {

    private final DishRepository dishRepository;

    public DishService(DishRepository dishRepository) {
        this.dishRepository = dishRepository;
    }

    // Récupérer tous les plats
    public List<Dish> getAllDishes() {
        return dishRepository.findAll();
    }

    // Récupérer un plat par son ID
    public Dish getDishById(Long id) {
        return dishRepository.findById(id).orElse(null);
    }

    // Créer un nouveau plat
    public Dish createDish(Dish dish) {
        return dishRepository.save(dish);
    }

    // Mettre à jour un plat existant
    public Dish updateDish(Long id, Dish dish) {
        return dishRepository.findById(id)
                .map(existingDish -> {
                    // Mise à jour des composants
                    existingDish.setEntree(dish.getEntree());
                    existingDish.setMainCourse(dish.getMainCourse());
                    existingDish.setSideDish(dish.getSideDish());
                    existingDish.setDessert(dish.getDessert());
                    return dishRepository.save(existingDish);
                })
                .orElse(null);
    }

    // Supprimer un plat par son ID
    public void deleteDish(Long id) {
        dishRepository.deleteById(id);
    }
}
