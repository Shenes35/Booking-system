#include <iostream>
#include <fstream>
#include <string>

using namespace std;

// Struct for coordinates (struct vs class demo)
struct Coordinates {
    double latitude;
    double longitude;
};

// Base Flight class
class Flight {
private:
    string flightNumber;
    string departure;
    string destination;
    int capacity;
    int bookedSeats;

protected:
    void updateBookedSeats(int seats) {
        bookedSeats += seats;
        if (bookedSeats > capacity) bookedSeats = capacity;
    }

public:
    Flight(string fn = "", string dep = "", string dest = "", int cap = 0)
        : flightNumber(fn), departure(dep), destination(dest), capacity(cap), bookedSeats(0) {}

    string getFlightNumber() const { return flightNumber; }
    string getDeparture() const { return departure; }
    string getDestination() const { return destination; }
    int getCapacity() const { return capacity; }
    int getBookedSeats() const { return bookedSeats; }

    virtual void displayDetails() const {
        cout << "Flight Number: " << flightNumber << "\nFrom " << departure
             << " to " << destination << "\nCapacity: " << capacity
             << ", Booked Seats: " << bookedSeats << "\n";
    }

    bool bookSeat() {
        if (bookedSeats < capacity) {
            bookedSeats++;
            return true;
        }
        return false;
    }

    // Overloaded bookSeat for multiple seats
    bool bookSeat(int seats) {
        if (bookedSeats + seats <= capacity) {
            bookedSeats += seats;
            return true;
        }
        return false;
    }

    // Overloaded bookSeat for passenger name (dummy)
    bool bookSeat(const string& passengerName) {
        cout << "Booking seat for passenger: " << passengerName << endl;
        return bookSeat();
    }

    // Operator + overload to combine booked seats (max capacity capped)
    Flight operator+(const Flight& other) {
        Flight result = *this;
        result.bookedSeats += other.bookedSeats;
        if (result.bookedSeats > capacity) result.bookedSeats = capacity;
        return result;
    }
};

// Derived class for international flight
class InternationalFlight : public Flight {
private:
    string passportRequired;

public:
    InternationalFlight(string fn = "", string dep = "", string dest = "", int cap = 0, string passportReq = "")
        : Flight(fn, dep, dest, cap), passportRequired(passportReq) {}

    void displayDetails() const override {
        Flight::displayDetails();
        cout << "Passport Required: " << passportRequired << "\n";
    }
};

// Function to save flight info to file
void saveFlightToFile(const Flight& flight, const string& filename) {
    ofstream file(filename, ios::app);
    if (file.is_open()) {
        file << flight.getFlightNumber() << ","
             << flight.getDeparture() << ","
             << flight.getDestination() << ","
             << flight.getCapacity() << ","
             << flight.getBookedSeats() << "\n";
        file.close();
    } else {
        cout << "Unable to open file.\n";
    }
}

int main() {
    cout << "Enter flight details:\n";
    string fn, dep, dest;
    int cap;
    cout << "Flight Number: "; getline(cin, fn);
    cout << "Departure: "; getline(cin, dep);
    cout << "Destination: "; getline(cin, dest);
    cout << "Capacity: "; cin >> cap;
    cin.ignore();

    Flight flight(fn, dep, dest, cap);

    // Booking seats interactively
    char choice;
    do {
        cout << "Book a seat? (y/n): ";
        cin >> choice;
        cin.ignore();
        if (choice == 'y' || choice == 'Y') {
            cout << "Book single seat or multiple? (s/m): ";
            char seatChoice;
            cin >> seatChoice;
            cin.ignore();

            if (seatChoice == 's' || seatChoice == 'S') {
                if (flight.bookSeat()) {
                    cout << "Seat booked successfully!\n";
                } else {
                    cout << "No seats available!\n";
                }
            } else if (seatChoice == 'm' || seatChoice == 'M') {
                int numSeats;
                cout << "Enter number of seats to book: ";
                cin >> numSeats;
                cin.ignore();
                if (flight.bookSeat(numSeats)) {
                    cout << numSeats << " seats booked successfully!\n";
                } else {
                    cout << "Not enough seats available!\n";
                }
            }
        }
    } while (choice == 'y' || choice == 'Y');

    cout << "\nFlight Details:\n";
    flight.displayDetails();

    saveFlightToFile(flight, "flights.txt");
    cout << "Flight info saved to flights.txt\n";

    return 0;
}
