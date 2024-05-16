## Keeping it Simple

Achieve your academic potential

### Documentation

- [Setup](/SETUP.md)

### Progress

1. Completed

   - backend setup with basic authentication
   - test suite setup with coverage reporter
   - api to support feature in question
     - search tutors
     - tutor profile
     - tutor request
   - basic unit and integration tests
   - web setup with react, vite and tailwindcss

2. Todo

   - web pages
   - api integrations

### Challenges

### Codebase Improvements

1. Testing

   - Adding more tests for APIs, handling all possible variations with maximum coverage
   - Improving test suite to use **transactions** instead of normal connection (planned but not yet implemented)
   - Using **seed** for randomization, repeatable tests

2. Database

   - Introducing **RLS** for the tables
   - Improving setup to use Role Based transactions with knex.js (needs research, but it will awesome 😎)
   - Adding more constraint checks for values that we know will be of fix size/length

3. API

   - Improving search api to accept, variable no of options for each column (may be overkill)

4. Web

   - Ideally all values for filters should be fetched from backend with APIs. But in this case, we can keep it constants.
   - Add a cross to remove the filter.

### Feature Improvements

- Introduce reviews/ratings for tutors, students who have been tutored in the past can submit reviews for each tutor.
- Add a sample lecture demo for students to view, how the tutor teaches.
