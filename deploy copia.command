#!/bin/bash
cd desktop/dev/etrust
npm run build
cp -R app/build/ api/public
