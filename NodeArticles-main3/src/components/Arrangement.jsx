import React, { useState, useEffect, useContext } from 'react';
import * as XLSX from 'xlsx';
import '../assets/styles/Arrangement.css';
import { AuthContext } from './AuthContext';

function Arrangement() {
  const { user } = useContext(AuthContext);
  console.log('Current user in Arrangement:', user);

  const [shifts, setShifts] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchDataFromDB();
  }, []);

  const fetchDataFromDB = () => {
    fetch('/workers', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        console.log('Data from DB:', data);
        setShifts(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

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
      // Include cellDates: true to read dates as Date objects
      const workbook = XLSX.read(data, { type: 'array', cellDates: true });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      // Convert worksheet to JSON; raw false ensures we get strings for non-dates.
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
      console.log("Data from Excel sheet:", jsonData);
      setShifts(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return '';
    let date;
    if (dateValue instanceof Date) {
      date = dateValue;
    } else {
      // Try converting string to Date
      date = new Date(dateValue);
    }
    if (isNaN(date)) return dateValue; // fallback if conversion fails
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const formatHours = (hours) => {
    if (!hours) return '';
    return hours.replace(/[^0-9:-]/g, '');
  };

  const handleSaveToDB = () => {
    if (shifts.length === 0) {
      alert("אין נתונים לשלוח ל-DB");
      return;
    }
    const formattedShifts = shifts.map(shift => ({
      day: shift["יום"],
      employee_name: shift["שם עובד"],
      date: formatDate(shift["תאריך"]),
      hours: formatHours(shift["שעות"])
    }));
    fetch('/workers/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(formattedShifts),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert('הנתונים נשמרו בהצלחה ב-DB');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('שגיאה בשמירה ב-DB');
      });
  };

  const handleDeleteAll = () => {
    fetch('/workers/delete', {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Data deleted:', data);
        alert('הנתונים נמחקו בהצלחה');
        setShifts([]);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('שגיאה במחיקת הנתונים');
      });
  };

  return (
    <div>
      <h1>סידור עבודה</h1>
      {user?.role === 'admin' && (
        <div className="admin-controls">
          <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
          <button onClick={handleUpload}>הוסף את הנתונים לטבלה</button>
          <button onClick={handleSaveToDB}>שמור ב-DB</button>
          <button onClick={handleDeleteAll}>מחק את כל הנתונים מה-DB</button>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>יום</th>
              <th>שם עובד</th>
              <th>תאריך</th>
              <th>שעות</th>
            </tr>
          </thead>
          <tbody>
            {shifts.length > 0 ? (
              shifts.map((shift, index) => (
                <tr key={index}>
                  <td>{shift["יום"] || 'לא נמצא'}</td>
                  <td>{shift["שם עובד"] || 'לא נמצא'}</td>
                  <td>{formatDate(shift["תאריך"]) || 'לא נמצא'}</td>
                  <td>{shift["שעות"] || 'לא נמצא'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">לא נמצאו נתונים להציג.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Arrangement;
