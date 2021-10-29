#!/bin/bash

rm -rf dist
npm run build:dev
npm run dev
cd dist/src
npm i -g
