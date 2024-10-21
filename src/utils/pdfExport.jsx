import html2pdf from 'html2pdf.js';

export const exportToPDF = (elementId, filename = 'resume.pdf') => {
    const element = document.getElementById(elementId);
    if (element) {
        html2pdf()
            .from(element)
            .set({
                margin: 1,
                filename: filename,
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            })
            .save();
    } else {
        console.error(`Element with id ${elementId} not found`);
    }
};