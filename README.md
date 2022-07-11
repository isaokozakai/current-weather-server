# Imdex Coding Challenge Server
This is a server for a current weather search application

## Features
### Mutation
### `register`
- You can sign up with name and password *name must be unique
### Query
### `login`
- You can log in with name and password
### `cities`
- You can get details of cities including coordinates to query `weather`
### `weather`
- You can get a current wearher in coordinates

## Test Environment Setup
1. Install Insomnia, and MongoDB on your machine
2. Run `yarn install`
3. Run MongoDB
4. Run `yarn start`
5. Query `register` or `login` to get token on Insomnia
6. For querying `cities` and `weather`, put the token in Bearer Token in Auth tab
