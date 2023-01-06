const axios = require('axios');

const processPendingTicket = async (message) => {  
  try{
    await axios.patch('https://shop-wc-pwiq.vercel.app/api/v1/shop/reserve',{
                          matchNumber:message.body.matchNumber,
                          tickets:message.body.tickets
                  })
  }catch(e){
    console.log("No more tickets available")
    return next(new AppError(e,401))
  }
  console.log('[processPendingTicket]', message)
  return Promise.resolve('[processPendingTicket]')
};

const processReservedTicket = async (message) => {
  try{
    await axios.patch('https://shop-wc-pwiq.vercel.app/api/v1/shop/reserve/success',{
                          matchNumber:message.body.matchNumber,
                          tickets:message.body.tickets
                  })
  }catch(e){
    return next(new AppError(e,401))
  }
  console.log('[processReservedTicket]', message)
  return Promise.resolve('[processReservedTicket]')
};


const processCancelledTicket = async (message) => {
  try{
    await axios.patch('https://shop-wc-pwiq.vercel.app/api/v1/shop/reserve/failed',{
                          matchNumber:message.body.matchNumber,
                          tickets:message.body.tickets
                  })
  }catch(e){
    return next(new AppError(e,401))
  }
  console.log('[processCancelledTicket]', message)
  return Promise.resolve('[processCancelledTicket]')
};

const processMasterlist = async (message) => {
  try{
    await axios.post('https://shop-wc-pwiq.vercel.app/api/v1/shop/',{
                        matchNumber: message.body.matchNumber,
                        roundNumber: message.body.roundNumber,
                        dateUtc: message.body.dateUtc,
                        location: message.body.location,
                        availability: message.body.availability,
                        homeTeam: message.body.homeTeam,
                        awayTeam: message.body.awayTeam,
                        group: message.body.group,
                  })
  }catch(e){
    return next(new AppError(e,401))
  }
  console.log('[processMasterlist]', message)
  return Promise.resolve('[processMasterlist]')
};

module.exports = {
  processPendingTicket,
  processReservedTicket,
  processCancelledTicket,
  processMasterlist
};
