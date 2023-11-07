import React from 'react';
import Ticket from '../Ticket/Ticket';
const Tickets = ({tickets, addTicket}) => {
	return (
        <div>
            {tickets.map((ticket)=> <Ticket key={ticket.id} ticket={ticket} addTicket={addTicket}/>)}
        </div>	
	);
};

export default Tickets;