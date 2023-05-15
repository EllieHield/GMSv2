package com.scottlogic.GMSv2.jpa.enums;

public enum AgeRange {
    YOUNG("Young"),
    OLD("Old"),
    SKELETON("Skeleton");

    private final String name;

    AgeRange(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
