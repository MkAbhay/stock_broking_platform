const fs = require("fs");

const FIRST_NAMES = [
  "Aarav",
  "Vivaan",
  "Aditya",
  "Arjun",
  "Krishna",
  "Rahul",
  "Rohan",
  "Karan",
  "Amit",
  "Vikram",
  "Neha",
  "Priya",
  "Ananya",
  "Sneha",
  "Pooja",
  "Ishita",
  "Ritika",
  "Kavya",
  "Nisha",
  "Meera",
];

const LAST_NAMES = [
  "Sharma",
  "Patel",
  "Gupta",
  "Singh",
  "Jain",
  "Agarwal",
  "Mehta",
  "Verma",
  "Kapoor",
  "Joshi",
  "Desai",
  "Reddy",
  "Nair",
  "Iyer",
  "Chopra",
];

const SYMBOLS = [
  "RELIANCE",
  "TCS",
  "INFY",
  "HDFCBANK",
  "ICICIBANK",
  "SBIN",
  "LT",
  "ITC",
  "AXISBANK",
  "MARUTI",
  "SUNPHARMA",
  "BAJFINANCE",
  "WIPRO",
  "TATAMOTORS",
  "NTPC",
];

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

function randomPAN() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let pan = "";

  for (let i = 0; i < 5; i++) {
    pan += letters[Math.floor(Math.random() * letters.length)];
  }

  pan += Math.floor(1000 + Math.random() * 9000);

  pan += letters[Math.floor(Math.random() * letters.length)];

  return pan;
}

const clients = [];
const trades = [];

/**
 * Generate Clients
 */
for (let i = 1; i <= 300; i++) {
  const first = random(FIRST_NAMES);
  const last = random(LAST_NAMES);

  clients.push({
    id: i,
    client_code: `CL${String(i).padStart(5, "0")}`,
    name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}${i}@example.com`,
    phone: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
    pan: randomPAN(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
}

/**
 * Generate Trades
 */
for (let i = 1; i <= 5000; i++) {
  const client = random(clients);

  const quantity = (Math.floor(Math.random() * 20) + 1) * 25;
  const price = +(100 + Math.random() * 3000).toFixed(2);

  trades.push({
    id: i,
    trade_id: `TR${String(i).padStart(8, "0")}`,

    // Foreign key
    client_id: client.id,

    // Useful for mock API filtering
    client_code: client.client_code,

    date: randomDate(
      new Date("2025-01-01"),
      new Date("2025-12-31"),
    ).toISOString(),

    symbol: random(SYMBOLS),

    quantity,

    price,

    brokerage: +(price * quantity * 0.0015).toFixed(2),

    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
}

const rms = [];
const rmClientMappings = [];

/**
 * Generate RMs
 */
for (let i = 1; i <= 20; i++) {
  const first = random(FIRST_NAMES);
  const last = random(LAST_NAMES);

  rms.push({
    id: i,
    employee_code: `RM${String(i).padStart(4, "0")}`,
    name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}${i}@company.com`,
    phone: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
}

/**
 * Generate RM <-> Client Mapping
 * Every client belongs to one RM
 */
let mappingId = 1;

for (const client of clients) {
  const rm = random(rms);

  rmClientMappings.push({
    id: mappingId++,
    client_id: client.id,
    rm_id: rm.id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
}

/**
 * Write files
 */
fs.writeFileSync("./seeder/clients.json", JSON.stringify(clients, null, 2));

fs.writeFileSync("./seeder/trades.json", JSON.stringify(trades, null, 2));

fs.writeFileSync("./seeder/rm.json", JSON.stringify(rms, null, 2));

fs.writeFileSync(
  "./seeder/rm_client_mapping.json",
  JSON.stringify(rmClientMappings, null, 2),
);

console.log("✅ Generated:");
console.log("   - clients.json (300 clients)");
console.log("   - trades.json (5000 trades)");
console.log("   - rm.json (20 relationship managers)");
console.log("   - rm_client_mapping.json (300 mappings)");
