const GravatarRegistry = artifacts.require('./GravatarRegistry.sol')

module.exports = async function(deployer, network, accounts) {
  const registry = await GravatarRegistry.deployed()

  console.log('Account address:', registry.address)

  // let accounts = await web3.eth.getAccounts()
  await registry.createGravatar('Carl', 'https://www.google.com/imgres?q=%E5%9B%BE%E7%89%87&imgurl=https%3A%2F%2Fimgs.699pic.com%2Fimages%2F500%2F465%2F562.jpg!list1x.v2&imgrefurl=https%3A%2F%2F699pic.com%2Ftupian%2Fai.html&docid=embemvTtTQwcHM&tbnid=iqpXLrobq9vNRM&vet=12ahUKEwjK7Zih4vOPAxUCZvUHHQQqFeoQM3oECCEQAA..i&w=459&h=300&hcb=2&ved=2ahUKEwjK7Zih4vOPAxUCZvUHHQQqFeoQM3oECCEQAA', {
    from: accounts[0],
  })
  // await registry.createGravatar('Lucas', 'https://thegraph.com/img/team/bw_Lucas.jpg', {
  //   from: accounts[0],
  // })
}
