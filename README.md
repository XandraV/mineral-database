![contributors](https://img.shields.io/github/contributors/XandraV/crystallizer?color=gold)
![commit](https://img.shields.io/github/last-commit/XandraV/crystallizer?color=cyan)

# Crystallizer ![Alt text](/public/favicon-32x32.png)

![javascript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![react](https://img.shields.io/badge/-React-45b8d8?style=flat-square&logo=react&logoColor=white)
![styled](https://img.shields.io/badge/-Styled_Components-db7092?style=flat-square&logo=styled-components&logoColor=white)
![material-ui](https://img.shields.io/badge/-MaterialUI-0081CB?style=flat-square&logo=material-ui&logoColor=white)
![aws](https://img.shields.io/badge/-Amazon%20AWS-007ACC?style=flat-square&logo=Amazon%20Aws&logoColor=white)

A React application that allows the user to search for minerals by selecting elements in the periodic table, view the info page of a chosen mineral and a dashboard with statistics tailored to the specific mineral properties.

This project is automated with continuous deployment on [AWS Amplify](https://aws.amazon.com/amplify/) and you can visit the deployed app [here](https://master.d2773e6759xldj.amplifyapp.com/).

![Alt text](https://crystallizer.s3.eu-west-2.amazonaws.com/crystallizer.gif)

Data used in this application was collected from https://www.mindat.org using Python Request library.
The data analysis project based on this dataset can be found [here](https://github.com/XandraV/python-data-visualisation).

## Installation

Clone the master branch and then run following scripts in the project directory:


* `npm install` - to install relevant dependencies

* `npm start` - to start the react app

## Resources

| Description | Link     |
| :------------- | :------------- |
| Material-UI components - a popular React UI framework       | [Material-UI docs](https://material-ui.com/getting-started/installation/) |
| React - JavaScript library for building user interfaces            | [create-react-app](https://github.com/facebook/create-react-app)          |
|AWS Amplify |  [Amplify](https://aws.amazon.com/amplify/)
| React Konva for drawing complex canvas graphics  | [React Konva docs](https://konvajs.org/docs/react/) |
| React-vis visualization library | [React-vis docs](https://uber.github.io/react-vis/documentation/getting-started/creating-a-new-react-vis-project) |
| Mindat online database of minerals | [Mindat](https://www.mindat.org/)|

## Created with create-react-app

This app was created with [create-react-app](https://github.com/facebook/create-react-app), see usage guidelines in [create-react-app-readme.md](create-react-app-readme.md)
