// const fs = require('fs');
// const path = require('path');
// const ethers = require('ethers');
const arcAbi = require("../abi/arc.json");

let arc;
let decimals = 18;

const _internalAddr = [
  '0xdba68f07d1b7ca219f78ae8582c213d975c25caf',
  '0x887a274b22e18c28974797c1445b74589450281e',  
  '0x47082a75bc16313ef92cfaca1feb885659c3c9b5',
  '0xeb4377a5cd778c8bab7cabaa9cb706ce28db984f',
];

const _div = ethers.BigNumber.from(10).pow(decimals);
const toData=(bn)=>bn.div(_div).toNumber().toFixed(0);

const getData = async () => {
  const totalSupply = await arc.totalSupply();
  console.log('totalSupply:', toData(totalSupply));
  let internal = ethers.BigNumber.from(0);
  for (let i = 0; i < _internalAddr.length; i++) {
    const balance = await arc.balanceOf(_internalAddr[i]);
    console.log(' '+ _internalAddr[i], ':', toData(balance));
    internal = internal.add(balance);
  };
  console.log('internal:', toData(internal));
  const circulation = totalSupply.sub(internal);
  console.log('circulation:', toData(circulation));
  return toData(circulation);
}

async function load() {
  const [user] = await ethers.getSigners();
  console.log('user:', user.address);
  arc = new ethers.Contract(
    '0xc82e3db60a52cf7529253b4ec688f631aad9e7c2',
    arcAbi,
    user
  );
}


module.exports = {load, getData};
