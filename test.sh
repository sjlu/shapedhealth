#!/bin/bash
mongo shapedhealth_test --eval "db.dropDatabase()";
NODE_ENV=test BCRYPT_WORK_FACTOR=1 mocha $1
