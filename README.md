# React-Alarm-Clock

Alarm Clock Application to show how the react redux application works and how the data flows in application.

# Steps to run applicaiton : 
1) clone this repo or download this folder in some folder
2) run following commands : 
   npm install
   npm start

# Application Structure : 
 actions : All redux action creators and action type constants are here
 reducers : Alarm reducer is here
 component : All components (Higher order and Lower Order / Functional and Class based ) used in application are here 
 
 # Main files :
 main.js : react application starts from here.
           In this file I have defined redux store and rendering the Root component on DOM.
           Also I have added utility functions so that changes in redux state are persisted in localStorage.
            
 root.js : Root component is defined here.

 components/Routes.js : All routes used in application defined here 
 
 webpack.config.js : configuration for webpack dev server 
 
 # Applicaiton Routes : 
 
 home : default root 
        you will see Clock component
        
 alarms : this route will contain all alarms related funcionality 
          i.e. Add/Edit/Delete Alarm, Show Alarm Details when alarm is on 
         
         
 

