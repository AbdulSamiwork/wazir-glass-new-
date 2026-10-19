/**
 * Draws the technical portfolio PDF cover page
 */
export function drawCoverPage(pdf, { pdfWidth, contentWidth, margin, selectedProjects, clientName, contact }) {
  pdf.setFillColor(14, 165, 233); // sky-500
  pdf.rect(0, 0, pdfWidth, 45, 'F');

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(26);
  pdf.setFont('helvetica', 'bold');
  pdf.text('WAZIR', margin, 26);

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Glass & Aluminium Centre — Architectural Glazing & Frames', margin + 38, 26);

  pdf.setTextColor(15, 23, 42); // slate-900
  pdf.setFontSize(28);
  pdf.setFont('helvetica', 'bold');
  pdf.text('TECHNICAL PROJECT DOSSIER', margin, 85);

  pdf.setFontSize(14);
  pdf.setTextColor(2, 132, 199); // sky-600
  pdf.text('Custom Engineered Glazing & Framing Solutions', margin, 94);

  pdf.setDrawColor(14, 165, 233);
  pdf.setLineWidth(1.2);
  pdf.line(margin, 102, margin + 60, 102);

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(100, 116, 139);
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  pdf.text(`Date Issued: ${dateStr}`, margin, 118);
  pdf.text(`Total Projects Profiled: ${selectedProjects.length} Detailed Engineering Units`, margin, 126);

  if (clientName) {
    pdf.setTextColor(15, 23, 42);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PREPARED EXCLUSIVELY FOR:', margin, 146);
    pdf.setFontSize(14);
    pdf.setTextColor(2, 132, 199);
    pdf.text(clientName.toUpperCase(), margin, 154);
  }

  // Standards box
  pdf.setFillColor(248, 250, 252);
  pdf.setDrawColor(203, 213, 225);
  pdf.setLineWidth(0.5);
  pdf.roundedRect(margin, 180, contentWidth, 54, 4, 4, 'FD');

  pdf.setTextColor(15, 23, 42);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.text('CORE ARCHITECTURAL & SAFETY STANDARDS:', margin + 6, 192);

  const standards = [
    '100% Tempered & Toughened Safety Glass (ISO 9001 / BS 6206 Compliant)',
    'High-Gauge Powder Coated & Anodized Extruded Aluminium Profiles',
    'EPDM Moisture-Sealed Weatherproof Acoustic & Thermal Insulation Joints',
    '10-Year Comprehensive Structural Stability & Hardware Service Warranty'
  ];

  standards.forEach((item, idx) => {
    const itemY = 202 + idx * 8;
    // Crisp vector bullet icon
    pdf.setFillColor(14, 165, 233);
    pdf.circle(margin + 9, itemY - 1, 1.2, 'F');

    pdf.setTextColor(71, 85, 105);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9.5);
    pdf.text(item, margin + 14, itemY);
  });

  const displayPhone = contact?.phone || contact?.phoneCall || '+92 321 8457556';
  const displayCity = 'Lahore, Pakistan';

  pdf.setDrawColor(226, 232, 240);
  pdf.line(margin, 275, pdfWidth - margin, 275);
  pdf.setFontSize(9);
  pdf.setTextColor(148, 163, 184);
  pdf.text(`Wazir Glass & Aluminium Centre | ${displayCity} | Tel: ${displayPhone} | Web: wazirglass.tech`, margin, 283);
}
