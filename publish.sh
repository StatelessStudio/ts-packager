#!/bin/bash
npm run test:prod &&
npm run dev &&
cd dist/src/ &&
npm publish
