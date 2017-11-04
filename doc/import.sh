#!/usr/bin/env bash

mongoimport --host localhost --port 27017 -u 'tracker-user' -p 'welcome1' --authenticationDatabase admin --db tracker --collection locations --file ./data.json --jsonArray
