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
   - web pages
   - api integrations

2. Todo

   - none

### Challenges

- No challenges in particular
- Have implemented search functionality several times in different ways. I like to implement the search API exactly like it is now. Using knexjs, as SQL query builder, does give you a bit of flexibility, not an orm, but there's fun in writing raw queries (safe ones)
- Frontend can be a bit tricky, with all the UI component setup, CSS, libraries, and build systems. Getting this project set up was a bit tedious and took a lot of time.
- I had a backend project setup, which I have reused and tweaked it as per my needs. I'm quite familiar with the hapi ecosystem at this point.

### Codebase Improvements

1. Testing

   - Adding more tests for APIs, handling all possible variations with maximum coverage
   - Improving test suite to use **transactions** instead of normal connection (planned but not yet implemented)
   - Using **seed** for randomization, repeatable tests

2. Database

   - Introducing **RLS** for the tables
   - Improving setup to use Role Based transactions with knex.js (needs research, but it will be awesome 😎)
   - Adding more constraint checks for values that we know will be of fixed size/length

3. API

   - Improving search API to accept, a variable number of options for each column (may be overkill)

4. Web

   - Ideally, all values for filters should be fetched from the backend with APIs. But in this case, we can keep it constant.
   - Add a cross icon to remove the filter.
   - Can add unit tests for widgets/views (react-testing-library)
   - The UI is responsive but can be polished even more.

### Feature Improvements

- Introduce reviews/ratings for tutors, students who have been tutored in the past can submit reviews for each tutor.
- Add a sample lecture demo for students to view, how the tutor teaches.
- Maybe add an integrated chat system between tutor and student even before getting started? (scammers)
