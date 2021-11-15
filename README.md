# Chop
## _Template parsing lib_

```
• The parameter "data" accepts object
• The parameter "template" only accepts string
• Both parameters are mandatory, if the package chop is called but missing one of the parameters, it returns an error with "template and dataset are mandatory parameters"
• By calling the "chop" package it "render" the template, replacing {{x}} with data[x], and returns the resulting string.
• The dataset only supports string & number values, and gives a useful error when we try to replace other types.
```
```js
// Example:
import { chop } from “./chop.ts”;
const dataset = {
    bread: {
        white: “white bread”,
        grain: “whole grain bread”,
        rye: “rye bread”,
    }
    cheese: “brie cheese”,
}
const myTemplate = “I like to eat {{bread.white}} and {{cheese}}”;
chop(myTemplate, dataset); // >> ‘I like to eat white bread and brie cheese’
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
npm run test:watch
```

### Run lint check
```
npm run lint
```

### To see the code test coverage run the following command and browse:
```
npm run view:coverage
```
```sh
http://localhost:3000
```

![image](https://user-images.githubusercontent.com/20913597/141831343-aee6ddc4-2bd3-4ab1-affa-6deabbbc6c99.png)

