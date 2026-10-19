export function exportLeadsCsv(inquiries) {
  if (!inquiries || inquiries.length === 0) {
    alert('No leads available to export.');
    return;
  }
  const headers = [
    'ID',
    'Customer Name',
    'Phone',
    'Email',
    'Service Type',
    'Location',
    'Status',
    'Project Details',
    'Date Submitted'
  ];
  const rows = inquiries.map((item) => [
    item.id,
    `"${(item.name || '').replace(/"/g, '""')}"`,
    `"${(item.phone || '').replace(/"/g, '""')}"`,
    `"${(item.email || '').replace(/"/g, '""')}"`,
    `"${(item.service_type || '').replace(/"/g, '""')}"`,
    `"${(item.location || '').replace(/"/g, '""')}"`,
    `"${(item.status || 'New').replace(/"/g, '""')}"`,
    `"${(item.project_details || '').replace(/"/g, '""')}"`,
    `"${item.created_at || ''}"`
  ]);

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute(
    'download',
    `wazir_leads_crm_export_${new Date().toISOString().split('T')[0]}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
