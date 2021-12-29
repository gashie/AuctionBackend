# AuctionBackend

> Scopic Auction platform built with the MERN stack & Redux.

## Features


- Product listings
- Bid on product
- Auto Bid on product
- Top products carousel


## Usage

## DOCKER
```
FROM node:15
WORKDIR /app 
COPY package.json .
RUN npm install
COPY . ./
EXPOSE 3117
CMD ["npm", "run", "dev"]
```

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 3117
DB_DATABASE=auction
```

### Install Dependencies (backend)

```
npm install
```

### Run

```
# Run App (:3117) & backend (:3117)
npm run dev

```


```
Sample User Logins

user1 (Customer)
user1

user2 (Customer)
user2
```


## License
SCOPIC

