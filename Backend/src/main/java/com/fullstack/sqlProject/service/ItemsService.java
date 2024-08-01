package com.fullstack.sqlProject.service;

import com.fullstack.sqlProject.entity.Items;
import com.fullstack.sqlProject.repository.ItemsRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ItemsService {

    @Autowired
    private ItemsRepository itemsRepository;

    public Items postItems(Items item){
        return itemsRepository.save(item);
    }

    public List<Items> getAllTasks(){
        return itemsRepository.findAll();
    }

    public void deleteById(Long id){
        if(!itemsRepository.existsById(id)){
            throw new EntityNotFoundException("Task not found with id: "+id);
        }
            itemsRepository.deleteById(id);
    }

    public Items getById(Long id){
        return itemsRepository.findById(id).orElse(null);
    }

    public Items updateById(Long id,Items items){
       Optional<Items> optionalItem= itemsRepository.findById(id);
       if(optionalItem.isPresent()){
          Items exisitingItem= optionalItem.get();
          exisitingItem.setName(items.getName());
          return  itemsRepository.save(exisitingItem);
       }
       return null;

    }
}
