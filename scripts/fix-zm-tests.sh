echo Please enter branch name MF
read branchname

echo Checking out $branchname ...
git checkout $branchname

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
