###Initial setup:
Install rimraf (cross platform module to deal with files)
```
yarn global add rimraf
```

Clean all lock files and node_modules:
```
./bin/cleanup.sh 
```

Setup:
```
yarn install 
```

###Add a new package:
1) create a new dir under ./packages/
2) add your package to lerna.json "packages"
3) add your package as new workspace in root package.json "workspaces" 
4) add your package as a code-resource in root tsconfig.json "paths"

###Working with workspaces

#### We use lerna (or yarn) to manage dependencies in workspaces
Add dependency to all packages at once:
```
lerna add husky
```
with Yarn:
```
yarn add husky -W
```

Add local (dev) dependency to a specific workspace:
```
lerna add @zm-blood-components/common --scope=@zm-blood-components/donor
```
with Yarn:
```
yarn workspace @zm-blood-components/common add react --dev
```

#### We can use lerna (or yarn) to run command within specific package (from project root)
Run command inside a specific package from root (--stream pipes output):
```
lerna run --scope @zm-blood-components/common test --stream
```
with Yarn:
```
 yarn workspace @zm-blood-components/common build
```

#### We can use lerna to run commands in all packages
Run command in all packages:
```
lerna run build
``` 
