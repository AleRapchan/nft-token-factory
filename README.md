![Logo](https://ipfs.io/ipfs/QmQ3HTv6cF5MEacSwufUwaHTH4YymysVop848LBRkYCiZ2?filename=nft-token-factory.png)

# NFT Token (ERC721) Factory

Factory Blockchain Pattern to create Non-Fungible Token (NFTs) utilizing ERC-721 Standards.

## Token

- It is a Basic asset transfer control.

## Factory

- Generate a new smart contract
- Often used for generating new token contracts

## Identicon

An Identicon is a visual representation of a hash value, usually of an IP address, that serves to identify a user of a computer system as a form of avatar while protecting the user's privacy. The original Identicon was a 9-block graphic, and the representation has been extended to other graphic forms by third parties.

## Example

```js
contract CarFleet {
  address[] fleet;
  function createChildContract(string make, string model) public payable {
    address newCar = new Car(make, model);
    fleet.push(newCar);
  }
  function getDeployedChildContracts() public view returns (address[]) {
    return fleet;
  }
}
contract Car {
  string public make;
  string public model;
  function Car(string _make, string _model) public {
    make = _make;
    model = _model;
  }
}
```

## Run the tests with Truffle

```bash
truffle console
compile
migrate --reset
test
```

## Author

- [@AleRapchan](https://www.github.com/AleRapchan)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/alerapchan)

## Support

For support, email blockchain@alexandrebarros.com or join our Slack channel.

## Appendix

- Web3.js: https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#contract-events
- Bootstrap 5: https://getbootstrap.com/docs/5.0/getting-started/introduction/
- Metamask: https://docs.metamask.io/guide/
- Remix: https://remix-ide.readthedocs.io/en/latest/
- React: https://reactjs.org/docs/getting-started.html
- Solidity: https://docs.soliditylang.org/en/v0.4.24/
- Ganache: https://www.trufflesuite.com/docs/ganache/overview
- Identicons: https://www.npmjs.com/package/react-identicons
- Wiki: https://en.wikipedia.org/wiki/Identicon

# License

The MIT License (MIT)

Copyright (c) 2021 Alexandre Barros

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
