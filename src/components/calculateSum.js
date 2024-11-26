const calculateSum = (values) => {
    return values.reduce((sum, value) => sum + (parseFloat(value) || 0), 0);
  };
  
  // Main function to calculate AGI
  export const calculateAGI = (incomeSources,moreIncome, deductions,moreDeductions) => {
    
    const grossIncome = calculateSum(incomeSources);  
    const moreGrossIncome = calculateSum(moreIncome);
  
    const totalAdjustments = calculateSum(deductions);
    const totalMoreDeductions = calculateSum(moreDeductions);
  
    // Calculate AGI
    
    const adjustedGrossIncome =( (grossIncome + moreGrossIncome )- (totalAdjustments + totalMoreDeductions));
  
    return {
      grossIncome,           
      totalAdjustments,     
      adjustedGrossIncome,   
    };
  };
  