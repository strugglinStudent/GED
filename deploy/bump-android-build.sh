#!/usr/bin/env bash

text=$(cat ../android/app/build.gradle | grep versionCode)

IFS=' '

read -a strarr <<< "$text"

currentVersion=$( echo ${strarr[1]} | sed 's/;//' | sed 's/ //' )

timestamp=$(date +%s)
echo "PROJECT VERSION from ${currentVersion} to ${timestamp}"
sed -i -e "s/versionCode $currentVersion/versionCode $timestamp/g" ../android/app/build.gradle


text=$(cat ../android/app/build.gradle | grep versionName)

IFS=' '

read -a strarr <<< "$text"

currentMarketingVersion=$( echo ${strarr[1]} | sed 's/;//' | sed 's/ //' )
marketingVersion=$( cat ../package.json | jq -r .version )
echo "MARKETING VERSION from ${currentMarketingVersion} to ${marketingVersion}"
sed -i -e "s/versionName $currentMarketingVersion/versionName \"$marketingVersion\"/g" ../android/app/build.gradle
