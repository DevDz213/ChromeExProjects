console.log("Prêt à ramasser les stages!");


const JOB_OFFER_TABLE = document.getElementById("mad_data_panel")
                            .querySelector('div.t-fht-tbody')
                            .querySelector('table');

const jobOfferRows = Array.from(JOB_OFFER_TABLE.querySelectorAll('tbody tr'));

let currentJobIndex = 1; // skip header row
let jobNumber = jobOfferRows.length;
console.log("Initialized:", { currentJobIndex, jobNumber });


function getNextJobRef() {
    const jobRow = jobOfferRows[currentJobIndex];
    const jobLink = jobRow.querySelector('td:nth-child(3) a');

    currentJobIndex++;
    return jobLink.href;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "GET_NEXT_JOB") {
        
        if (currentJobIndex === jobNumber) {
            console.log("Aucun autre poste disponible.");
            sendResponse({ type: "NO_MORE_JOBS" });
            return;
        } 

        sendResponse({ type: "JOB_INFO", link: getNextJobRef() });
        return;
    }
});
        