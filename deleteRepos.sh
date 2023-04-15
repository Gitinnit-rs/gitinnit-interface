#!/bin/bash

repos=(
	"neelansh15/git-test-1"
	"neelansh15/git-test-2"
	"neelansh15/git-test-4"
	"neelansh15/git-test-5"
	"neelansh15/git-test-6"
	"neelansh15/git-test-7"
)

for i in "${repos[@]}"
do
   : 
   curl -XDELETE -H 'Authorization: token XXX' "https://api.github.com/repos/$i";
   echo "https://api.github.com/repos/$i"
done