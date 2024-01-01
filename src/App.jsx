import React, { useEffect, useState } from 'react';
import logo from './assets/logo.png';
import formula from './assets/emiformula.png';
import './App.css'

const App = ()=>
{
  const [loanAmount,setloanAmount] = useState('20000');
  const [interestRate,setinterestRate] = useState('7.5');
  const [loanTenure,setloanTenure] = useState('240');
  const [emi,setemi] = useState('');
  const [interest,setinterest] = useState('');
  const [total,settotal] = useState('');
  const [err,seterr] = useState('');
  const [emiDetails,setemiDetails] = useState([])
  useEffect(()=>
  {
    calculate();
  },[loanAmount,interestRate,loanTenure])

  const calculate = () =>
  {
   
    const p = parseFloat(loanAmount);
    const r = parseFloat(interestRate)/(12*100);
    const n = parseFloat(loanTenure);

    if(!p || !r || !n)
    {
     seterr('Enter A Valid Input');
     setemiDetails([])
    }
    else if(loanAmount<0)
    {
        setloanAmount('20000')
    }
    else if(interestRate<0)
    {
      setinterestRate('7.5')
    }
    else if(loanTenure<0)
    {
      setloanTenure('240')
    }
    else 
    {
      seterr('');
      const emiamt = (p*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
      const amt = (emiamt*n);
      const init = (amt-p)
      setemi(Math.round(emiamt))
      setinterest(Math.round(init))
      settotal(Math.round(amt))

      const array = [];
      var remaining = p;
      for(let month = 1;month <= n;month++)
      {
        if(month < 10)
        {
           month = '0'+month;
        }
        const interest = remaining*r;
        const principal= emiamt-interest;
        remaining -= principal;
        array.push(
          {
            month,
            principal:(principal).toFixed(2),
            interests:(interest).toFixed(2),
            balance:(remaining).toFixed(2)
          }
        )
      }setemiDetails(array)
    }
  }
  return(
    <>
    <div className="top">
    <div className='container'>
    <h2><img src={logo} alt="" />EMI CALCULATOR</h2>
<br />
      <div className="input">
         <label htmlFor="">Loan Amount:
        <input type="number" value={loanAmount} onChange={(e)=>setloanAmount(e.target.value)}/>
        <input className='slider' type="range" value={loanAmount} max={400000} step={1000} onChange={(e)=>setloanAmount(e.target.value)}/>
         </label>
      </div> 
      <div className="input">
         <label htmlFor="">Interest Rate(%):
        <input type="number" value={interestRate} onChange={(e)=>setinterestRate(e.target.value)}/>
        <input type="range" value={interestRate} max={30} step={0.5} onChange={(e)=>setinterestRate(e.target.value)} />
         </label>
      </div> 
      <div className="input">
         <label htmlFor="">Tenure (in months):
        <input type="number" value={loanTenure} onChange={(e)=>setloanTenure(e.target.value)}/>
        <input type="range" value={loanTenure} max={700} step={10} onChange={(e)=>setloanTenure(e.target.value)}/>
         </label>
      </div><br />
      <p className="err">{err}</p>
    </div>
    <div className='details'>
      <ul>
        <li>Loan EMI:</li>
        <li>&#8377;{emi}</li>
      </ul> <div className="hr"></div>
   
      <ul>
        <li>Total Interest Payable:</li>
        <li>&#8377;{interest}</li>
      </ul> <div className="hr"></div>

      <ul>
        <li>Total Amount:</li>
        <li>&#8377;{total}</li>
      </ul>
    </div>
    </div>
    <div className='table'>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Principal</th>
            <th>Interest</th>
            <th>Remaining Amount</th>
          </tr>
        </thead>
        <tbody>
         {emiDetails.map((details)=>
         (
          <tr key={details.month}>
            <td>{details.month}</td>
            <td>&#8377;{details.principal}</td>
            <td>&#8377;{details.interests}</td>
            <td>&#8377;{details.balance}</td>
          </tr>
         ))}
        </tbody>
      </table>
    </div>
    <div className='introduction'>
      <h4>What is EMI?</h4>
      <p><b>Equated Monthly Installment</b> - EMI for short - is the amount payable every month to the 
        bank or any other financial institution until the loan amount is fully paid off.
        It consists of the interest on loan as well as part of the principal amount to be repaid. 
        The sum of principal amount and interest is divided by the tenure, i.e., number of months, 
        in which the loan has to be repaid. This amount has to be paid monthly. The interest component of the 
        EMI would be larger during the initial months and gradually reduce with each payment. 
        The exact percentage allocated towards payment of the principal depends on the interest rate. 
        Even though your monthly EMI payment won't change, the proportion of principal and interest components will change with time. 
        With each successive payment, you'll pay more towards the principal and less in interest.</p>

        <p>Here's the formula to calculate EMI:</p>
          <img src={formula}alt="EMI Formula" />
      
        <ul>
          where
          <li><b>E</b> is EMI.</li>
          <li><b>P</b> is Principal Loan Amount.</li>
          <li><b>r</b> is rate of interest calculated on monthly basis.(i.e., r = Rate of Annual interest/12/100)</li>
          <li><b>n</b> is loan term / tenure / duration in number of months.</li>
        </ul>
    </div>
    </>
  )
}

export default App