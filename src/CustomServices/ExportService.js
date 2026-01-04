// Utility service for exporting data to CSV format
export const exportToCSV = (data, filename = 'export.csv') => {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  // Get headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    // Header row
    headers.join(','),
    // Data rows
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle values that need quotes (contain commas, quotes, or newlines)
        if (value === null || value === undefined) {
          return '';
        }
        const stringValue = String(value);
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      }).join(',')
    )
  ].join('\n');

  // Create and download the file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// Format enquiry data for export
export const formatEnquiryDataForExport = (enquiryList) => {
  if (!enquiryList || !enquiryList.data) {
    return [];
  }

  return enquiryList.data.map((enquiry, index) => ({
    'Sr No': index + 1,
    'Customer Name': enquiry.Customer || 'N/A',
    'Property': enquiry.Property || 'N/A',
    'Property Code': enquiry.propertyCode || 'N/A',
    'Email': enquiry.Email || 'N/A',
    'Mobile Number': enquiry.mobileNumber || 'N/A',
    'Reason To Buy': enquiry.reasonToBuy || 'N/A',
    'Preferred Location': enquiry.preferredLocation || 'N/A',
    'Budget': enquiry.budget || 'N/A',
    'Home Loan Options': enquiry.homeLoanOptions ? 'Yes' : 'No',
    'Site Visits': enquiry.siteVisits ? 'Yes' : 'No',
    'Terms Agreed': enquiry.termsAgreed ? 'Yes' : 'No',
    'Status': enquiry.status || 'N/A',
    'Date': enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleDateString() : 'N/A',
    'Time': enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleTimeString() : 'N/A',
    'Updated At': enquiry.updatedAt ? new Date(enquiry.updatedAt).toLocaleString() : 'N/A'
  }));
};



// Format developer data for export
export const formatDeveloperDataForExport = (developerList) => {
  if (!developerList || developerList.length === 0) {
    return [];
  }

  return developerList.map((developer, index) => ({
    'Sr No': index + 1,
    'Company Name': developer.companyName || 'N/A',
    'Email': developer.email || 'N/A',
    'Phone': developer.phone || 'N/A',
    'Type': developer.i_am || 'N/A',
    'Active Projects': developer.ongoingProjects || 0,
    'Featured': developer.featured ? 'Yes' : 'No',
    'Featured Order': developer.featuredOrder || 'N/A',
    'Status': developer.isActive ? 'Active' : 'Inactive',
    'Profile Completed': developer.profileCompleted ? 'Yes' : 'No',
    'Established Year': developer.establishedYear || 'N/A',
    'Subscription': developer.subscription ? 'Subscribed' : 'Not Subscribed',
    'Created At': developer.createdAt ? new Date(developer.createdAt).toLocaleDateString() : 'N/A',
    'Updated At': developer.updatedAt ? new Date(developer.updatedAt).toLocaleDateString() : 'N/A'
  }));
}; 