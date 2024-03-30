// to handle uncaught errors

setTimeout(() => {
  throw new Error('oops')
}, 300);

// for synchronous errors
process.on('uncaughtException', ()=>{

})

// for asynchronous errors
process.on('unhandledRejection', ()=>{

})