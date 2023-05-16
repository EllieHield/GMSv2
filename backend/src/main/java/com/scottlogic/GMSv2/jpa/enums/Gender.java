package com.scottlogic.GMSv2.jpa.enums;

public enum Gender {
    YETI("Yeti"),
    NOT_YETI("Not Yeti");

    private final String name;

    Gender(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
