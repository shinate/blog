#!/usr/bin/env node

const { readFileSync, writeFileSync } = require('jsonfile');
const makedir = require('make-dir');
const path = require('path');
const inputFilePath = path.resolve(__dirname, 'db.json');
const outputFilePath = path.resolve(__dirname, 'public/search-index.json');
const moment = require('moment');

let outputDir = path.dirname(outputFilePath)

let data = readFileSync(inputFilePath);

let Post = data.models.Post.map(function (item) {
    return {
        title  : item.title,
        slug   : item.slug,
        content: item._content.replace(/#+[\x20]/g, '').replace(/`{3}\w*/g, '').replace(/\n+/g, ' '),
        date   : moment(item.date).format('x') * 1,
        updated: moment(item.updated).format('x') * 1,
        size   : item.raw.length
    }
});

makedir.sync(outputDir);
writeFileSync(outputFilePath, { Post });