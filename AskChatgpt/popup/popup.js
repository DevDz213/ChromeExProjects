import { generateCoverLetter } from "../scripts/PdfUtils.js";

console.log("Popup script loaded");


document.addEventListener("DOMContentLoaded", () => {
    const askButton = document.getElementById("askButton");

    askButton.addEventListener("click", async () => {
        console.log("Ask Button clicked");

        const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        const jobDescription = await chrome.tabs.sendMessage(activeTab.id, {
            type: "GET_JOB_LINKS",
        });
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