#!/bin/bash

fuel-core run \
    --db-path ./mnt/db/ \
    --utxo-validation \
    --vm-backtrace \
    --poa-interval-period 1sec \
    --debug \
    --snapshot ./

