import * as XLSX from 'xlsx';

export interface ExportData {
  title: string;
  data: any[];
  metadata?: {
    generatedAt: string;
    filters: any;
    totalRecords: number;
    source: string;
  };
}

export class StatsExporter {
  static async exportToExcel(exportData: ExportData, filename?: string): Promise<void> {
    try {
      const workbook = XLSX.utils.book_new();
      
      // Create main data sheet
      const worksheet = XLSX.utils.json_to_sheet(exportData.data);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
      
      // Create metadata sheet if available
      if (exportData.metadata) {
        const metadataSheet = XLSX.utils.json_to_sheet([
          { Property: 'Generated At', Value: exportData.metadata.generatedAt },
          { Property: 'Total Records', Value: exportData.metadata.totalRecords },
          { Property: 'Source', Value: exportData.metadata.source },
          { Property: 'Filters Applied', Value: JSON.stringify(exportData.metadata.filters, null, 2) }
        ]);
        XLSX.utils.book_append_sheet(workbook, metadataSheet, 'Metadata');
      }
      
      // Create summary sheet with statistics
      const summaryData = this.generateSummaryData(exportData.data);
      if (summaryData.length > 0) {
        const summarySheet = XLSX.utils.json_to_sheet(summaryData);
        XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');
      }
      
      const fileName = filename || `${exportData.title}_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(workbook, fileName);
      
      console.log(`Excel file exported: ${fileName}`);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      throw new Error('Failed to export Excel file');
    }
  }

  static async exportToWord(exportData: ExportData, filename?: string): Promise<void> {
    try {
      const content = this.generateWordContent(exportData);
      const blob = new Blob([content], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || `${exportData.title}_${new Date().toISOString().split('T')[0]}.doc`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log(`Word file exported: ${link.download}`);
    } catch (error) {
      console.error('Error exporting to Word:', error);
      throw new Error('Failed to export Word file');
    }
  }

  static async exportToText(exportData: ExportData, filename?: string): Promise<void> {
    try {
      const content = this.generateTextContent(exportData);
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || `${exportData.title}_${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log(`Text file exported: ${link.download}`);
    } catch (error) {
      console.error('Error exporting to Text:', error);
      throw new Error('Failed to export text file');
    }
  }

  private static generateSummaryData(data: any[]): any[] {
    if (!data || data.length === 0) return [];
    
    const summary = [];
    
    // Total count
    summary.push({ Metric: 'Total Records', Value: data.length });
    
    // Date range analysis
    const dates = data
      .map(item => new Date(item.createdAt || item.timestamp || item.date))
      .filter(date => !isNaN(date.getTime()))
      .sort((a, b) => a.getTime() - b.getTime());
    
    if (dates.length > 0) {
      summary.push({ 
        Metric: 'Date Range', 
        Value: `${dates[0].toLocaleDateString()} to ${dates[dates.length - 1].toLocaleDateString()}` 
      });
    }
    
    // Category analysis
    const categories = data.reduce((acc, item) => {
      const category = item.category || item.projectType || 'Unknown';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});
    
    Object.entries(categories).forEach(([category, count]) => {
      summary.push({ Metric: `${category} Count`, Value: count });
    });
    
    // Country analysis if available
    const countries = data.reduce((acc, item) => {
      const country = item.country || 'Unknown';
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {});
    
    const topCountries = Object.entries(countries)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 5);
    
    topCountries.forEach(([country, count], index) => {
      summary.push({ Metric: `Top Country ${index + 1}`, Value: `${country} (${count})` });
    });
    
    return summary;
  }

  private static generateWordContent(exportData: ExportData): string {
    let content = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${exportData.title}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
        h2 { color: #1e40af; margin-top: 30px; }
        table { border-collapse: collapse; width: 100%; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f3f4f6; font-weight: bold; }
        .metadata { background-color: #f9fafb; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .summary { background-color: #eff6ff; padding: 15px; border-radius: 5px; margin: 20px 0; }
    </style>
</head>
<body>
    <h1>${exportData.title}</h1>
    
    ${exportData.metadata ? `
    <div class="metadata">
        <h2>Report Information</h2>
        <p><strong>Generated:</strong> ${exportData.metadata.generatedAt}</p>
        <p><strong>Total Records:</strong> ${exportData.metadata.totalRecords}</p>
        <p><strong>Source:</strong> ${exportData.metadata.source}</p>
        <p><strong>Filters:</strong> ${JSON.stringify(exportData.metadata.filters, null, 2)}</p>
    </div>
    ` : ''}
    
    <h2>Data Summary</h2>
    <div class="summary">
        ${this.generateSummaryData(exportData.data).map(item => 
          `<p><strong>${item.Metric}:</strong> ${item.Value}</p>`
        ).join('')}
    </div>
    
    <h2>Detailed Data</h2>
    <table>
        <thead>
            <tr>
                ${Object.keys(exportData.data[0] || {}).map(key => `<th>${key}</th>`).join('')}
            </tr>
        </thead>
        <tbody>
            ${exportData.data.map(row => `
                <tr>
                    ${Object.values(row).map(value => `<td>${String(value)}</td>`).join('')}
                </tr>
            `).join('')}
        </tbody>
    </table>
    
    <div style="margin-top: 40px; font-size: 12px; color: #666;">
        <p>Generated by MoviePulse Analytics Platform</p>
        <p>This report contains audience insights and entertainment preferences data.</p>
    </div>
</body>
</html>
    `;
    
    return content;
  }

  private static generateTextContent(exportData: ExportData): string {
    let content = `${exportData.title}\n`;
    content += '='.repeat(exportData.title.length) + '\n\n';
    
    if (exportData.metadata) {
      content += 'REPORT INFORMATION\n';
      content += '-'.repeat(18) + '\n';
      content += `Generated: ${exportData.metadata.generatedAt}\n`;
      content += `Total Records: ${exportData.metadata.totalRecords}\n`;
      content += `Source: ${exportData.metadata.source}\n`;
      content += `Filters: ${JSON.stringify(exportData.metadata.filters, null, 2)}\n\n`;
    }
    
    content += 'DATA SUMMARY\n';
    content += '-'.repeat(12) + '\n';
    const summaryData = this.generateSummaryData(exportData.data);
    summaryData.forEach(item => {
      content += `${item.Metric}: ${item.Value}\n`;
    });
    content += '\n';
    
    content += 'DETAILED DATA\n';
    content += '-'.repeat(13) + '\n\n';
    
    if (exportData.data.length > 0) {
      const headers = Object.keys(exportData.data[0]);
      
      // Create table header
      content += headers.join('\t') + '\n';
      content += headers.map(() => '-'.repeat(15)).join('\t') + '\n';
      
      // Add data rows
      exportData.data.forEach(row => {
        content += Object.values(row).map(value => String(value)).join('\t') + '\n';
      });
    }
    
    content += '\n\n';
    content += 'Generated by MoviePulse Analytics Platform\n';
    content += 'This report contains audience insights and entertainment preferences data.\n';
    
    return content;
  }
}

export default StatsExporter;