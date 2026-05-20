package com.example.grading.service;

import com.example.grading.client.EtudiantClient;
import com.example.grading.entity.Note;
import com.example.grading.repository.NoteRepository;
import com.example.grading.kafka.KafkaProducerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteService {
    private final NoteRepository noteRepository;
    private final EtudiantClient etudiantClient;
    private final KafkaProducerService kafkaProducerService;

    public Note save(Note note) {
        // Validation via Feign
        etudiantClient.getEtudiantById(note.getStudentId());
        Note savedNote = noteRepository.save(note);
        
        // Envoi asynchrone de la notification
        kafkaProducerService.publishNoteCreated(savedNote);
        
        return savedNote;
    }

    public List<Note> findAll() { return noteRepository.findAll(); }
    public Note findById(Long id) { return noteRepository.findById(id).orElseThrow(); }
    public Note update(Long id, Note noteDetails) {
        Note note = findById(id);
        note.setMatiere(noteDetails.getMatiere());
        note.setValeur(noteDetails.getValeur());
        return noteRepository.save(note);
    }

    public void delete(Long id) { noteRepository.deleteById(id); }
}
