# webstore
## Instructions on how to run this code
* Please install `docker-compose` and `node` (can work with node 8, 10 or the latest 12)
```sh
git clone https://github.com/rickx34/webstore.git
cd webstore
docker-compose up -d
npm install && node index.js
```
* Please go to `localhost:3000` in your browser to see the demo 

* The API's documentation is avaliable at `http://localhost:3000/apidocs`

Note: Starting up express server everytime would delete the existing tables and recreate them, this feature can be disabled by removing `{ force: true }` from Model.sync() in `models` directory
