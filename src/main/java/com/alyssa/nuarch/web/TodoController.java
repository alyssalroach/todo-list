package com.alyssa.nuarch.web;

import java.net.URISyntaxException;
import java.net.URI;
import java.util.Collection;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.alyssa.nuarch.model.Todo;
import com.alyssa.nuarch.model.TodoRepository;

import lombok.Value;

@RestController
class TodoController {

    private final Logger log = LoggerFactory.getLogger(TodoController.class);
    private TodoRepository todoRepository;

    public TodoController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @GetMapping("/todos")
    Collection<Todo> todos() {
        return todoRepository.findAll();
    }

    @GetMapping("/todo/{id}")
    ResponseEntity<?> getTodo(@PathVariable Long id) {
        Optional<Todo> todo = todoRepository.findById(id);
        return todo.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/todo")
    ResponseEntity<Todo> createGroup(@RequestBody Todo todo) throws URISyntaxException {
        log.info("Request to create todo: {}", todo);
        Todo result = todoRepository.save(todo);
        return ResponseEntity.created(new URI("/todo/" + result.getId())).body(result);
    }

    @PutMapping("/todo/{id}")
    ResponseEntity<Todo> updateGroup(@RequestBody Todo todo) {
        log.info("Request to update group: {}", todo);
        Todo result = todoRepository.save(todo);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/todo/{id}")
    public ResponseEntity<?> deleteTodo(@PathVariable Long id) {
        log.info("Deleting  todo: {}", id);
        todoRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
