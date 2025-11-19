const generateOtp = () => {
  // lowest 4-digit number
  const min = 1000;
  // highest 4-digit number
  const max = 9999;

  // Generate a random number between min and max
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default generateOtp;
