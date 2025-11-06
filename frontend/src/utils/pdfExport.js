import html2pdf from 'html2pdf.js';

export const exportResumeToPDF = (resumeName = 'Resume', elementId = 'resume-preview') => {
  return new Promise((resolve, reject) => {
    // Wait a bit for DOM to be ready
    setTimeout(() => {
      const element = document.getElementById(elementId);
      
      if (!element) {
        console.error(`Element #${elementId} not found`);
        reject(new Error('Resume preview element not found'));
        return;
      }

      console.log('✅ Found element:', element);

      // Clone the element to avoid modifying the original
      const clone = element.cloneNode(true);
      
      // Remove unwanted elements (buttons, hover effects, etc.)
      const unwantedElements = clone.querySelectorAll('button, .no-print, .hover\\:shadow-lg');
      unwantedElements.forEach(el => el.remove());

      // PDF options - optimized for professional resume output
      const options = {
        margin: 0,
        filename: `${resumeName.replace(/[^a-z0-9]/gi, '_')}.pdf`,
        image: { 
          type: 'jpeg', 
          quality: 0.98 
        },
        html2canvas: { 
          scale: 2,                    // High quality
          useCORS: true,               // Load external images
          letterRendering: true,       // Better text rendering
          logging: false,              // Disable console logs
          backgroundColor: '#ffffff'   // White background
        },
        jsPDF: { 
          unit: 'in', 
          format: 'letter',            // US Letter size (8.5" x 11")
          orientation: 'portrait',
          compress: true               // Smaller file size
        },
        pagebreak: { 
          mode: ['avoid-all', 'css', 'legacy']  // Smart page breaks
        }
      };

      // Generate and download PDF
      html2pdf()
        .set(options)
        .from(clone)
        .save()
        .then(() => {
          console.log('✅ PDF generated successfully');
          resolve();
        })
        .catch(err => {
          console.error('❌ PDF generation error:', err);
          reject(err);
        });
    }, 300); // Wait 300ms for DOM to be fully ready
  });
};
