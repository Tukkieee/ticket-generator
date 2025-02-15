import React, { useEffect, useState } from 'react'
import {Ready} from './Ready';

export const Tickets = () => {
  const [ticketDetails, setTicketDetails] = useState(null);

  useEffect(() => {
    // Get ticket details first
    const details = JSON.parse(localStorage.getItem('Details') || '{}');
    
    if (Object.keys(details).length > 0) {
      setTicketDetails(details);

      const existingTickets = JSON.parse(localStorage.getItem('Tickets') || '[]');
      // Check if ticket already exists before adding
      const ticketExists = existingTickets.some(ticket => 
        ticket.name === details.name && 
        ticket.email === details.email &&
        ticket.ticketType === details.ticketType
      );

      if (!ticketExists) {
        const updatedTickets = [...existingTickets, details];
        localStorage.setItem('Tickets', JSON.stringify(updatedTickets));
      }

      setTimeout(() => {
        localStorage.removeItem('Details');
      }, 0);
    }
  }, []);

  return <div className='max-w-72 sm:max-w-sm mx-auto'>
    <Ready isStep={true} ticketDetails={ticketDetails} />
  </div>

}

