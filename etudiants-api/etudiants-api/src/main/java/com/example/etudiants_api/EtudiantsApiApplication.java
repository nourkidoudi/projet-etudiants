package com.example.etudiants_api;

import com.example.etudiants_api.model.Etudiant;
import com.example.etudiants_api.repository.EtudiantRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import java.time.LocalDate;

@SpringBootApplication
public class EtudiantsApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(EtudiantsApiApplication.class, args);
	}

	@Bean
	CommandLineRunner initData(EtudiantRepository repo) {
		return args -> {
			if (repo.count() == 0) {
				repo.save(new Etudiant(null, "12345678", "Ahmed Ben Ali", LocalDate.of(2000, 3, 15)));
				repo.save(new Etudiant(null, "23456789", "Sarra Mansouri", LocalDate.of(2001, 7, 22)));
				repo.save(new Etudiant(null, "34567890", "Mohamed Trabelsi", LocalDate.of(1999, 11, 5)));
				repo.save(new Etudiant(null, "45678901", "Ines Chaabane", LocalDate.of(2002, 1, 30)));
				repo.save(new Etudiant(null, "56789012", "Youssef Gharbi", LocalDate.of(2000, 9, 18)));
			}
		};
	}
}