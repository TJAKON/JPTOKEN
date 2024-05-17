// import React, { useEffect, useState } from 'react';
// import Web3, { eth } from 'web3';
// import {
//   JPTOKEN_ABI,
// } from './config';

// import './App.css';

// function App() {
//   const [account, setAccount] = useState(null);
//   const [tokenName, setTokenName] = useState(null);
//   const [tokenSymbol, setTokenSymbol] = useState(null);
//   const [totalsupply, SetTotalsupply] = useState(null);
//   const [maxClame, SetMaxClame] = useState(null);
//   const [tokenHolders, SetTokenHolders] = useState(null);
//   const [claimValue, SetClaimValue] = useState(0);

//   const [userBalance, SetUserBalance] = useState(0);

//   const [web3, setWeb3] = useState(null);
//   const [jptokenContract, setJptokenContract] = useState(null);
//   const [tokenDistributionContract, setTokenDistributionContract] = useState(null);
//   const [totaltokensRemaining, setTotalTokensRemaining] = useState(0);
//   const [tokensRemaining, setTokensRemaining] = useState(0);
//   const [userClamedToken, setUserClamedToken] = useState(0);
//   const [fee, setFee] = useState(0);

//   const [claimedCount, setClaimedCount] = useState(0);
//   const [tokenHoldersCount, setTokenHoldersCount] = useState(0);
//   const [loading, setLoading] = useState(true);

//   const connectMetamask = async () => {
//     if (window.ethereum) {
//       try {
//         const web3Instance = new Web3(window.ethereum);
//         await window.ethereum.request({ method: 'eth_requestAccounts' });
//         const accounts = await web3Instance.eth.getAccounts();
//         setAccount(accounts[0]);
//         setWeb3(web3Instance);
//       } catch (error) {
//         console.error("User denied account access or error occurred:", error);
//       }
//     } else {
//       alert("Please install MetaMask to use this DApp!");
//     }
//   };

//   useEffect(() => {
//     const loadBlockchainData = async () => {
//       try {
//         const web3 = new Web3("https://sepolia.infura.io/v3/974a213860b54adf82f5cffff7fac289");
//         setWeb3(web3);
//         const blockNumber = web3.eth.getBlockNumber();

//         const jptoken = new web3.eth.Contract(JPTOKEN_ABI.abi, "0x358A45ddceb5fA50Ca388B99a39E6c9298A5fB07");
//         setJptokenContract(jptoken);

//         // console.log(await jptoken.methods.balanceOf(account).call())  
//         console.log(await jptoken.methods)

//         setTokenName(await jptoken.methods.name().call());
//         setTokenSymbol(await jptoken.methods.symbol().call());

//         // SetTokenHolders(await jptoken.methods.tokenHolders().call());
//         // console.log(await jptoken.methods.totalSupply().call())

        
//         // TOTAL_SUPPLY
//         const TOTAL_SUPPLY = await jptoken.methods.totalSupply().call();
//         const TOTAL_SUPPLY_IN_ETHER = web3.utils.fromWei(TOTAL_SUPPLY, "ether");
//         SetTotalsupply(TOTAL_SUPPLY_IN_ETHER);

//         // MAX_CLAIM
//         const MAX_CLAIM = await jptoken.methods.MAX_CLAIM().call();
//         const MAX_CLAIM_IN_ETHER = web3.utils.fromWei(MAX_CLAIM, "ether");
//         SetMaxClame(MAX_CLAIM_IN_ETHER);

//         // TOKENS_REMAINING
//         const TOKENS_REMAINING = await jptoken.methods.tokensRemaining().call();
//         const TOKENS_REMAINING_IN_ETHER = web3.utils.fromWei(TOKENS_REMAINING, "ether");
//         setTotalTokensRemaining(TOKENS_REMAINING_IN_ETHER);

//         // FEE
//         const FEE = await jptoken.methods.FEE_PERCENTAGE().call();
//         const FEE_IN_ETHER = web3.utils.fromWei(FEE, "ether");
//         console.log(FEE)
//         setFee(FEE_IN_ETHER);

//          // NO_OF_CLAIMED_TOKEN_USER
//          const NO_OF_CLAIMED_TOKEN_USER = await jptoken.methods.claimTokens.length;
//          console.log(NO_OF_CLAIMED_TOKEN_USER)
//          setClaimedCount(NO_OF_CLAIMED_TOKEN_USER);

//         //  No_OF_TOKEN_HOLDERS
//         const NoTokenHolders = await jptoken.methods.tokenHolders.length
//         console.log(NoTokenHolders)
//         SetTokenHolders(NoTokenHolders)

//         // USER_BALANCE
//         const USER_BALANCE = await jptoken.methods.balanceOf(account).call();
//         const USER_BALANCE_IN_ETHER = web3.utils.fromWei(USER_BALANCE, "ether");
//         SetUserBalance(USER_BALANCE_IN_ETHER);
//         console.log(USER_BALANCE)

//           // USER_CLAME_TOKEN
//           const ClamedToken = await jptoken.methods.claimedTokens(account).call()
//           const ClamedToken_IN_ETHER = web3.utils.fromWei(ClamedToken, "ether");
//           console.log(ClamedToken_IN_ETHER)
//           setUserClamedToken(ClamedToken_IN_ETHER)
      
//         setLoading(false);
//       } catch (error) {
//         console.error("Error loading blockchain data:", error);
//         setLoading(false);
//       }
//     };

//     loadBlockchainData();
//   }, [account]);

//   const claimTokens = async () => {
//     if (jptokenContract && account) {
//       try {
//         const valueInWei = web3.utils.toWei(claimValue, "ether")
//         console.log(` claim Value is Wei: ${valueInWei}`)
//         if(parseFloat(claimValue) <= 500){
//           // console.log(jptokenContract._a)
//           const addressParsing = String(jptokenContract._address)
//           console.log(typeof(addressParsing))
//           const tx = await jptokenContract._methods.claimTokens(account, valueInWei).send({ from: ""})
//           console.log('Tokens claimed:', tx);

//           // TOTAL_SUPPLY
//         const TOTAL_SUPPLY = await jptokenContract.methods.totalSupply().call();
//         const TOTAL_SUPPLY_IN_ETHER = web3.utils.fromWei(TOTAL_SUPPLY, "ether");
//         SetTotalsupply(TOTAL_SUPPLY_IN_ETHER);

//            // TOKENS_REMAINING
//           const TOKENS_REMAINING = await jptokenContract.methods.tokensRemaining().call();
//           const TOKENS_REMAINING_IN_ETHER = web3.utils.fromWei(TOKENS_REMAINING, "ether");
//           setTotalTokensRemaining(TOKENS_REMAINING_IN_ETHER);
          
//             // NO_OF_CLAIMED_TOKEN_USER
//          const NO_OF_CLAIMED_TOKEN_USER = await jptokenContract.methods.claimTokens.length;
//          console.log(NO_OF_CLAIMED_TOKEN_USER)
//          setClaimedCount(NO_OF_CLAIMED_TOKEN_USER);

//         //  No_OF_TOKEN_HOLDERS
//         const NoTokenHolders = await jptokenContract.methods.tokenHolders.length
//         console.log(NoTokenHolders)
//         SetTokenHolders(NoTokenHolders)

//              // USER_BALANCE
//           const USER_BALANCE = await jptokenContract.methods.balanceOf(account).call();
//           const USER_BALANCE_IN_ETHER = web3.utils.fromWei(USER_BALANCE, "ether");
//           SetUserBalance(USER_BALANCE_IN_ETHER);
//           console.log(USER_BALANCE)

//           // USER_CLAME_TOKEN
//           const ClamedToken = await jptokenContract.methods.claimedTokens(account).call()
//           const ClamedToken_IN_ETHER = web3.utils.fromWei(ClamedToken, "ether");
//           console.log(ClamedToken_IN_ETHER)
//           setUserClamedToken(ClamedToken_IN_ETHER)
//         } else {
//           alert("Claim value should be less than or equal to 500")
//         }
          
//       } catch (error) {
//         console.error('Error claiming tokens:', error);
//       }
//     }
//   };

//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   return (
//     <div className="app-container">
//       <h1>JPT TOKEN DISTRIBUTION</h1>
//       <button onClick={connectMetamask} className="connect-button">Connect to MetaMask</button>
//       {account ? (
//         <div className="info-container">
//           <p>Connected Metamask account: <span>{account}</span></p>
//           <p>Token Name: <span>{tokenName}</span></p>
//           <p>Token Symbol: <span>{tokenSymbol}</span></p>
//           <p>Total Supply: <span>{totaltokensRemaining} ethers</span></p>
//           <p>Total Tokens remaining: <span>{totalsupply} ethers</span></p>
//           <p>Max Claim per person: <span>{maxClame} ethers</span></p>
//           <p>Fee charged per transaction: <span>{fee} %</span></p>

//           <p>Number of users who have claimed tokens: <span>{claimedCount} User</span></p>
//           <p>Number of token Holder: <span>{tokenHolders} Holder</span></p>
//           <p>Your Balance : <span>{userBalance}</span></p>
//           <p>Your Claimed : <span>{userClamedToken} ether</span></p>

//           <div className='ClameButton'>
//             <input
//             type='number'
//             value={claimValue}
//             onChange={((e) => SetClaimValue(e.target.value))}
//             placeholder='Enter value to clam'
//             className='claim-input'
//             />
//           <button onClick={claimTokens} className="claim-button">Claim Tokens</button>
//           </div>
//         </div>
//       ) : (
//         <div className=''>
//           <p>Please connect to your Ethereum wallet...</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers'; // Import ethers library
import {
  JPTOKEN_ABI,
} from './config';

import './App.css';

function App() {
  const [account, setAccount] = useState(null);
  const [tokenName, setTokenName] = useState(null);
  const [tokenSymbol, setTokenSymbol] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);
  const [maxClaim, setMaxClaim] = useState(null);
  const [tokenHolders, setTokenHolders] = useState(null);
  const [claimValue, setClaimValue] = useState(0);
  const [userBalance, setUserBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        // await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
      } catch (error) {
        console.error("User denied account access or error occurred:", error);
      }
    } else {
      alert("Please install MetaMask to use this DApp!");
    }
  };

  useEffect(() => {
    const loadBlockchainData = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/974a213860b54adf82f5cffff7fac289");

        const jptoken = new ethers.Contract("0x358A45ddceb5fA50Ca388B99a39E6c9298A5fB07", JPTOKEN_ABI.abi, provider);

        setTokenName(await jptoken.name());
        setTokenSymbol(await jptoken.symbol());
        setTotalSupply(ethers.utils.formatEther(await jptoken.totalSupply()));
        setMaxClaim(ethers.utils.formatEther(await jptoken.MAX_CLAIM()));
        setTokenHolders(await jptoken.tokenHolders());
        setUserBalance(ethers.utils.formatEther(await jptoken.balanceOf(account)));

        setLoading(false);
      } catch (error) {
        console.error("Error loading blockchain data:", error);
        setLoading(false);
      }
    };

    if (account) {
      loadBlockchainData();
    }
  }, [account]);

  const claimTokens = async () => {
    if (account) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const jptoken = new ethers.Contract("0x358A45ddceb5fA50Ca388B99a39E6c9298A5fB07", JPTOKEN_ABI.abi, signer);

        const valueInWei = ethers.utils.parseEther(claimValue.toString());
        if (parseFloat(claimValue) <= 500) {
          const tx = await jptoken.claimTokens(valueInWei);
          await tx.wait();
          alert('Tokens claimed successfully!');
        } else {
          alert("Claim value should be less than or equal to 500");
        }
      } catch (error) {
        console.error('Error claiming tokens:', error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app-container">
      <h1>JPT TOKEN DISTRIBUTION</h1>
      <button onClick={connectMetamask} className="connect-button">Connect to MetaMask</button>
      {account ? (
        <div className="info-container">
          <p>Connected Metamask account: <span>{account}</span></p>
          <p>Token Name: <span>{tokenName}</span></p>
          <p>Token Symbol: <span>{tokenSymbol}</span></p>
          <p>Total Supply: <span>{totalSupply} ethers</span></p>
          <p>Max Claim per person: <span>{maxClaim} ethers</span></p>
          <p>Number of token Holders: <span>{tokenHolders.length} Holder(s)</span></p>
          <p>Your Balance : <span>{userBalance}</span></p>

          <div className='claim-button'>
            <input
              type='number'
              value={claimValue}
              onChange={((e) => setClaimValue(e.target.value))}
              placeholder='Enter value to claim'
              className='claim-input'
            />
            <button onClick={claimTokens} className="claim-button">Claim Tokens</button>
          </div>
        </div>
      ) : (
        <div className=''>
          <p>Please connect to your Ethereum wallet...</p>
        </div>
      )}
    </div>
  );
}

export default App;

