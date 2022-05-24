// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Ethers = require("ethers");
var FloatUtil = require("./FloatUtil.js");
var Caml_array = require("rescript/lib/js/caml_array.js");
var FloatEthers = require("./FloatEthers.js");
var FloatContracts = require("./FloatContracts.js");

var min = FloatEthers.BigNumber.min;

var max = FloatEthers.BigNumber.max;

function div(prim0, prim1) {
  return prim0.div(prim1);
}

function mul(prim0, prim1) {
  return prim0.mul(prim1);
}

function add(prim0, prim1) {
  return prim0.add(prim1);
}

function sub(prim0, prim1) {
  return prim0.sub(prim1);
}

function fromInt(prim) {
  return Ethers.BigNumber.from(prim);
}

function fromFloat(prim) {
  return Ethers.BigNumber.from(prim);
}

function toNumber(prim) {
  return prim.toNumber();
}

function toNumberFloat(prim) {
  return prim.toNumber();
}

var tenToThe18 = FloatEthers.BigNumber.tenToThe18;

var tenToThe14 = FloatEthers.BigNumber.tenToThe14;

function wrapSideP(side) {
  return {
          TAG: /* P */0,
          _0: side
        };
}

function wrapSideW(side) {
  return {
          TAG: /* W */1,
          _0: side
        };
}

function make(p, marketIndex, isLong) {
  return {
          provider: p,
          marketIndex: marketIndex,
          isLong: isLong
        };
}

function makeWrap(p, marketIndex, isLong) {
  return {
          TAG: /* P */0,
          _0: {
            provider: p,
            marketIndex: marketIndex,
            isLong: isLong
          }
        };
}

var WithProvider = {
  make: make,
  makeWrap: makeWrap
};

function make$1(w, marketIndex, isLong) {
  return {
          wallet: w,
          marketIndex: marketIndex,
          isLong: isLong
        };
}

function makeWrap$1(w, marketIndex, isLong) {
  return {
          TAG: /* W */1,
          _0: {
            wallet: w,
            marketIndex: marketIndex,
            isLong: isLong
          }
        };
}

var WithWallet = {
  make: make$1,
  makeWrap: makeWrap$1
};

function provider(side) {
  if (side.TAG === /* P */0) {
    return side._0.provider;
  } else {
    return side._0.wallet.provider;
  }
}

function isLong(side) {
  return side._0.isLong;
}

function marketIndex(side) {
  return side._0.marketIndex;
}

function makeLongShortContract(p, c) {
  return FloatContracts.LongShort.make(Ethers.utils.getAddress(c.contracts.longShort.address), p);
}

function makeStakerContract(p, c) {
  return FloatContracts.Staker.make(Ethers.utils.getAddress(c.contracts.longShort.address), p);
}

function syntheticTokenAddress(p, c, marketIndex, isLong) {
  return makeLongShortContract(FloatEthers.wrapProvider(p), c).syntheticTokens(marketIndex, isLong);
}

function syntheticTokenTotalSupply(p, c, marketIndex, isLong) {
  return syntheticTokenAddress(p, c, marketIndex, isLong).then(function (address) {
                return Promise.resolve(FloatContracts.Synth.make(address, FloatEthers.wrapProvider(p)));
              }).then(function (synth) {
              return synth.totalSupply();
            });
}

function syntheticTokenBalance(p, c, marketIndex, isLong, owner) {
  return syntheticTokenAddress(p, c, marketIndex, isLong).then(function (address) {
                return Promise.resolve(FloatContracts.Synth.make(address, FloatEthers.wrapProvider(p)));
              }).then(function (synth) {
              return synth.balanceOf(owner);
            });
}

function stakedSyntheticTokenBalance(p, c, marketIndex, isLong, owner) {
  return syntheticTokenAddress(p, c, marketIndex, isLong).then(function (token) {
              return makeStakerContract(FloatEthers.wrapProvider(p), c).userAmountStaked(token, owner);
            });
}

function marketSideValue(p, c, marketIndex, isLong) {
  return makeLongShortContract(FloatEthers.wrapProvider(p), c).marketSideValueInPaymentToken(marketIndex).then(function (value) {
              if (isLong) {
                return value.long;
              } else {
                return value.short;
              }
            });
}

function updateIndex(p, c, marketIndex, user) {
  return makeLongShortContract(FloatEthers.wrapProvider(p), c).userNextPrice_currentUpdateIndex(marketIndex, user);
}

function unsettledSynthBalance(p, c, marketIndex, isLong, user) {
  return makeLongShortContract(FloatEthers.wrapProvider(p), c).getUsersConfirmedButNotSettledSynthBalance(user, marketIndex, isLong);
}

function marketSideUnconfirmedDeposits(p, c, marketIndex, isLong) {
  return makeLongShortContract(FloatEthers.wrapProvider(p), c).batched_amountPaymentToken_deposit(marketIndex, isLong);
}

function marketSideUnconfirmedRedeems(p, c, marketIndex, isLong) {
  return makeLongShortContract(FloatEthers.wrapProvider(p), c).batched_amountSyntheticToken_redeem(marketIndex, isLong);
}

function marketSideUnconfirmedShifts(p, c, marketIndex, isShiftFromLong) {
  return makeLongShortContract(FloatEthers.wrapProvider(p), c).batched_amountSyntheticToken_toShiftAwayFrom_marketSide(marketIndex, isShiftFromLong);
}

function syntheticTokenPrice(p, c, marketIndex, isLong) {
  return Promise.all([
                marketSideValue(p, c, marketIndex, isLong),
                syntheticTokenTotalSupply(p, c, marketIndex, isLong)
              ]).then(function (param) {
              return param[0].mul(tenToThe18).div(param[1]);
            });
}

function syntheticTokenPriceSnapshot(p, c, marketIndex, isLong, priceSnapshotIndex) {
  return makeLongShortContract(FloatEthers.wrapProvider(p), c).get_syntheticToken_priceSnapshot_side(marketIndex, isLong, priceSnapshotIndex);
}

function marketSideValues(p, c, marketIndex) {
  return makeLongShortContract(FloatEthers.wrapProvider(p), c).marketSideValueInPaymentToken(marketIndex);
}

function exposure(p, c, marketIndex, isLong) {
  return marketSideValues(p, c, marketIndex).then(function (values) {
              var numerator = min(values.long, values.short).mul(tenToThe18);
              if (isLong) {
                return numerator.div(values.long);
              } else {
                return numerator.div(values.short);
              }
            });
}

function unconfirmedExposure(p, c, marketIndex, isLong) {
  return Promise.all([
                syntheticTokenPrice(p, c, marketIndex, true),
                syntheticTokenPrice(p, c, marketIndex, false),
                marketSideUnconfirmedRedeems(p, c, marketIndex, true),
                marketSideUnconfirmedRedeems(p, c, marketIndex, false),
                marketSideUnconfirmedShifts(p, c, marketIndex, true),
                marketSideUnconfirmedShifts(p, c, marketIndex, false),
                marketSideUnconfirmedDeposits(p, c, marketIndex, true),
                marketSideUnconfirmedDeposits(p, c, marketIndex, false),
                marketSideValue(p, c, marketIndex, true),
                marketSideValue(p, c, marketIndex, false)
              ]).then(function (results) {
              var priceLong = Caml_array.get(results, 0);
              var priceShort = Caml_array.get(results, 1);
              var redeemsLong = Caml_array.get(results, 2);
              var redeemsShort = Caml_array.get(results, 3);
              var shiftsFromLong = Caml_array.get(results, 4);
              var shiftsFromShort = Caml_array.get(results, 5);
              var depositsLong = Caml_array.get(results, 6);
              var depositsShort = Caml_array.get(results, 7);
              var valueLong = Caml_array.get(results, 8);
              var valueShort = Caml_array.get(results, 9);
              var unconfirmedValueLong = shiftsFromShort.sub(shiftsFromLong).sub(redeemsLong).mul(priceLong).div(tenToThe18).add(depositsLong).add(valueLong);
              var unconfirmedValueShort = shiftsFromLong.sub(shiftsFromShort).sub(redeemsShort).mul(priceShort).div(tenToThe18).add(depositsShort).add(valueShort);
              var numerator = min(unconfirmedValueLong, unconfirmedValueShort).mul(tenToThe18);
              if (isLong) {
                return numerator.div(unconfirmedValueLong);
              } else {
                return numerator.div(unconfirmedValueShort);
              }
            });
}

function longOrShort($$long, $$short, isLong) {
  if (isLong) {
    return $$long;
  } else {
    return $$short;
  }
}

function toSign(isLong) {
  if (isLong) {
    return 1;
  } else {
    return -1;
  }
}

function fundingRateMultiplier(p, c, marketIndex) {
  return makeLongShortContract(FloatEthers.wrapProvider(p), c).fundingRateMultiplier_e18(marketIndex).then(function (m) {
              return m.div(tenToThe18).toNumber();
            });
}

function divFloat(a, b) {
  return a / b;
}

function fundingRateApr(p, c, marketIndex, isLong) {
  return Promise.all([
                fundingRateMultiplier(p, c, marketIndex),
                marketSideValues(p, c, marketIndex)
              ]).then(function (param) {
              var match = param[1];
              var $$short = match.short;
              var $$long = match.long;
              return $$short.sub($$long).mul(Ethers.BigNumber.from(isLong ? 1 : -1)).mul(Ethers.BigNumber.from(param[0])).mul(tenToThe18).div(isLong ? $$long : $$short).div(tenToThe14).toNumber() / 100.0;
            });
}

function positions(p, c, marketIndex, isLong, address) {
  return Promise.all([
                syntheticTokenBalance(p, c, marketIndex, isLong, address),
                syntheticTokenPrice(p, c, marketIndex, isLong)
              ]).then(function (param) {
              var balance = param[0];
              return {
                      paymentToken: balance.mul(param[1]),
                      synthToken: balance
                    };
            });
}

function stakedPositions(p, c, marketIndex, isLong, address) {
  return Promise.all([
                stakedSyntheticTokenBalance(p, c, marketIndex, isLong, address),
                syntheticTokenPrice(p, c, marketIndex, isLong)
              ]).then(function (param) {
              var balance = param[0];
              return {
                      paymentToken: balance.mul(param[1]),
                      synthToken: balance
                    };
            });
}

function unsettledPositions(p, c, marketIndex, isLong, address) {
  return updateIndex(p, c, marketIndex, address).then(function (index) {
                return Promise.all([
                            syntheticTokenPriceSnapshot(p, c, marketIndex, isLong, index),
                            unsettledSynthBalance(p, c, marketIndex, isLong, address)
                          ]);
              }).then(function (param) {
              var balance = param[1];
              return {
                      paymentToken: balance.mul(param[0]),
                      synthToken: balance
                    };
            });
}

function mint(w, c, marketIndex, isLong, amountPaymentToken) {
  if (isLong) {
    var partial_arg = makeLongShortContract(FloatEthers.wrapWallet(w), c);
    return function (param) {
      return partial_arg.mintLongNextPrice(marketIndex, amountPaymentToken, param);
    };
  }
  var partial_arg$1 = makeLongShortContract(FloatEthers.wrapWallet(w), c);
  return function (param) {
    return partial_arg$1.mintShortNextPrice(marketIndex, amountPaymentToken, param);
  };
}

function mintAndStake(w, c, marketIndex, isLong, amountPaymentToken) {
  var partial_arg = makeLongShortContract(FloatEthers.wrapWallet(w), c);
  return function (param) {
    return partial_arg.mintAndStakeNextPrice(marketIndex, amountPaymentToken, isLong, param);
  };
}

function stake(w, c, marketIndex, isLong, amountSyntheticToken, txOptions) {
  return syntheticTokenAddress(w.provider, c, marketIndex, isLong).then(function (address) {
                return Promise.resolve(FloatContracts.Synth.make(address, FloatEthers.wrapWallet(w)));
              }).then(function (synth) {
              return synth.stake(amountSyntheticToken, txOptions);
            });
}

function unstake(w, c, marketIndex, isLong, amountSyntheticToken) {
  var partial_arg = makeStakerContract(FloatEthers.wrapWallet(w), c);
  return function (param) {
    return partial_arg.withdraw(marketIndex, isLong, amountSyntheticToken, param);
  };
}

function redeem(w, c, marketIndex, isLong, amountSyntheticToken) {
  if (isLong) {
    var partial_arg = makeLongShortContract(FloatEthers.wrapWallet(w), c);
    return function (param) {
      return partial_arg.redeemLongNextPrice(marketIndex, amountSyntheticToken, param);
    };
  }
  var partial_arg$1 = makeLongShortContract(FloatEthers.wrapWallet(w), c);
  return function (param) {
    return partial_arg$1.redeemShortNextPrice(marketIndex, amountSyntheticToken, param);
  };
}

function shift(w, c, marketIndex, isLong, amountSyntheticToken) {
  if (isLong) {
    var partial_arg = makeLongShortContract(FloatEthers.wrapWallet(w), c);
    return function (param) {
      return partial_arg.shiftPositionFromLongNextPrice(marketIndex, amountSyntheticToken, param);
    };
  }
  var partial_arg$1 = makeLongShortContract(FloatEthers.wrapWallet(w), c);
  return function (param) {
    return partial_arg$1.shiftPositionFromShortNextPrice(marketIndex, amountSyntheticToken, param);
  };
}

function shiftStake(w, c, marketIndex, isLong, amountSyntheticToken) {
  var partial_arg = makeStakerContract(FloatEthers.wrapWallet(w), c);
  return function (param) {
    return partial_arg.shiftTokens(amountSyntheticToken, marketIndex, isLong, param);
  };
}

function makeWithWallet(w, marketIndex, isLong) {
  return {
          getExposure: (function (param) {
              return FloatUtil.getChainConfig(FloatEthers.wrapWallet(w)).then(function (c) {
                          return exposure(w.provider, c, Ethers.BigNumber.from(marketIndex), isLong);
                        });
            }),
          getUnconfirmedExposure: (function (param) {
              return FloatUtil.getChainConfig(FloatEthers.wrapWallet(w)).then(function (c) {
                          return unconfirmedExposure(w.provider, c, Ethers.BigNumber.from(marketIndex), isLong);
                        });
            }),
          getFundingRateApr: (function (param) {
              return FloatUtil.getChainConfig(FloatEthers.wrapWallet(w)).then(function (c) {
                          return fundingRateApr(w.provider, c, Ethers.BigNumber.from(marketIndex), isLong);
                        });
            }),
          getPositions: (function (param) {
              return FloatUtil.getChainConfig(FloatEthers.wrapWallet(w)).then(function (c) {
                          return positions(w.provider, c, Ethers.BigNumber.from(marketIndex), isLong, Ethers.utils.getAddress(w._address));
                        });
            }),
          getStakedPositions: (function (param) {
              return FloatUtil.getChainConfig(FloatEthers.wrapWallet(w)).then(function (c) {
                          return stakedPositions(w.provider, c, Ethers.BigNumber.from(marketIndex), isLong, Ethers.utils.getAddress(w._address));
                        });
            }),
          getUnsettledPositions: (function (param) {
              return FloatUtil.getChainConfig(FloatEthers.wrapWallet(w)).then(function (c) {
                          return unsettledPositions(w.provider, c, Ethers.BigNumber.from(marketIndex), isLong, Ethers.utils.getAddress(w._address));
                        });
            }),
          mint: (function (amountPaymentToken, txOptions) {
              return FloatUtil.getChainConfig(FloatEthers.wrapWallet(w)).then(function (c) {
                          return mint(w, c, Ethers.BigNumber.from(marketIndex), isLong, amountPaymentToken)(txOptions);
                        });
            }),
          mintAndStake: (function (amountPaymentToken, txOptions) {
              return FloatUtil.getChainConfig(FloatEthers.wrapWallet(w)).then(function (c) {
                          return mintAndStake(w, c, Ethers.BigNumber.from(marketIndex), isLong, amountPaymentToken)(txOptions);
                        });
            }),
          stake: (function (amountSyntheticToken, txOptions) {
              return FloatUtil.getChainConfig(FloatEthers.wrapWallet(w)).then(function (c) {
                          return stake(w, c, Ethers.BigNumber.from(marketIndex), isLong, amountSyntheticToken, txOptions);
                        });
            }),
          unstake: (function (amountSyntheticToken, txOptions) {
              return FloatUtil.getChainConfig(FloatEthers.wrapWallet(w)).then(function (c) {
                          return unstake(w, c, Ethers.BigNumber.from(marketIndex), isLong, amountSyntheticToken)(txOptions);
                        });
            }),
          redeem: (function (amountSyntheticToken, txOptions) {
              return FloatUtil.getChainConfig(FloatEthers.wrapWallet(w)).then(function (c) {
                          return redeem(w, c, Ethers.BigNumber.from(marketIndex), isLong, amountSyntheticToken)(txOptions);
                        });
            }),
          shift: (function (amountSyntheticToken, txOptions) {
              return FloatUtil.getChainConfig(FloatEthers.wrapWallet(w)).then(function (c) {
                          return shift(w, c, Ethers.BigNumber.from(marketIndex), isLong, amountSyntheticToken)(txOptions);
                        });
            }),
          shiftStake: (function (amountSyntheticToken, txOptions) {
              return FloatUtil.getChainConfig(FloatEthers.wrapWallet(w)).then(function (c) {
                          return shiftStake(w, c, Ethers.BigNumber.from(marketIndex), isLong, amountSyntheticToken)(txOptions);
                        });
            })
        };
}

function makeWithProvider(p, marketIndex, isLong) {
  return {
          getExposure: (function (param) {
              return FloatUtil.getChainConfig(FloatEthers.wrapProvider(p)).then(function (c) {
                          return exposure(p, c, Ethers.BigNumber.from(marketIndex), isLong);
                        });
            }),
          getUnconfirmedExposure: (function (param) {
              return FloatUtil.getChainConfig(FloatEthers.wrapProvider(p)).then(function (c) {
                          return unconfirmedExposure(p, c, Ethers.BigNumber.from(marketIndex), isLong);
                        });
            }),
          getFundingRateApr: (function (param) {
              return FloatUtil.getChainConfig(FloatEthers.wrapProvider(p)).then(function (c) {
                          return fundingRateApr(p, c, Ethers.BigNumber.from(marketIndex), isLong);
                        });
            }),
          getPositions: (function (ethAddress) {
              return FloatUtil.getChainConfig(FloatEthers.wrapProvider(p)).then(function (c) {
                          return positions(p, c, Ethers.BigNumber.from(marketIndex), isLong, ethAddress);
                        });
            }),
          getStakedPositions: (function (ethAddress) {
              return FloatUtil.getChainConfig(FloatEthers.wrapProvider(p)).then(function (c) {
                          return stakedPositions(p, c, Ethers.BigNumber.from(marketIndex), isLong, ethAddress);
                        });
            }),
          getUnsettledPositions: (function (ethAddress) {
              return FloatUtil.getChainConfig(FloatEthers.wrapProvider(p)).then(function (c) {
                          return unsettledPositions(p, c, Ethers.BigNumber.from(marketIndex), isLong, ethAddress);
                        });
            }),
          connect: (function (w) {
              return makeWithWallet(w, marketIndex, isLong);
            })
        };
}

function synthToken(side) {
  return FloatUtil.getChainConfig(FloatEthers.wrapProvider(provider(side))).then(function (config) {
              if (side._0.isLong) {
                return Caml_array.get(config.markets, side._0.marketIndex).longToken;
              } else {
                return Caml_array.get(config.markets, side._0.marketIndex).shortToken;
              }
            });
}

function name(side) {
  return FloatUtil.getChainConfig(FloatEthers.wrapProvider(provider(side))).then(function (param) {
              if (side._0.isLong) {
                return "long";
              } else {
                return "short";
              }
            });
}

function getValue(side) {
  return FloatUtil.getChainConfig(FloatEthers.wrapProvider(provider(side))).then(function (config) {
              return marketSideValue(provider(side), config, Ethers.BigNumber.from(side._0.marketIndex), side._0.isLong);
            });
}

function getSyntheticTokenPrice(side) {
  return FloatUtil.getChainConfig(FloatEthers.wrapProvider(provider(side))).then(function (config) {
              return syntheticTokenPrice(provider(side), config, Ethers.BigNumber.from(side._0.marketIndex), side._0.isLong);
            });
}

exports.min = min;
exports.max = max;
exports.div = div;
exports.mul = mul;
exports.add = add;
exports.sub = sub;
exports.fromInt = fromInt;
exports.fromFloat = fromFloat;
exports.toNumber = toNumber;
exports.toNumberFloat = toNumberFloat;
exports.tenToThe18 = tenToThe18;
exports.tenToThe14 = tenToThe14;
exports.wrapSideP = wrapSideP;
exports.wrapSideW = wrapSideW;
exports.WithProvider = WithProvider;
exports.WithWallet = WithWallet;
exports.provider = provider;
exports.isLong = isLong;
exports.marketIndex = marketIndex;
exports.makeLongShortContract = makeLongShortContract;
exports.makeStakerContract = makeStakerContract;
exports.syntheticTokenAddress = syntheticTokenAddress;
exports.syntheticTokenTotalSupply = syntheticTokenTotalSupply;
exports.syntheticTokenBalance = syntheticTokenBalance;
exports.stakedSyntheticTokenBalance = stakedSyntheticTokenBalance;
exports.marketSideValue = marketSideValue;
exports.updateIndex = updateIndex;
exports.unsettledSynthBalance = unsettledSynthBalance;
exports.marketSideUnconfirmedDeposits = marketSideUnconfirmedDeposits;
exports.marketSideUnconfirmedRedeems = marketSideUnconfirmedRedeems;
exports.marketSideUnconfirmedShifts = marketSideUnconfirmedShifts;
exports.syntheticTokenPrice = syntheticTokenPrice;
exports.syntheticTokenPriceSnapshot = syntheticTokenPriceSnapshot;
exports.marketSideValues = marketSideValues;
exports.exposure = exposure;
exports.unconfirmedExposure = unconfirmedExposure;
exports.longOrShort = longOrShort;
exports.toSign = toSign;
exports.fundingRateMultiplier = fundingRateMultiplier;
exports.divFloat = divFloat;
exports.fundingRateApr = fundingRateApr;
exports.positions = positions;
exports.stakedPositions = stakedPositions;
exports.unsettledPositions = unsettledPositions;
exports.mint = mint;
exports.mintAndStake = mintAndStake;
exports.stake = stake;
exports.unstake = unstake;
exports.redeem = redeem;
exports.shift = shift;
exports.shiftStake = shiftStake;
exports.makeWithWallet = makeWithWallet;
exports.makeWithProvider = makeWithProvider;
exports.synthToken = synthToken;
exports.name = name;
exports.getValue = getValue;
exports.getSyntheticTokenPrice = getSyntheticTokenPrice;
/* ethers Not a pure module */
