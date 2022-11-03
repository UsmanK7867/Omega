// Main = {
//   loading: false,
//   contracts: {},
//   ox: "",
//   omegaDao: "",

//   toEth: (n) => {
//     let toEther = web3.utils.fromWei(n, "ether");
//     return toEther; //.slice(0, 3) + '.' + toMilli.slice(3)
//   },
//   toWei: (n) => {
//     return web3.utils.toWei(n, "ether");
//   },
//   load: async () => {
//     Main.toggleLoadingScreen(true);
//     await Main.loadWeb3(true);

//     await Main.setupClickCollect();
//     await Main.setupClickMintNode();
//     $walletBtn = $("#wallet");
//     $walletBtn.on("click", async () => {
//       await Main.loadWeb3(false);
//     });

//     await Main.setupClickProvideOmega();
//     await Main.setupClickProvideOx();
//     await Main.setupClickApproveOx();
//     await Main.setupMetamaskEvents();
//     await Main.setupClickAddTokenToWallet();
//     await Main.setupClickChangeNetwork();

//     $("#max-omega").on("click", Main.maxOmegaBtn);
//     $("#max-ox").on("click", Main.maxOxBtn);
//     await Main.toggleLoadingScreen(false);
//     console.log("loading done!");
//   },

//   toggleLoadingScreen: async (load) => {
//     if (load) {
//       $(".loading").show();
//       $(".content").hide();
//     } else {
//       $(".loading").hide();
//       $(".content").show();
//     }
//   },

//   setupMetamaskEvents: async () => {
//     if (typeof ethereum === "undefined") {
//       return;
//     }

//     ethereum.on("accountsChanged", async () => {
//       Main.toggleLoadingScreen(true);
//       window.location.reload();
//     });

//     ethereum.on("chainChanged", async () => {
//       Main.toggleLoadingScreen(true);
//       window.location.reload();
//     });
//   },

//   loadContract: async () => {
//     const omegaDao = await $.getJSON("contracts/OmegaDao.json");
//     // console.log(omegaDao.abi);
//     Main.contracts.OmegaDao = TruffleContract(omegaDao);
//     Main.contracts.OmegaDao.setProvider(Main.web3Provider);
//     let t = await Main.contracts.OmegaDao.at(
//       "0xB8293B7be29A59a460A4A7ad6a75Dc10c36cA960"
//     );
//     // console.log(
//     //   "bnhhmhbmh ",
//     //   await t
//     //     .accounts("0x488A8CA56f29BFbe28e6f4cf898D5c3C1455deDa")
//     //     .then((res) => console.log(res))
//     // );
//     const omega = await $.getJSON("contracts/Omega.json");
//     Main.contracts.Omega = TruffleContract(omega);
//     Main.contracts.Omega.setProvider(Main.web3Provider);

//     // OX contract on mainnet
//     // const oxContractAddress = '0xAC2f8fb059C96C481fAE3f4702Ca324664b79B26'
//     // const ox = await $.getJSON('contracts/MainnetOx.json')
//     // Main.contracts.Ox = TruffleContract(ox)
//     // Main.contracts.Ox.setProvider(Main.web3Provider)
//     const omegaDaoContractAddress =
//       "0xB8293B7be29A59a460A4A7ad6a75Dc10c36cA960";
//     Main.OmegaDao = await Main.contracts.Omega.at(omegaDaoContractAddress);
//     // console.log("djnfjnd", Main.OmegaDao);

//     // OX contract on testnet
//     // const oxContractAddress = "0x8976655C7A049AB6FcFC9123897AdDe13Ebef908";

//     // const ox = await $.getJSON("contracts/ExternalOx.json");
//     // console.log(ox);
//     // Main.contracts.Ox = TruffleContract(ox);
//     // Main.contracts.Ox.setProvider(Main.web3Provider);
//     // Main.ox = await Main.contracts.Ox.at(oxContractAddress);

//     // OX contract locally
//     // const ox = await $.getJSON('contracts/Ox.json')
//     // Main.contracts.Ox = TruffleContract(ox)
//     // Main.contracts.Ox.setProvider(Main.web3Provider)

//     // try {
//     //   // Main.omegaDao = await Main.contracts.OmegaDao.deployed()
//     //   // Main.omega = await Main.contracts.Omega.deployed()

//     //   // OX contract locally
//     //   // Main.ox = await Main.contracts.Ox.deployed()

//     //   // OX contract on testnet
//     //   // Main.ox = await Main.contracts.Ox.at(oxContractAddress);
//     //   Main.OmegaDao = await Main.contracts.Ox.at(omegaDaoContractAddress);
//     //   // console.log(
//     //   //   "fdgdsfgdfsfd",
//     //   //   await TruffleContract(omegaDao).at(omegaDaoContractAddress)
//     //   // );
//     //   // OX contract on mainnet
//     //   // Main.ox = await Main.contracts.Ox.at(oxContractAddress)
//     // } catch (err) {
//     //   console.error("Errorororor", err);
//     //   $("#network-alert").show();
//     // }
//   },

//   // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
//   loadWeb3: async (firstLoad) => {
//     if (typeof web3 !== "undefined") {
//       Main.web3Provider = web3.currentProvider;
//       web3 = new Web3(web3.currentProvider);
//     } else {
//       if (!firstLoad) {
//         window.alert("Please connect to Metamask.");
//       }
//     }
//     if (window.ethereum) {
//       window.web3 = new Web3(ethereum);
//       try {
//         if (!firstLoad) {
//           await ethereum.enable();
//         }
//       } catch {}
//     } else if (window.web3) {
//       Main.web3Provider = web3.currentProvider;
//       window.web3 = new Web3(web3.currentProvider);
//     }

//     if (typeof web3 !== "undefined") {
//       Main.accountConnected();
//     }
//   },
//   accounts: async () => {
//     const acc = await web3.eth.getAccounts();
//     return acc;
//   },
//   accountConnected: async () => {
//     let accounts = await Main.accounts();
//     if (accounts.length > 0) {
//       Main.account = accounts[0];
//       let acc = accounts[0];
//       $("#wallet-content").html(
//         acc.slice(0, 5) + "..." + acc.slice(acc.length - 4, acc.length)
//       );

//       await Main.loadContract();
//       await Main.fetchAccountData();
//       await Main.fetchGeneralData();
//     }
//   },
//   fetchGeneralData: async () => {
//     let totalNodes = await Main.omegaDao.totalNodes.call();
//     $("#total-nodes").html(totalNodes.toString());

//     let contractAccount = await Main.omegaDao.accounts(Main.account);
//     let total = contractAccount.iotaCount.toNumber() * 200;
//     total += contractAccount.lambdaCount.toNumber() * 500;
//     total += contractAccount.phiCount.toNumber() * 1000;
//     total += contractAccount.chiliaCount.toNumber() * 2000;
//     total += contractAccount.tabithaCount.toNumber() * 10000;
//     $("#tlv").html("$" + total.toLocaleString("us"));

//     let omegaPool = await Main.omega.balanceOf(Main.omegaDao.address);
//     let formatedPoolAmount = parseInt(Main.toEth(omegaPool));
//     $("#omega-pool").html(formatedPoolAmount.toLocaleString("us"));
//     $("#ox-pool").html((total / 2).toLocaleString("us"));
//   },
//   fetchAccountData: async () => {
//     // number of nodes

//     // let t = await Main?.contracts?.OmegaDao.at(
//     //   "0xB8293B7be29A59a460A4A7ad6a75Dc10c36cA960"
//     // );
//     console.log(Main);
//     let contractAccount = await Main.omegaDao.accounts(Main.account);
//     // let contractAccount = await Main.omegaDao.accounts(Main.account);
//     let total =
//       contractAccount.iotaCount.toNumber() +
//       contractAccount.lambdaCount.toNumber() +
//       contractAccount.phiCount.toNumber() +
//       contractAccount.chiliaCount.toNumber() +
//       contractAccount.tabithaCount.toNumber();

//     let totalRewards =
//       contractAccount.iotaCount.toNumber() * 1 +
//       contractAccount.lambdaCount.toNumber() * 3 +
//       contractAccount.phiCount.toNumber() * 7 +
//       contractAccount.chiliaCount.toNumber() * 16 +
//       contractAccount.tabithaCount.toNumber() * 100;

//     $("#iota-count").html(contractAccount.iotaCount.toNumber());
//     $("#iota-rewards").html(contractAccount.iotaCount.toNumber() * 1);

//     $("#lambda-count").html(contractAccount.lambdaCount.toNumber());
//     $("#lambda-rewards").html(contractAccount.lambdaCount.toNumber() * 3);

//     $("#chilia-count").html(contractAccount.phiCount.toNumber());
//     $("#chilia-rewards").html(contractAccount.phiCount.toNumber() * 7);

//     $("#chilia-count").html(contractAccount.chiliaCount.toNumber());
//     $("#chilia-rewards").html(contractAccount.chiliaCount.toNumber() * 16);

//     $("#tabitha-count").html(contractAccount.tabithaCount.toNumber());
//     $("#tabitha-rewards").html(contractAccount.tabithaCount.toNumber() * 100);

//     $("#total-count").html(total);
//     $("#total-rewards").html(totalRewards);

//     $("#num-nodes").html(total);

//     // rewards accumulated
//     let interestAccumulated = Main.toEth(contractAccount.interestAccumulated);
//     $("#accumulated-interest").html(interestAccumulated + " OM");

//     if (parseFloat(interestAccumulated) == 0) {
//       $("#collect-omega").attr("disabled", "disabled");
//     }

//     // wallet amount of OM
//     omegaBalance = await Main.omega.balanceOf(Main.account);
//     $("#omega-balance").html(Main.toEth(omegaBalance.toString()));

//     // wallet amount of OX
//     oxBalance = await Main.ox.balanceOf(Main.account);
//     $("#ox-balance").html(Main.toEth(oxBalance.toString()));

//     let allowanceOmega = await Main.omega.allowance(
//       Main.account,
//       Main.omegaDao.address
//     );
//     let allowanceOx = await Main.ox.allowance(
//       Main.account,
//       Main.omegaDao.address
//     );

//     if (allowanceOx > 0 && allowanceOmega > 0) {
//       $("#collect-omega").show();
//       $("#node-type-modal").show();
//     } else if (allowanceOx == 0 && allowanceOmega > 0) {
//       $("#collect-omega").show();
//       $("#approve-ox").show();
//       $("#approve-modal").show();
//     } else if (allowanceOx > 0 && allowanceOmega == 0) {
//       $(".approve-omega").show();
//       $("#approve-modal").show();
//     } else {
//       $("#approve-ox").show();
//       $(".approve-omega").show();
//       $("#approve-modal").show();
//     }

//     $("#node-modal").removeAttr("disabled");
//   },
//   setupClickCollect: async () => {
//     $(".approve-omega").on("click", async (e) => {
//       let amount = Main.toWei("1000000");
//       Main.buttonLoadingHelper(e, "approving...", async () => {
//         await Main.omega
//           .approve(Main.omegaDao.address, amount, { from: Main.account })
//           .once("transactionHash", async (txHash) => {
//             Main.handleTransaction(txHash, "Approving OM token...");
//           });
//       });
//     });

//     $("#collect-omega").on("click", async (e) => {
//       Main.buttonLoadingHelper(e, "collecting...", async () => {
//         await Main.omegaDao
//           .widthrawInterest(Main.account, { from: Main.account })
//           .once("transactionHash", async (txHash) => {
//             Main.handleTransaction(txHash, "Collecting OM to your wallet...");
//           });
//       });
//     });
//   },
//   setupClickProvideOmega: async () => {
//     $("#provide-omega").on("click", async () => {
//       let currentBalence = parseInt(Main.toEth(omegaBalance.toString()));
//       let amountToProvide = parseInt($("#provide-omega").data("amount"));

//       if (currentBalence >= amountToProvide) {
//         $("#input-omega").val(amountToProvide);
//       }
//     });
//   },
//   setupClickProvideOx: async () => {
//     $("#provide-ox").on("click", async () => {
//       let currentBalence = parseInt(Main.toEth(oxBalance.toString()));
//       let amountToProvide = parseInt($("#provide-ox").data("amount"));

//       if (currentBalence >= amountToProvide) {
//         $("#input-ox").val(amountToProvide);
//       }
//     });
//   },
//   setupClickApproveOx: async () => {
//     $("#approve-ox").on("click", async (e) => {
//       let amount = Main.toWei("100000000");
//       Main.buttonLoadingHelper(e, "approving...", async () => {
//         await Main.ox
//           .approve(Main.omegaDao.address, amount, { from: Main.account })
//           .once("transactionHash", async (txHash) => {
//             Main.handleTransaction(txHash, "Approving OX token...");
//           });
//       });
//     });
//   },
//   setupClickMintNode: async () => {
//     let omegaType, tokensVals;

//     $("#next-step-modal").on("click", async (e) => {
//       omegaType = $("#omega-type").val();

//       switch (omegaType) {
//         case "0":
//           tokensVals = 100;
//           break;
//         case "1":
//           tokensVals = 250;
//           break;
//         case "2":
//           tokensVals = 500;
//           break;
//         case "3":
//           tokensVals = 1000;
//           break;
//         case "4":
//           tokensVals = 5000;
//           break;
//         default:
//           alert("Something went wrong!");
//       }

//       $("#input-omega").attr("placeholder", tokensVals + " OM");
//       $("#provide-omega").attr("data-amount", tokensVals);
//       $("#input-ox").attr("placeholder", tokensVals + " OX");
//       $("#provide-ox").attr("data-amount", tokensVals);
//       $(".token-vals").html(tokensVals);
//       $("#mint-node").attr("data-amount", tokensVals);
//       $("#mint-node").attr("data-omega-type", omegaType);

//       $("#node-type-modal").hide();
//       $("#mint-modal").show();
//     });

//     $("#mint-node").on("click", async (e) => {
//       let omegaAmount = $("#input-omega").val();
//       let oxAmount = $("#input-ox").val();
//       let amountToProvide = $(e.target).data("amount");
//       let omegaType = $(e.target).data("omega-type");

//       if (omegaAmount < amountToProvide || oxAmount < amountToProvide) {
//         alert(
//           "You need to provide " +
//             amountToProvide +
//             " OM and " +
//             amountToProvide +
//             " OX to mint a node"
//         );
//         return;
//       }

//       Main.buttonLoadingHelper(e, "minting...", async () => {
//         await Main.omegaDao
//           .mintNode(
//             Main.account,
//             Main.toWei(omegaAmount),
//             Main.toWei(oxAmount),
//             omegaType,
//             { from: Main.account }
//           )
//           .once("transactionHash", async (txHash) => {
//             Main.handleTransaction(txHash, "Minting Omega node...");
//           });
//       });
//     });
//   },
//   setupClickAddTokenToWallet: async () => {
//     $("#add-token").on("click", async (e) => {
//       Main.addTokenToWallet();
//     });
//   },
//   addTokenToWallet: async () => {
//     await ethereum.request({
//       method: "wallet_watchAsset",
//       params: {
//         type: "ERC20", // Initially only supports ERC20, but eventually more!
//         options: {
//           address: Main.omega.address, // The address that the token is at.
//           symbol: "OM", // A ticker symbol or shorthand, up to 5 chars.
//           decimals: 18, // The number of decimals in the token
//         },
//       },
//     });
//   },
//   setupClickChangeNetwork: async () => {
//     $("#change-network").on("click", async (e) => {
//       Main.changeWalletNetwork();
//     });
//   },

//   // Mainnet BSC

//   //changeWalletNetwork: async () => {
//   //  await ethereum.request({
//   //    method: 'wallet_switchEthereumChain',
//   //    params:[ { chainId: '0x38' } ]
//   //  });

//   // Testnet BSC

//   changeWalletNetwork: async () => {
//     await ethereum.request({
//       method: "wallet_switchEthereumChain",
//       params: [{ chainId: "0x61" }],
//     });
//   },

//   // helper functions
//   buttonLoadingHelper: async (event, loadingText, callback) => {
//     $btn = $(event.target);
//     $btn.attr("disabled", "disabled");
//     $btn.html(loadingText);
//     try {
//       await callback();
//     } catch {
//       alert("Something went wrong, please refresh and try again.");
//       window.location.reload();
//     }
//     window.location.reload();
//   },
//   handleTransaction: async (txHash, message) => {
//     $("#create-node").modal("hide");
//     $modal = $("#tx-alert");
//     $modal.find("#tx-link").attr("href", "https://bscsan.com/tx/" + txHash);
//     $modal.find("#tx-message").html(message);
//     $modal.modal("show");
//   },
// };

// $(() => {
//   $(window).load(() => {
//     Main.load();
//   });
// });

// const contract = require("@truffle/contract");
Main = {
  loading: false,
  contracts: {},

  toEth: (n) => {
    let toEther = web3.utils.fromWei(n, "ether");
    return toEther; //.slice(0, 3) + '.' + toMilli.slice(3)
  },
  toWei: (n) => {
    return web3.utils.toWei(n, "ether");
  },
  load: async () => {
    Main.toggleLoadingScreen(true);
    await Main.loadWeb3(true);

    await Main.setupClickCollect();
    await Main.setupClickMintNode();
    $walletBtn = $("#wallet");
    $walletBtn.on("click", async () => {
      await Main.loadWeb3(false);
    });

    await Main.setupClickProvideOmega();
    await Main.setupClickProvideOx();
    await Main.setupClickApproveOx();
    await Main.setupMetamaskEvents();
    await Main.setupClickAddTokenToWallet();
    await Main.setupClickChangeNetwork();

    $("#max-omega").on("click", Main.maxOmegaBtn);
    $("#max-ox").on("click", Main.maxOxBtn);
    await Main.toggleLoadingScreen(false);
    console.log("loading done!");
  },

  toggleLoadingScreen: async (load) => {
    if (load) {
      $(".loading").show();
      $(".content").hide();
    } else {
      $(".loading").hide();
      $(".content").show();
    }
  },

  setupMetamaskEvents: async () => {
    if (typeof ethereum === "undefined") {
      return;
    }

    ethereum.on("accountsChanged", async () => {
      Main.toggleLoadingScreen(true);
      window.location.reload();
    });

    ethereum.on("chainChanged", async () => {
      Main.toggleLoadingScreen(true);
      window.location.reload();
    });
  },

  loadContract: async () => {
    const omegaDao = await $.getJSON("contracts/OmegaDao.json");
    Main.contracts.OmegaDao = TruffleContract(omegaDao);
    Main.contracts.OmegaDao.setProvider(Main.web3Provider);

    const omega = await $.getJSON("contracts/Omega.json");
    Main.contracts.Omega = TruffleContract(omega);
    Main.contracts.Omega.setProvider(Main.web3Provider);

    // OX contract on mainnet
    // const oxContractAddress = '0xAC2f8fb059C96C481fAE3f4702Ca324664b79B26'
    // const ox = await $.getJSON('contracts/MainnetOx.json')
    // Main.contracts.Ox = TruffleContract(ox)
    // Main.contracts.Ox.setProvider(Main.web3Provider)

    // OX contract on testnet
    const oxContractAddress = "0x8976655C7A049AB6FcFC9123897AdDe13Ebef908";
    const ox = await $.getJSON("contracts/ExternalOx.json");
    Main.contracts.Ox = TruffleContract(ox);
    Main.contracts.Ox.setProvider(Main.web3Provider);

    // OX contract locally
    // const ox = await $.getJSON('contracts/Ox.json')
    // Main.contracts.Ox = TruffleContract(ox)
    // Main.contracts.Ox.setProvider(Main.web3Provider)

    // try {
    //   // Main.omegaDao = await Main.contracts.OmegaDao.deployed()
    //   // Main.omega = await Main.contracts.Omega.deployed()

    //   // OX contract locally
    //   // Main.ox = await Main.contracts.Ox.deployed()

    //   // OX contract on testnet
    //   Main.ox = await Main.contracts.Ox.at(oxContractAddress);

    //   // OX contract on mainnet
    //   // Main.ox = await Main.contracts.Ox.at(oxContractAddress)
    // } catch {
    //   $("#network-alert").show();
    // }
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async (firstLoad) => {
    if (typeof web3 !== "undefined") {
      Main.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      if (!firstLoad) {
        window.alert("Please connect to Metamask.");
      }
    }
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        if (!firstLoad) {
          await ethereum.enable();
        }
      } catch {}
    } else if (window.web3) {
      Main.web3Provider = web3.currentProvider;
      window.web3 = new Web3(web3.currentProvider);
    }

    if (typeof web3 !== "undefined") {
      Main.accountConnected();
    }
  },
  accounts: async () => {
    const acc = await web3.eth.getAccounts();
    return acc;
  },
  accountConnected: async () => {
    let accounts = await Main.accounts();
    if (accounts.length > 0) {
      Main.account = accounts[0];
      let acc = accounts[0];
      $("#wallet-content").html(
        acc.slice(0, 5) + "..." + acc.slice(acc.length - 4, acc.length)
      );

      await Main.loadContract();
      await Main.fetchGeneralData();
      await Main.fetchAccountData();
    }
  },
  fetchGeneralData: async () => {
    // console.log("innnnnnnnnnnnnnnn");
    const MyContract = await TruffleContract({
      abi: [
        {
          inputs: [
            {
              internalType: "contract Om",
              name: "_omAddress",
              type: "address",
            },
            {
              internalType: "contract Ox",
              name: "_oxAddress",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          name: "accountAddresses",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "accountNodeLimit",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "", type: "address" }],
          name: "accounts",
          outputs: [
            { internalType: "bool", name: "exists", type: "bool" },
            { internalType: "bool", name: "archived", type: "bool" },
            { internalType: "uint256", name: "nodesLength", type: "uint256" },
            {
              internalType: "uint256",
              name: "lastWithdrawalAt",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_address", type: "address" },
          ],
          name: "activateAccount",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_address", type: "address" },
          ],
          name: "archiveAccount",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_address", type: "address" },
            { internalType: "uint256", name: "_nodeType", type: "uint256" },
          ],
          name: "awardNode",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "cooldownTimeInSeconds",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_to", type: "address" },
            { internalType: "uint256", name: "_nodeId", type: "uint256" },
            { internalType: "uint256", name: "_timestamp", type: "uint256" },
          ],
          name: "estimateInterestSingleNode",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_to", type: "address" },
            { internalType: "uint256", name: "_timestamp", type: "uint256" },
          ],
          name: "estimateInterestToWithdraw",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_address", type: "address" },
          ],
          name: "getAccount",
          outputs: [
            {
              components: [
                { internalType: "uint256", name: "nodeType", type: "uint256" },
                { internalType: "uint256", name: "createdAt", type: "uint256" },
              ],
              internalType: "struct OmegaNodesV3.Node[]",
              name: "",
              type: "tuple[]",
            },
            { internalType: "uint256", name: "", type: "uint256" },
            { internalType: "uint256", name: "", type: "uint256" },
            { internalType: "bool", name: "", type: "bool" },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "_index", type: "uint256" },
          ],
          name: "getAccountsAddressForIndex",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getAccountsLength",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_address", type: "address" },
          ],
          name: "getNodesForAccount",
          outputs: [
            { internalType: "uint256[][]", name: "", type: "uint256[][]" },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getTotalNodes",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_to", type: "address" },
            { internalType: "uint256", name: "_timestamp", type: "uint256" },
          ],
          name: "isWithdrawalAvailable",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address[]",
              name: "_addresses",
              type: "address[]",
            },
            {
              internalType: "uint256[][]",
              name: "_nodeArgs",
              type: "uint256[][]",
            },
          ],
          name: "migrateMultiple",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_address", type: "address" },
            { internalType: "uint256", name: "_omAmount", type: "uint256" },
            { internalType: "uint256", name: "_oxAmount", type: "uint256" },
            { internalType: "uint256", name: "_nodeType", type: "uint256" },
          ],
          name: "mintNode",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          name: "nodeMultiplers",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "omAddress",
          outputs: [{ internalType: "contract Om", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "oxAddress",
          outputs: [{ internalType: "contract Ox", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "percentageOfRewardAfterCooldown",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "percentageOfRewardBeforeCooldown",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          name: "requiredAmounts",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          name: "rotTargetForNodes",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "_nodeLimit", type: "uint256" },
          ],
          name: "setAccountNodeLimit",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_cooldownTimeInSeconds",
              type: "uint256",
            },
          ],
          name: "setCooldownTimeInSeconds",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "_newRewards", type: "uint256" },
            { internalType: "uint256", name: "_nodeType", type: "uint256" },
          ],
          name: "setNodeMultipliers",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_percentageOfRewardAfterCooldown",
              type: "uint256",
            },
          ],
          name: "setPercentageOfRewardAfterCooldown",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_percentageOfRewardBeforeCooldown",
              type: "uint256",
            },
          ],
          name: "setPercentageOfRewardBeforeCooldown",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_newAmountRequired",
              type: "uint256",
            },
            { internalType: "uint256", name: "_nodeType", type: "uint256" },
          ],
          name: "setRequiredAmounts",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "_newRotTarget", type: "uint256" },
            { internalType: "uint256", name: "_nodeType", type: "uint256" },
          ],
          name: "setRotTargetForNode",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "totalNodes",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_address", type: "address" },
            { internalType: "uint256", name: "_amount", type: "uint256" },
          ],
          name: "transferOm",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_address", type: "address" },
            { internalType: "uint256", name: "_amount", type: "uint256" },
          ],
          name: "transferOx",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "_to", type: "address" }],
          name: "withdrawInterest",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
    });
    MyContract.setProvider(Main.web3Provider);
    const instance = await MyContract.at(
      "0x0DA87d934CA5128AEeACf422F2b58d0acbd3696E"
    );
    let totalNodes = await instance.totalNodes();
    console.log("ahdsnbabfnmbaf", totalNodes);

    // let totalNodes = await Main.omegaDao.totalNodes.call();
    $("#total-nodes").html(totalNodes.words[0].toString());

    let accountInfo = await instance.getAccount(Main.account);
    let eachNodeCount = [0, 0, 0, 0, 0];
    accountInfo[0].map((item) => eachNodeCount[item.nodeType]++);
    console.log("sbdhjhdsbdfdbvjdfnv", eachNodeCount);

    // let contractAccount = await Main.omegaDao.accounts(Main.account);
    let total = eachNodeCount[0] * 200;
    total += eachNodeCount[1] * 500;
    total += eachNodeCount[2] * 1000;
    total += eachNodeCount[3] * 2000;
    total += eachNodeCount[4] * 10000;
    $("#tlv").html("$" + total.toLocaleString("us"));
    // let total = contractAccount.iotaCount.toNumber() * 200;
    // total += contractAccount.lambdaCount.toNumber() * 500;
    // total += contractAccount.phiCount.toNumber() * 1000;
    // total += contractAccount.chiliaCount.toNumber() * 2000;
    // total += contractAccount.tabithaCount.toNumber() * 10000;
    // $("#tlv").html("$" + total.toLocaleString("us"));

    const OM = await TruffleContract({
      abi: [
        { inputs: [], stateMutability: "nonpayable", type: "constructor" },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          inputs: [
            { internalType: "address", name: "owner", type: "address" },
            { internalType: "address", name: "spender", type: "address" },
          ],
          name: "allowance",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
          ],
          name: "approve",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "account", type: "address" },
          ],
          name: "balanceOf",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "_amount", type: "uint256" },
          ],
          name: "burn",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "decimals",
          outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "spender", type: "address" },
            {
              internalType: "uint256",
              name: "subtractedValue",
              type: "uint256",
            },
          ],
          name: "decreaseAllowance",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "addedValue", type: "uint256" },
          ],
          name: "increaseAllowance",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "_amount", type: "uint256" },
          ],
          name: "mint",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "name",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_omegaNodes", type: "address" },
          ],
          name: "setNodeContract",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "_limit", type: "uint256" },
          ],
          name: "setTranferLimit",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "totalSupply",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "recipient", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
          ],
          name: "transfer",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "sender", type: "address" },
            { internalType: "address", name: "recipient", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
          ],
          name: "transferFrom",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
    });
    OM.setProvider(Main.web3Provider);
    const instanceOM = await OM.at(
      "0x6eE744a0686d76B3871dafF8F73989e2F5B7516a"
    );
    balance = await instanceOM.balanceOf(
      "0x0DA87d934CA5128AEeACf422F2b58d0acbd3696E"
    );
    console.log(
      "instanceOM",

      BigInt(balance)
    );
    // console.log(
    //   "balance",
    //   MyContract.address,
    //   await instanceOM.balanceOf(MyContract.address)
    // );
    let omegaPool = balance;
    // // let omegaPool = await Main.omega.balanceOf(Main.omegaDao.address);
    let formatedPoolAmount = parseInt(Main.toEth(omegaPool));
    // console.log(formatedPoolAmount);
    $("#omega-pool").html(formatedPoolAmount.toLocaleString("us"));
    $("#ox-pool").html((total / 2).toLocaleString("us"));
  },
  fetchAccountData: async () => {
    // number of nodes
    const MyContract = await TruffleContract({
      abi: [
        {
          inputs: [
            {
              internalType: "contract Om",
              name: "_omAddress",
              type: "address",
            },
            {
              internalType: "contract Ox",
              name: "_oxAddress",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          name: "accountAddresses",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "accountNodeLimit",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "", type: "address" }],
          name: "accounts",
          outputs: [
            { internalType: "bool", name: "exists", type: "bool" },
            { internalType: "bool", name: "archived", type: "bool" },
            { internalType: "uint256", name: "nodesLength", type: "uint256" },
            {
              internalType: "uint256",
              name: "lastWithdrawalAt",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_address", type: "address" },
          ],
          name: "activateAccount",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_address", type: "address" },
          ],
          name: "archiveAccount",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_address", type: "address" },
            { internalType: "uint256", name: "_nodeType", type: "uint256" },
          ],
          name: "awardNode",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "cooldownTimeInSeconds",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_to", type: "address" },
            { internalType: "uint256", name: "_nodeId", type: "uint256" },
            { internalType: "uint256", name: "_timestamp", type: "uint256" },
          ],
          name: "estimateInterestSingleNode",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_to", type: "address" },
            { internalType: "uint256", name: "_timestamp", type: "uint256" },
          ],
          name: "estimateInterestToWithdraw",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_address", type: "address" },
          ],
          name: "getAccount",
          outputs: [
            {
              components: [
                { internalType: "uint256", name: "nodeType", type: "uint256" },
                { internalType: "uint256", name: "createdAt", type: "uint256" },
              ],
              internalType: "struct OmegaNodesV3.Node[]",
              name: "",
              type: "tuple[]",
            },
            { internalType: "uint256", name: "", type: "uint256" },
            { internalType: "uint256", name: "", type: "uint256" },
            { internalType: "bool", name: "", type: "bool" },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "_index", type: "uint256" },
          ],
          name: "getAccountsAddressForIndex",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getAccountsLength",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_address", type: "address" },
          ],
          name: "getNodesForAccount",
          outputs: [
            { internalType: "uint256[][]", name: "", type: "uint256[][]" },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getTotalNodes",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_to", type: "address" },
            { internalType: "uint256", name: "_timestamp", type: "uint256" },
          ],
          name: "isWithdrawalAvailable",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address[]",
              name: "_addresses",
              type: "address[]",
            },
            {
              internalType: "uint256[][]",
              name: "_nodeArgs",
              type: "uint256[][]",
            },
          ],
          name: "migrateMultiple",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_address", type: "address" },
            { internalType: "uint256", name: "_omAmount", type: "uint256" },
            { internalType: "uint256", name: "_oxAmount", type: "uint256" },
            { internalType: "uint256", name: "_nodeType", type: "uint256" },
          ],
          name: "mintNode",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          name: "nodeMultiplers",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "omAddress",
          outputs: [{ internalType: "contract Om", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "oxAddress",
          outputs: [{ internalType: "contract Ox", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "percentageOfRewardAfterCooldown",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "percentageOfRewardBeforeCooldown",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          name: "requiredAmounts",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          name: "rotTargetForNodes",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "_nodeLimit", type: "uint256" },
          ],
          name: "setAccountNodeLimit",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_cooldownTimeInSeconds",
              type: "uint256",
            },
          ],
          name: "setCooldownTimeInSeconds",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "_newRewards", type: "uint256" },
            { internalType: "uint256", name: "_nodeType", type: "uint256" },
          ],
          name: "setNodeMultipliers",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_percentageOfRewardAfterCooldown",
              type: "uint256",
            },
          ],
          name: "setPercentageOfRewardAfterCooldown",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_percentageOfRewardBeforeCooldown",
              type: "uint256",
            },
          ],
          name: "setPercentageOfRewardBeforeCooldown",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_newAmountRequired",
              type: "uint256",
            },
            { internalType: "uint256", name: "_nodeType", type: "uint256" },
          ],
          name: "setRequiredAmounts",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "_newRotTarget", type: "uint256" },
            { internalType: "uint256", name: "_nodeType", type: "uint256" },
          ],
          name: "setRotTargetForNode",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "totalNodes",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_address", type: "address" },
            { internalType: "uint256", name: "_amount", type: "uint256" },
          ],
          name: "transferOm",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_address", type: "address" },
            { internalType: "uint256", name: "_amount", type: "uint256" },
          ],
          name: "transferOx",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "_to", type: "address" }],
          name: "withdrawInterest",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
    });
    MyContract.setProvider(Main.web3Provider);
    const instance = await MyContract.at(
      "0x0DA87d934CA5128AEeACf422F2b58d0acbd3696E"
    );
    // const instance = await MyContract.at(
    //   "0xB8293B7be29A59a460A4A7ad6a75Dc10c36cA960"
    // );
    // console.log(await instance.accounts(Main.account));
    // let c = await Main?.contracts.OmegaDao.at(
    //   "0xB8293B7be29A59a460A4A7ad6a75Dc10c36cA960"
    // );
    // console.log(await c.accounts("0x488A8CA56f29BFbe28e6f4cf898D5c3C1455deDa"));
    // let contractAccount = await instance.accounts(Main.account);
    let accountInfo = await instance.getAccount(Main.account);
    let eachNodeCount = [0, 0, 0, 0, 0];
    accountInfo[0].map((item) => eachNodeCount[item.nodeType]++);
    console.log("sbdhjhdsbdfdbvjdfnv", eachNodeCount);
    // console.log(accountInfo[0]);
    // let contractAccount = await instance.getAccount(Main.account);
    // let contractAccount = await Main.omegaDao.accounts(Main.account);
    // console.log("hello", contractAccount);
    // let total = contractAccount.nodesLength.words[0];

    // console.log(total);
    let total =
      eachNodeCount[0] +
      eachNodeCount[1] +
      eachNodeCount[2] +
      eachNodeCount[3] +
      eachNodeCount[4];

    let totalRewards =
      eachNodeCount[0] * 1 +
      eachNodeCount[1] * 3 +
      eachNodeCount[2] * 7 +
      eachNodeCount[3] * 16 +
      eachNodeCount[4] * 100;

    $("#iota-count").html(eachNodeCount[0]);
    $("#iota-rewards").html(eachNodeCount[0] * 1);

    $("#lambda-count").html(eachNodeCount[1]);
    $("#lambda-rewards").html(eachNodeCount[1] * 3);

    $("#phi-count").html(eachNodeCount[2]);
    $("#phi-rewards").html(eachNodeCount[2] * 7);

    $("#chilia-count").html(eachNodeCount[3]);
    $("#chilia-rewards").html(eachNodeCount[3] * 16);

    $("#tabitha-count").html(eachNodeCount[4]);
    $("#tabitha-rewards").html(eachNodeCount[4] * 100);

    $("#total-count").html(total);
    $("#total-rewards").html(totalRewards);

    $("#num-nodes").html(total);
    // let total =
    //   contractAccount.iotaCount.toNumber() +
    //   contractAccount.lambdaCount.toNumber() +
    //   contractAccount.phiCount.toNumber() +
    //   contractAccount.chiliaCount.toNumber() +
    //   contractAccount.tabithaCount.toNumber();

    // let totalRewards =
    //   contractAccount.iotaCount.toNumber() * 1 +
    //   contractAccount.lambdaCount.toNumber() * 3 +
    //   contractAccount.phiCount.toNumber() * 7 +
    //   contractAccount.chiliaCount.toNumber() * 16 +
    //   contractAccount.tabithaCount.toNumber() * 100;

    // $("#iota-count").html(contractAccount.iotaCount.toNumber());
    // $("#iota-rewards").html(contractAccount.iotaCount.toNumber() * 1);

    // $("#lambda-count").html(contractAccount.lambdaCount.toNumber());
    // $("#lambda-rewards").html(contractAccount.lambdaCount.toNumber() * 3);

    // $("#chilia-count").html(contractAccount.phiCount.toNumber());
    // $("#chilia-rewards").html(contractAccount.phiCount.toNumber() * 7);

    // $("#chilia-count").html(contractAccount.chiliaCount.toNumber());
    // $("#chilia-rewards").html(contractAccount.chiliaCount.toNumber() * 16);

    // $("#tabitha-count").html(contractAccount.tabithaCount.toNumber());
    // $("#tabitha-rewards").html(contractAccount.tabithaCount.toNumber() * 100);

    // $("#total-count").html(total);
    // $("#total-rewards").html(totalRewards);

    // $("#num-nodes").html(total);

    // rewards accumulated
    let interestAccumulated = Main.toEth(contractAccount.interestAccumulated);
    $("#accumulated-interest").html(interestAccumulated + " OM");

    if (parseFloat(interestAccumulated) == 0) {
      $("#collect-omega").attr("disabled", "disabled");
    }

    // wallet amount of OM
    omegaBalance = await Main.omega.balanceOf(Main.account);
    $("#omega-balance").html(Main.toEth(omegaBalance.toString()));

    // wallet amount of OX
    oxBalance = await Main.ox.balanceOf(Main.account);
    $("#ox-balance").html(Main.toEth(oxBalance.toString()));

    let allowanceOmega = await Main.omega.allowance(
      Main.account,
      Main.omegaDao.address
    );
    let allowanceOx = await Main.ox.allowance(
      Main.account,
      Main.omegaDao.address
    );

    if (allowanceOx > 0 && allowanceOmega > 0) {
      $("#collect-omega").show();
      $("#node-type-modal").show();
    } else if (allowanceOx == 0 && allowanceOmega > 0) {
      $("#collect-omega").show();
      $("#approve-ox").show();
      $("#approve-modal").show();
    } else if (allowanceOx > 0 && allowanceOmega == 0) {
      $(".approve-omega").show();
      $("#approve-modal").show();
    } else {
      $("#approve-ox").show();
      $(".approve-omega").show();
      $("#approve-modal").show();
    }

    $("#node-modal").removeAttr("disabled");
  },
  setupClickCollect: async () => {
    $(".approve-omega").on("click", async (e) => {
      let amount = Main.toWei("1000000");
      Main.buttonLoadingHelper(e, "approving...", async () => {
        await Main.omega
          .approve(Main.omegaDao.address, amount, { from: Main.account })
          .once("transactionHash", async (txHash) => {
            Main.handleTransaction(txHash, "Approving OM token...");
          });
      });
    });

    $("#collect-omega").on("click", async (e) => {
      Main.buttonLoadingHelper(e, "collecting...", async () => {
        await Main.omegaDao
          .widthrawInterest(Main.account, { from: Main.account })
          .once("transactionHash", async (txHash) => {
            Main.handleTransaction(txHash, "Collecting OM to your wallet...");
          });
      });
    });
  },
  setupClickProvideOmega: async () => {
    $("#provide-omega").on("click", async () => {
      let currentBalence = parseInt(Main.toEth(omegaBalance.toString()));
      let amountToProvide = parseInt($("#provide-omega").data("amount"));

      if (currentBalence >= amountToProvide) {
        $("#input-omega").val(amountToProvide);
      }
    });
  },
  setupClickProvideOx: async () => {
    $("#provide-ox").on("click", async () => {
      let currentBalence = parseInt(Main.toEth(oxBalance.toString()));
      let amountToProvide = parseInt($("#provide-ox").data("amount"));

      if (currentBalence >= amountToProvide) {
        $("#input-ox").val(amountToProvide);
      }
    });
  },
  setupClickApproveOx: async () => {
    $("#approve-ox").on("click", async (e) => {
      let amount = Main.toWei("100000000");
      Main.buttonLoadingHelper(e, "approving...", async () => {
        await Main.ox
          .approve(Main.omegaDao.address, amount, { from: Main.account })
          .once("transactionHash", async (txHash) => {
            Main.handleTransaction(txHash, "Approving OX token...");
          });
      });
    });
  },
  setupClickMintNode: async () => {
    let omegaType, tokensVals;

    $("#next-step-modal").on("click", async (e) => {
      omegaType = $("#omega-type").val();

      switch (omegaType) {
        case "0":
          tokensVals = 100;
          break;
        case "1":
          tokensVals = 250;
          break;
        case "2":
          tokensVals = 500;
          break;
        case "3":
          tokensVals = 1000;
          break;
        case "4":
          tokensVals = 5000;
          break;
        default:
          alert("Something went wrong!");
      }

      $("#input-omega").attr("placeholder", tokensVals + " OM");
      $("#provide-omega").attr("data-amount", tokensVals);
      $("#input-ox").attr("placeholder", tokensVals + " OX");
      $("#provide-ox").attr("data-amount", tokensVals);
      $(".token-vals").html(tokensVals);
      $("#mint-node").attr("data-amount", tokensVals);
      $("#mint-node").attr("data-omega-type", omegaType);

      $("#node-type-modal").hide();
      $("#mint-modal").show();
    });

    $("#mint-node").on("click", async (e) => {
      let omegaAmount = $("#input-omega").val();
      let oxAmount = $("#input-ox").val();
      let amountToProvide = $(e.target).data("amount");
      let omegaType = $(e.target).data("omega-type");

      if (omegaAmount < amountToProvide || oxAmount < amountToProvide) {
        alert(
          "You need to provide " +
            amountToProvide +
            " OM and " +
            amountToProvide +
            " OX to mint a node"
        );
        return;
      }

      Main.buttonLoadingHelper(e, "minting...", async () => {
        await Main.omegaDao
          .mintNode(
            Main.account,
            Main.toWei(omegaAmount),
            Main.toWei(oxAmount),
            omegaType,
            { from: Main.account }
          )
          .once("transactionHash", async (txHash) => {
            Main.handleTransaction(txHash, "Minting Omega node...");
          });
      });
    });
  },
  setupClickAddTokenToWallet: async () => {
    $("#add-token").on("click", async (e) => {
      Main.addTokenToWallet();
    });
  },
  addTokenToWallet: async () => {
    await ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20", // Initially only supports ERC20, but eventually more!
        options: {
          address: Main.omega.address, // The address that the token is at.
          symbol: "OM", // A ticker symbol or shorthand, up to 5 chars.
          decimals: 18, // The number of decimals in the token
        },
      },
    });
  },
  setupClickChangeNetwork: async () => {
    $("#change-network").on("click", async (e) => {
      Main.changeWalletNetwork();
    });
  },

  // Mainnet BSC

  //changeWalletNetwork: async () => {
  //  await ethereum.request({
  //    method: 'wallet_switchEthereumChain',
  //    params:[ { chainId: '0x38' } ]
  //  });

  // Testnet BSC

  changeWalletNetwork: async () => {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x61" }],
    });
  },

  // helper functions
  buttonLoadingHelper: async (event, loadingText, callback) => {
    $btn = $(event.target);
    $btn.attr("disabled", "disabled");
    $btn.html(loadingText);
    try {
      await callback();
    } catch {
      alert("Something went wrong, please refresh and try again.");
      window.location.reload();
    }
    window.location.reload();
  },
  handleTransaction: async (txHash, message) => {
    $("#create-node").modal("hide");
    $modal = $("#tx-alert");
    $modal.find("#tx-link").attr("href", "https://bscsan.com/tx/" + txHash);
    $modal.find("#tx-message").html(message);
    $modal.modal("show");
  },
};

$(() => {
  $(window).load(() => {
    Main.load();
  });
});
