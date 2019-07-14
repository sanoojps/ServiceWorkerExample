// Listen for install event, set callback
self.addEventListener("install", function(event) {
  // Perform some task
  console.log("install");
  self.skipWaiting();
  response_received = false;
});

self.addEventListener("activate", function(event) {
  // Perform some task
  console.log("activate");
});

self.addEventListener("fetch", function(event) {
  console.log("The service worker is serving the asset.");

  // intercept request
  // make it wait
  // event.waitUntil(post_intercept_promise);
  // till a var is set

  handle_fetch(event);
});

const handle_fetch = async event => {
  console.log("Fetch event for ", event.request.url);
  var req = event.request.clone();

  if (req.clone().method == "GET") {
    // handle GET
  }

  if (req.clone().method == "POST") {
    // event.waitUntil(
    //     post_intercept_promise
    // );

    console.log(
        "POST EVENT"
    );

    let result = await post_intercept_promise(); // wait till the promise resolves (*)

    console.log("result");
    console.log(result); // "done!"

    // handle POST
    console.log(req.clone());
  }
};

var response_received = false;
const set_response_received = value => {
  response_received = value;
};

// const fulfill_post_intercept_promise = () => {
//     promise.resolve();
// }

const post_intercept_promise = () => {

    console.log(
        "post_intercept_promise calling"
    );

    return new Promise(function(resolve, reject) {
        // do a thing, possibly async, then…
        // if (response_received) {
        //   resolve("Stuff worked!");
        // }
        // else {
        //   reject(Error("It broke"));
        // }
      
        // inefficient polling
        // while(true)
        // {
        //      if(response_received === true)
        //      {
        //          resolve("Stuff World");
        //          break
        //      }
        // }
      
      console.log(
          "new Promise(function(resolve, reject)"
      );
      
        // poll to see if response_received flag is set
        const poll = setInterval(polling, 10);
      
        function polling() {
          if (response_received) {
            clearInterval(poll);
            resolve("GOT IT");
          } else {
              console.log(
                  "Waiting FOr Resolve"
              );
          }
        }
      
      })
    //   .then(success => {
    //     console.log("from_promise_then");
    //     console.log(success);
    //   })
      ;

} 

//   post_intercept_promise.then(function(result) {
//     console.log(result); // "Stuff worked!"
//   }, function(err) {
//     console.log(err); // Error: "It broke"
//   });

// communicate with main js
addEventListener("message", event => {
//   console.log(`${post_intercept_promise}`);

  if (event.data == "RESOLVE") {
    // const fulfilled_promise =
    // Promise.resolve(post_intercept_promise);

    // fulfilled_promise.then((success_message) => {
    //     console.log(`Promise Resolved - ${success_message}`);
    // }
    // );

    // // console.log(`${post_intercept_promise.e}`);

    // post_intercept_promise.resolve(10);

    set_response_received(true);
  } else {
    console.log(`The client sent me a message: ${event.data}`);
  }

  // console.log(`The client sent me a message: ${event.data}`);
});
