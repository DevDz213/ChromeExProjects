export function generateCoverLetter(bodyText, poste) {
    const { jsPDF } = window.jspdf || window.jsPDF || {};
    if (!jsPDF) {
        console.log('jsPDF not found - ensure jspdf.umd.min.js is loaded before PdfUtils.js');
        return;
    }
    // Paramètre dynamique pour le titre
    const poste = "Développeur Full Stack";

    // Création du document
    const doc = new jsPDF();

    // Marges
    const marginX = 20;
    let currentY = 20;

    // ===== TITRE =====
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(`Candidature : ${poste}`, marginX, currentY);

    // Espace après le titre
    currentY += 12;

    // ===== CORPS DE TEXTE =====
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    // Formule de politesse
    doc.text("Madame, Monsieur,", marginX, currentY);

    // Calcul automatique de l'espace après la ligne
    currentY += doc.getFontSize() * doc.getLineHeightFactor() + 4;

    // Texte principal
    const lines = doc.splitTextToSize(bodyText, 170);
    doc.text(lines, marginX, currentY);

    // Mise à jour de Y après le paragraphe
    currentY += lines.length * doc.getFontSize() * doc.getLineHeightFactor() + 10;

    // ===== SIGNATURE =====
    doc.text("Cordialement,", marginX, currentY);
    currentY += 8;

    doc.setFont("helvetica", "bold");
    doc.text("Arezki Oussad", marginX, currentY);

    // ===== SAUVEGARDE =====
    doc.save("lettre_motivation.pdf");

    console.log("PDF généré avec succès");

}