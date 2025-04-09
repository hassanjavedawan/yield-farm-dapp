// Farm contract addresses
export const FARM_ADDRESSES = {
  USDT: '0x41dF5d28C7e801c4df0aB33421E2ed6ce52d2567',  // Example address
  CAKE: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',  // Example address
  PINK_USDC: '0x5eF4e1C6dD579dF88926B2D757Af5165A1e9927F',  // Example address
}

// Token contract addresses
export const TOKEN_ADDRESSES = {
  USDT: '0x55d398326f99059fF775485246999027B3197955', // BSC USDT
  CAKE: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', // PancakeSwap token
  PINK: '0x9133049Fb1FdDC110c92BF5b7Df635abB70C89DC', // Pink token
  USDC: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', // BSC USDC
}

// Farm ABIs (simplified for example)
export const FARM_ABI = [
  // stake function
  {
    inputs: [{ name: 'amount', type: 'uint256' }],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  // unstake function
  {
    inputs: [{ name: 'amount', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  // claim rewards
  {
    inputs: [],
    name: 'getReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  // view staked balance
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  // view earned rewards
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'earned',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  // APR (for this example, we're returning a fixed value)
  {
    inputs: [],
    name: 'getAPR',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
]

// ERC20 ABI for token approvals
export const ERC20_ABI = [
  // approve function
  {
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  // allowance function
  {
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  // balanceOf function
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  // decimals function
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function'
  },
  // symbol function
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  }
]

// Farm details mapping
export const FARMS = [
  {
    id: 'usdt',
    name: 'USDT Farm',
    description: 'Stake USDT to earn CAKE rewards',
    tokenAddress: TOKEN_ADDRESSES.USDT,
    farmAddress: FARM_ADDRESSES.USDT,
    depositToken: 'USDT',
    rewardToken: 'CAKE',
    tokenDecimals: 18,
    baseApy: 24, // Base APY percentage
    logo: '/assets/logos/usdt.png',
    color: '#26A17B'
  },
  {
    id: 'cake',
    name: 'CAKE Farm',
    description: 'Stake CAKE to earn more CAKE',
    tokenAddress: TOKEN_ADDRESSES.CAKE,
    farmAddress: FARM_ADDRESSES.CAKE,
    depositToken: 'CAKE',
    rewardToken: 'CAKE',
    tokenDecimals: 18,
    baseApy: 48, // Base APY percentage
    logo: '/assets/logos/cake.png',
    color: '#D1884F'
  },
  {
    id: 'pink-usdc',
    name: 'PINK-USDC LP Farm',
    description: 'Stake PINK-USDC LP tokens to earn PINK',
    tokenAddress: TOKEN_ADDRESSES.PINK_USDC,
    farmAddress: FARM_ADDRESSES.PINK_USDC,
    depositToken: 'PINK-USDC LP',
    rewardToken: 'PINK',
    tokenDecimals: 18,
    baseApy: 65, // Base APY percentage
    logo: '/assets/logos/pink-usdc.png',
    color: '#EC4899'
  }
]
