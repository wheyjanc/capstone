pragma solidity ^0.4.17;

contract BlockFactory {
    address[] public deployedBlocks;

function createBlock(uint bill) public {
        address newBlock = new fundsTransfer(bill, msg.sender);
        deployedBlocks.push(newBlock);
    }

function getDeployedBlocks() public view returns (address[]) {
        return deployedBlocks;
    }
}


contract fundsTransfer {
 
  uint public minimum;
  address public manager;
    function fundsTransfer(uint bill, address creator) public {
        manager = creator;
        minimum = bill;
    }


mapping(address => uint256) public balance;

function deposit() payable public {
  require(msg.value==minimum);

}

function withdraw(address webdev) payable public {
   uint toWebdev = address(this).balance*3/4;
   webdev.transfer(toWebdev);
   balance[webdev]+=toWebdev;
   }
   
   
 function getBalance() public view returns (uint256) {
       return address(this).balance;
   }
}