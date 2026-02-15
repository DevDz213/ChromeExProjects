/**
 * background.js
 * Ce script est lié à aucune page spécifique, il écoute les messages de tous les autres scripts
 * et peut effectuer des actions globales comme accéder aux téléchargements ou gérer les onglets.
 * Il est principalement utilisé pour écouter les messages demandant le dernier fichier téléchargé.
 * L'appel à ce fichier se fait avec chrome.tabs.sendMessage, sans id de tab dans les paramètres.
 */

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "GET_LATEST_FILE") {
        chrome.downloads.search({ limit: 1, orderBy: ["-startTime"] })
            .then(async ([lastPdf]) => {
                if (!lastPdf) {
                    sendResponse(null);
                    return;
                }

                try {
                    const fileUrl = lastPdf.url;
                    console.log("Lecture du fichier PDF à partir du chemin:", fileUrl);
                    const response = await fetch(fileUrl);
                    console.log("Fetch réussit")
                    const blob = await response.blob();
                    const arrayBuffer = await blob.arrayBuffer();
                    console.log("Lettre motiv lue avec succès, envoi des données au content script.", { size: arrayBuffer.byteLength });
                    sendResponse({
                        filename: lastPdf.filename,
                        data: Array.from(new Uint8Array(arrayBuffer))
                    });
                } catch (error) {
                    console.error("Erreur lors de la lecture du fichier CoverLetter:", error);
                    sendResponse(null);
                }
            })
            .catch(error => {
                console.error("Erreur:", error);
                sendResponse(null);
            });
        
        return true;
    }

    if (msg.type === "GET_SAVED_CV") {
        chrome.storage.local.get("savedCvPath", async (result) => {
            if (!result.savedCvPath) {
                console.log("Aucun CV sauvegardé trouvé");
                sendResponse(null);
                return;
            }

            try {
                const result = await chrome.storage.local.get(['savedCvData', 'savedCvType', 'fullName']);
                
                console.log("CV lu avec succès, envoi des données au content script.", { size: result.savedCvData.length });
                
                sendResponse({
                    filename: `CV_${result.fullName}.pdf`,
                    data: result.savedCvData,
                    type: result.savedCvType
                });
            } catch (error) {
                console.error("Erreur lors de la lecture du CV:", error);
                sendResponse(null);
            }
        });
        
        return true;
    }

    if (msg.type === "SAVE_CV_AND_NAME") {
        chrome.storage.local.set({ savedCvData: msg.cvData, savedCvType: msg.cvType, fullName: msg.fullName }, () => {
            console.log("CV sauvegardé avec succès.", msg.cvData.length, "bytes");
            console.log("Nom complet sauvegardé:", msg.fullName);
            sendResponse({ success: true });
        });
        
        return true;
    }    

    if (msg.type === "GET_NAME") {
        chrome.storage.local.get('fullName', (result) => {
            sendResponse({ fullName: result.fullName });
        });
        return true; 
    }
});