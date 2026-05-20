package com.example.grading.client;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EtudiantDTO {
    private Long id;
    private String cin;
    private String nom;
}
