"use client";

import { useState } from "react";
import { calculateAGI } from "./calculateSum";

export default function Home() {
  // States for income sources and deductions
  const [incomeSources, setIncomeSources] = useState({
    salary: "",
    business: "",
    interest: "",
    capitalGains: "",
    pension: "",
    otherIncome: "",
    // socialSecurity: "",
    // alimony: "",
    // realEstate: "",
    // unemployment: "",
    // stateRefunds: "",
    // prizes: "",
    // juryFees: "",
  });

  const [moreIncome, setMoreIncome]= useState({
    socialSecurity: "",
    alimony: "",
    realEstate: "",
    unemployment: "",
    stateRefunds: "",
    prizes: "",
    juryFees: "",
  });

  const [deductions, setDeductions] = useState({
    educatorExpenses: "",
    studentLoan: "",
    tuition: "",
    retirementContributionsIRSa: "",
    alimonyPaid: "",
    otherDeductions: "",
    // selfEmploymentTax: "",
    // hsaContributions: "",
    // healthInsurance: "",
    // retirementContributions: "",
    // movingExpenses: "",
  });

  const [moreDeductions, setMoreDeductions] = useState({
    selfEmploymentTax: "",
    hsaContributions: "",
    healthInsurance: "",
    retirementContributions: "",
    movingExpenses: "",
  });

  const [results, setResults] = useState(null);

  // Handle input change for income and deductions
  const handleInputChange = (e, category, key) => {
    if (category === "income") {
      setIncomeSources({ ...incomeSources, [key]: e.target.value });
    }
    if (category === "moreincome") {
      setMoreIncome({ ...moreIncome, [key]: e.target.value });
    }
    if (category === "deductions") {
      setDeductions({ ...deductions, [key]: e.target.value });
    }
     if (category === "moredeductions") {
      setMoreDeductions({ ...moreDeductions, [key]: e.target.value });
    }
  };


  // Calculate AGI on form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const incomeValues = Object.values(incomeSources);
    const moreIncomeValues = Object.values(moreIncome);
    const deductionValues = Object.values(deductions);
    const moreDeductionValues = Object.values(moreDeductions);

    const agiResults = calculateAGI(incomeValues,moreIncomeValues, deductionValues,moreDeductionValues);
    setResults(agiResults);
  };

  return (
    <div style={styles.container}>
      <h1>Adjusted Gross Income (AGI) Calculator</h1>
      <form style={styles.form} onSubmit={handleSubmit}>
        {/* Income Inputs */}
        <h2 style={{color:"#2563eb"}} ><b>Gross Income</b></h2>
        {Object.keys(incomeSources).map((key) => (
          <label key={key} style={styles.label}>
            {/* //string manipulation function */}
            {key.replace(/([A-Z])/g, " $1")}:
            <input
              type="number"
              value={incomeSources[key]}
              onChange={(e) => handleInputChange(e, "income", key)}
              style={styles.input}
              placeholder={`Enter ${key}`}
            />
          </label>
        ))}

        {/* More Income Inputs */}
        <h2  style={{color:"#2563eb"}}><b>More Incomes</b></h2>
        {Object.keys(moreIncome).map((key) => (
          <label key={key} style={styles.label}>
            {/* //string manipulation function */}
            {key.replace(/([A-Z])/g, " $1")}:
            <input
              type="number"
              value={moreIncome[key]}
              onChange={(e) => handleInputChange(e, "moreincome", key)}
              style={styles.input}
              placeholder={`Enter ${key}`}
            />
          </label>
        ))}

        {/* Deductions Inputs */}
        <h2  style={{color:"#2563eb"}} ><b>Deductions</b></h2>
        {Object.keys(deductions).map((key) => (
          <label key={key} style={styles.label}>
            {/* //string manipulation function */}
            {key.replace(/([A-Z])/g, " $1")}:
            <input
              type="number"
              value={deductions[key]}
              onChange={(e) => handleInputChange(e, "deductions", key)}
              style={styles.input}
              placeholder={`Enter ${key}`}
            />
          </label>
        ))}
        
        {/* More Deductions Inputs*/}
        
        <h2 style={{color:"#2563eb"}}><b>More Deductions</b></h2>
        {Object.keys(moreDeductions).map((key) => (
          <label key={key} style={styles.label}>
            {/* //string manipulation function */}
            {key.replace(/([A-Z])/g, " $1")}:
            <input
              type="number"
              value={moreDeductions[key]}
              onChange={(e) => handleInputChange(e, "moredeductions", key)}
              style={styles.input}
              placeholder={`Enter ${key}`}
            />
          </label>
        ))}

        {/* Submit Button */}
        <button type="submit" style={styles.button}>
          Calculate AGI
        </button>
      </form>

      {/* Display Results */}
      {results && (
        <div style={styles.result}>
          <h2 style={{color:"#2563eb"}}><b>Results</b></h2>
          <p>Gross Income: ₨{results.grossIncome.toFixed(2)}</p>
          <p>Total Adjustments: ₨{results.totalAdjustments.toFixed(2)}</p>
          <p>Adjusted Gross Income (AGI): ₨{results.adjustedGrossIncome.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { fontFamily: "Arial, sans-serif", padding: "2rem" ,marginLeft:"25%"},
  form: { display: "flex", flexDirection: "column", gap: "1rem" },
  label: { fontSize: "1rem" },
  input: { padding: "0.5rem", fontSize: "1rem" },
  button: { padding: "0.7rem", fontSize: "1rem", background: "#0070f3", color: "#fff",width:"50%" },
  result: { marginTop: "1.5rem", fontSize: "1.2rem" },
};
