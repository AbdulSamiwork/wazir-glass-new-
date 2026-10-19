import { drawCoverPage } from './portfolioCoverPage';

/**
 * Generates technical multi-page PDF dossier for portfolio projects using jsPDF
 */
export async function buildPortfolioPdf({ selectedProjects, clientName, contact }) {
  const { jsPDF } = await import('jspdf');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pdfWidth - margin * 2;

  // --- COVER PAGE ---
  drawCoverPage(pdf, { pdfWidth, contentWidth, margin, selectedProjects, clientName, contact });

  // --- PROJECT PAGES ---
  for (let i = 0; i < selectedProjects.length; i++) {
    const project = selectedProjects[i];
    pdf.addPage();

    // Header
    pdf.setFillColor(240, 249, 255);
    pdf.rect(0, 0, pdfWidth, 22, 'F');
    pdf.setDrawColor(14, 165, 233);
    pdf.setLineWidth(0.8);
    pdf.line(0, 22, pdfWidth, 22);

    pdf.setTextColor(2, 132, 199);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text('WAZIR GLASS & ALUMINIUM CENTRE', margin, 14);

    pdf.setTextColor(100, 116, 139);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`TECHNICAL DOSSIER | REF: WZ-2026-${project.id || i + 101}`, pdfWidth - margin - 50, 14);

    pdf.setTextColor(15, 23, 42);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text(project.title || 'Architectural Glazing Structure', margin, 36);

    pdf.setFontSize(10);
    pdf.setTextColor(2, 132, 199);
    const catText = project.category || 'General Glazing & Aluminium Works';
    pdf.text(`[ SYSTEM CATEGORY: ${catText.toUpperCase()} ]`, margin, 43);

    let currentY = 50;

    if (project.image) {
      try {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = project.image.startsWith('http') ? project.image : window.location.origin + '/' + project.image.replace(/^\//, '');
        });

        const maxImgHeight = 85;
        const ratio = Math.min(contentWidth / img.width, maxImgHeight / img.height);
        const renderW = img.width * ratio;
        const renderH = img.height * ratio;

        pdf.setFillColor(248, 250, 252);
        pdf.setDrawColor(203, 213, 225);
        pdf.setLineWidth(0.5);
        pdf.rect(margin, currentY, contentWidth, renderH + 4, 'FD');

        const offsetX = margin + (contentWidth - renderW) / 2;
        pdf.addImage(img, 'JPEG', offsetX, currentY + 2, renderW, renderH);
        currentY += renderH + 12;
      } catch (e) {
        pdf.setTextColor(239, 68, 68);
        pdf.setFontSize(9);
        pdf.text('[Photo preview currently offline - refer to CAD spec sheet]', margin, currentY);
        currentY += 8;
      }
    }

    // Specifications box
    pdf.setFillColor(248, 250, 252);
    pdf.setDrawColor(203, 213, 225);
    pdf.setLineWidth(0.5);
    pdf.roundedRect(margin, currentY, contentWidth, 44, 3, 3, 'FD');
    pdf.setFillColor(224, 242, 254);
    pdf.roundedRect(margin, currentY, contentWidth, 9, 3, 3, 'F');
    pdf.rect(margin, currentY + 5, contentWidth, 4, 'F');

    pdf.setTextColor(3, 105, 161);
    pdf.setFontSize(9.5);
    pdf.setFont('helvetica', 'bold');
    pdf.text('1. TECHNICAL SPECIFICATIONS & MATERIAL BREAKDOWN', margin + 5, currentY + 6.5);

    pdf.setFontSize(9.5);
    const sizeVal = project.size || project.dimensions || 'Custom CAD Engineered to Architectural Scale';
    const isAlum = catText.toLowerCase().includes('window') || catText.toLowerCase().includes('door') || catText.toLowerCase().includes('aluminium');
    const matVal = project.material || (isAlum ? '20µm Anodized / Powder Coated Extruded Aluminium' : '10mm / 12mm Toughened Safety Glass (ISO 9001)');
    const hardVal = project.hardware || 'Heavy-Duty Hydraulic Floor Springs & Multi-Point Locks';
    const safeVal = project.safety || 'BS 6206 / EN 12150 Impact Resistance & Acoustic Compliant';

    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(51, 65, 85);
    pdf.text('• Dimensions / Size:', margin + 5, currentY + 16);
    pdf.text('• Material Spec:', margin + 5, currentY + 24);
    pdf.text('• Hardware / Locks:', margin + 5, currentY + 32);
    pdf.text('• Safety Compliance:', margin + 5, currentY + 40);

    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(15, 23, 42);
    pdf.text(sizeVal, margin + 48, currentY + 16);
    pdf.text(pdf.splitTextToSize(matVal, contentWidth - 53)[0], margin + 48, currentY + 24);
    pdf.text(pdf.splitTextToSize(hardVal, contentWidth - 53)[0], margin + 48, currentY + 32);
    pdf.text(safeVal, margin + 48, currentY + 40);

    currentY += 52;

    // Scope of work
    pdf.setTextColor(2, 132, 199);
    pdf.setFontSize(10.5);
    pdf.setFont('helvetica', 'bold');
    pdf.text('2. SCOPE OF WORK & PROJECT DESCRIPTION', margin, currentY);

    pdf.setDrawColor(203, 213, 225);
    pdf.setLineWidth(0.4);
    pdf.line(margin, currentY + 2.5, pdfWidth - margin, currentY + 2.5);

    pdf.setTextColor(51, 65, 85);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const descText = project.desc || project.description || 'Custom fabricated and precision-installed architectural glazing structure engineered for maximum structural stability, acoustic damping, thermal efficiency, and modern luxury aesthetics.';
    const splitDesc = pdf.splitTextToSize(descText, contentWidth);
    pdf.text(splitDesc, margin, currentY + 8.5);

    currentY += 14 + splitDesc.length * 4.5;

    if (currentY < 240) {
      pdf.setTextColor(2, 132, 199);
      pdf.setFontSize(10.5);
      pdf.setFont('helvetica', 'bold');
      pdf.text('3. STRUCTURAL HIGHLIGHTS & GUARANTEE', margin, currentY);
      pdf.line(margin, currentY + 2.5, pdfWidth - margin, currentY + 2.5);

      const highlights = [
        'Precision laser-leveled installation ensuring zero structural sag.',
        'High wind-load deflection resistance for high-rise facades.',
        'Complete protection against corrosion and moisture penetration.'
      ];
      highlights.forEach((hl, hIdx) => {
        const hlY = currentY + 9 + hIdx * 7;
        pdf.setFillColor(14, 165, 233);
        pdf.circle(margin + 4, hlY - 1, 1.1, 'F');
        pdf.setTextColor(71, 85, 105);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9.5);
        pdf.text(hl, margin + 8, hlY);
      });
    }

    const displayPhone = contact?.phone || contact?.phoneCall || '+92 321 8457556';
    pdf.setDrawColor(226, 232, 240);
    pdf.line(margin, 278, pdfWidth - margin, 278);
    pdf.setFontSize(8.5);
    pdf.setTextColor(148, 163, 184);
    pdf.text(`Wazir Glass & Aluminium Centre | Tel: ${displayPhone} | Web: wazirglass.tech`, margin, 284);
    pdf.text(`Page ${i + 2} of ${selectedProjects.length + 1}`, pdfWidth - margin - 20, 284);
  }

  const fileName = clientName
    ? `Wazir_Technical_Portfolio_${clientName.replace(/[^a-z0-9]/gi, '_')}.pdf`
    : `Wazir_Company_Technical_Portfolio.pdf`;
  pdf.save(fileName);
}
