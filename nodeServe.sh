# # Run the full project with a single command 

# Clear the running ports 
echo "Clearing running ports..."
pm2 stop all
pm2 delete all
fuser -k 3003/tcp 
fuser -k 3001/tcp
fuser -k 3002/tcp
fuser -k 8080/tcp

# Start employees Module
echo "Starting the employees module..."
cd employees || exit
rm -rf node_modules
rm -f package-lock.json
# npm install
npm run start &
npm run serve &

# Start customer Module
echo "Starting the customer module..."
cd ../customer || exit
rm -rf node_modules
rm -f package-lock.json
npm run start &
npm run serve &

# Start bus Module
echo "Starting the bus module..."
cd ../bus || exit
rm -rf node_modules
rm -f package-lock.json
# npm install
npm run start &
npm run serve &

# Start My-Gateway
echo "Starting the Gateway Module..."
cd ../expressGateway || exit
rm -rf node_modules
rm -f package-lock.json
npm run start &
npm run serve &

# Start # Start ticketBooking
echo "Starting the ticketBooking Module..."
cd ../ticketBooking || exit
rm -rf node_modules
rm -f package-lock.json
npm install
npm run start &
npm run serve &

# Start # Start feedback
echo "Starting the feedback Module..."
cd ../feedback || exit
rm -rf node_modules
rm -f package-lock.json
npm install
npm run start &
npm run serve &

echo "All modules started."



