pragma solidity ^0.7.0;

contract Project{

    //Project state enumeration
    enum ProjectState{
        FundRaising, expired, successful
    }

    //State variables 
    address payable public creator;
    uint256 public currentBalance;
    uint public amountGoal;
    uint public completeAt;
    uint public raiseBy;
    string public projectTitle;
    string public projectDescription;
    ProjectState public state = ProjectState.FundRaising;
    mapping (address => uint) public contributions;

    //Constructor for the contract
    constructor(
        uint goal,
        uint complete,
        string memory title,
        string memory description
    ){
        amountGoal = goal;
        completeAt = complete;
        projectTitle = title;
        projectDescription = description;
    }

    
}

