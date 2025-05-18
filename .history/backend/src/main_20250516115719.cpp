#include <iostream>
#include <fstream>
#include "Flight.h"
#include "InternationalFlight.h"

void printFlightDetails(const Flight& flight) {
    flight.displayDetails();
}

void bookSeatPointer(Flight* flightPtr) {
    if (flightPtr->bookSeat())
        std::cout << "Seat booked via pointer.\n";
    else
        std::cout << "No seats available.\n";
}

void saveFlightToFile(const Flight& flight, const std::string& filename) {
    std::ofstream file(filename, std::ios::app);
    if (file.is_open()) {
        file << flight.getFlightNumber() << ","
             << flight.getDeparture() << ","
             << flight.getDestination() << ","
             << flight.getCapacity() << ","
             << flight.getBookedSeats() << "\n";
        file.close();
    } else {
        std::cout << "Unable to open file.\n";
    }
}

int main() {
    Flight f1("AB123", "New York", "Los Angeles", 100);
    InternationalFlight f2("INT456", "London", "Paris", 150, "Yes");

    Coordinates airportCoord = {40.7128, -74.0060};
    std::cout << "Airport Coordinates: Lat " << airportCoord.latitude << ", Long " << airportCoord.longitude << "\n";

    printFlightDetails(f1);
    printFlightDetails(f2);

    bookSeatPointer(&f1);

    Flight f3 = f1 + f1;
    f3.displayDetails();

    f1.bookSeat();
    f1.bookSeat(5);
    f1.bookSeat("John Doe");

    Flight flightArray[2] = {f1, f2};
    for (int i = 0; i < 2; i++) {
        std::cout << "\nFlight " << i + 1 << " details:\n";
        flightArray[i].displayDetails();
    }

    Flight* pFlight = new Flight("DL789", "San Francisco", "Seattle", 80);
    pFlight->displayDetails();
    delete pFlight;

    saveFlightToFile(f1, "flights.txt");

    return 0;
}
