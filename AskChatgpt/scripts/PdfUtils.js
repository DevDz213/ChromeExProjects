/**
 * Utility function to generate a custom pdf and download it with Chrome.downloads API
 *
 * @export
 * @param {string} bodyText 
 * @param {string} jobTitle 
 * @param {string} appliantName 
 */
export function generateCoverLetter(bodyText, jobTitle, appliantName) {
    const { jsPDF } = window.jspdf || window.jsPDF || {};
    if (!jsPDF) {
        console.log('jsPDF not found - ensure jspdf.umd.min.js is loaded before PdfUtils.js');
        return false;
    }
    // Paramètre dynamique pour le titre
    const poste = jobTitle;

    // Création du document
    const doc = new jsPDF();

    // Marges
    const marginX = 20;
    let currentY = 20;

    // ===== TITRE =====
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(`Candidature : ${poste}`, marginX, currentY);

    // Espace après le titre
    currentY += 12;

    // ===== CORPS DE TEXTE =====
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    // Formule de politesse
    doc.text("Madame, Monsieur,", marginX, currentY);

    // Calcul automatique de l'espace après la ligne
    currentY += 8;

    // Texte principal
    const lines = doc.splitTextToSize(bodyText.trim(), 170);
    doc.text(lines, marginX, currentY);

    // Mise à jour de Y après le paragraphe
    currentY += lines.length * 5 + 3;

    // Mise à jour du font pour la signature
    doc.setFont("helvetica", "bold");
    doc.text(appliantName, marginX, currentY);

    // ===== SAUVEGARDE =====
    doc.save("lettre_motivation.pdf");

    console.log("PDF généré avec succès");

    return true;
}