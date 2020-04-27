#!/usr/bin/env bash

rm -rf ./.configuration_save/
mkdir ./.configuration_save/
cp ./*.sh ./*.yml ./*.js ./*.xml ./package.json ./.configuration_save
pushd ./.configuration_save/
git init
git remote add origin https://github.com/shinate/blog.git
git add .
git commit -m "backup"
git push origin master:configuration --force
popd