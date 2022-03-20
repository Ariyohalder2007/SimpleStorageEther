import React, {useState} from 'react'
import './SimpleStorage.css'
import {ethers} from 'ethers'
import SimpleStorage_ABI from './SimpleStorage_ABI.json'

function SimpleStorage() {
    const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const [currentContractVal, setCurrentContractVal] = useState(null);

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);
    const contractAddress="0xaCfEa5B4Abc7736C13F17959aD9ee3213E19D137"


    const accountChangeHandler=(newAccount)=>{
        setDefaultAccount(newAccount)
        updateEthers();
    }
    function updateEthers() {
        let tempProvider= new ethers.providers.Web3Provider(window.ethereum);
        setProvider(tempProvider)

        let tempSigner = tempProvider.getSigner()
        setSigner(tempSigner)

        let tempContract=new ethers.Contract(contractAddress, SimpleStorage_ABI, tempSigner)
        setContract(tempContract)
    }
    const connectWalletHandler= async()  =>{
        if(window.ethereum){
            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})

            setConnButtonText('Connected')
            accountChangeHandler(accounts[0])

        }else{
            alert("Meta Mask Not Installed");
            setErrorMessage("Meta Mask Not Installed");
        }
    }
    const getCurrentVal= async()=>{
        let val = await contract.get();
        setCurrentContractVal(val)

    }
    const setHandler=async (e)=>{
        e.preventDefault();
        await contract.set(e.target.setText.value);
    }
  return (
    <div className='center'>
        <h1 >Simple Storage 📦 </h1>
        <button className='button' onClick={connectWalletHandler}>
        <span className="shadow"></span>
  <span className="edge"></span>
  <span className="front text"> {connButtonText}
  </span>
        </button>
        <h2>Address 📫:{defaultAccount}</h2>

        <form onSubmit={setHandler} className="form">
            <input type="text" id='setText' />
            <button type={'submit'}>
            <span className="shadow"></span>
  <span className="edge"></span>
  <span className="front text"> Set It!
  </span>
            </button>
        </form>

        <button onClick={getCurrentVal}>
        <span className="shadow"></span>
  <span className="edge"></span>
  <span className="front text"> Get Current Value
  </span>
        </button>
        <h2>Current Contract Value: {currentContractVal}</h2>

        {errorMessage && <div >
            <h4>:Error Message ❌:</h4>
            <p>{errorMessage}</p>
        </div>}
    </div>
  )
}

export default SimpleStorage