#!/usr/bin/env bash

VERSION_TAG=VERSION-TAG-CI
CI_PROJECT_ID=CI-PROJECT-ID-CI
CI_PROJECT_NAME=CI-PROJECT-NAME-CI

echo "VERSION_TAG $VERSION_TAG"
echo "CI_PROJECT_ID $CI_PROJECT_ID"
echo "CI_PROJECT_NAME $CI_PROJECT_NAME"

[ -d dist ] || mkdir dist
[ -d dist/$CI_PROJECT_NAME ] || mkdir dist/$CI_PROJECT_NAME
[ -d dist/$CI_PROJECT_NAME/browser ] || mkdir dist/$CI_PROJECT_NAME/browser

echo "mkdir dist/$CI_PROJECT_NAME/browser"

cd deploy || exit

sed -i -e "s/PROJECT-ID-CI/$CI_PROJECT_ID/g" ./.npmrc
sed -i -e "s/REGISTRY_PASSWORD-CI/$ACCESS_TOKEN/g" ./.npmrc

npm i $CI_PROJECT_NAME@$VERSION_TAG

echo "npm i $CI_PROJECT_NAME@$VERSION_TAG DONE"

cp -R ./node_modules/$CI_PROJECT_NAME/* ../dist/$CI_PROJECT_NAME/browser

cd .. || exit

echo "ls -a ./dist/$CI_PROJECT_NAME/browser"
ls -a ./dist/$CI_PROJECT_NAME/browser

echo "cat package.json"
cat ./dist/$CI_PROJECT_NAME/browser/package.json

echo "DONE"
