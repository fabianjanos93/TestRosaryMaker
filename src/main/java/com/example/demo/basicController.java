package com.example.demo;

import jdk.nashorn.internal.objects.annotations.Getter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class basicController {

    @GetMapping("/asd")
    public String baseGet(){
        return "rosaryGet";
    }

    @PostMapping("/asd")
    public String basePost(){
        return "rosaryPost";
    }
}
