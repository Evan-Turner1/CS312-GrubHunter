db = db.getSiblingDB(process.env.DB_NAME || "grubhunter");

db.locations.deleteMany({});

db.locations.insertMany([
  {
    name: "TacoBell",
    address: "123 Main St",
    street: "Main St",
    zipcode: "46303",
    borough: "Downtown",
    cuisine: "Tex-Mex",
    grade: "A",
    on_wishlist: ["user1", "user2"],
    location_id: "1001"
  },
  {
    name: "McDonald's",
    address: "456 Avenue Ave",
    street: "Avenue Ave",
    zipcode: "46304",
    borough: "Uptown",
    state: "IN",
    cuisine: "American",
    grade: "C",
    on_wishlist: ["user3", "user4"],
    location_id: "1002"
  },
  {
    name: "Sally's Donuts",
    address: "789 Road Rd",
    street: "Road Rd",
    zipcode: "46305",
    borough: "Midtown",
    state: "IN",
    cuisine: "Breakfast",
    grade: "B",
    on_wishlist: ["user5", "user6"],
    location_id: "1003"
  }
]);

print("MongoDB seeded successfully.");