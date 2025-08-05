import * as XLSX from 'xlsx';

export interface ClearExportData {
  opinions: any[];
  demographicSummary: {
    ageGroups: Record<string, any>;
    genderPreferences: Record<string, any>;
    countryPreferences: Record<string, any>;
  };
  userNotes: Array<{
    note: string;
    category: string;
    age?: string;
    gender?: string;
    country?: string;
    projectType?: string;
    genre?: string;
    createdAt: string;
  }>;
  metadata: {
    generatedAt: string;
    totalOpinions: number;
    appliedFilters: string;
  };
}

export class ClearStatsExporter {
  static async exportToExcel(data: ClearExportData, filename?: string): Promise<void> {
    try {
      const workbook = XLSX.utils.book_new();
      
      // 1. Overview Sheet - Clear summary
      const overviewData = [
        { 'Report Section': 'MOVIEPULSE ANALYTICS OVERVIEW', 'Details': '' },
        { 'Report Section': 'Total Opinions Collected', 'Details': data.metadata.totalOpinions },
        { 'Report Section': 'Report Generated On', 'Details': data.metadata.generatedAt },
        { 'Report Section': 'Data Filters Applied', 'Details': data.metadata.appliedFilters || 'All Data Included' },
        { 'Report Section': '', 'Details': '' },
        { 'Report Section': 'KEY INSIGHTS SUMMARY', 'Details': '' },
        { 'Report Section': 'Total Age Groups Represented', 'Details': Object.keys(data.demographicSummary.ageGroups).length },
        { 'Report Section': 'Total Countries Represented', 'Details': Object.keys(data.demographicSummary.countryPreferences).length },
        { 'Report Section': 'Total User Feedback Entries', 'Details': data.userNotes.length },
        { 'Report Section': 'Most Active Age Group', 'Details': Object.entries(data.demographicSummary.ageGroups).sort(([,a], [,b]) => (b as any).count - (a as any).count)[0]?.[0] || 'N/A' },
        { 'Report Section': 'Top Country by Participation', 'Details': Object.entries(data.demographicSummary.countryPreferences).sort(([,a], [,b]) => (b as any).count - (a as any).count)[0]?.[0] || 'N/A' }
      ];
      
      const overviewSheet = XLSX.utils.json_to_sheet(overviewData);
      XLSX.utils.book_append_sheet(workbook, overviewSheet, 'Overview');
      
      // 2. User Notes Sheet - All feedback clearly organized
      const notesData = data.userNotes.map(note => ({
        'User Feedback': note.note,
        'Content Category': note.category || 'General',
        'Project Type': note.projectType || 'N/A',
        'Genre': note.genre || 'N/A',
        'User Age': note.age || 'Not specified',
        'User Gender': note.gender || 'Not specified',
        'User Country': note.country || 'Not specified',
        'Date Submitted': new Date(note.createdAt).toLocaleDateString()
      }));
      
      const notesSheet = XLSX.utils.json_to_sheet(notesData);
      XLSX.utils.book_append_sheet(workbook, notesSheet, 'User Feedback & Notes');
      
      // 3. Demographics by Age Sheet
      const ageData = Object.entries(data.demographicSummary.ageGroups).map(([age, stats]: [string, any]) => ({
        'Age Group': age,
        'Total Opinions': stats.count,
        'Top Genre': stats.topGenre || 'N/A',
        'Top Platform': stats.topPlatform || 'N/A',
        'Percentage of Total': `${((stats.count / data.metadata.totalOpinions) * 100).toFixed(1)}%`,
        'Popular Categories': stats.categories?.join(', ') || 'N/A'
      }));
      
      const ageSheet = XLSX.utils.json_to_sheet(ageData);
      XLSX.utils.book_append_sheet(workbook, ageSheet, 'Age Group Analysis');
      
      // 4. Gender Preferences Sheet
      const genderData = Object.entries(data.demographicSummary.genderPreferences).map(([gender, stats]: [string, any]) => ({
        'Gender': gender,
        'Total Opinions': stats.count,
        'Top Content Category': stats.topCategory || 'N/A',
        'Top Genre': stats.topGenre || 'N/A',
        'Percentage of Total': `${((stats.count / data.metadata.totalOpinions) * 100).toFixed(1)}%`,
        'Preferred Platforms': stats.platforms?.join(', ') || 'N/A'
      }));
      
      const genderSheet = XLSX.utils.json_to_sheet(genderData);
      XLSX.utils.book_append_sheet(workbook, genderSheet, 'Gender Preferences');
      
      // 5. Country Insights Sheet
      const countryData = Object.entries(data.demographicSummary.countryPreferences).map(([country, stats]: [string, any]) => ({
        'Country': country,
        'Total Opinions': stats.count,
        'Top Genre': stats.topGenre || 'N/A',
        'Top Platform': stats.topPlatform || 'N/A',
        'Percentage of Total': `${((stats.count / data.metadata.totalOpinions) * 100).toFixed(1)}%`,
        'Popular Content Types': stats.contentTypes?.join(', ') || 'N/A'
      }));
      
      const countrySheet = XLSX.utils.json_to_sheet(countryData);
      XLSX.utils.book_append_sheet(workbook, countrySheet, 'Country Analysis');
      
      // 6. Raw Data Sheet (for detailed analysis)
      const rawData = data.opinions.map(opinion => ({
        'Opinion ID': opinion._id || opinion.id,
        'Category': opinion.category,
        'Project Type': opinion.projectType,
        'Genre': opinion.genre,
        'Rating': opinion.rating,
        'User Notes': opinion.userNotes || opinion.notes || 'No notes provided',
        'Age': opinion.demographics?.age || 'Not specified',
        'Gender': opinion.demographics?.gender || 'Not specified',
        'Country': opinion.country || 'Not specified',
        'Region': opinion.demographics?.region || 'Not specified',
        'Submission Date': new Date(opinion.createdAt || opinion.timestamp).toLocaleDateString(),
        'Platform': opinion.platform || 'Web',
        'Device': opinion.deviceInfo?.device || 'Unknown'
      }));
      
      const rawSheet = XLSX.utils.json_to_sheet(rawData);
      XLSX.utils.book_append_sheet(workbook, rawSheet, 'All Opinions (Raw Data)');
      
      const fileName = filename || `MoviePulse_Analytics_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(workbook, fileName);
      
      console.log(`Clear Excel report exported: ${fileName}`);
    } catch (error) {
      console.error('Error exporting clear Excel file:', error);
      throw new Error('Failed to export clear Excel file');
    }
  }

  static async exportToWord(data: ClearExportData, filename?: string): Promise<void> {
    try {
      const content = this.generateClearWordContent(data);
      const blob = new Blob([content], { 
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
      });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || `MoviePulse_Report_${new Date().toISOString().split('T')[0]}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log(`Clear Word report exported: ${link.download}`);
    } catch (error) {
      console.error('Error exporting clear Word file:', error);
      throw new Error('Failed to export clear Word file');
    }
  }

  static async exportToText(data: ClearExportData, filename?: string): Promise<void> {
    try {
      const content = this.generateClearTextContent(data);
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || `MoviePulse_Analysis_${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log(`Clear text report exported: ${link.download}`);
    } catch (error) {
      console.error('Error exporting clear text file:', error);
      throw new Error('Failed to export clear text file');
    }
  }

  private static generateClearWordContent(data: ClearExportData): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>MoviePulse Analytics Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        h1 { color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 10px; }
        h2 { color: #1e40af; margin-top: 30px; background: #f0f9ff; padding: 10px; border-left: 4px solid #2563eb; }
        h3 { color: #1e3a8a; margin-top: 20px; }
        .summary-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; margin: 15px 0; border-radius: 8px; }
        .insight-box { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; margin: 15px 0; border-radius: 8px; }
        .notes-section { background: #f0f9ff; border: 1px solid #3b82f6; padding: 15px; margin: 15px 0; border-radius: 8px; }
        table { border-collapse: collapse; width: 100%; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #3b82f6; color: white; font-weight: bold; }
        tr:nth-child(even) { background-color: #f8fafc; }
        .stat-highlight { font-weight: bold; color: #1e40af; }
    </style>
</head>
<body>
    <h1>🎬 MoviePulse Analytics Report</h1>
    
    <div class="summary-box">
        <h2>📊 Executive Summary</h2>
        <p><strong>Report Generated:</strong> ${data.metadata.generatedAt}</p>
        <p><strong>Total Opinions Analyzed:</strong> <span class="stat-highlight">${data.metadata.totalOpinions}</span></p>
        <p><strong>Filters Applied:</strong> ${data.metadata.appliedFilters || 'None'}</p>
    </div>

    <h2>👥 Age Group Insights</h2>
    <div class="insight-box">
        <h3>What Different Age Groups Prefer:</h3>
        ${Object.entries(data.demographicSummary.ageGroups).map(([age, stats]: [string, any]) => `
            <p><strong>${age} Age Group:</strong> ${stats.count} opinions collected<br>
            <em>Top Interest:</em> ${stats.topGenre || 'Mixed preferences'}<br>
            <em>Popular Platform:</em> ${stats.topPlatform || 'Various platforms'}</p>
        `).join('')}
    </div>

    <h2>🚻 Gender Preferences</h2>
    <div class="insight-box">
        <h3>Content Preferences by Gender:</h3>
        ${Object.entries(data.demographicSummary.genderPreferences).map(([gender, stats]: [string, any]) => `
            <p><strong>${gender} Audience:</strong> ${stats.count} opinions<br>
            <em>Prefers:</em> ${stats.topCategory || 'Diverse content'}<br>
            <em>Top Genre:</em> ${stats.topGenre || 'Mixed genres'}</p>
        `).join('')}
    </div>

    <h2>🌍 Country & Regional Insights</h2>
    <div class="insight-box">
        <h3>Geographic Preferences:</h3>
        ${Object.entries(data.demographicSummary.countryPreferences).slice(0, 10).map(([country, stats]: [string, any]) => `
            <p><strong>${country}:</strong> ${stats.count} opinions<br>
            <em>Popular Genre:</em> ${stats.topGenre || 'Various genres'}<br>
            <em>Platform Preference:</em> ${stats.topPlatform || 'Multiple platforms'}</p>
        `).join('')}
    </div>

    <h2>💬 User Feedback & Notes</h2>
    <div class="notes-section">
        <h3>What Users Are Saying:</h3>
        ${data.userNotes.slice(0, 50).map(note => `
            <div style="margin-bottom: 15px; padding: 10px; background: white; border-radius: 5px;">
                <p><strong>Feedback:</strong> "${note.note}"</p>
                <p><small><em>Category:</em> ${note.category} | <em>User:</em> ${note.age || 'N/A'}, ${note.gender || 'N/A'}, ${note.country || 'N/A'} | <em>Date:</em> ${new Date(note.createdAt).toLocaleDateString()}</small></p>
            </div>
        `).join('')}
        ${data.userNotes.length > 50 ? `<p><em>...and ${data.userNotes.length - 50} more feedback entries</em></p>` : ''}
    </div>

    <div style="margin-top: 40px; padding: 20px; background: #f1f5f9; border-radius: 8px; text-align: center;">
        <p><strong>📈 Generated by MoviePulse Analytics Platform</strong></p>
        <p>This comprehensive report provides clear insights into audience preferences and entertainment consumption patterns.</p>
        <p><em>For more detailed analysis, please refer to the Excel export with additional data sheets.</em></p>
    </div>
</body>
</html>
    `;
  }

  private static generateClearTextContent(data: ClearExportData): string {
    let content = `🎬 MOVIEPULSE ANALYTICS REPORT\n`;
    content += '='.repeat(50) + '\n\n';
    
    content += `📊 EXECUTIVE SUMMARY\n`;
    content += '-'.repeat(25) + '\n';
    content += `Report Generated: ${data.metadata.generatedAt}\n`;
    content += `Total Opinions: ${data.metadata.totalOpinions}\n`;
    content += `Filters Applied: ${data.metadata.appliedFilters || 'None'}\n\n`;
    
    content += `👥 AGE GROUP INSIGHTS\n`;
    content += '-'.repeat(25) + '\n';
    Object.entries(data.demographicSummary.ageGroups).forEach(([age, stats]: [string, any]) => {
      content += `${age} Age Group: ${stats.count} opinions\n`;
      content += `  → Top Interest: ${stats.topGenre || 'Mixed preferences'}\n`;
      content += `  → Platform: ${stats.topPlatform || 'Various platforms'}\n\n`;
    });
    
    content += `🚻 GENDER PREFERENCES\n`;
    content += '-'.repeat(25) + '\n';
    Object.entries(data.demographicSummary.genderPreferences).forEach(([gender, stats]: [string, any]) => {
      content += `${gender} Audience: ${stats.count} opinions\n`;
      content += `  → Prefers: ${stats.topCategory || 'Diverse content'}\n`;
      content += `  → Top Genre: ${stats.topGenre || 'Mixed genres'}\n\n`;
    });
    
    content += `🌍 COUNTRY INSIGHTS\n`;
    content += '-'.repeat(25) + '\n';
    Object.entries(data.demographicSummary.countryPreferences).slice(0, 15).forEach(([country, stats]: [string, any]) => {
      content += `${country}: ${stats.count} opinions\n`;
      content += `  → Popular: ${stats.topGenre || 'Various genres'}\n`;
      content += `  → Platform: ${stats.topPlatform || 'Multiple platforms'}\n\n`;
    });
    
    content += `💬 USER FEEDBACK & NOTES\n`;
    content += '-'.repeat(25) + '\n';
    data.userNotes.slice(0, 30).forEach((note, index) => {
      content += `${index + 1}. "${note.note}"\n`;
      content += `   Category: ${note.category} | User: ${note.age || 'N/A'}, ${note.gender || 'N/A'}, ${note.country || 'N/A'}\n`;
      content += `   Date: ${new Date(note.createdAt).toLocaleDateString()}\n\n`;
    });
    
    if (data.userNotes.length > 30) {
      content += `...and ${data.userNotes.length - 30} more feedback entries\n\n`;
    }
    
    content += '\n' + '='.repeat(50) + '\n';
    content += '📈 Generated by MoviePulse Analytics Platform\n';
    content += 'Comprehensive audience insights for entertainment industry\n';
    
    return content;
  }
}

export default ClearStatsExporter;