package com.example.Voting_Session_Service.client;


import com.example.Voting_Session_Service.model.Dish;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "dish-management-service", url = "http://localhost:8085")
public interface DishClient {

    @GetMapping("/dishes")
    List<Dish> getAllDishes();
}
