pragma solidity ^0.7.0;

contract Project{

    //Project state enumeration
    enum ProjectState{
        FundRaising, expired, successful
    }

    //State variables 
    address payable public projectOwner;
    uint256 public currentBalance;
    uint public amountGoal;
    //uint public completeAt;
    uint public deadLine;
    string public projectTitle;
    string public projectDescription;
    ProjectState public currentState = ProjectState.FundRaising;
    mapping (address => uint) public contributions;

    //Constructor for the contract
    constructor(
        address payable projectStarter,
        uint goal,
        // uint complete,
        uint deadline,
        string memory title,
        string memory description
    ){
        projectOwner = projectStarter;
        amountGoal = goal;
        //completeAt = complete;
        deadLine = deadline;
        projectTitle = title;
        projectDescription = description;
        currentBalance = 0;
    }

    modifier verifyProjectState(ProjectState _state){
        require(currentState == _state);
        _;
    }

    function contribute() external verifyProjectState(ProjectState.FundRaising) payable {
        require (msg.sender != projectOwner);
        contributions[msg.sender] = contributions[msg.sender] + (msg.value);
        currentBalance = currentBalance + (msg.value);
    }

}

