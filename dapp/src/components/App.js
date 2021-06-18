import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import Token from "../abis/Token.json";
import Identicon from "react-identicons";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load accounts
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();
    const networkData = Token.networks[networkId];
    if (networkData) {
      const abi = Token.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      //console.log(contract);
      this.setState({ contract });
      const totalSupply = await contract.methods.totalSupply().call();
      this.setState({ totalSupply });

      // Load Tokenss
      for (var i = 1; i <= totalSupply; i++) {
        const token = await contract.methods.tokens(i - 1).call();
        this.setState({
          tokens: [...this.state.tokens, token],
        });
        //console.log(this.state.tokens);
      }
    } else {
      window.alert("Smart Contract not deployed to detected network");
    }
  }

  mint = (token) => {
    console.log(token);

    this.state.contract.methods
      .mint(token)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({
          tokens: [...this.state.tokens, token],
        });
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      contract: null,
      totalSupply: 0,
      tokens: [],
    };
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.alexandrebarros.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            NFT Token Factory
          </a>

          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white">
                <img src="../wallet-24-white.png" alt="wallet" /> Account:
                <span id="account"> {this.state.account}</span>
              </small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                {/* FORM GOES HERE */}
                <h1>Issue your identicon token:</h1>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const token = this.token.value;
                    this.mint(token);
                  }}
                >
                  <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="e.g. FirsName LastName"
                    ref={(input) => {
                      this.token = input;
                    }}
                  />
                  <input
                    type="submit"
                    className="btn btn-block btn-primary"
                    value="MINT ERC721 NFT TOKEN"
                  />
                </form>
              </div>
            </main>
          </div>
          <hr />
          <div className="row text-center">
            {/* Tokens goes here ... */}
            {this.state.tokens.map((token, key) => {
              return (
                <div key={key} className="col-md-3 mb-3">
                  <div className="token" style={{ backgroundColor: "#E5E5E5"}}>
                    <br />
                    <Identicon string={token} size="100" />
                  </div>
                  <div>{token}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;