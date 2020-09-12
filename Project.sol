pragma solidity ^0.6.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol";

contract Project{
    using SafeMath for uint256;

    enum{
        FundRaising, expired, successful
    }

    address payable public creator;
    uint256 public currentBalance;
    uint public amountGoal;
    uint public completeAt;
    uint public raiseBy;
    string public title;
    string public description;
    State public state = State.Fundraising;
    mapping (address => uint) public contributions;
}

