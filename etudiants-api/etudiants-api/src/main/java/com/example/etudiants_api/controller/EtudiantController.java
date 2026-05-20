package com.example.etudiants_api.controller;

import com.example.etudiants_api.model.Etudiant;
import com.example.etudiants_api.repository.EtudiantRepository;
import com.example.etudiants_api.service.EtudiantService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/etudiants")
@CrossOrigin(origins = "*")
public class EtudiantController {

    private final EtudiantService service;

    public EtudiantController(EtudiantService service) {
        this.service = service;
    }

    @GetMapping
    public List<Etudiant> getAll() {
        return service.findAll();
    }

    @PostMapping
    public Etudiant save(@RequestBody Etudiant etudiant) {
        return service.save(etudiant);
    }
}