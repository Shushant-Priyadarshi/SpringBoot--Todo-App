package com.fullstack.sqlProject.controller;

import com.fullstack.sqlProject.entity.Items;
import com.fullstack.sqlProject.service.ItemsService;


import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todo")
@Slf4j
@CrossOrigin("*")
public class ItemsController {


    @Autowired
    private ItemsService itemsService;

    @PostMapping
   public ResponseEntity<?> addItems(@RequestBody Items item){
        try{
           Items createdItem= itemsService.postItems(item);
            return new ResponseEntity<>(createdItem,HttpStatus.OK);

        }catch (Exception e){
            log.error("Error occured while adding an item",e);
            throw new RuntimeException("Error occured while adding an item",e);
        }
    }

    @GetMapping
    public ResponseEntity<?> GetTasks(){
        try{
           List<Items> tasks = itemsService.getAllTasks();
           return new ResponseEntity<>(tasks,HttpStatus.OK);
        }catch (Exception e){
            log.error("Error occured while getting items",e);
            throw new RuntimeException("Error occured while getting items",e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> DeleteByid(@PathVariable Long id){
        try{
            itemsService.deleteById(id);
            return  new ResponseEntity<>("Item with id:"+id+" is delted",HttpStatus.OK);
        }catch (EntityNotFoundException e){
            return  new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTaskById(@PathVariable Long id){
        Items item = itemsService.getById(id);
        if(item ==null) return  ResponseEntity.notFound().build();
        return ResponseEntity.ok(item);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateItem(@PathVariable  Long id,@RequestBody Items items){
       Items updatedItem= itemsService.updateById(id,items);
       if(updatedItem==null){
           return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
       }
       return ResponseEntity.ok(updatedItem);
    }



}
