// src/utils/exportUtils.ts
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * Downloads a Blob as a file with the given filename.
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Exports an array of items to CSV.
 *
 * @param items - The data items to export.
 * @param headers - CSV column headers.
 * @param mapper - Function mapping an item to an array of cell values.
 */
export function exportCsv<T>(
  items: T[],
  headers: string[],
  mapper: (item: T) => (string | number)[]
): void {
  if (!items.length) return;
  const rows = items.map(mapper);
  const csvContent = [headers, ...rows]
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    )
    .join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  downloadBlob(blob, `export-${new Date().toISOString()}.csv`);
}

/**
 * Exports an array of items to PDF using jsPDF and autoTable.
 *
 * @param items - The data items to export.
 * @param columns - Column headers for the PDF table.
 * @param mapper - Function mapping an item to an array of cell values.
 */
export function exportPdf<T>(
  items: T[],
  columns: string[],
  mapper: (item: T) => (string | number)[]
): void {
  if (!items.length) return;
  const doc = new jsPDF({ unit: "pt", format: "A4" });
  const data = items.map(mapper);
  doc.setFontSize(16);
  doc.text("Export", 40, 50);
  autoTable(doc, {
    startY: 70,
    head: [columns],
    body: data,
    styles: { fontSize: 10, cellPadding: 4 },
    headStyles: { fillColor: [22, 160, 133] },
  });
  doc.save(`export-${new Date().toISOString()}.pdf`);
}

// Usage example in UsersComponent.tsx:
// import { exportCsv, exportPdf } from "@/utils/exportUtils";
//
// <button onClick={() => exportCsv(
//    filteredUsers,
//    ["Name", "Email", "Phone", "Status", "Role"],
//    (u) => [
//      u.name,
//      u.emails[0]?.email ?? "",
//      u.phones[0]?.number ?? "",
//      u.status,
//      u.role,
//    ]
// )}>Export CSV</button>
//
// <button onClick={() => exportPdf(
//    filteredUsers,
//    ["Name", "Email", "Phone", "Status", "Role"],
//    (u) => [
//      u.name,
//      u.emails[0]?.email ?? "",
//      u.phones[0]?.number ?? "",
//      u.status,
//      u.role,
//    ]
// )}>Export PDF</button>
