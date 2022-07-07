const activateButton = () => {
    const decodeButton = document.getElementById("decode")
    const resultElement = document.getElementById("decodedResult")
    const encodedInput = document.getElementById("encodedInput").value
    if (encodedInput.length === 0) {
        decodeButton.disabled = true
        resultElement.innerHTML = ""
        resultElement.classList.remove("border")
    } else {
        decodeButton.disabled = false
    }
}

const decodeInput = () => {
    const encodedInput = document.getElementById("encodedInput").value.replace('jsondata=', '')
    const resultElement = document.getElementById("decodedResult")
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
    resultElement.value = decodedResponse
    decodedModalElement.innerHTML = decodedResponse
}

const copyToClipboard = () => {
    const copyText = document.getElementById("decodedResult")
    if (copyText.value.length > 0) {
        copyText.select()
        copyText.setSelectionRange(0, 99999)
        navigator.clipboard.writeText(copyText.value)
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
