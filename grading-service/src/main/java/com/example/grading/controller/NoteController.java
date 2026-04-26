package com.example.grading.controller;

import com.example.grading.entity.Note;
import com.example.grading.service.NoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NoteController {
    private final NoteService noteService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Note create(@RequestBody Note note) { return noteService.save(note); }

    @GetMapping
    public List<Note> getAll() { return noteService.findAll(); }

    @GetMapping("/{id}")
    public Note getById(@PathVariable Long id) { return noteService.findById(id); }

    @PutMapping("/{id}")
    public Note update(@PathVariable Long id, @RequestBody Note note) { return noteService.update(id, note); }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) { noteService.delete(id); }
}
