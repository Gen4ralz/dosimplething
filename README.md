1. Create Next App
   1. npx create-next-app
   2. add @mui library
2. Publish to github
   1. create github account
   2. push to github from vs code
3. Create Website Layout
   1. Add header
   2. Add main
   3. Add footer
4. List Products
   1. add data.js
   2. add images
   3. render products
5. Route Product Details Page
   1. Make Product cards linkable
   2. Create /product/[slug] route
   3. find product based on slug
6. Create Product Details Page
   1. Create 3 columns
   2. Show image in first column
   3. Show product info in second column
   4. show add to cart action on third column
   5. add styles
7. Connect to MongoDB
   1. Install mongoDB
   2. Install mongoose
   3. define connect and disconnect
   4. use it in the api
8. Create Products API
   1. create product model
   2. seed sample data
   3. create /api/products/index.js
   4. create product api
9. Fetch Products From API
   1. use getServerSideProps()
   2. get product from db
   3. return data as props 4. use it in product screen too
10. Create Application Context
    1. define context and reducer
    2. create store provider
    3. use it on layout
11. Implement Add to cart
    1. define cart in context
    2. dispatch add to cart action
    3. set click event handler for button
    4. Show notification by notistack
    5. show cart items in the header menu
12. Create Cart Screen
    1. create cart.js
    2. redirect to cart screen
    3. use dynamic from next.js
    4. use context to get cart items
    5. list items in cart items
13. Convert Cart Screen To Dynamic Component
    1. Use next/dynamic
    2. Wrap cart in dynamic without ssr
14. Update Remove Items In Cart
    1. Implement onChange for Select
    2. implement delete button handler
15. Create Login Screen
    1. create form
    2. add email and password field
    3. add login button
    4. style form
16. Create Sample Users
    1. create user model
    2. add sample user in seed api
17. Build Login API
    1. use jsonwebtoken to sign token
    2. implement login api
18. Complete Login Screen
    1. handler form submission
    2. add userInfo to context
    3. save userInfo in cookies
    4. show user name in nav bar using menu
19. Create Register Page
    1. create form
    2. implement backend api
    3. redirect user to redirect page
20. Login and Register Form Validation
    1. install react-hook-form
    2. change input to controller
    3. use notistack to show errors
21. Create Shipping Page
    1. create form
    2. add address fields
    3. save in Contexts Cookies
22. Create Payment Page
    1. create form
    2. add radio buttom
    3. save method in context
23. Create Place Order Page
    1. display order info
    2. show order summary
    3. add place order button
24. Implement Place Order Action
    1. create click handler
    2. send ajax request
    3. clear cart
    4. redirect to order screen
    5. create backend api
25. Create Order Details Page
    1. create api to order info
    2. create payment, shipping and items
    3. create order summary
26. Pay Order By PayPal
    1. install paypal button
    2. use it in order screen
    3. implement pay order api
27. Display Orders History
    1. create orders api
    2. show orders in profile screen
28.
29. Create Admin Dashboard
    1. Create Admin Menu
    2. Add Admin Auth Middleware
    3. Implement admin summary api
30. List Orders For Admin
    1. fix isAdmin middleware
    2. create orders page
    3. create orders api
    4. use api in page
31. Deliver Order
    1. create deliver api
    2. add deliver button
    3. implement click handler
32. List Products For Admin
    1. create products page
    2. create products api
    3. use api in page
33. Create Product Edit Page
    1. create edit page
    2. create api for product
    3. show product data in form
34. Upload Product Image
    1. create cloudinary account
    2. get cloudinary keys
    3. create upload api
    4. upload files in edit page
35. Create and Delete Products
    1. add create product button
    2. build new product api
    3. add handler for delete
    4. implement delete api
36. List Users for Admin
    1. create user page
    2. create user api
    3. use api in page
37. Create User Edit Page
    1. create edit page
    2. create api user
    3. show user data in form
