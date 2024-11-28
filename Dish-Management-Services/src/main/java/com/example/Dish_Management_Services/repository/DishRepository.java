package com.example.Dish_Management_Services.repository;
import com.example.Dish_Management_Services.entity.Dish;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DishRepository extends JpaRepository<Dish, Long> {

}