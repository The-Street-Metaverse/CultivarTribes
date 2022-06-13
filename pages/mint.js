import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { useEffect, useState } from "react";
import Link from 'next/link';
import Head from 'next/head';
import Footer from '../components/Footer';
import { useStatus } from "../context/statusContext";
import { connectWallet, getCurrentWalletConnected, getNFTPrice, getTotalMinted } from "../utils/interact.js";



const contractABI = require("../pages/contract-abi.json");
const contractAddress = "0x33701f0bc87a84B22f3D8bE1031AbF2eC01455be";
const web3 = createAlchemyWeb3("https://eth-rinkeby.alchemyapi.io/v2/deSJ7VyGLswml7dz5tzzNbHBeYu_R_S1");








const nftContract = new web3.eth.Contract(
    contractABI,
    contractAddress
);

export default function Home() {

    //State variables
    const { status, setStatus } = useStatus();
    const [walletAddress, setWallet] = useState("");
    const [count, setCount] = useState(1);
    const [totalMinted, setTotalMinted] = useState(0);
    const [price, setPrice] = useState(0);

    useEffect(async () => {
        const { address, status } = await getCurrentWalletConnected();
        setWallet(address)
        setStatus(status);
        addWalletListener();
        setPrice(await getNFTPrice());
        updateTotalSupply();



    }, []);

    function addWalletListener() {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setWallet(accounts[0]);
                    setStatus("👆🏽 Write a message in the text-field above.");
                } else {
                    setWallet("");
                    setStatus("🦊 Connect to Metamask using the top right button.");
                }
            });
        } else {
            setStatus(
                <p>
                    {" "}
                    🦊{" "}
                    <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
                        You must install Metamask, a virtual Ethereum wallet, in your
                        browser.
                    </a>
                </p>
            );
        }
    }

    const connectWalletPressed = async () => {
        const walletResponse = await connectWallet();
        setStatus(walletResponse.status);
        setWallet(walletResponse.address);
    };

    const onMintPressed = async (e) => {
        e.preventDefault();

        let total = web3.utils.toWei(price, 'ether') * count;

        await nftContract.methods.mint(count).send({ from: walletAddress, value: total, gas: 500000 });

    }




    const incrementCount = async () => {


        if (count < 4) {
            setCount(count + 1);
        }

    };

    const decrementCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const updateTotalSupply = async () => {
        const mintedCount = await getTotalMinted();
        setTotalMinted(mintedCount);
    };



    return (
        <>
            <Head>
                <title>Cali Tribe</title>
                <meta name="description" content="Cali Tribe NFT Dapp" />
                <link rel="icon" href="/favicon.png" />
            </Head>

            {/* Header */}
            <header className='fixed w-full bg-header top-0 md:px-8 px-5 pt-5 pb-3 z-70 backdrop-blur transition-colors duration-500 z-40 flex-none md:z-50 bg-white/35 supports-backdrop-blur:bg-white/60 shadow-[0_2px_5px_rgba(3,0,16,0.2)]'>

                {/* Header Container */}
                <div className='flex h-full items-center justify-center max-w-11xl mx-auto border-opacity-0'>

                    {/* Logo Section */}
                    <div className='flex-grow'>
                        <div className='flex'>
                            <Link className='w-min-content' href='/' passHref>
                                <a className='flex'>
                                    <img alt='' src='/images/toastedtoonz.png' className='w-[60px]' />
                                    <p className='tracking-wider font-900  md:h7 md:px-2 md:pt-1 pb-1 rounded text-white text-lg uppercase md:flex'>Cali Tribe</p>
                                </a>
                            </Link>
                        </div>
                    </div>

                    {/* Desktop Navbar Section + Connect Wallet + icons */}
                    <div className='items-center md:flex text-2xs'>
                        <ul className='flex space-x-2'>

                            {/* CONNECT WALLET */}
                            <li className="md:px-3 mx-1 md:mt-1 py-1 md:app-font">
                                <a>About</a>
                            </li>
                            <li className="md:px-3 mx-1 md:mt-1 py-1 md:app-font">
                                <a>Explore</a>
                            </li>
                            <li className="mx-1 md:px-3 py-1 md:mt-1 md:app-font ">
                                <a>Roadmap</a>
                            </li>
                            <li className="mx-1 md:px-3 md:mt-1 py-1 md:app-font">
                                <a>FAQ</a>
                            </li>
                            <li className="md:px-3 mx-1 md:mt-1 py-1 md:app-font ">
                                <a>Team</a>
                            </li>
                            <li className="md:px-3 mx-1 md:mt-1 py-1 md:app-font ">
                                <a>Community</a>
                            </li>
                            <li>
                                {walletAddress.length > 0 ? (

                                    <div className='px-4 bg-opacity-20 text-white items-center relative h-9 tracking-wider sm:pt-0.5 md:pt-2 lg:pt-0.5 first::pt-0 duration-500 text-6xs md:text-base padding-huge opacity-100 hover:bg-opacity-70 rounded flex justify-center flex-row border border-blue-500 hover:shadow-green-500/20 cursor-pointer'
                                    >
                                        Connected:{String(walletAddress).substring(0, 6)}
                                        {"....."}
                                        {String(walletAddress).substring(39)}
                                    </div>
                                ) : (

                                    <button className='px-4 bg-button bg-opacity-100 text-white font-semibold items-center relative h-9 tracking-wider pt-0.5 first::pt-0 duration-200 hover:bg-opacity-70 font-400 px-4 rounded text-2xs' id="walletButton"

                                        onClick={connectWalletPressed}
                                    >Connect Wallet
                                    </button>
                                )}
                            </li>

                            {/* Twitter Icon */}

                        </ul>
                    </div>

                </div>
            </header>

            {/* Hero/Mint Section */}
            <section className="flex items-center justify-center bg-pattern py-12 px-5 overflow-hidden relative z-10" id="">

                {/* margin between header and hero section */}
                <div className="mb-5 flex items-center max-w-md mt-4"></div>

                <div className="flex flex-col bg-pattern items-center justify-center md:flex-row md:items-center md:justify-between text-slate-900">

                    {/* Left Hero Section - Mint Info */}
                    <div className="w-full px-4">
                        <div className="max-w-[570px] mb-12 md:mb-0">


                            <div className="w-full px-4">

                                <div className="relative rounded-md p-8 shadow-md">


                                    <img src='/images/calitribe.gif' alt='pass image' className='w-full flex items-center justify-center' />
                                </div>
                            </div>




                            {/* Total supply - Price info */}
                            <div className='flex flex-col bg-header items-center justify-center justify-between text-black rounded-md w-11/12 mx-auto p-2 border-2 border-gray-100'>

                                <p className='text-gray-100 p-2 text-xs md:text-2xl app-font'>{totalMinted}/7000 Minted</p>





                                <div className='mb-4 w-full md:w-3/4 flex flex-row items-center justify-between'>
                                    <p className='font-bold text-xs md:text-xl text-gray-100 app-font'>Price Per Mint:</p>
                                    <p className='font-bold text-xs md:text-2xl text-gray-100 app-font'>{price} ETH</p>
                                </div>

                            </div>

                            {/* Increment & Decrement buttons */}
                            {walletAddress.length > 0 ? (
                                <div className='flex flex-col'>
                                    <div className='flex items-center justify-between px-16 sm:px-24 m-4'>
                                        <button className='button w-10 h-10 flex items-center justify-center text-blue-500 text-2xl hover:shadow-lg bg-gray-700 font-bold rounded-md border border-opacity-80 border-teal'
                                            onClick={decrementCount}
                                        >
                                            ــــ
                                        </button>
                                        <p className="flex items-center justify-center flex-1 grow text-center font-bold text-fuschia text-2xl md:text-3xl">
                                            {count}
                                            {/* 1 */}
                                        </p>
                                        <button className="button w-10 h-10 flex items-center bg-gray-700 justify-center text-blue-500 text-2xl hover:shadow-lg font-bold rounded-md border border-opacity-80 border-teal"
                                            onClick={incrementCount}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className='flex items-center justify-center p-2 text-black'>
                                        Total: {Number.parseFloat((price * count).toFixed(3))} ETH +
                                        <span className='text-gray-500'> Gas</span>
                                    </div>
                                    <div className='flex items-center justify-center'>
                                        <button
                                            className='text-lg app-font font-semibold bg-button rounded uppercase font-base text-white px-12 py-2 tracking-wide bg-fuschia hover:shadow-green-500/20'
                                            // onClick={mintPass}
                                            onClick={onMintPressed}
                                        >
                                            Cultivate
                                        </button>
                                    </div>
                                </div>

                            ) : (
                                <>
                                    <p className='text-center flex flex-col font-bold text-black text-base md:text-2xl text-body-color leading-relaxed m-3 md:m-8 break-words ...'>
                                        Connect Your Wallet To Mint
                                    </p></>
                            )}

                        </div>
                    </div>
                </div>
                {/* Total:  {nftPrice} + Gas */}
                {/* Mint Status */}
                {/* {status && (
      <div className="flex items-center justify-center">
        {status}
      </div>
    )} */}



                {/* Right Hero Section - Video/Image Bird PASS */}


            </section>
            <Footer />

            {/* Content + footer Section */}

        </>
    )
}

