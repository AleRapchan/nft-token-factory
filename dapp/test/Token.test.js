const Token = artifacts.require('./Token.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Token', (accounts) => {

    let contract; 

    before (async () => {
         contract = await Token.deployed()
    })

    describe('deployment', async() => {
        
        it('deploys successfully', async () => {
            const address = contract.address;
            console.log (address); 
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
             

        })

        it ('has a name', async() => {
            const name = await contract.name();
            assert.equal(name, 'Token')
        })

          it ('has a symbol', async() => {
            const name = await contract.symbol();
            assert.equal(name, 'TOKEN')
        })

    })

    describe ('minting', async() => {
        it ('creates a new token', async() => {
            const result = await contract.mint('#FFFFFF'); //#EC058E
            const totalSupply = await contract.totalSupply();
            // SUCESS
            assert.equal(totalSupply, 1);
            //console.log(result);
            const event = result.logs[0].args;
            assert.equal(event.tokenId.toNumber(), 0, 'id is correct'); //1
            assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct');
            assert.equal(event.to , accounts[0], 'to is correct' );

            // FAILURE
            await contract.mint('#FFFFFF').should.be.rejected;


        })
    })

    describe ('indexing', async () => {
        it ('list tokens', async () => {
            // Mint 3 tokens more
            await contract.mint('#F0F0F0');
            await contract.mint('#F3F3F3');
            await contract.mint('#000000');
            const totalSupply = await contract. totalSupply();

            let token;
            let result = []

            for (var i = 1 ; i <= totalSupply; i ++){
                token= await contract.tokens(i -1);
                result.push(token);
            }

            let expected = ['#FFFFFF', '#F0F0F0', '#F3F3F3', '#000000'];
            assert.equal(result.join(','), expected.join(','));



        })
    })

})