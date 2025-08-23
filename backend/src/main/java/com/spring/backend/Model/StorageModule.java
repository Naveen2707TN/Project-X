package com.spring.backend.Model;

public class StorageModule {
    private String type;
    private String size;
    private int count;

    public StorageModule(String type, String size, int count) {
        this.type = type;
        this.size = size;
        this.count = count;
    }

    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    public String getSize() {
        return size;
    }
    
    public void setSize(String size) {
        this.size = size;
    }
    
    public int getCount() {
        return count;
    }
    
    public void setCount(int count) {
        this.count = count;
    }
    
}
