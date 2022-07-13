# **image-processing-api**

This project is part of advanced full-stack web development  by Udacity to process images via Express and typescript

# **What the project dose?**

This API take's a jpeg photo from the user and a width and height in px, then resize the original image to the target size.

# **How to setup the project?**

1. pull the repo.
2. run "npm install"

# **How to run the API**

1. place your jpeg photo inside "./assets/ful" folder
2. run "npm run start" to start the server.
3. go to "http://localhost:3000/image/?filename=<your_image_name>&width=<target_width>&height=<target_height>"
4. Add your image name without the '.jpeg' extension.
5. after visiting this URL a resized version of your image will aper on your screen.
6. The resized image will be saved inside "./assets/thumb" folder to be cashed when requested twice.
7. run "npm run test" to run jasmine tests.
8. run "npm run lint" to run ESLint.
9. run "npm run prettier" to run prettier.

# **Things to improve in the future:**

1. Add more testing units
2. Improve validating input's code
3. Add more features

