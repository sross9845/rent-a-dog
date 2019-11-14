# Rent a Dog

## Technologies Used
- Petfinder API
- React.js
- MongoDB/Mongoose
- Express
- Node.js

## What exactly is Rent a Dog?
Have you ever wanted to see what the animal you want to adopt will look like in your future pictures? Rent a Dog is a service that is trying to make the adoption process more RAD. You can go onto our app see how you look with a certain dog in your photo and then proceed to either rent or adopt the dog. We are using the PetFinder API to find the dogs to be supplied for the picture creating process. You can save these dogs which will allow you to see their adoption/rental info. We are hoping this can be the new way people want to adopt dogs. Now get on in there and adopt through the RAD process.
## Link To Site

## Team

Sean - Git Master and Front-End

Nick - Api Headsmasher and Back-End

## Official Planning Day
We started with a brainstroming session where we came up with a variety of our favorite ideas. We wante to make a project that was going to be both fun to work on and view, but meaningful as well. The idea we settled on had the adoption of dogs component to help make it have real world applicability, but also had the combining of photos component which was more for fun and help people enjoy the idea of finding dogs. 

After planning the overall idea we then needed to plan all of our pages and where state was going to be passed and the routes that needed to have axios calls. 
![Image of whiteboard](/readme/whiteboard.png)
![Image of whiteboard](/readme/whiteboard2.png)

## Day Two
Today our plan was to defeat PetFinder's OAuth. Unfortunately this was easier and harder than we thought. This OAuth only had parts of OAuth, it did not require a sign in but gave us a Token still. After figuring this out we had an easier time getting the token. We had planned for the whole day but instead we got this to work by about lunch. The rest of the day was spent getting our data to flow onto the page. We got the NavBar and Routing figured out just to show info as we get it. 

![Image of token code](/readme/token.png)


## Day Three 
This day was all about getting the data flowing to all of the various routes. We worked through writting all of the token based api calls and save the relevent details to the database. Once we were able to call the api on every page the decisions became based off what data was needed where and where it needed to involve saving. Places where we display anything needed state, and the state was passed to all but one page for calling to database with. 

## Day Four 
Today was figuring out Cloudinary in React. It again as some things before did not take us as long as we thought it was going to. With the power of Cloudinary in our hands we are finally able to create our create route fully. We then spent the day doing styling and getting pages like the Adopt/Meet route figured out. With the main task done for the day the rest way finishing up smaller tasks. Luckily we were able to get this masterpiece of a photo comparison figured out below. 

![Image of token code](/readme/Keanu.png)


## Day Five - Wednesday
We worked a lot on styling this day and tried to make a route that shows all users. This ended up being more difficult than originally thought. We solved it though, and now that route is included in the app. There were multiple ways to solve this problem and we ended up going with a route that might not be optimized, but was less than nested for loops.

## Day Six
Today we finished up the back end comparison function to see how many times a dog is favorited across all users. That was a huge pain to do but we got it figured out. Other than that today was cleaning up the styling/code. We fixed a few bugs the main one involving the password field on the profile page. It was a good last day before presentations. The code is functioning as of right now and the styling looks well put together at least to the abilities of a team of two in a week.

