# [Anonymous Message Board](https://www.freecodecamp.org/learn/information-security/information-security-projects/anonymous-message-board)

## FreeCodeCamp Information Security Project - helmet.js

---

### instruction

- Set NODE_ENV to test without quotes when ready to write tests and DB to your databases connection string (in .env)
- Recommended to create controllers/handlers and handle routing in routes/api.js
- You will add any security features to server.js

### Write the following tests in tests/2_functional-tests.js:

1. Creating a new thread: POST request to /api/threads/{board}
2. Viewing the 10 most recent threads with 3 replies each: GET request to /api/threads/{board}
3. Deleting a thread with the incorrect password: DELETE request to /api/threads/{board} with an invalid delete_password
4. Deleting a thread with the correct password: DELETE request to /api/threads/{board} with a valid delete_password
5. Reporting a thread: PUT request to /api/threads/{board}
6. Creating a new reply: POST request to /api/replies/{board}
7. Viewing a single thread with all replies: GET request to /api/replies/{board}
8. Deleting a reply with the incorrect password: DELETE request to /api/replies/{board} with an invalid delete_password
9. Deleting a reply with the correct password: DELETE request to /api/replies/{board} with a valid delete_password
10. Reporting a reply: PUT request to /api/replies/{board}

---

### test

#### notice - if I hide the delete_password and reported field on test 6, the test 4 won't pass because of the bug in fcc testing function. So these two fields are shown to the client.

1. Only allow your site to be loaded in an iFrame on your own pages.

2. Do not allow DNS prefetching.

3. Only allow your site to send the referrer for your own pages.

4. You can send a POST request to /api/threads/{board} with form data including text and delete_password. The saved database record will have at least the fields \_id, text, created_on(date & time), bumped_on(date & time, starts same as created_on), reported (boolean), delete_password, & replies (array).

5. You can send a POST request to /api/replies/{board} with form data including text, delete_password, & thread_id. This will update the bumped_on date to the comment's date. In the thread's replies array, an object will be saved with at least the properties \_id, text, created_on, delete_password, & reported.

6. You can send a GET request to /api/threads/{board}. Returned will be an array of the most recent 10 bumped threads on the board with only the most recent 3 replies for each. The reported and delete_password fields will not be sent to the client.

7. You can send a GET request to /api/replies/{board}?thread_id={thread_id}. Returned will be the entire thread with all its replies, also excluding the same fields from the client as the previous test.

8. You can send a DELETE request to /api/threads/{board} and pass along the thread_id & delete_password to delete the thread. Returned will be the string incorrect password or success.

9. You can send a DELETE request to /api/replies/{board} and pass along the thread_id, reply_id, & delete_password. Returned will be the string incorrect password or success. On success, the text of the reply_id will be changed to [deleted].

10. You can send a PUT request to /api/threads/{board} and pass along the thread_id. Returned will be the string success. The reported value of the thread_id will be changed to true.

11. You can send a PUT request to /api/replies/{board} and pass along the thread_id & reply_id. Returned will be the string success. The reported value of the reply_id will be changed to true.

12. All 10 functional tests are complete and passing
