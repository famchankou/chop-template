# Chop
## _Template parsing lib_

```
• The parameter "data" accepts object
• The parameter "template" only accepts string
• Both parameters are mandatory, if the package chop is called but missing one of the parameters, it returns an error with "template and dataset are mandatory parameters"
• By calling the "chop" package it "render" the template, replacing {{x}} with data[x], and returns the resulting string.
• The dataset only supports string & number values, and gives a useful error when we try to replace other types.
```

### Project setup
```
npm install
```

### Compile typescript to dist folder
```
npm run build
npm run build:watch
```

### Run tests
```
npm run test
nnpm run test:watch
```

### Run lint check
```
npm run lint
```

### To see the code test coverage run the following command and browse: http://localhost:3000 
```
npm run view:coverage
```

![image](https://user-images.githubusercontent.com/20913597/141831343-aee6ddc4-2bd3-4ab1-affa-6deabbbc6c99.png)

