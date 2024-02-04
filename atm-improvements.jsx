const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
    const choice = ['Deposit', 'Cash Back'];
    // console.log(`ATM isDeposit: ${isDeposit}`);
    return (
      <label className="label huge">
        <h3> {choice[Number(!isDeposit)]}</h3>
        <input id="number-input" type="number" step="0.01" width="200" onChange={onChange}></input>
        <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid}></input>
      </label>
    );
  };
  
  const Account = () => {
    const [deposit, setDeposit] = React.useState(0);
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(null);
    const [atmMode, setATMMode] = React.useState("");
    const [validTransaction, setValidTransaction] = React.useState(false);
  
    let status = `Account Balance $ ${totalState.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })} `;
    // console.log(`Account Rendered with isDeposit: ${isDeposit}`);
    
    // const handleChange = (event) => {
    //   console.log(`handleChange ${event.target.value}`);
    //   setDeposit(Number(event.target.value));
    // };

    const handleChange = (event) => {
        // console.log(`handleChange ${event.target.value}`);
        if (event.target.value <= 0) {
            setValidTransaction(false);
            return;
        }
        if (atmMode === 'Cash Back' && event.target.value > totalState) {
            setValidTransaction(false);
        } else {
            setValidTransaction(true);
        }
        setDeposit(Number(event.target.value));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
        setTotalState(newTotal);
        setValidTransaction(false);
    };
    
    const handleModeSelect = (event) => {
        const newMode = event.target.value;
        setATMMode(newMode);
        switch (newMode) {
            case "Deposit":
                setIsDeposit(true);
                break;
            case "Cash Back":
                setIsDeposit(false);
                break;
            default:
                setIsDeposit(null);
        }
    };



    const checkValidTransaction = () => {
        if (atmMode === 'Cash Back'  && deposit > totalState) {
            setValidTransaction(false);
        } else {
            setValidTransaction(true);
        }
    };

    React.useEffect(() => {
        checkValidTransaction();
    }, [atmMode, deposit, totalState]);

    return (
      <form onSubmit={handleSubmit}>
        <h2 id="total">{status}</h2>
        <label>Select an action below to continue</label>
        <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
            <option id="no-selection" value=""></option>
            <option id="deposit-selection" value="Deposit">Deposit</option>
            <option id="cashback-selection" value="Cash Back">Cash Back</option>
        </select>

        {/* I'm removing these buttons because the instructions direct us to use the select element */}
        {/* <button onClick={() => setIsDeposit(true)}>Deposit</button>
        <button onClick={() => setIsDeposit(false)}>Cash Back</button> */}

        {isDeposit !== null && <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>}
      </form>
    );
  };
  // ========================================
  ReactDOM.render(<Account />, document.getElementById('root'));
  