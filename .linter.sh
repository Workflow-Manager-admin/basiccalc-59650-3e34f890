#!/bin/bash
cd /home/kavia/workspace/code-generation/basiccalc-59650-3e34f890/basiccalc
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

