# Polling
Polling System Apis

Import the postman Collection in the repository in your postman workspace.

In Postman set environment variable:-
  base_url : https://polling-system-ahbk.onrender.com
Or else: 
  Clone the repository in your local system and run the follwing command in project directory:-
    npm install
    npm start
  Now in Postman set environment variable:-
    base_url : http://localhost:8000
  
   
  
The Polling Apis are:- 
- /question -> To view All the Questions Available
- /question/create -> To create a question
- /question/:id/options/create -> To add option to a specific question
- /question/:id/delete -> To delete a question
- /option/:id/delete -> To delete an option
- /option/:id/add_vote -> To increment the count of votes
- /question/:id -> To view a question and it’s options by question id
