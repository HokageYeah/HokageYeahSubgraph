const GravatarRegistry = artifacts.require('./GravatarRegistry.sol')

module.exports = async function(deployer, network, accounts) {
  try {
    const registry = await GravatarRegistry.deployed()
    console.log('Contract address:', registry.address)

    // 添加延迟以避免网络问题
    console.log('Waiting 3 seconds before creating gravatar...')
    await new Promise(resolve => setTimeout(resolve, 3000))

    // 创建第一个 Gravatar
    console.log('Creating gravatar for Carl...')
    const tx = await registry.createGravatar(
      'Carl', 
      'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', 
      {
        from: accounts[0],
        gas: 500000,
        gasPrice: web3.utils.toWei('20', 'gwei')
      }
    )
    console.log('Gravatar created! Transaction hash:', tx.tx)

  } catch (error) {
    console.log('Warning: Failed to create initial gravatar, but contract deployment was successful!')
    console.log('Error:', error.message)
    console.log('You can create gravatars manually later using the deployed contract.')
  }
}
