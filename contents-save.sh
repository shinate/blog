#!/usr/bin/env bash

contents_save_path=".contents_save"
source_paths="source scaffolds _config.yml package.json scripts/.gitignore"

rm -rf ${contents_save_path}
echo ">> Clear old files"
mkdir -p ${contents_save_path}
\cp -r ${source_paths} ${contents_save_path}
echo ">> Files copied"
pushd ${contents_save_path}
rm -rf .git
git init
git remote add origin https://github.com/shinate/blog.git
git add .
git commit -m "backup"
git push origin master:contents --force
popd
echo "Contents backup completed!"
rm -rf ${contents_save_path}
exit 0