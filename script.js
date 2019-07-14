document.addEventListener(
  "DOMContentLoaded",
  function() {
    alert("Ready!");
    configureBtn();
    unregister_all_service_workers();
    register_service_worker();
  },
  false
);

const find_button = selector => {
  return document.querySelector(selector);
};

// button click handler
const onBtnClick = event => {
  //   alert(event);

  if (event.target.classList.contains("basic")) {
    console.log("basic button clicked");

    get_active_service_worker().postMessage("Button CLicked! Walhallah!");
    // navigator.serviceWorker.getRegistrations().then(registrations => {
    //     registrations.forEach(registration => {
    //       // assuming there is only one
    //       registration.active.postMessage("Button CLicked! Walhallah!");
    //     });
    //   });

    post_this();
  }

  if (event.target.classList.contains("resolve")) {
    console.log("resolve button clicked");

    get_active_service_worker().postMessage("RESOLVE");
    // navigator.serviceWorker.getRegistrations().then(registrations => {
    //     registrations.forEach(registration => {
    //       // assuming there is only one
    //       registration.active.postMessage("RESOLVE");
    //     });
    //   });
  }
};

const configureBtn = () => {
  var btn = find_button(".basic");
  btn.addEventListener("click", onBtnClick);

  btn = find_button(".resolve");
  btn.addEventListener("click", onBtnClick);
};

const push_response = (xhr, response) => {
  console.log(response);
  console.log(xhr.status);
};

const post_this = () => {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://jsonplaceholder.typicode.com/posts", true);

  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

  xhr.onreadystatechange = () => {
    // Call a function when the state changes.
    if (
      xhr.readyState === XMLHttpRequest.DONE &&
      (xhr.status === 200 || xhr.status === 201)
    ) {
      // Request finished. Do processing here.
      //   console.log(xhr.status);
      push_response(xhr, xhr.response);
    } else {
      push_response(xhr, xhr.response);
    }
  };

  xhr.send(
    JSON.stringify({
      title: "foo",
      body: "bar",
      userId: 1
    })
  );
  // xhr.send(new Int8Array());
  // xhr.send(document);
};

var _active_service_worker = null;

const get_active_service_worker = () => {
  if (_active_service_worker) {
    return _active_service_worker;
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => {
        // assuming there is only one
        _active_service_worker = registration.active;
        return _active_service_worker;
      });
    });
  }

  return _active_service_worker;

};

// un register all service workers
const unregister_all_service_workers = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => {
        registration.unregister();
      });
    });
  }
};

// register a service worker
const register_service_worker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function(registration) {
        console.log("Registration successful, scope is:", registration.scope);
        handleServiceWorkerActive(registration);
      })
      .catch(function(error) {
        console.log("Service worker registration failed, error:", error);
      });
  }
};

function handleServiceWorkerActive(registration) {
  if (registration.active) {
    const serviceWorker = registration.active;
    _active_service_worker = serviceWorker;
    // const button = document.querySelector('#worker-message');
    // button.addEventListener('click', ()  => {
    //     serviceWorker.postMessage('Hi service worker');
    // });

    serviceWorker.postMessage("Hi service worker");
  }
}
