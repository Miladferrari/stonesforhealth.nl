#!/bin/bash

# Cleanup script voor stonesforhealth project
# Dit script ruimt oude Next.js processen op voordat dev server start

# Kill alle Next.js processen van dit project (stil)
pkill -f "stonesforhealth.*next" 2>/dev/null

# Kill processen op poort 3000 en 3001 (stil)
lsof -ti:3000 -ti:3001 2>/dev/null | xargs kill -9 2>/dev/null

# Korte pauze om processen te laten stoppen
sleep 0.5
