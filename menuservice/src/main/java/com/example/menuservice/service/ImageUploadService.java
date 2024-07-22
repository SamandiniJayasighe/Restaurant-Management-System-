package com.example.menuservice.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.UUID;

@Service
public class ImageUploadService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    public String uploadImage(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IOException("Failed to store empty file");
        }

        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(uploadPath);

       // Path filePath = uploadPath.resolve(Objects.requireNonNull(file.getOriginalFilename()));
        UUID uuid = UUID.randomUUID();
        Path filePath = uploadPath.resolve(Objects.requireNonNull(uuid.toString()+file.getOriginalFilename()));
        Files.copy(file.getInputStream(), filePath);

        return filePath.toString();

    }
}
