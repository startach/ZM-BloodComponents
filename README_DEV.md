Add a new package:
1) create a new dir under ./packages/
2) add your package to lerna.json "packages"
3) add your package as new workspace in root package.json "workspaces" 
4) add your package as a code-resource in root tsconfig.json "paths"







Clean all lock files and node_modules:
```
./bin/cleanup.sh 
```

Setup:
```
yarn install 
```

Run command inside a specific package:
```
yarn workspace @zm-blood-components/common build
```

Run command in all packages:
```
lerna run build
``` 

Add global (dev) dependency:
```
yarn add husky --dev -W
```

Add local (dev) dependency to a specific workspace:
```
yarn workspace @zm-blood-components/common add react --dev
```

