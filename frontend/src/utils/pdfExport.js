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

      // PDF options - optimized for professional resume output with enhanced quality
      const options = {
        margin: [0.3, 0.3, 0.3, 0.3],  // Smaller margins for better content fit
        filename: `${resumeName.replace(/[^a-z0-9]/gi, '_')}.pdf`,
        image: { 
          type: 'jpeg', 
          quality: 1.0                 // Maximum quality
        },
        html2canvas: { 
          scale: 3,                    // Higher resolution (2 → 3)
          useCORS: true,               // Load external images
          letterRendering: true,       // Better text rendering
          logging: false,              // Disable console logs
          backgroundColor: '#ffffff',  // White background
          imageTimeout: 0,             // No timeout for images
          removeContainer: true        // Clean rendering
        },
        jsPDF: { 
          unit: 'in', 
          format: 'letter',            // US Letter size (8.5" x 11")
          orientation: 'portrait',
          compress: false              // Preserve quality (no compression)
        },
        pagebreak: { 
          mode: ['avoid-all', 'css', 'legacy'],  // Smart page breaks
          avoid: ['h1', 'h2', 'h3', 'tr', 'section']
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
    }, 500); // Wait 500ms for DOM to be fully ready (increased from 300ms)
  });
};
