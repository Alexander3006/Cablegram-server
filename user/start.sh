#!/bin/bash

npm run migration:create user
npm run migration:generate user 
npm run migration 
npm run start:dev