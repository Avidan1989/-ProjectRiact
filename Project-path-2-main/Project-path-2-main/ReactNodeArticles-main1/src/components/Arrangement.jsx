import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function Arrangement() {
  const [shifts, setShifts] = useState([]);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert("אנא בחר קובץ להעלאה");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // לוג לבדיקת הדפים בקובץ ה-Excel
      console.log("Sheet names:", workbook.SheetNames);

      // נניח שהנתונים נמצאים בדף הראשון
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // המרת הגיליון לפורמט JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // לוג להדפסת התוכן המומר
      console.log("Data from Excel sheet:", jsonData);

      // עדכון רשימת המשמרות
      setShifts(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <h1>סידור עבודה</h1>

      {/* כפתור לבחירת קובץ */}
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />

      {/* כפתור להעלאת הקובץ */}
      <button onClick={handleUpload}>הוסף את הנתונים לטבלה</button>

      {/* הצגת הטבלה */}
      <table>
        <thead>
          <tr>
            <th>שם עובד</th>
            <th>תאריך</th>
            <th>שעות</th>
          </tr>
        </thead>
        <tbody>
          {shifts.length > 0 ? (
            shifts.map((shift, index) => (
              <tr key={index}>
                <td>{shift.employeeName || 'לא נמצא'}</td>
                <td>{shift.date || 'לא נמצא'}</td>
                <td>{shift.time || 'לא נמצא'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">לא נמצאו נתונים להציג.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Arrangement;
