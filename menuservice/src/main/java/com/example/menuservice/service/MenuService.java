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

    @Autowired
    private ImageUploadService imageUploadService;

    public List<Menu> getAllMenus(){
        return menuRepository.findAll();
    }

    public Optional<Menu> getMenuById(Long id){
        return menuRepository.findById(id);
    }

    public List<Menu> getMenusByRestaurantId(Long restaurantId){
        return menuRepository.findByRestaurantId(restaurantId);
    }

    public Optional<Menu> getMenuByRestaurantIdAndMenuId(Long restaurantId, Long menuId){
        return menuRepository.findByIdAndRestaurantId(menuId, restaurantId);
    }

    public Menu createMenu(Menu menu){
        return menuRepository.save(menu);
    }

    public Menu updateMenu(Long id, Menu menuDetails){
        return menuRepository.findById(id)
                .map(menu -> {
                    menu.setName(menuDetails.getName());
                    menu.setRestaurantId(menuDetails.getRestaurantId());
                    menu.setMenuItems(menuDetails.getMenuItems());
                    return menuRepository.save(menu);
                })
                .orElseGet(() -> {
                    menuDetails.setId(id);
                    return menuRepository.save(menuDetails);
                });
    }

    public void deleteMenu(Long id){
        menuRepository.deleteById(id);
    }


//    public List<MenuItem> getAllMenuItems(){
//        return menuItemRepository.findAll();
//    }

    public List<MenuItem> getMenuItemsByMenuId(Long menuId){
        return menuItemRepository.findByMenuId(menuId);
    }

//    public MenuItem addMenuItem(Long menuId, MenuItem menuItem){
//        return menuRepository.findById(menuId)
//                .map(menu -> {
//                    menuItem.setMenu(menu);
//                    return menuItemRepository.save(menuItem);
//                })
//                .orElseThrow(() -> new RuntimeException("Menu Not Found!"));
//    }

    public MenuItem addMenuItem(Long menuId, MenuItem menuItem, MultipartFile image) throws IOException {
        String imagePath = imageUploadService.uploadImage(image);
        String imageUrl = "/images" + Paths.get(imagePath).getFileName().toString();
        menuItem.setImageUrl(imageUrl);

        return menuRepository.findById(menuId)
                .map(menu -> {
                    menuItem.setMenu(menu);
                    return menuItemRepository.save(menuItem);
                })
                .orElseThrow(() -> new RuntimeException("Menu not found"));
    }

//    public MenuItem updateMenuItem(Long id, MenuItem menuItemDetails){
//        return menuItemRepository.findById(id)
//                .map(menuItem -> {
//                    menuItem.setName(menuItemDetails.getName());
//                    menuItem.setDescription(menuItemDetails.getDescription());
//                    menuItem.setPrice(menuItemDetails.getPrice());
//                    menuItem.setImage(menuItemDetails.getImage());
//                    return menuItemRepository.save(menuItem);
//                })
//                .orElseGet(() ->{
//                    menuItemDetails.setId(id);
//                    return menuItemRepository.save(menuItemDetails);
//                });
//
//    }

    public MenuItem updateMenuItem(Long id, MenuItem menuItemDetails, MultipartFile image) throws IOException {
        String imagePath = imageUploadService.uploadImage(image);
        String imageUrl = "/images" + Paths.get(imagePath).getFileName().toString();
        return menuItemRepository.findById(id)
                .map(menuItem -> {
                    menuItem.setName(menuItemDetails.getName());
                    menuItem.setDescription(menuItemDetails.getDescription());
                    menuItem.setPrice(menuItemDetails.getPrice());
                    menuItem.setImageUrl(imageUrl);
                    return menuItemRepository.save(menuItem);
                })
                .orElseGet(() ->{
                    menuItemDetails.setId(id);
                    menuItemDetails.setImageUrl(imageUrl);
                    return menuItemRepository.save(menuItemDetails);
                });
    }

    public void deleteMenuItem(Long id){
        menuItemRepository.deleteById(id);
    }
}
