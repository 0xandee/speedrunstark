# 🚩 Challenge #0: 🎟 Simple NFT Example

![readme-0](https://raw.githubusercontent.com/Quantum3-Labs/speedrunstark/4fa48a3fb7eb1319c3424b9b835fc6acdb1a9f00/packages/nextjs/public/hero.png)

📚 This tutorial is meant for developers that already understand the 🖍️ basics: [Starklings](https://starklings.app/) or [Node Guardians](https://nodeguardians.io/campaigns?f=3%3D2)

🎫 Create a simple NFT:

👷‍♀️ You'll compile and deploy your first smart contract. Then, you'll use a template React app full of important Starknet components and hooks. Finally, you'll deploy an NFT to a public network to share with friends! 🚀

🌟 The final deliverable is an app that lets users purchase and transfer NFTs. Deploy your contracts to a testnet, then build and upload your app to a public web server.

💬 Submit this challenge, meet other builders working on this challenge or get help in the [Builders telegram chat](https://t.me/+wO3PtlRAreo4MDI9)!

## Checkpoint 0: 📦 Environment 📚

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

### Compatible versions

- Scarb - v2.5.4
- Snforge - v0.25.0
- Cairo - v2.5.4

Make sure you have the compatible versions otherwise refer to [Scaffold-Stark Requirements](https://github.com/Quantum3-Labs/scaffold-stark-2?.tab=readme-ov-file#requirements)

Then download the challenge to your computer and install dependencies by running:

```sh
git clone https://github.com/Quantum3-Labs/speedrunstark.git --recurse-submodules simple-nft-example
git checkout simple-nft-example
cd simple-nft-example
yarn install
```

> in the same terminal, install a Starknet devnet and start your local network (a local instance of a blockchain):

```bash
gh repo clone 0xSpaceShard/starknet-devnet-rs
cd starknet-devnet-rs
cargo run
```

> in a second terminal window, 🛰 deploy your contract (locally):

```sh
cd packages/snfoundry
yarn deploy
```

> in a third terminal window, start your 📱 frontend:

```sh
cd packages/nextjs
yarn dev
```

📱 Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## Checkpoint 0: 💾 Deploy your contract! 🛰

🛰 Ready to deploy to a devnet?

![chall-0-scaffold-config](https://raw.githubusercontent.com/Quantum3-Labs/speedrunstark/simple-nft-example/packages/nextjs/public/ch0-scaffold-config.png)

> Prepare your environment variables.

```shell
cp packages/snfoundry/.env.example packages/snfoundry/.env
```

> You need to fill the env variables related to devnet with your own contract address and private key.

🚀 Deploy your NFT smart contract with `yarn deploy`.

> you input `yarn deploy`.

🔏 You can also check out your smart contract `YourCollectible.cairo` in `packages/snfoundry/contracts`.

💼 Take a quick look at your deploy script `deploy.ts` in `packages/snfoundry/script-ts`.

## Checkpoint 1: ⛽️ Gas & Wallets 👛

> 🔥 We'll use burner wallets on localhost.

> 👛 Explore how burner wallets work in 🏗 Scaffold-Stark. You will notice the `Connect Wallet` button on the top right corner. After click it, you can choose the `Burner Wallet` option. You will get a default pre-funded account.

## ![wallet](https://raw.githubusercontent.com/Quantum3-Labs/speedrunstark/simple-nft-example/packages/nextjs/public/ch0-wallet.png)

## Checkpoint 2: 🖨 Minting

> ✏️ Write mint function! #TODO-1
✨ Mint some NFTs! Click the **MINT NFT** button in the `My NFTs` tab.

![image](https://raw.githubusercontent.com/Quantum3-Labs/speedrunstark/simple-nft-example/packages/nextjs/public/ch0-mynft.png)

## Checkpoint 3: 💰 NFT Balance

> ✏️ Write get balance function! #TODO-2
👀 You should see your NFTs start to show up:

![image](https://raw.githubusercontent.com/Quantum3-Labs/speedrunstark/simple-nft-example/packages/nextjs/public/ch0-nfts-images.png)

## Checkpoint 4: 🎟 Transfer

> ✏️ Write transfer function! #TODO-3
🎟 Transfer an NFT from one address to another using the UI:

![image](https://github.com/Quantum3-Labs/speedrunstark/blob/simple-nft-example/packages/nextjs/public/ch0-nfts-images-transfer.png?raw=true)

## Checkpoint 5: 🕵🏻‍♂️ Transfer History

> ✏️ Write fetch transfer history function! #TODO-4
🔎 You can see the transfer history of the NFT contract in the `Transfers` tab.

![image](https://i.ibb.co/NYZk41L/Transfer-Events.png)

---
