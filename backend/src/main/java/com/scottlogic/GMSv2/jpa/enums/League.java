package com.scottlogic.GMSv2.jpa.enums;

public enum League {
    LEAGUE_ONE("League One"),
    LEAGUE_TWO("League Two"),
    BAD("Bad League");

    private final String name;

    League(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
