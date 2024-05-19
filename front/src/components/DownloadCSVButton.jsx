import React, { useEffect, useState } from 'react';

import { saveAs } from 'file-saver';

const DownloadCSVButton = ({ expenses }) => {
  const convertArrayToCSV = (array) => {
    const filteredArray = array.map(({ author, id, ...rest }) => rest);
    const formattedArray = filteredArray.map((item) => {
      return { ...item, date: new Date(item.date).toLocaleDateString('en-UK') };
    });
    const header = Object.keys(formattedArray[0]).join(',');
    const rows = formattedArray.map((obj) => Object.values(obj).join(','));
    return [header, ...rows].join('\n');
  };

  const downloadCSV = () => {
    const csv = convertArrayToCSV(expenses);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'data.csv');
  };

  return (
    <div>
      <button onClick={downloadCSV}>Download CSV</button>
    </div>
  );
};

export default DownloadCSVButton;
