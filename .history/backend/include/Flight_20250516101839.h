// Flight.h
#ifndef FLIGHT_H
#define FLIGHT_H

#include <string>
#include <iostream>

struct Coordinates {
    double latitude;
    double longitude;
};

class Flight {
private:
    std::string flightNumber;
    std::string departure;
    std::string destination;
    int capacity;
    int bookedSeats;

protected:
    void updateBookedSeats(int seats);

public:
    Flight(std::string fn, std::string dep, std::string dest, int cap);

    std::string getFlightNumber() const;
    std::string getDeparture() const;
    std::string getDestination() const;
    int getCapacity() const;
    int getBookedSeats() const;

    virtual void displayDetails() const;  // virtual for polymorphism

    bool bookSeat();
    bool bookSeat(int seats);                 // function overloading
    bool bookSeat(const std::string& passengerName); // dummy overload

    // Operator overloading
    Flight operator+(const Flight& other);
};

#endif
