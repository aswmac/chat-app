# chat-app

prompt as given to local llm ollama qwen2.5-coder:32b
<h3>
Write a server and webpage that uses node express and websockets. The server has the necessary connections and expects to run on port 3000. On the web page,  have two chat windows where text can be input for the one respective side of the chat. The windows will be claimed first come first serve, where only one client can have control of the one text input window. When one person claims one window, then what they type is seen live in all viewer's version of that window. The typing should be transmitted live. There are buttons that claim the window and release the window in order to have only one user at a time with that text window. When a user claims a window, the server is notified and a message is printed to the console. Also a message when the window claim is released. Anyone viewing the webpage will be able to see the live text regardless of if they have a claim to a window or not.
</h3>

It gave the two files server.js and index.html and talked about running npm init -y.
I further had to do 'npm install express' and 'npm install socket.io' as I did not know that those installations happen local to the directory. The directory on my pi machine is 'chat-app'

The functionality is not quite what I wanted mainly because the enter key has to be pressed for the text to show up on the other client window. Also, the claim button and the release button seem to work well, but I would prefer if the release did not work unilaterally (the other user can release the first user), though really an extra "do you really want to release the other user?" popup probably is best since otherwise a lock remaining from a user that may not be able to release would make problems.

Also, the typed text is not saved anywhere, and is not persistent because on close and reconnect the messages are gone. I would like to have a title like the date maybe that keeps the text like a record/notebook.
