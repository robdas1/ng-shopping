# NgShopping

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

- Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
- Run `ng test --code-coverage` to get a code coverage report.
- Run `ng test --watch=false` to execute the unit tests only once and then exit.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Deployment to GitHub Pages

### Initial setup

- Create ng-shopping repo on GitHub.

- Create ng-shopping project locally.
```
ng new ng-shopping
cd ng-shopping
```
- Connect local project to remote repo.
```
git remote add origin https://github.com/robdas1/ng-shopping.git
```
- Add angular-cli-ghpages to project.
```
ng add angular-cli-ghpages
```
- Push local code to GitHub repo.
```
git add .
git commit -m "initial commit"
git push -u origin main
```


- Deploy project to GitHub Pages (this will deploy what is currently on the local computer but will not push the code to the remote repo).
```
ng deploy --repo=https://github.com/robdas1/ng-shopping.git --base-href=/ng-shopping/ --dir=dist/ng-shopping/browser
```

- After this is done, verify the GitHub Pages settings are correct, online in the repo.

![Verify GitHub Pages Settings](readme-images/verify-gh-pages-settings.jpg)


### On-going 

#### Push Code 
```
git add .
git commit -m "[commit comment]"
git push
```

#### Re-deploy App
```
ng deploy --repo=https://github.com/robdas1/ng-shopping.git --base-href=/ng-shopping/ --dir=dist/ng-shopping/browser
```

### Git production branches

#### main
This is the main production  branch that has the code. In the olden day we used to call this the master branch.

#### gh-pages  
This is the branch that hosts the deployed app.

### Deployment references

[Angular CLI Deploy Documentation](https://angular.dev/cli/deploy)

[npm angular-cli-ghpages](https://www.npmjs.com/package/angular-cli-ghpages)

[Host Angular on GitHub - video](https://youtu.be/C6cRSJayS_g?si=91hU1O_DuII7jpx9)



### Deployment troubleshooting

#### Q: I encountered the error  
`fatal: The current branch main has no upstream branch.`  

when running the deployment script. How do I fix this?

A: This error occurs because the `main` branch does not have an upstream branch set. You can resolve this by running the following command:

```sh
git push --set-upstream origin main
```


#### Q: I encountered the error  
`cannot open file:///e%3A/GitHub/ng-shopping/.angular/cache/18.1.2/vite/deps_temp_afd4ac51/chunk-OYXLHNU7.js. Detail: Unable to read file 'e:\GitHub\ng-shopping.angular\cache\18.1.2\vite\deps_temp_afd4ac51\chunk-OYXLHNU7.js' (Error: Unable to resolve nonexistent file 'e:\GitHub\ng-shopping.angular\cache\18.1.2\vite\deps_temp_afd4ac51\chunk-OYXLHNU7.js')`  

when chatting with GitHub copilot. 

A: The error is related to the angular cache, which may have been corrupted. Try clearing out and reseting the cache by deleting the `.angular\cache` directory. This will force angular to regenerate the cache the next time you build or serve your application. Here's how you can clear the cache and build the app.

```powershell
Remove-Item -Recurse -Force .angular\cache
ng build
```

#### Additional steps  
- Close any open terminals that might be referencing the cache. 
- Restart VSCode and create a new Chat.
- Delete node_modules and run npm install  



## Setup for Angular Router




### Angular Router references 
[Angular Routing Overview](https://angular.dev/tutorials/learn-angular/12-enable-routing)
