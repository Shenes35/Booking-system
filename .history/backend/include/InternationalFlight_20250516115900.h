/ InternationalFlight.h
#ifndef INTERNATIONALFLIGHT_H
#define INTERNATIONALFLIGHT_H

#include "Flight.h"

class InternationalFlight : public Flight {
private:
    std::string passportRequired;

public:
    InternationalFlight(std::string fn, std::string dep, std::string dest, int cap, std::string passportReq);

    void displayDetails() const override;
};

#endif

