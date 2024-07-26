package com.example.menuservice.service;

import com.example.menuservice.models.Menu;
import com.example.menuservice.models.MenuItem;
import com.example.menuservice.repository.MenuItemRepository;
import com.example.menuservice.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;


@Service
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;


    public List<Menu> findByRestaurantIdAndName(Long restaurantId, String name) {
        return menuRepository.findByRestaurantIdAndName(restaurantId, name);
    }
    public List<MenuItem> findByName(String name) {
        return menuItemRepository.findByName(name);
    }

    public List<MenuItem> findByPrice(double price) {
        return menuItemRepository.findByPrice(price);
    }

    public List<MenuItem> findByNameAndPrice(String name, double price) {
        return menuItemRepository.findByNameAndPrice(name, price);
    }


}
