#!/bin/bash
npm test &&
npm run build:prod &&
npm run dev &&
cd dist/src/ &&
npm publish
