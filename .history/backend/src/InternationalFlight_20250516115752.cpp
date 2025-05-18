// InternationalFlight.cpp
#include "InternationalFlight.h"
#include <iostream>

InternationalFlight::InternationalFlight(std::string fn, std::string dep, std::string dest, int cap, std::string passportReq)
    : Flight(fn, dep, dest, cap), passportRequired(passportReq) {}

void InternationalFlight::displayDetails() const {
    Flight::displayDetails();
    std::cout << "Passport Required: " << passportRequired << std::endl;
}
