package com.mjt.tu.alumni.controllers;

import java.nio.file.Paths;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/demo-controller")
public class DemoController {

    @GetMapping
    public String sayHello() {
        return Paths.get("uploads").toAbsolutePath().toString();
    }
}