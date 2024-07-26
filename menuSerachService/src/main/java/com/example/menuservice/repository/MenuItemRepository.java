package com.example.menuservice.repository;

import com.example.menuservice.models.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    //List<MenuItem> findByMenuId(Long menuId);
    List<MenuItem> findByName(String name);
    List<MenuItem> findByPrice(double price);
    List<MenuItem> findByNameAndPrice(String name, double price);
}
