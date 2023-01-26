import Head from "next/head";
import {BsLinkedin} from 'react-icons/bs';
import {BsInstagram} from 'react-icons/bs';
import {BsStackOverflow} from 'react-icons/bs';
import {BsTwitter} from 'react-icons/bs';
import {BsGithub} from 'react-icons/bs';
import {SiLeetcode} from 'react-icons/si'
import {SiGeeksforgeeks} from 'react-icons/si'
import {SiCodingninjas} from 'react-icons/si'
import { Header, NFTDisplay, Hero } from '../components'
import { useEffect, useInsertionEffect, useState } from "react";
import {
  guestIdentity,
  Metaplex,
  walletAdapterIdentity,

} from '@metaplex-foundation/js'

import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { useAnchorWallet , useConnection } from "@solana/wallet-adapter-react";

import { CANDY_MACHINE_ID } from "../utils"

import { Toaster } from 'react-hot-toast';
import toast from "react-hot-toast"

const styles = {
  wrapper: 'flex h-full  w-full  bg-gradient-to-b from-[#000000]/[0.8] to-[#000000]/[0.8] text-gray-200',
  container:
    'flex flex-col lg:flex-row flex-1 p-5 pb-20 lg:p-10 space-y-10 lg:space-y-0 ',
  buttonContainer: 'flex flex-col lg:flex-row flex-1 mt-10  space-y-10 items-center justify-center',
  infoSection: 'lg:w-full px-10 flex flex-col',
  mobileDisplaySection: 'h-[300px] flex w-full lg:hidden lg:w-1/3 mt-4',
  desktopDisplaySection: 'hidden lg:flex flex-1 lg:w-1/3',
  mintButton:
    'rounded-xl border border-gray-100 bg-transparent px-8 py-4 font-semibold text-gray-100 transition-all hover:bg-gray-100 hover:text-[#1d1d1d]',
}


export default function Main() {
  const [metaplex , setMetaplex] = useState();
  const [candyState , setCandyState] = useState();
  const [candyStateError , setCandyStateError] = useState();
  const [candyStateLoading , setCandyStateLoading] = useState(true);
  const [txError , setTxError] = useState();
  const [txLoadingError , setTxLoadingError] = useState(false);
  const [nfts,setNfts]=useState([]);
  const [txLoading, setTxLoading] = useState(false);


  const {connection} = useConnection();
  const wallet = useAnchorWallet();

  useEffect(()=>{
    setMetaplex(
      Metaplex.make(connection).use(wallet?walletAdapterIdentity(wallet):guestIdentity())
    )
  },[connection , wallet])

  // set up the state for my candy machine and update it every few seconds
  useEffect(()=>{
    if(!metaplex) return
    const updateState = async () => {
      try {
        const state = await metaplex
          .candyMachines()
          .findByAddress({ address: CANDY_MACHINE_ID });
        setCandyState(state);
        setNfts(state.items)
        setCandyStateError(null);
      } catch (e) {
        console.log(e);
        toast.error("Error has occured!")
        setCandyStateError(e.message);
      } finally {
        setCandyStateLoading(false);
      }
    };
    updateState();
    //refresh state every 30 sec
  const intervalID = setInterval(()=>updateState(),30_000)

  return ()=>clearInterval(intervalID)
  },[metaplex])

  //the mint function
  const mint = async()=>{
    if(!metaplex) return 
    setTxLoading(true);
    setTxError(null);
    try{
      const mintResult = await metaplex.candyMachines().mint({
        candyMachine:{
          address : candyState.address,
          collectionMintAddress:candyState.collectionMintAddress,
          candyGuard:candyState.candyGuard
        },
        collectionUpdateAuthority : candyState.authorityAddress,
        group:null,
      })
    toast('NFT Minted Successfully!',
  {
    icon: '👍🏻',
    style: {
      borderRadius: '10px',
      background: '#008000',
      color: '#fff',
    },
  }
);
    }catch(err){
      setTxError(err);
      toast(txError?.message,
      {
        icon: '👎🏻',
        style: {
          borderRadius: '10px',
          background: '#e60000',
          color: '#fff',
        },
      }
    );
    }finally{
      setTxLoading(false);
    }
  }
  console.log(candyState,"candystate")
  const soldOut = candyState?.itemsRemaining.eqn(0);
  const solAmount = candyState?.candyGuard?.guards?.solPayment?candyState.candyGuard.guards.solPayment.lamports.toNumber()/LAMPORTS_PER_SOL:null;

  return (
    <div className={styles.wrapper}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Head>
        <title>Solana Animeta </title>
        <link rel="shortcut icon" href="https://www.pngall.com/wp-content/uploads/10/Solana-Crypto-Logo-PNG.png" type="image/x-icon" />
      </Head>

      <div className={styles.container}>
        <section className={styles.infoSection}>
          <Header />
          <div className={styles.mobileDisplaySection}>
            <NFTDisplay />
          </div>

          <Hero />
          <div>
            {candyStateLoading ? (
              <div>Loading...</div>
            ):candyStateError ?(
              <div>{candyStateError}</div>
            ):(
              candyState && (
                <div>
                  <div className="mb-10 flex items-center justify-around font-mono">
                  <div className="pr-8 py-5  rounded-md flex flex-col items-center justify-center">
                    <p className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-green-300 to-purple-600">Total Items</p>
                    <p className="font-bold text-7xl text-transparent bg-clip-text bg-gradient-to-br from-green-300 to-purple-600 ">{candyState.itemsAvailable.toString()}</p>
                  </div>
                  
                  <div className="px-8 py-5  rounded-md flex flex-col items-center justify-center">
                    <p className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-green-300 to-purple-600">Remaining Items</p>
                    <p className="font-bold text-7xl text-transparent bg-clip-text bg-gradient-to-br from-green-300 to-purple-600 ">{candyState.itemsRemaining.toString()}</p>
                  </div>
                  </div>
                  <div className=" flex items-center justify-around mt-10 font-mono">
                  <div className="pr-8 py-5  rounded-md flex flex-col items-center justify-center">
                    <p className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-green-300 to-purple-600">Minted Items</p>
                    <p className="font-bold text-7xl text-transparent bg-clip-text bg-gradient-to-br from-green-300 to-purple-600 ">{candyState.itemsMinted.toString()}</p>
                  </div>
                  {solAmount && <div className="px-8 py-5  rounded-md flex flex-col items-center justify-center">
                    <p className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-green-300 to-purple-600">Price per Item</p>
                    <p className="font-bold text-7xl text-transparent bg-clip-text bg-gradient-to-br from-green-300 to-purple-600 ">{solAmount} SOL</p>
                  </div>}
                  </div>
                  <div className={styles.buttonContainer}>
                    <button className="px-9 cursor-pointer py-4 font-bold text-indigo-200 border-indigo-200 bg-clip-border border-2 hover:text-[#000033] text-3xl font-mono rounded-md hover:bg-gradient-to-br from-green-300 to-purple-600 transition-all duration-100 ease-in" onClick={mint} disabled={!wallet || txLoading || soldOut}>{soldOut?"Sold Out": txLoading ? "Loading..." : "Mint"}</button>
                  </div>
                </div>
              )
            )}
          </div>
          <p className="uppercase font-mono text-2xl mt-14 font-semibold text-transparent bg-clip-text bg-gradient-to-br from-green-300 to-purple-600 mb-3">What is an NFT?</p>
          <p className='font-mono text-indigo-200 mb-3'>Non Fungible Tokens, popularly known as NFTs are digital assets or artworks in the form of pictures, videos, GIFs etc. which are deployed or stored on a blockchain from where people can <span className="italic font-semibold">Mint</span> them. Many inventors, artists, and corporate behemoths are eager to capitalize on this trend. Minting is one of the most critical phases in creating an NFT.</p>
          <p className='font-mono text-indigo-200 mb-3'>Minting an NFT means converting digital data into crypto collections or digital assets recorded on the blockchain. The digital products or files will be stored in a distributed ledger or decentralized database and cannot be edited, modified, or deleted.</p>
          <p className='font-mono text-indigo-200 mb-3'>The capital hence earned (after someone has successfully minted an NFT) goes to the people involved in the creation process of the NFT. This involves the artist , the minter and any other 3rd parties as well.</p>
          <p className="font-mono text-indigo-200 mb-3">Here's a short video by the wall street journal on what is an NFT.</p>
          <iframe width="700" height="394" className="my-8" src="https://www.youtube.com/embed/zpROwouRo_M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          <p className='font-mono text-indigo-200 mb-3 mt-5'>The following are some other popular NFT Collections on different blockchains.</p>
          
          <div className="flex items-center justify-around ">
            <div className="py-3 rounded-md px-5 bg-gradient-to-br font-mono from-green-300 to-purple-600">
              <p className="text-[#000033] text-2xl font-bold text-center">Ethereum</p>
              <p className="text-[#000033] text-md font-medium font-mono text-center pt-1">Sewer Pass Ethereum</p>
              <p className="text-[#000033] text-md font-medium font-mono text-center pt-1">Cryptopunks Ethereum</p>
              <p className="text-[#000033] text-md font-medium font-mono text-center pt-1">Bored Ape Yatch CLub</p>
              <p className="text-[#000033] text-md font-medium font-mono text-center pt-1">Doodles</p>
              <p className="text-[#000033] text-md font-medium font-mono text-center pt-1">CloneX</p>
            </div>
            <div className="py-3 rounded-md px-12 font-mono bg-gradient-to-br  from-green-300 to-purple-600 ">
              <p className="text-[#000033]  font-mono  text-2xl font-bold text-center">Solana</p>
              <p className="text-[#000033] font-medium font-mono  text-md text-center pt-1">DeGods</p>
              <p className="text-[#000033] font-medium font-mono  text-md text-center pt-1">GhostKidDAO</p>
              <p className="text-[#000033] font-medium font-mono  text-md text-center pt-1">Okay Bears</p>
              <p className="text-[#000033] font-medium font-mono  text-md text-center pt-1">Smyths</p>
              <p className="text-[#000033] font-medium font-mono  text-md text-center pt-1">Taiyo Robotics</p>
            </div>
            <div className="py-3 px-5 rounded-md bg-gradient-to-br from-green-300 to-purple-600">
              <p className="text-[#000033]  font-mono text-2xl font-bold text-center">Polygon</p>
              <p className="text-[#000033] font-medium text-md font-mono text-center pt-1">The Sandbox</p>
              <p className="text-[#000033] font-medium text-md font-mono text-center pt-1">Cryptopunks Ethereum</p>
              <p className="text-[#000033] font-medium text-md font-mono text-center pt-1">Lens Protocol Profiles</p>
              <p className="text-[#000033] font-medium text-md font-mono text-center pt-1">Polygon Ape YC</p>
              <p className="text-[#000033] font-medium text-md font-mono text-center pt-1">CyberKongs YC</p>
            </div>
          </div>
          
          <p className="uppercase font-mono text-2xl mt-10 font-semibold text-transparent bg-clip-text bg-gradient-to-br from-green-300 to-purple-600 mb-3">What does this website do?</p>
          <p className='font-mono text-indigo-200 mb-3'>This is an NFT Minting website. From here users can come and buy NFTs of the Solana Animeta Collection and the generated revenue will go to my wallet address i.e. <span className="bg-indigo-200 text-black px-1 rounded-sm font-bold">amR3AuwdTYrs9XJ32NVHTogMz4gyUqUCLcDN4gWK7rs</span> because this is the wallet address that I listed out at the time of creating this collection and since I am the only person involved in the creation of this project, the entirity of the revenue generated will come to me.</p>

          <div className="text-green-400 font-mono font-semibold mt-10 flex items-center justify-between">
      <p>Copyright &copy; Dipen Kalsi, 2023. All rights reserved. </p>
      <div className='flex space-x-5'>
      <a href="https://github.com/dipenkalsi" target="_blank" rel="noopener noreferrer">
          <BsGithub size="25px"/>
        </a>
        <a href="https://www.linkedin.com/in/dipen-kalsi-4448b5205/" target="_blank" rel="noopener noreferrer">
          <BsLinkedin size="25px"/>
        </a>
        <a href="https://www.instagram.com/_dipen02/" target="_blank" rel="noopener noreferrer">
          <BsInstagram size="25px"/>
        </a>
        <a href="https://twitter.com/DipenKalsi" target="_blank" rel="noopener noreferrer">
          <BsTwitter size="25px"/>
        </a>
        <a href="https://stackoverflow.com/users/20255900/dipen-kalsi" target="_blank" rel="noopener noreferrer">
          <BsStackOverflow size="25px"/>
        </a>
        <a href="https://leetcode.com/kalsidipen/" target="_blank" rel="noopener noreferrer">
          <SiLeetcode size="25px"/>
        </a>
      </div>
      </div>
        </section>
        <section className={styles.desktopDisplaySection}>
          <NFTDisplay />
        </section>
      </div>
      
    </div>
  )

}


