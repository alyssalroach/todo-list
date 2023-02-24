package com.alyssa.nuarch;

import java.util.stream.Stream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.alyssa.nuarch.model.Todo;
import com.alyssa.nuarch.model.TodoRepository;

@Component
class Initializer implements CommandLineRunner {
    private final TodoRepository todoRepository;

    public Initializer(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Override
    public void run(String... strings) {
        Stream.of("Todo 1", "Todo 2", "Todo 3", "Todo 4").forEach(corpus -> todoRepository.save(new Todo(corpus)));

        todoRepository.findAll().forEach(System.out::println);
    }

}
