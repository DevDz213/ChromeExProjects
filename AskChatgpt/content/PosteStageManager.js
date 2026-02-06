console.log("Prêt à ramasser les stages!");

const JOB_OFFER_TABLE = document.getElementById("mad_data_panel")
                                .querySelector('table');
let jobOfferRows = Array.from(JOB_OFFER_TABLE.querySelectorAll('tbody tr'));
let currentJobIndex = 1;
let jobNumber = jobOfferRows.length;


// Attendre que la page soit chargée
document.addEventListener('DOMContentLoaded', () => {
  // Stocker les références
  myButton = document.querySelector('#my-button');
  fileInput = document.querySelector('input[type="file"]');
  textArea = document.querySelector('textarea');
  
  console.log('Références stockées:', myButton, fileInput);
  
  // Maintenant tu peux les utiliser partout
  myButton.addEventListener('click', handleClick);
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "GET_NEXT_JOB") {
        console.log("Message GET_NEXT_JOB reçu dans PosteStageManager.js");
        
        if (currentJobIndex > jobNumber) {
            sendResponse({ type: "NO_MORE_JOBS" });
            return;
        } 

        const jobRow = jobOfferRows[currentJobIndex];
        const jobLink = jobRow.querySelector('td:nth-child(2) a');
        currentJobIndex++;
        sendResponse({ type: "JOB_INFO", link: jobLink.href });
    }
});
        