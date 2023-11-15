const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const axios = require('axios');
const { Network, Alchemy } = require('alchemy-sdk');

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

app.get('/api/nfts/:walletAddress', async (req, res) => {
  try {
    const walletAddress = req.params.walletAddress;
    const alchemy = new Alchemy(settings);

    // Get all the NFTs owned by an address
    const nfts = await alchemy.nft.getNftsForOwner(walletAddress);

    // Process the response data and send it as a response to the client
    res.json({ nfts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
