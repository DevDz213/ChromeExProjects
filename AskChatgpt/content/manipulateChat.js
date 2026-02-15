console.log("Prêt à manipuler ChatGPT!");

function cutText(text, startSub, endSub) {
    const startIndex = text.indexOf(startSub);
    const endIndex = text.lastIndexOf(endSub);

    if (startIndex === -1 || endIndex === -1){
        console.log("Substrings not found in text");
        return text;
    } 

    // On commence après la fin de startSub, on s'arrête avant endSub
    return text.slice(startIndex + startSub.length, endIndex);
}

function promptChatgpt(prompt) {
    promptDiv = document.getElementById("prompt-textarea");
    promptDiv.querySelector("p").textContent = prompt;

    promptDiv.blur();

    setTimeout(() => {
    document.getElementById("composer-submit-button").click();
    console.log("Prompt submitted!");
    }, 1);  
}

async function waitForAnswerLoad(answerEl)  {
    let lastWord = answerEl.innerText.split(" ").pop();
    let loading = true;

    while(loading) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const newLastWord = answerEl.innerText.split(" ").pop();
        const btn = document.querySelector('button[aria-label="Start Voice"]');
        if (newLastWord === lastWord && btn) {
            console.log("Answer has finished loading.");
            loading = false;
        }
        lastWord = newLastWord;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
}

async function getLastAnswer() {
    // Div containing all <Article> elements (answers)
    const chatEl = document.querySelector(".text-sm.pb-25");
    if(!chatEl) {
        console.log("Chat history not found!");
    } else {
        // Last <Article> element (last answer)
        answerEl = chatEl.lastElementChild;
        await waitForAnswerLoad(answerEl);
        const answerContent = answerEl.innerText;
        answerContent ? console.log("Answer content found") : console.log("Answer content not found");

        return answerContent;
    }
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "PROMPT_CHATGPT") {
        (async () => {
            console.log("Message PROMPT_CHATGPT reçu dans content.js");
            promptChatgpt(msg.prompt);

            await new Promise((resolve) => setTimeout(resolve, 5000));

            console.log("Message GET_ANSWER reçu");
            const rawAnswer = await getLastAnswer();
            console.log("Raw Answer :", rawAnswer);
            const result = cutText(rawAnswer, "Madame, Monsieur,", msg.fullName);
            console.log("Answer extracted:", result);
            sendResponse({ text : result });
        })();
        return true; // important pour garder le canal ouvert en async
    }
});