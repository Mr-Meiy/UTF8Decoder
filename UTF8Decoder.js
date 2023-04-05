const activateButton = () => {
    const decodeButton = document.querySelector("#decode")
    const resultElement = document.querySelector("#decodedResult")
    const encodedInput = document.querySelector("#encodedInput").value
    if (encodedInput.length === 0) {
        decodeButton.disabled = true
        resultElement.innerHTML = ""
        resultElement.classList.remove("border")
    } else {
        decodeButton.disabled = false
    }
}

const decodeInput = () => {
    const encodedInput = document.querySelector("#encodedInput").value.replace('jsondata=', '')
    const resultElement = document.querySelector("#decodedResult")
    const decodedModalElement = document.querySelector("#decodedModalResponse")
    let decodedResponse = null
    resultElement.value = null
    decodedModalElement.innerHTML = null
    try {
        const decodedString = decodeURI(encodedInput).replaceAll("%2F", "/").replaceAll("%24", "$").replaceAll('%3A', ':').replaceAll('%2C', ',')
        console.log(decodedString)
        decodedResponse = "UTF-8 Decoded String:"
        try {
            const decodedObject = JSON.parse(decodedString)
            decodedResponse = JSON.stringify(JSON.parse(decodedString), null, "  ")
        } catch (error) {
            try {
                decodedResponse = JSON.stringify(JSON.parse(decodedString))
            } catch (err) {
                console.log(err)
                decodedResponse = err
            }
        }
    } catch (error) {
        console.log(error)
        decodedResponse = error
    }
    resultElement.innerHTML = hljs.highlight("json", decodedResponse).value
    decodedModalElement.innerHTML = decodedResponse
}

const copyToClipboard = () => {
    const copyText = document.querySelector("#decodedResult").innerText
    if (copyText.length > 0) {
        navigator.clipboard.writeText(copyText)
        animateCopy()
    }
}

const animateCopy = () => {
    const copyDiv = document.querySelector('.copyAlert:not(.animate)');
    if (copyDiv) {
        copyDiv.classList.add('animate');
        copyDiv.addEventListener('animationend', () => {
            copyDiv.classList.remove('animate')
        });
    }
};
