chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  console.log(sender, "hit");
  const textArea = document.getElementById("prompt-textarea");

  if (!msg.full_name) {
    sendResponse("error");
    return true
  }

  textArea.value = `Create a connection request on linkedin for a person named "${
    msg.full_name
  }" ${
    msg.about ? `who describes himself/herself as "${msg.about}",` : "."
  } has a position of ${msg.position} in his/her industry and lives in ${
    msg.location
  } Call me by my name Saswat and don't write a ad/spammy message. Don't include any links and keep it STRICTLY under 240 characters. Not even a single character more. Don't write it in a template form, you have to create a complete message for me to directly copy paste. Don't generate a subject.`;

  const event = new KeyboardEvent("input", { bubbles: true });

  textArea.dispatchEvent(event);

  const sendBtn = document.querySelector("button[data-testid=send-button]");

  sendBtn.click();

  setTimeout(() => {
    let connection_msg = "";

    let latest_msg = Array.from(
      document.getElementsByClassName(
        "markdown prose w-full break-words dark:prose-invert dark"
      )
    ).slice(-1)[0];

    Array.from(latest_msg.children).forEach((child) => {
      connection_msg += child.innerText + "\n";
    });

    msg.connection_msg = connection_msg;

    chrome.storage.local.set(
      { [msg.first_name]: JSON.stringify(msg) },
      function () {
        if (chrome.runtime.lastError) {
          console.error(
            "Error setting " +
              key +
              " to " +
              JSON.stringify(data) +
              ": " +
              chrome.runtime.lastError.message
          );
        }
      }
    );

    sendResponse("user saved");
  }, 10000);

  return true;
});
