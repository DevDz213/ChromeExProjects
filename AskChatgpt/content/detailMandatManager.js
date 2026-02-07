console.log("C'est le temps de postuler 3!");

const JOB_TITLE = document.getElementById("P3_TITRE_MANDAT").innerText;
const JOB_DESCRIPTION = document.getElementById("P3_DESCRIPTION_MANDAT").innerText;
const JOB_REQUIREMENTS = document.getElementById("P3_EXIGENCES").innerText;

console.log("Job info collected:", { JOB_TITLE, JOB_DESCRIPTION, JOB_REQUIREMENTS });

const INPLACE_POSTULATION = document.getElementById("R2753067993886429");
if(INPLACE_POSTULATION) {
    console.log("Good new manigga, postule");
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
            title: JOB_TITLE,
            description: JOB_DESCRIPTION,
            requirements: JOB_REQUIREMENTS
        });
        return;
    } 
    if (msg.type === "APPLY_TO_JOB") {
        console.log("Message APPLY_TO_JOB reçu dans detailMandatManager.js");
        return
    }
});