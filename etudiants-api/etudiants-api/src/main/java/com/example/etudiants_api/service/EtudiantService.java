package com.example.etudiants_api.service;

import com.example.etudiants_api.kafka.KafkaProducerService;
import com.example.etudiants_api.model.Etudiant;
import com.example.etudiants_api.repository.EtudiantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EtudiantService {

    private final EtudiantRepository repository;
    private final KafkaProducerService kafkaProducerService;

    public List<Etudiant> findAll() {
        return repository.findAll();
    }

    @Transactional
    public Etudiant save(Etudiant etudiant) {
        Etudiant saved = repository.save(etudiant);
        kafkaProducerService.publishEtudiantCreated(saved);
        return saved;
    }
}
