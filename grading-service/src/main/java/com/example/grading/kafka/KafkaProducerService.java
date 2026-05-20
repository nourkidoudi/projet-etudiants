package com.example.grading.kafka;

import com.example.grading.kafka.event.NoteEvent;
import com.example.grading.entity.Note;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class KafkaProducerService {

    private final KafkaTemplate<String, NoteEvent> kafkaTemplate;

    public void publishNoteCreated(Note note) {
        NoteEvent event = NoteEvent.builder()
                .studentId(note.getStudentId())
                .matiere(note.getMatiere())
                .valeur(note.getValeur())
                .timestamp(LocalDateTime.now())
                .build();
        
        kafkaTemplate.send("note-created", event);
    }
}
