# robot
a website with a robot

## Prereqs
- node

## Get the code
```
git clone https://github.com/robobluebird/robot`
cd robot
npm install
```

## Run the server
`ember s`

## Run tests
`ember t`
or
`ember t -s`
if you want to interact with tests via Chrome

## Two notes!
1. This project is structured as an Ember app and uses Ember.Component for most things
2. The main ROBOT logic is *not* an Ember.Model, just a plain pojo in ES6 format that happens to live in the `app/models` directory. Its unit tests are still in the Ember suite however, so they get run with `ember t`
