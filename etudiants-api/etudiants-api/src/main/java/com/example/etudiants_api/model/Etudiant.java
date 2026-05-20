package com.example.etudiants_api.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Etudiant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cin;
    private String nom;
    private LocalDate dateNaissance;

    public Etudiant() {}

    public Etudiant(Long id, String cin, String nom, LocalDate dateNaissance) {
        this.id = id;
        this.cin = cin;
        this.nom = nom;
        this.dateNaissance = dateNaissance;
    }

    public Long getId() { return id; }
    public String getCin() { return cin; }
    public String getNom() { return nom; }
    public LocalDate getDateNaissance() { return dateNaissance; }
}