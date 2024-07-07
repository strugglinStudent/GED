#!/usr/bin/env bash

text=$(cat ../ios/App/App.xcodeproj/project.pbxproj | grep CURRENT_PROJECT_VERSION)

IFS='='

read -a strarr <<< "$text"

currentVersion=$( echo ${strarr[1]} | sed 's/;//' | sed 's/ //' )

timestamp=$(date +%s)
echo "PROJECT VERSION from ${currentVersion} to ${timestamp}"
sed -i -e "s/CURRENT_PROJECT_VERSION = $currentVersion;/CURRENT_PROJECT_VERSION = $timestamp;/g" ../ios/App/App.xcodeproj/project.pbxproj


text=$(cat ../ios/App/App.xcodeproj/project.pbxproj | grep MARKETING_VERSION)

IFS='='

read -a strarr <<< "$text"

currentMarketingVersion=$( echo ${strarr[1]} | sed 's/;//' | sed 's/ //' )
marketingVersion=$( cat ../package.json | jq -r .version )
echo "MARKETING VERSION from ${currentMarketingVersion} to ${marketingVersion}"
sed -i -e "s/MARKETING_VERSION = $currentMarketingVersion;/MARKETING_VERSION = $marketingVersion;/g" ../ios/App/App.xcodeproj/project.pbxproj
