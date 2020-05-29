#!/usr/bin/env bash

node search-index.js
mv public/search-index.json ./
rm -rf public/*
mv search-index.json public