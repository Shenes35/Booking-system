// Full example covering all Cycles I–III concepts
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

// --- Cycle-I ---
// Struct vs Class
typedef struct {
    double latitude;
    double longitude;
} Coordinates;

// Base Class
class Flight {
private:
    string flightNumber, departure, destination;
    int capacity, bookedSeats;

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
        cout << "Flight: " << flightNumber << ", From " << departure
             << " to " << destination << ", Capacity: " << capacity
             << ", Booked: " << bookedSeats << endl;
    }

    // Function Overloading
    bool bookSeat() {
        if (bookedSeats < capacity) { bookedSeats++; return true; }
        return false;
    }
    bool bookSeat(int seats) {
        if (bookedSeats + seats <= capacity) { bookedSeats += seats; return true; }
        return false;
    }
    bool bookSeat(const string& name) {
        cout << "Booking seat for: " << name << endl;
        return bookSeat();
    }

    // Operator Overloading
    Flight operator+(const Flight& other) {
        Flight result = *this;
        result.bookedSeats += other.bookedSeats;
        if (result.bookedSeats > capacity) result.bookedSeats = capacity;
        return result;
    }
};

// --- Cycle-II ---
// Inheritance Types

// Single Inheritance
class InternationalFlight : public Flight {
    string passportRequired;
public:
    InternationalFlight(string fn = "", string dep = "", string dest = "", int cap = 0, string passReq = "Yes")
        : Flight(fn, dep, dest, cap), passportRequired(passReq) {}

    void displayDetails() const override {
        Flight::displayDetails();
        cout << "Passport Required: " << passportRequired << endl;
    }
};

// Multilevel Inheritance
class BusinessFlight : public InternationalFlight {
public:
    BusinessFlight(string fn, string dep, string dest, int cap)
        : InternationalFlight(fn, dep, dest, cap, "Yes") {}
};

// Multiple Inheritance
class PremiumService {
public:
    void offerMeal() const { cout << "Premium meal included.\n"; }
};
class PremiumFlight : public Flight, public PremiumService {
public:
    PremiumFlight(string fn, string dep, string dest, int cap)
        : Flight(fn, dep, dest, cap) {}
};

// Hierarchical Inheritance
class CargoFlight : public Flight {
public:
    CargoFlight(string fn, string dep, string dest, int cap)
        : Flight(fn, dep, dest, cap) {}
};

// --- Cycle-III ---
void printFlightByRef(const Flight& f) { f.displayDetails(); }
void bookViaPointer(Flight* f) {
    if (f->bookSeat()) cout << "Booked via pointer.\n";
    else cout << "Booking failed.\n";
}

void saveFlightToFile(const Flight& f, const string& filename) {
    ofstream file(filename, ios::app);
    if (file.is_open()) {
        file << f.getFlightNumber() << "," << f.getDeparture() << ","
             << f.getDestination() << "," << f.getCapacity() << ","
             << f.getBookedSeats() << endl;
        file.close();
    }
}

int main() {
    string fn, dep, dest;
    int cap;
    cout << "Enter flight number: "; getline(cin, fn);
    cout << "Enter departure: "; getline(cin, dep);
    cout << "Enter destination: "; getline(cin, dest);
    cout << "Enter capacity: "; cin >> cap;

    Flight f1(fn, dep, dest, cap);
    f1.bookSeat();
    f1.bookSeat("Alice");

    printFlightByRef(f1);
    bookViaPointer(&f1);

    // Arrays
    Flight flights[2] = {
        Flight("F100", "A", "B", 100),
        Flight("F200", "C", "D", 150)
    };
    for (int i = 0; i < 2; ++i) flights[i].displayDetails();

    // Pointer usage
    Flight* fPtr = new Flight("F300", "X", "Y", 80);
    fPtr->bookSeat();
    fPtr->displayDetails();
    delete fPtr;

    // Operator overload demo
    Flight f2("F400", "X", "Y", 100);
    f2.bookSeat(30);
    Flight combined = f1 + f2;
    combined.displayDetails();

    // Inheritance examples
    InternationalFlight intl("IF001", "NY", "LDN", 200);
    intl.displayDetails();

    BusinessFlight bf("BF101", "TX", "PA", 150);
    bf.displayDetails();

    PremiumFlight pf("PF001", "CH", "BLR", 180);
    pf.displayDetails();
    pf.offerMeal();

    CargoFlight cf("CG001", "BLR", "DXB", 250);
    cf.displayDetails();

    saveFlightToFile(combined, "flights.txt");
    cout << "Flight saved.\n";
    return 0;
}