'use client'
import React, { useEffect, useState, useRef } from 'react'
import {Ready} from '@/components/Ready'
import { toPng } from 'html-to-image'

const TicketsPage = () => {
  const [tickets, setTickets] = useState([])
  const [filteredTickets, setFilteredTickets] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [downloadingTickets, setDownloadingTickets] = useState({})
  const ticketRefs = useRef({})

  useEffect(() => {
    const downloadTicket = async (index) => {
      try {
        setDownloadingTickets(prev => ({ ...prev, [index]: true }))
        const element = ticketRefs.current[index]
        if (!element) {
          throw new Error('Ticket element not found')
        }
  
        
        const originalTransform = element.style.transform
        element.style.transform = 'none'
        
        
        const clone = element.cloneNode(true)
        clone.style.transform = 'none'
        clone.style.transition = 'none'
        
      
        document.body.appendChild(clone)
        
        const dataUrl = await toPng(clone, {
          quality: 1.0,
          pixelRatio: 2,
          skipAutoScale: true
        })
  
       
        document.body.removeChild(clone)
        
        
        element.style.transform = originalTransform
  
     
        const link = document.createElement('a')
        link.download = `ticket-${filteredTickets[index].eventName || 'event'}.png`
        link.href = dataUrl
        link.click()
      } catch (err) {
        console.error('Error downloading ticket:', err.message || err)
      } finally {
        setDownloadingTickets(prev => ({ ...prev, [index]: false }))
      }
    }

    const loadTickets = async () => {
      setIsLoading(true)
      const savedTickets = JSON.parse(localStorage.getItem('Tickets') || '[]').reverse()
      setTickets(savedTickets)
      setFilteredTickets(savedTickets)
      await new Promise(resolve => setTimeout(resolve, 500))
      setIsLoading(false)
    }
    loadTickets()
  }, [])



  return (
    <div className="w-full max-w-7xl mx-auto px-4 relative z-20">
      <h1 className="text-4xl md:text-5xl font-roadrage text-center mb-12">My Tickets</h1>

      
      {isLoading ? (
         <div className="text-center font-roboto text-lightgrey">
         <p className="text-xl">Loading...</p>
         
       </div>
      ) : filteredTickets.length === 0 ? (
        <div className="text-center font-roboto text-lightgrey">
          <p className="text-xl">No tickets found</p>
          <p className="mt-2">Book some tickets to see them here!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {filteredTickets.map((ticket, index) => (
            <div key={index} className="group relative">
              <div 
                ref={el => {
                  if (el) ticketRefs.current[index] = el
                }}
                data-ticket={index}
                className="transform group-hover:scale-[1.02] transition-all duration-300"
              >
                <Ready ticketDetails={ticket} />
              </div>
              
          
              <div className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[20px] flex items-center justify-center">
                <button
                  onClick={() => downloadTicket(index)}
                  disabled={downloadingTickets[index]}
                  className="flex items-center gap-2 bg-borderone hover:bg-bordertwo text-white font-roboto py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-90"
                  >
                    <path 
                      d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {downloadingTickets[index] ? 'Downloading...' : 'Download Ticket'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TicketsPage