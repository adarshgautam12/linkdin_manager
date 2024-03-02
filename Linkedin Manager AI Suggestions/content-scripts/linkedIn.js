async function init(userdata) {
  let full_name = document.querySelector("h1")?.innerText;
  let first_name = full_name.split(" ")[0];

  let user = userdata;
  if (!user) {
    //retrieve user's details
    user = await chrome.runtime.sendMessage({
      type: "getUser",
      key: first_name,
    });

    console.log(user);
  }
  
  //no user
  if (!user) {
    console.log("scraping");
    startScraping();
  } else {
    console.log(user);
    connectProfile(user?.connection_msg);
  }
}

let startScraping = () => {
  let full_name = document.querySelector("h1").innerText;
  let first_name = full_name.split(" ")[0];

  let aboutEl = document.getElementsByClassName(
    "pv-shared-text-with-see-more full-width t-14 t-normal t-black display-flex align-items-center"
  )[0];

  let about =
    aboutEl !== undefined
      ? aboutEl?.children[0]?.children[1]?.innerText
      : undefined;

  let position = document.getElementsByClassName(
    "text-body-medium break-words"
  )[0]?.innerText;
  let location = document.getElementsByClassName(
    "text-body-small inline t-black--light break-words"
  )[0]?.innerText;

  let url = window.location.href

  if (!full_name || !position || !about) {
    return alert('Important fields missing. See other profiles')
  }

  chrome.runtime.sendMessage(
    {
      type: "data_save",
      full_name,
      first_name,
      position,
      about,
      location,
      url
    },
    async function (response) {
      console.log(response)
      let user = await chrome.runtime.sendMessage({
        type: "getUser",
        key: first_name,
      });
      console.log(user)
      connectProfile(user.connection_msg);
    }
  );

  //console.log(about, full_name, first_name, position, location);
};

let connectProfile = (msg) => {
  let full_name = document.querySelector("h1").innerText;

  const moreBtn = document.querySelector('button[aria-label="More actions"]');

  if (!moreBtn || !full_name) {
    return alert('User already a connection or error')
  }

  moreBtn.click();

  let connectBtn = document.querySelector(
    `div[aria-label="Invite ${full_name} to connect"]`
  );

  if (!connectBtn) {
    connectBtn = document.querySelector(
      `button[aria-label="Invite ${full_name} to connect"]`
    );
  }

  if (!connectBtn) {
    return alert('User already a connection or error')
  }
  connectBtn.click();

  setTimeout(() => {
    let noteBtn = document.querySelector(`button[aria-label="Add a note"]`);
    if (!noteBtn) {
      return alert('User already a connection or error')
    }
    noteBtn.click();
  }, 5000);

  setTimeout(() => {
    let customMsgInput = document.getElementById("custom-message");
    if (!customMsgInput) {
      return alert('User already a connection or error')
    }
    //ai generated connection msg here
    customMsgInput.value = msg;

    let sendBtn = document.querySelector(`button[aria-label="Send now"]`);
    sendBtn.disabled = false;
  }, 10000);
};

setTimeout(init, 10000);

var currentPath = window.location.pathname;
function watchPathChanges() {

  if (window.location.pathname !== currentPath) {
    currentPath = window.location.pathname;
    //do something when it has changed
    setTimeout(init, 5000);
  }
}
setInterval(watchPathChanges, 200);
// AIconnection()
