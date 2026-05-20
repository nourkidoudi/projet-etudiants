package com.example.etudiants_api.kafka;

import com.example.etudiants_api.event.EtudiantEvent;
import com.example.etudiants_api.model.Etudiant;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class KafkaProducerService {

    private final KafkaTemplate<String, EtudiantEvent> kafkaTemplate;

    public void publishEtudiantCreated(Etudiant etudiant) {
        EtudiantEvent event = EtudiantEvent.builder()
                .etudiantId(etudiant.getId())
                .nom(etudiant.getNom())
                .email("test@example.com") // Simulé car non présent dans le modèle Etudiant initial
                .timestamp(LocalDateTime.now())
                .build();
        
        kafkaTemplate.send("etudiant-created", event);
    }
}
