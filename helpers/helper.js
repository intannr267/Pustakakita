const borrowBook=()=>{
  const today = new Date()
  return today.toISOString().split('T')[0]; 
}

const returnDate = () => {
  const today = new Date();
  today.setDate(today.getDate() + 7);
  return today.toISOString().split('T')[0]; 
};

module.exports = {
  borrowBook,returnDate
};
