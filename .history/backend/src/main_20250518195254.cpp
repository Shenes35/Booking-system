#include <iostream>
#include <fstream>
#include <string>
#include <vector>

using namespace std;

// Struct for coordinates
struct Coordinates {
    double latitude;
    double longitude;
};
//Suitable for storing GPS or map coordinates.


// Base class
class Flight {
protected:
//protected is an access specifier ,They are Accessible within the class itself (like private), Accessible in derived (child) classes — unlike private and Not accessible from outside the class (unlike public).
    string flightNumber, departure, destination;
    int capacity, bookedSeats;
    //initialised protected variables

public:
    Flight(string fn = "", string dep = "", string dest = "", int cap = 0)
    //function that is automatically called when an object is created. Take the given input parameters
        : flightNumber(fn), departure(dep), destination(dest), capacity(cap), bookedSeats(0) {}
        //Member initializer list — directly sets member values

    virtual void displayDetails() const {
        cout << "Flight: " << flightNumber
             << ", From " << departure << " to " << destination
             << ", Capacity: " << capacity << ", Booked: " << bookedSeats << "\n";
    }
    //run time polymorphism
    //const	- Marks that the function doesn't modify any member variables of the object

    // Function overloading
    virtual bool bookSeat(int seats) {
        if (bookedSeats + seats <= capacity) {
            bookedSeats += seats;
            return true;
        }
        return false;
    }

    bool bookSeat(const string& passengerName) {
        cout << "Booking seat for passenger: " << passengerName << "\n";
        return bookSeat(1);
    }

    virtual bool bookSeat() {
        return bookSeat(1);
    }

    string getFlightNumber() const { return flightNumber; }
    string getDeparture() const { return departure; }
    string getDestination() const { return destination; }
    int getCapacity() const { return capacity; }
    int getBookedSeats() const { return bookedSeats; }
    //Used for encapsulation

    // Operator overloading: +
    Flight operator+(const Flight& other) {
        Flight result = *this;
        result.bookedSeats += other.bookedSeats;
        if (result.bookedSeats > result.capacity)
            result.bookedSeats = result.capacity;
        return result;
    }

    // Operator overloading: ==
    bool operator==(const Flight& other) const {
        return flightNumber == other.flightNumber;
    }

    virtual ~Flight() {}
};

// Derived classes
class InternationalFlight : public Flight {
    string passportRequired;
public:
    InternationalFlight(string fn, string dep, string dest, int cap, string pass)
        : Flight(fn, dep, dest, cap), passportRequired(pass) {}
    void displayDetails() const override {
        Flight::displayDetails();
        cout << "Passport Required: " << passportRequired << "\n";
    }
};

class BusinessFlight : public InternationalFlight {
public:
    BusinessFlight(string fn, string dep, string dest, int cap)
        : InternationalFlight(fn, dep, dest, cap, "Yes") {}
    void displayDetails() const override {
        InternationalFlight::displayDetails();
        cout << "Business Class Flight.\n";
    }
};

class PremiumService {
public:
    void displayService() const {
        cout << "Premium meal included.\n";
    }
};

class PremiumFlight : public Flight, public PremiumService {
public:
    PremiumFlight(string fn, string dep, string dest, int cap)
        : Flight(fn, dep, dest, cap) {}
    void displayDetails() const override {
        Flight::displayDetails();
        displayService();
    }
};

class CargoFlight : public Flight {
public:
    CargoFlight(string fn, string dep, string dest, int cap)
        : Flight(fn, dep, dest, cap) {}
};

// File saving
void saveFlightToFile(const Flight& flight, const string& filename) {
    ofstream file(filename, ios::app);
    if (file.is_open()) {
        file << flight.getFlightNumber() << ","
             << flight.getDeparture() << ","
             << flight.getDestination() << ","
             << flight.getCapacity() << ","
             << flight.getBookedSeats() << "\n";
        file.close();
        cout << "Flight saved.\n";
    } else {
        cout << "File write error.\n";
    }
}

// Main
int main() {
    vector<Flight*> flights;
    //dynamic array from the C++ Standard Template Library (STL).It can resize itself automatically as you add or remove elements.
    //Flight* means this vector stores pointers to Flight objects (or objects derived from Flight). if Flight then Only the Flight part of the object is stored inside the vector.
    //flights is the name of the vector variable.
    int userType;
    //created an int variable

    while (true) {
        cout << "\n==== Welcome to Flight Booking System ====\n";
        cout << "Login as:\n";
        cout << "1. Administrator\n";
        cout << "2. Passenger\n";
        cout << "0. Exit\n";
        cout << "==========================================\n";
        cout << "Select user type: ";
        cin >> userType;
        //read the input for the user type. cin leaves newline in buffer.
        cin.ignore();
        //removes that newline left after cin.

        if (userType == 0) break;
        //exit
        if (userType == 1) {
            //enter into administrator user
            int adminOption;
            //int variable for administrator
            do {
                cout << "\n====== Administrator Menu ======\n";
                cout << "1. Create a Domestic Flight\n";
                cout << "2. Create an International Flight\n";
                cout << "3. Create a Business Flight\n";
                cout << "4. Create a Premium Flight\n";
                cout << "5. Create a Cargo Flight\n";
                cout << "6. Display All Flights\n";
                cout << "7. Save Flights to File\n";
                cout << "8. Compare Two Flights (==)\n";
                cout << "9. Combine Bookings of Two Flights (+)\n";
                cout << "0. Logout\n";
                cout << "================================\n";
                cout << "Choose an option: ";
                cin >> adminOption;
                cin.ignore();

                if (adminOption >= 1 && adminOption <= 5) {
                    string fn, dep, dest;
                    //string datatype for departure,destination and flight number
                    int cap;
                    //int variable for flight capacity
                    cout << "Enter flight number: "; getline(cin, fn);
                    //getline fn reads a whole line of text from the standard input (cin) and stores it into the string variable fn.
                    //Used for reading strings, especially those with spaces.
                    cout << "Enter departure: "; getline(cin, dep);
                    cout << "Enter destination: "; getline(cin, dest);
                    cout << "Enter capacity: "; cin >> cap;
                    //cin reads input up to the first whitespace or newline.
                    cin.ignore();

                    if (adminOption == 1)
                        flights.push_back(new Flight(fn, dep, dest, cap));
                        //if dont need push back or if not need pointers then may use vector indexing - flights[0] = Flight(fn, dep, dest, cap);
                        //new Flight(fn, dep, dest, cap) creates a new Flight object dynamically on the heap, using the constructor of the Flight class
                        //flights.push_back(...) adds the pointer to the newly created Flight object into the flights vector.
                    else if (adminOption == 2)
                        flights.push_back(new InternationalFlight(fn, dep, dest, cap, "Yes"));
                        //Yes is for passport required as all international flights requires passport
                    else if (adminOption == 3)
                        flights.push_back(new BusinessFlight(fn, dep, dest, cap));
                    else if (adminOption == 4)
                        flights.push_back(new PremiumFlight(fn, dep, dest, cap));
                    else if (adminOption == 5)
                        flights.push_back(new CargoFlight(fn, dep, dest, cap));
                }
                else if (adminOption == 6) {
                    if (flights.empty()) cout << "No flights to show.\n";
                    //flights.empty says no flights if objects are not present in the flight class then 
                    else for (auto* f : flights) f->displayDetails();
                    //The auto keyword lets C++ automatically figure out the variable type for you. Since flights contains Flight*, auto* becomes Flight*.
                    //goes through each pointer in the flights vector and gives it the name f during each loop cycle.call a fn using it.
                }
                else if (adminOption == 7) {
                    for (auto* f : flights)
                    //flights is a vector storing pointers to various flight objects.
                    //for (auto* f : flights) iterates through each flight pointer.
                        saveFlightToFile(*f, "flights.txt");
                        //calls a function to write that flight's data to a file.
                }
                else if (adminOption == 8) {
                    if (flights.size() < 2) {
                        cout << "Need at least 2 flights to compare.\n";
                        continue;
                    }
                    int i, j;
                    cout << "Enter indices of two flights to compare (1 to " << flights.size() << "): ";
                    cin >> i >> j;
                    cin.ignore();

                    if (i < 1 || j < 1 || i > flights.size() || j > flights.size()) {
                        cout << "Invalid indices.\n";
                        continue;
                    }

                    if (*flights[i - 1] == *flights[j - 1])
                        cout << "Flights have the SAME flight number.\n";
                    else
                        cout << "Flights have DIFFERENT flight numbers.\n";
                }

                else if (adminOption == 9) {
                    if (flights.size() < 2) {
                        cout << "Need at least 2 flights to combine.\n";
                        continue;
                    }
                    int i, j;
                    cout << "Enter indices of two flights to combine bookings (1 to " << flights.size() << "): ";
                    cin >> i >> j;
                    cin.ignore();

                    if (i < 1 || j < 1 || i > flights.size() || j > flights.size()) {
                        cout << "Invalid indices.\n";
                        continue;
                    }

                    Flight combined = *flights[i - 1] + *flights[j - 1];
                    cout << "Combined Booking Info:\n";
                    combined.displayDetails();
                    // Now delete and remove old flights and add combined flight
                    delete flights[j - 1];
                    delete flights[i - 1];

                    if (i > j) {
                        flights.erase(flights.begin() + i - 1);
        flights.erase(flights.begin() + j - 1);
    } else {
        flights.erase(flights.begin() + j - 1);
        flights.erase(flights.begin() + i - 1);
    }

    flights.push_back(new Flight(combined));
                    cout << "Combined flight added at new index " << flights.size() << "\n";
                }


            } while (adminOption != 0);
        }

        else if (userType == 2) {
            int passengerOption;
            do {
                cout << "\n========= Passenger Menu =========\n";
                cout << "1. View All Flights\n";
                cout << "2. Book Seats\n";
                cout << "0. Logout\n";
                cout << "==================================\n";
                cout << "Choose an option: ";
                cin >> passengerOption;
                cin.ignore();

                if (passengerOption == 1) {
                    if (flights.empty()) cout << "No flights to show.\n";
                    else for (auto* f : flights) f->displayDetails();
                }
                else if (passengerOption == 2) {
                    if (flights.empty()) {
                        cout << "No flights available.\n";
                        continue;
                    }
                    //Check if there are any flights. If the flights vector is empty, tell the user and go back to the menu.

                    for (size_t i = 0; i < flights.size(); ++i) {
                        cout << i + 1 << ". "; flights[i]->displayDetails();
                    }
                    //Display all available flights. Each flight is listed with a number (1-based index) and its details.

                    int index;
                    cout << "Select flight number to book seat: ";
                    cin >> index; cin.ignore();
                    //Ask the user to choose a flight by number (like "1" or "2").

                    if (index < 1 || index > flights.size()) {
                        cout << "Invalid index!\n";
                        continue;
                    }
                    //Validate input. If the index is invalid, go back to the menu.

                    char ch;
                    cout << "Single seat, passenger name or multiple seats? (s/p/m): ";
                    cin >> ch; cin.ignore();
                    //Ask how they want to book:- s: Single seat, p: Book by passenger name, m: Book multiple seats
                    if (ch == 's' || ch == 'S') {
                        if (flights[index - 1]->bookSeat())
                            cout << "Seat booked.\n";
                        else
                            cout << "Full flight!\n";
                    } 
                    //Tries to book 1 seat using default bookSeat() method.
                    
                    else if (ch == 'p' || ch == 'P') {
                        string name;
                        cout << "Enter passenger name: "; getline(cin, name);
                        if (flights[index - 1]->bookSeat(name))
                            cout << "Seat booked for " << name << ".\n";
                        else
                            cout << "Full flight!\n";
                    } 
                    //Tries to book 1 seat using the overloaded method bookSeat(string) and prints the name.
                    else {
                        int seats;
                        cout << "How many seats? "; cin >> seats;
                        if (flights[index - 1]->bookSeat(seats))
                            cout << "Seats booked.\n";
                        else
                            cout << "Not enough seats!\n";
                    }
                    //Tries to book multiple seats using bookSeat(int seats).

                }

            } while (passengerOption != 0);
        }

        else {
            cout << "Invalid user type. Try again.\n";
        }
    }

    // Cleanup
    for (auto* f : flights) delete f;
    //frees memory used by flight objects that were stored in RAM
    return 0;
}
