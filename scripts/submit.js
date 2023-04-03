function enableButton() {
    let inputText = document.getElementById("public-key").value;
    const submitButton = document.getElementById("submit-btn");
    if (inputText.length > 0) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}