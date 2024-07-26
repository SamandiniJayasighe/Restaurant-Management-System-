package com.example.menuservice.controller;

import com.example.menuservice.models.Menu;
import com.example.menuservice.models.MenuItem;
import com.example.menuservice.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/find/menus")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @GetMapping("/search")
    public List<Menu> findByRestaurantIdAndName(@RequestParam Long restaurantId, @RequestParam String name) {
        return menuService.findByRestaurantIdAndName(restaurantId, name);
    }

    @GetMapping("/search/by-name")
    public List<MenuItem> findByName(@RequestParam String name) {
        return menuService.findByName(name);
    }

    @GetMapping("/search/by-price")
    public List<MenuItem> findByPrice(@RequestParam double price) {
        return menuService.findByPrice(price);
    }

    @GetMapping("/search/by-name-and-price")
    public List<MenuItem> findByNameAndPrice(@RequestParam String name, @RequestParam double price) {
        return menuService.findByNameAndPrice(name, price);
    }


}
