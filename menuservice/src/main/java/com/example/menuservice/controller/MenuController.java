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
@RequestMapping("/api/menus")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @GetMapping
    public List<Menu> getAllMenues(){
        return menuService.getAllMenus();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Menu> getMenuById(@PathVariable Long id){
        Optional<Menu> menu = menuService.getMenuById(id);
        return menu.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/restaurants/{restaurantId}")
    public List<Menu> getMenuByRestaurantId(@PathVariable Long restaurantId){
        return menuService.getMenusByRestaurantId(restaurantId);
    }

    @PostMapping("/restaurants/{restaurantId}/menus")
    public Menu createMenu(@PathVariable Long restaurantId, @RequestBody Menu menu){
        menu.setRestaurantId(restaurantId);
        return menuService.createMenu(menu);
    }

    @PutMapping("/restaurants/{restaurantId}/menus/{menuId}")
    public ResponseEntity<Menu> updateMenu(@PathVariable Long restaurantId, @PathVariable Long menuId, @RequestBody Menu menuDetails) {
        Optional<Menu> menuOptional = menuService.getMenuByRestaurantIdAndMenuId(restaurantId, menuId);
        if (menuOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Menu updatedMenu = menuService.updateMenu(menuId, menuDetails);
        return ResponseEntity.ok(updatedMenu);
    }


    @DeleteMapping("/restaurants/{restaurantId}/menus/{menuId}")
    public ResponseEntity<Void> deleteMenu(@PathVariable Long restaurantId, @PathVariable Long menuId) {
        Optional<Menu> menuOptional = menuService.getMenuByRestaurantIdAndMenuId(restaurantId, menuId);
        if (menuOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        menuService.deleteMenu(menuId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public Menu createMenu(@RequestBody Menu menu) {
        return menuService.createMenu(menu);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Menu> updateMenu(@PathVariable Long id, @RequestBody Menu menuDetails){
        Menu updateMenu = menuService.updateMenu(id, menuDetails);
        return ResponseEntity.ok(updateMenu);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenu(@PathVariable Long id){
        menuService.deleteMenu(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{menuId}/items")
    public List<MenuItem> getMenuItemsByMenuId(@PathVariable Long menuId){
        return menuService.getMenuItemsByMenuId(menuId);
    }

//    @PostMapping(value ="/{menuId}/items", consumes = {"*/*"})
//    public MenuItem addMenuItem(@PathVariable Long menuId, @RequestPart("menuItem") MenuItem menuItem, @RequestPart("image")MultipartFile image) throws IOException {
//        return menuService.addMenuItem(menuId, menuItem, image);
//    }

    @PostMapping(value = "/{menuId}/items",consumes = { "multipart/form-data" })
    public MenuItem addMenuItem(@PathVariable Long menuId, @RequestParam("image") MultipartFile image,
                                @RequestParam("name") String name,
                                @RequestParam("description") String description,
                                @RequestParam("price") double price,
                                @RequestPart("imageUrl") String imageUrl) throws IOException {
        MenuItem menuItem = new MenuItem(name, description, price, imageUrl);
        return menuService.addMenuItem(menuId, menuItem, image);
    }

//    @PutMapping("/items/{id}")
//    public ResponseEntity<MenuItem> updateMenuItem(@PathVariable Long id, @RequestPart("menuItem") MenuItem menuItemDetails, @RequestPart("image")MultipartFile image) throws IOException {
//        MenuItem updateMenuItem = menuService.updateMenuItem(id, menuItemDetails, image);
//        return ResponseEntity.ok(updateMenuItem);
//    }

    @PutMapping(value = "/items/{id}",consumes = { "multipart/form-data" })
    public ResponseEntity<MenuItem> updateMenuItem(@PathVariable Long id, @RequestParam("image") MultipartFile image,
                                                   @RequestParam("name") String name,
                                                   @RequestParam("description") String description,
                                                   @RequestParam("price") double price,
                                                   @RequestPart("imageUrl") String imageUrl) throws IOException {
        MenuItem menuItem = new MenuItem(name, description, price, imageUrl);
        MenuItem updateMenuItem = menuService.updateMenuItem(id, menuItem, image);
        return ResponseEntity.ok(updateMenuItem);
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable Long id){
        menuService.deleteMenuItem(id);
        return ResponseEntity.noContent().build();
    }

}
