import React from 'react'

const FormattedDate = ({createdAt}) => {
    const formattedDate = new Date(createdAt).toLocaleString('en-US', {
        month: 'short',  // "Jan"
        day: 'numeric',  // "2"
        year: 'numeric', // "2025"
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true,    // Display time in 12-hour format with AM/PM
      });
    
      return <span>{formattedDate}</span>;
};

export default FormattedDate
