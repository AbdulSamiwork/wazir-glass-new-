import { getWhatsAppUrl, cleanPhoneNumber } from './phoneUtils';

/* Opens a print popup window for the given document and style containers */
export function openPrintWindow({ contentId, stylesId, title }) {
  const printContent = document.getElementById(contentId)?.innerHTML;
  const printStyles = document.getElementById(stylesId)?.innerHTML;
  const printWindow = window.open('', '_blank', 'height=800,width=800');

  if (printWindow) {
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title || 'Print Document'}</title>
          <style>${printStyles || ''}</style>
        </head>
        <body>
          ${printContent || ''}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.onload = function () {
      printWindow.focus();
      printWindow.print();
    };
  }
}

/* Captures an HTML element into a multi-page jsPDF document */
export async function captureElementToPdf({ elementId, actionsId }) {
  const element = document.getElementById(elementId);
  if (!element) {
    alert('Document content not found.');
    return null;
  }

  // Create isolated sandbox on document.body so mobile viewport / modals don't squeeze the document
  let sandbox = null;

  try {
    const [{ jsPDF }, html2canvas] = await Promise.all([
      import('jspdf'),
      import('html2canvas').then((m) => m.default || m)
    ]);

    // Off-screen container strictly fixed at standard A4 desktop width (794px @ 96dpi)
    sandbox = document.createElement('div');
    sandbox.id = `${elementId}-export-sandbox`;
    sandbox.style.position = 'fixed';
    sandbox.style.top = '0';
    sandbox.style.left = '-10000px';
    sandbox.style.width = '794px';
    sandbox.style.minWidth = '794px';
    sandbox.style.maxWidth = '794px';
    sandbox.style.boxSizing = 'border-box';
    sandbox.style.margin = '0';
    sandbox.style.padding = '0';
    sandbox.style.backgroundColor = '#ffffff';
    sandbox.style.zIndex = '-9999';
    sandbox.style.overflow = 'visible';
    sandbox.style.pointerEvents = 'none';

    // Clone element so mobile scroll and modal constraints do not alter the render
    const clone = element.cloneNode(true);
    clone.id = `${elementId}-pdf-clone`;
    clone.style.width = '794px';
    clone.style.minWidth = '794px';
    clone.style.maxWidth = '794px';
    clone.style.minHeight = '1080px';
    clone.style.padding = '36px 40px';
    clone.style.boxSizing = 'border-box';
    clone.style.margin = '0';
    clone.style.boxShadow = 'none';
    clone.style.transform = 'none';

    // Remove actions bar if present in the clone
    if (actionsId) {
      const cloneActions = clone.querySelector(`#${actionsId}`);
      if (cloneActions) cloneActions.remove();
    }

    sandbox.appendChild(clone);
    document.body.appendChild(sandbox);

    // Give browser a microtask to compute layout
    await new Promise((r) => setTimeout(r, 60));

    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      width: 794,
      windowWidth: 1024,
      scrollX: 0,
      scrollY: 0
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = 210;
    const pdfHeight = 297;
    const margin = 8; // 8mm margin
    const printableWidth = pdfWidth - margin * 2; // 194mm
    const printableHeight = pdfHeight - margin * 2; // 281mm

    const imgProps = pdf.getImageProperties(imgData);
    const pdfImgWidth = printableWidth;
    const pdfImgHeight = (imgProps.height * printableWidth) / imgProps.width;

    // Single-page auto-fit: If content is standard 1-page document (up to 15% overflow tolerance),
    // scale to fit cleanly on 1 single A4 page instead of cutting into multiple messy pages
    if (pdfImgHeight <= printableHeight * 1.15) {
      const scale = Math.min(1, printableHeight / pdfImgHeight);
      const finalWidth = printableWidth * scale;
      const finalHeight = pdfImgHeight * scale;
      const xOffset = margin + (printableWidth - finalWidth) / 2;
      const yOffset = margin;
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalWidth, finalHeight);
      return pdf;
    }

    // Multi-page handling (for genuinely long itemized tables)
    let heightLeft = pdfImgHeight;
    let yPosition = margin;

    pdf.addImage(imgData, 'PNG', margin, yPosition, pdfImgWidth, pdfImgHeight);
    heightLeft -= printableHeight;

    while (heightLeft > 0) {
      pdf.addPage();
      yPosition = -(pdfImgHeight - heightLeft) + margin;
      pdf.addImage(imgData, 'PNG', margin, yPosition, pdfImgWidth, pdfImgHeight);
      heightLeft -= printableHeight;
    }

    return pdf;
  } catch (err) {
    console.error('PDF export error:', err);
    alert('Failed to render PDF document.');
    return null;
  } finally {
    if (sandbox && sandbox.parentNode) {
      sandbox.parentNode.removeChild(sandbox);
    }
  }
}

/* Shares or saves PDF and dispatches to WhatsApp */
export async function shareOrSendWhatsApp({ pdf, fileName, title, message, phone }) {
  if (!phone) {
    alert('No customer phone number provided.');
    return;
  }

  const waUrl = getWhatsAppUrl(phone, message);

  try {
    const pdfBlob = pdf.output('blob');
    const file = new File([pdfBlob], fileName, { type: 'application/pdf' });

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: title || fileName,
        text: message,
        files: [file]
      });
    } else {
      pdf.save(fileName);
      alert('PDF downloaded. Opening WhatsApp Web...');
      window.open(waUrl, '_blank');
    }
  } catch (err) {
    console.error(err);
    window.open(waUrl, '_blank');
  }
}
