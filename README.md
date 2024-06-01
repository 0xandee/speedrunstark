# 🚩 Challenge #0: 🎟 Simple NFT Example

![readme-0](https://raw.githubusercontent.com/Quantum3-Labs/speedrunstark/4fa48a3fb7eb1319c3424b9b835fc6acdb1a9f00/packages/nextjs/public/hero.png)

🎫 Create a simple NFT to learn basics of 🏗 Scaffold-Stark. You'll use [Scarb](https://docs.swmansion.com/scarb/) to compile and [Starknet.js](https://www.starknetjs.com/) to deploy smart contracts. Then, you'll use a template React app full of important Starknet components and hooks. Finally, you'll deploy an NFT to a public network to share with friends! 🚀

🌟 The final deliverable is an app that lets users purchase and transfer NFTs. Deploy your contracts to a testnet, then build and upload your app to a public web server. Submit the url on [Speedrunstark.com](https://speedrunstark.com/)!

💬 Meet other builders working on this challenge and get help in the [Challenge 0 Telegram]()!

## Checkpoint 0: 📦 Environment 📚

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

Then download the challenge to your computer and install dependencies by running:

```sh
git clone https://github.com/Quantum3-Labs/speedrunstark.git --recurse-submodules simple-nft-example
cd simple-nft-example
git checkout simple-nft-example

yarn install
```

> in the same terminal, start your local network (a blockchain emulator in your computer):

```sh
2. Prepare your environment variables.

Since we are using localhost(devnet), **you can skip this step!**. But if you want use the .env file anyway, you can fill the envs related to devnet with any predeployed contract address and private key from starknet-devnet.

**Note:** In case you want to deploy on Sepolia, you need to fill the envs related to sepolia testnet with your own contract address and private key.

```bash
cp packages/snfoundry/.env.example packages/snfoundry/.env
```

3. Run a local network in the first terminal.

**Note:** You can skip this step if you want to use Sepolia Testnet.

```bash
yarn chain
```

> in a second terminal window, 🛰 deploy your contract (locally):

```sh
cd simple-nft-example
yarn deploy
```

> in a third terminal window, start your 📱 frontend:

```sh
cd simple-nft-example
yarn start
This command starts a local Starknet network using Devnet. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `scaffold.config.ts`.

4. On a second terminal, deploy the sample contract:

```
yarn deploy --network {NETWORK_NAME} // when NETWORK_NAME is not specified, it defaults to "devnet"
```

**Note:** To use sepolia tesnet, you have to set {NETWORK_NAME} to `sepolia`.

This command deploys a sample smart contract to the local network. The contract is located in `packages/snfoundry/contracts/src` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/snfoundry/scripts-ts/deploy.ts` to deploy the contract to the network. You can also customize the deploy script.

5. On a third terminal, start your NextJS app:

```
yarn start
```

📱 Open http://localhost:3000 to see the app.

---

## Checkpoint 1: ⛽️ Gas & Wallets 👛

> 🔥 We'll use burner wallets on localhost.

> 👛 Explore how burner wallets work in 🏗 Scaffold-Stark. You will notice the `Connect Wallet` button on the top right corner. After click it, you can choose the `Burner Wallet` option. You will get a default prefunded account. 

![wallet](https://raw.githubusercontent.com/Quantum3-Labs/speedrunstark/simple-nft-example/packages/nextjs/public/ch0-walletconnect.png)
---

## Checkpoint 2: 🖨 Minting

> ✏️ Mint some NFTs! Click the **MINT NFT** button in the `My NFTs` tab.

![image](https://raw.githubusercontent.com/Quantum3-Labs/speedrunstark/simple-nft-example/packages/nextjs/public/ch0-mynft.png)

👀 You should see your NFTs start to show up!

![image](https://raw.githubusercontent.com/Quantum3-Labs/speedrunstark/simple-nft-example/packages/nextjs/public/ch0-nfts-images.png)

👛 Open an window Browser and navigate to http://localhost:3000

🎟 Transfer an NFT from one address to another using the UI:

![image](https://raw.githubusercontent.com/Quantum3-Labs/speedrunstark/simple-nft-example/packages/nextjs/public/ch0-nfts-images-transfer.png)

🕵🏻‍♂️ Inspect the `Debug Contracts` tab to figure out what address is the owner of YourCollectible?

🔏 You can also check out your smart contract `YourCollectible.cairo` in `packages/snfoundry/contracts`.

💼 Take a quick look at your deploy script `deploy.ts` in `packages/snfoundry/script-ts`.

📝 If you want to edit the frontend, navigate to `packages/nextjs/app` and open the specific page you want to modify. For instance: `/myNFTs/page.tsx`. For guidance on [routing](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) and configuring [pages/layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) checkout the Next.js documentation.

---

## Checkpoint 3: 💾 Deploy your contract! 🛰

🛰 Ready to deploy to a public testnet?!?

> Change the defaultNetwork in `packages/nextjs/scaffold.config.ts` to `sepolia`.

> Prepare your environment variables. 

```shell
cp packages/snfoundry/.env.example packages/snfoundry/.env
```

> You need to fill the envs related to Sepolia testnet with your own contract address and private key.

⛽️ You will need to send ETH or STRK to your deployer Contract Addres with your wallet, or get it from a public faucet of your chosen network.

> Some popular faucets are [https://starknet-faucet.vercel.app/](https://starknet-faucet.vercel.app/) and [https://blastapi.io/faucets/starknet-sepolia-eth](https://blastapi.io/faucets/starknet-sepolia-eth)

🚀 Deploy your NFT smart contract with `yarn deploy`.

> you input `yarn deploy --network sepolia`.

---

## Checkpoint 4: 🚢 Ship your frontend! 🚁

> ✏️ Edit your frontend config in `packages/nextjs/scaffold.config.ts` to change the `targetNetwork` to `chains.sepolia` :

![chall-0-scaffold-config](https://raw.githubusercontent.com/Quantum3-Labs/speedrunstark/simple-nft-example/packages/nextjs/public/ch0-scaffold-config.png)

> 🦊 Since we have deployed to a public testnet, you will now need to connect using a wallet you own(Argent X or Braavos).

![connect-wallet](https://raw.githubusercontent.com/Quantum3-Labs/speedrunstark/simple-nft-example/packages/nextjs/public/ch0-walletconnect.png)

> You should see the correct network in the frontend (http://localhost:3000):

![image](https://raw.githubusercontent.com/Quantum3-Labs/speedrunstark/simple-nft-example/packages/nextjs/public/ch0-balance.png)

> 💬 Hint: For faster loading of your transfer page, consider updating the `fromBlock` passed to `useScaffoldEventHistory` in [`packages/nextjs/app/transfers/page.tsx`](https://github.com/Quantum3-Labs/scaffold-stark-2/blob/main/packages/nextjs/hooks/scaffold-stark/useScaffoldEventHistory.ts) to `blocknumber - 10` at which your contract was deployed. Example: `fromBlock: 3750241n` (where `n` represents its a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)). To find this blocknumber, search your contract's address on Starkscan and find the `Contract Creation` transaction line.

🚀 Deploy your NextJS App

```shell
yarn vercel
```

> Follow the steps to deploy to Vercel. Once you log in (email, github, etc), the default options should work. It'll give you a public URL.

> If you want to redeploy to the same production URL you can run `yarn vercel --prod`. If you omit the `--prod` flag it will deploy it to a preview/test URL.

⚠️ Run the automated testing function to make sure your app passes

```shell
yarn test
```

#### Configuration of Third-Party Services for Production-Grade Apps.

By default, 🏗 Scaffold-Stark provides predefined API keys for popular services such as Alchemy and Etherscan. This allows you to begin developing and testing your applications more easily, avoiding the need to register for these services.  
This is great to complete your **SpeedRunEthereum**.

For production-grade applications, it's recommended to obtain your own API keys (to prevent rate limiting issues). You can configure these at:

- 🔷`RPC_URL_SEPOLIA` variable in `packages/snfoundry/.env` and `packages/nextjs/.env.local`. You can create API keys from the [Alchemy dashboard](https://dashboard.alchemy.com/).


> 💬 Hint: It's recommended to store env's for nextjs in Vercel/system env config for live apps and use .env.local for local testing.


---

> 🏃 Head to your next challenge [here](https://github.com/Quantum3-Labs/speedrunstark/tree/decentralized-staking).

> 💭 Problems, questions, comments on the stack? Post them to the [🏗 Scaffold-Stark developers chat]()
