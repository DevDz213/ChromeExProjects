console.log("C'est le temps de postuler 3!");

const JOB_EMPLOYER = document.getElementById("P3_NOM_EMPLOYEUR").innerText;
const JOB_TITLE = document.getElementById("P3_TITRE_MANDAT").innerText;
const JOB_DESCRIPTION = document.getElementById("P3_DESCRIPTION_MANDAT").innerText;
const JOB_REQUIREMENTS = document.getElementById("P3_EXIGENCES").innerText;

console.log("Job info collected:", { JOB_EMPLOYER, JOB_TITLE, JOB_DESCRIPTION, JOB_REQUIREMENTS });

const INPLACE_POSTULATION = document.getElementById("R2753067993886429");
if(INPLACE_POSTULATION) {
    console.log("Good new manigga, postule");
}


function sumbitApplication() {
    const applyButton = document.querySelector("#R2753371924886432 button");
    applyButton.click();
    console.log("Application submitted by clicking the apply button.");
}


function selectionnerReleve() {
    const select = document.getElementById('P3_RELEVE');
    select.selectedIndex = 1; // 0 = option vide, 1 = première vraie option
    select.dispatchEvent(new Event('change', { bubbles: true }));
}


async function injectCV() {
    const cvInput = document.getElementById("P3_CV_NEW");

    const response = await chrome.runtime.sendMessage({
        type: "GET_SAVED_CV"
    });
    if (!response) {
        console.log("Aucun CV retourné dans la page de stage.");
        return;
    }
    console.log("Saved CV found:", response.filename);

    const blob = new Blob([new Uint8Array(response.data)], {type: 'application/pdf'});
    const file = new File([blob], response.filename, {type: 'application/pdf'});

    const dt = new DataTransfer();
    dt.items.add(file);
    cvInput.files = dt.files;
    cvInput.dispatchEvent(new Event('change', {bubbles: true}));
}


async function injectLastCoverLetter() {
    const coverLetterInput = document.getElementById("P3_LETTRE_NEW");

    const lastPdfMetaData = await chrome.runtime.sendMessage({
        type: "GET_LATEST_FILE"
    });

    if (!lastPdfMetaData) {
        console.log("Aucun PDF retourné dans la page de stage.");
        return;
    }
    console.log("Last PDF found:", lastPdfMetaData.filename);

    const blob = new Blob([new Uint8Array(lastPdfMetaData.data)], {type: 'application/pdf'});
    const file = new File([blob], "CoverLetter.pdf", {type: 'application/pdf'});

    const dt = new DataTransfer();
    dt.items.add(file);
    coverLetterInput.files = dt.files;
    coverLetterInput.dispatchEvent(new Event('change', {bubbles: true}));
}


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    
    if (msg.type === "GET_JOB_DETAILS") {
        console.log("Message GET_JOB_DETAILS reçu dans detailMandatManager.js");
        if(!INPLACE_POSTULATION){
            sendResponse({ type: "JOB_NOT_APPLIABLE" });
            return;
        }
        sendResponse({ 
            type: "JOB_DETAILS", 
            employer: JOB_EMPLOYER,
            title: JOB_TITLE,
            description: JOB_DESCRIPTION,
            requirements: JOB_REQUIREMENTS
        });
        return;
    } 

    if (msg.type === "APPLY_TO_JOB") {
        (async () => {
        console.log("Message APPLY_TO_JOB reçu dans detailMandatManager.js");
        await injectLastCoverLetter();
        await injectCV();
        selectionnerReleve();
        sumbitApplication();
        })();
    }
});