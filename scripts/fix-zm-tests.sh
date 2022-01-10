echo Please enter branch name MF
read branchname

echo Checking out $branchname ...
git checkout origin/$branchname

echo Running prettier 
yarn run style

echo Fixing Donor tests
yarn run test-update-donor

echo Fixing Coordinator tests
yarn run test-update-coordinator

echo Creating a commit just for you
git add *
git commit -m "Fixing tests"

echo Pushing to origin
git push

echo Returning to master
git checkout origin/master
