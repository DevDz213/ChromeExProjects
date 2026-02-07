import { generateCoverLetter } from "../scripts/PdfUtils.js";

console.log("Popup script loaded");


document.addEventListener("DOMContentLoaded", () => {
    const askButton = document.getElementById("askButton");

    askButton.addEventListener("click", async () => {
        console.log("Ask Button clicked");

        // CHERCHER LE PROCHAIN JOB
        const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        const nextJobLink = await chrome.tabs.sendMessage(activeTab.id, {
            type: "GET_NEXT_JOB",
        });

        if(nextJobLink.type === "NO_MORE_JOBS") {
            console.log("No more jobs available.");
            return;
        }
        console.log("Next job link received in popup:", nextJobLink.link);

        // OUVRIR LE PROCHAIN JOB DANS UN NOUVEL ONGLET ET GET LES DETAILS
        const newTab = await chrome.tabs.create({ url: nextJobLink.link, active: false });
        const newTabId = newTab.id;

        await new Promise((resolve) => {
            chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                if (tabId === newTabId && changeInfo.status === 'complete') {
                    chrome.tabs.onUpdated.removeListener(listener);
                    resolve();
                }
            });
        });

        let jobData = await chrome.tabs.sendMessage(newTabId, {
            type: "GET_JOB_DETAILS",
        });
        if(jobData.type === "JOB_NOT_APPLIABLE") {
            console.log("Job not appliable, closing tab.");
            await chrome.tabs.remove(newTabId);
            return;
        }
        else if(jobData.type === "JOB_DETAILS") {
            console.log("Job details received in popup:", jobData);
        }

        // ALLER SUR ONGLET CHAT DÉJÀ OUVERT ET LUI BALANCER LE PROMPT
        const {title, description, requirements} = jobData;
        const prompt = `Rédige moi une lettre de motivation pour le poste suivant en te basant sur mon CV. Poste : ${title}. Description du poste : ${description}. Exigences du poste : ${requirements}. CV : [insérer le contenu du CV ici]. Lettre de motivation : Madame, Monsieur, [insérer le reste de la lettre ici] Arezki Oussad. Fais la très courte (environ 100 mots)`;

        const [chatGptTab] = await chrome.tabs.query({ 
            url: "https://chatgpt.com/*"
        });

        if (chatGptTab) {
            await chrome.tabs.sendMessage(chatGptTab.id, {
                type: "PROMPT_CHATGPT",
                prompt: prompt
            });
        }
        else {
            console.log("ChatGPT tab not found.");
        }

    });
});





// document.addEventListener("DOMContentLoaded", () => {
//     const askButton = document.getElementById("askButton");

//     askButton.addEventListener("click", async () => {
//         console.log("Ask Button clicked");
//         //Pompt chatgpt with cv file and job description
//         const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
//         await chrome.tabs.sendMessage(activeTab.id, {
//             type: "PROMPT_CHATGPT",
//             prompt: "Rédige moi une lettre de motivation pour le poste suivant en te basant sur mon CV. Poste : Développeur Full Stack. CV : [insérer le contenu du CV ici]. Lettre de motivation : Madame, Monsieur, [insérer le reste de la lettre ici] Arezki Oussad. Fais la très courte (environ 100 mots)"
//         });   
        
//         await new Promise((resolve) => setTimeout(resolve, 5000));

//         //collect Answer
//         const response = await chrome.tabs.sendMessage(activeTab.id, {
//             type: "GET_ANSWER",
//         });

//         console.log("Generating PDF");
//         generateCoverLetter(response.text);
//     });   
// });