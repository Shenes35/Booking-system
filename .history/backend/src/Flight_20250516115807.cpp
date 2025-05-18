#include "Flight.h"

Flight::Flight(std::string fn, std::string dep, std::string dest, int cap)
    : flightNumber(fn), departure(dep), destination(dest), capacity(cap), bookedSeats(0) {}

std::string Flight::getFlightNumber() const { return flightNumber; }
std::string Flight::getDeparture() const { return departure; }
std::string Flight::getDestination() const { return destination; }
int Flight::getCapacity() const { return capacity; }
int Flight::getBookedSeats() const { return bookedSeats; }

void Flight::updateBookedSeats(int seats) {
    bookedSeats += seats;
    if (bookedSeats > capacity) bookedSeats = capacity;
}

bool Flight::bookSeat() {
    if (bookedSeats < capacity) {
        bookedSeats++;
        return true;
    }
    return false;
}

bool Flight::bookSeat(int seats) {
    if (bookedSeats + seats <= capacity) {
        bookedSeats += seats;
        return true;
    }
    return false;
}

bool Flight::bookSeat(const std::string& passengerName) {
    std::cout << "Booking seat for passenger: " << passengerName << "\n";
    return bookSeat();
}

Flight Flight::operator+(const Flight& other) {
    Flight result = *this;
    result.bookedSeats += other.bookedSeats;
    if (result.bookedSeats > capacity) result.bookedSeats = capacity;
    return result;
}

void Flight::displayDetails() const {
    std::cout << "Flight Number: " << flightNumber << "\n"
              << "From " << departure << " to " << destination << "\n"
              << "Capacity: " << capacity << ", Booked Seats: " << bookedSeats << "\n";
}

