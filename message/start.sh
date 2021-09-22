#!/bin/bash
npm run migration:create message
npm run migration:generate message 
npm run migration 
npm run start:dev