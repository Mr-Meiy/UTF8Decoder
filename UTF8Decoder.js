const activateButton = () => {
    const decodeButton = document.getElementById("decode")
    const resultElement = document.getElementById("decodedResult")
    const encodedInput = document.getElementById("encodedInput").value
    if (encodedInput.length === 0) {
        decodeButton.disabled = true;
        resultElement.innerHTML = "";
        resultElement.classList.remove("border");
    } else {
        decodeButton.disabled = false;
    }
}
const decodeInput = () => {
    const encodedInput = document.getElementById("encodedInput").value.replace('jsondata=', '')
    const resultElement = document.getElementById("decodedResult")
    try {
        const decodedString = decodeURI(encodedInput).replaceAll("%2F","/").replaceAll('%3A', ':').replaceAll('%2C', ',');
        console.log(decodedString);
        resultElement.innerHTML = "UTF-8 Decoded String:";
        try {
            const decodedObject = JSON.parse(decodedString);
            resultElement.innerHTML = JSON.stringify(JSON.parse(decodedString), null, "  ");
        } catch (error) {
            try {
                resultElement.innerHTML = JSON.stringify(JSON.parse(decodedString));
            } catch (err) {
                console.log(err);
                resultElement.innerHTML = err;
            }
        }
    } catch (error) {
        console.log(error);
        resultElement.innerHTML = error;
    }
    resultElement.classList.add("border");
}
