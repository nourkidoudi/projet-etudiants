package com.example.notification.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NoteEvent {
    private Long studentId;
    private String matiere;
    private Double valeur;
    private LocalDateTime timestamp;
}
