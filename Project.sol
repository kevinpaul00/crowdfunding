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

    event FundingReceived(address contributor, uint amount, uint currentTotal);
    event ProjectOwnerPaid(address prOwner);

    modifier verifyProjectState(ProjectState _state){
        require(currentState == _state);
        _;
    }

    function contribute() external verifyProjectState(ProjectState.FundRaising) payable {
        require (msg.sender != projectOwner);
        contributions[msg.sender] = contributions[msg.sender] + (msg.value);
        currentBalance = currentBalance + (msg.value);
        emit FundingReceived(msg.sender, msg.value, currentBalance);
        checkFundingState();
    }

    function checkFundingState() public{
        if(currentBalance >= amountGoal){
            currentState = ProjectState.successful;
            payProjectOwner();
        }
        else if(block.timestamp > deadLine){
            currentState = ProjectState.expired;
        }
    }

    function payProjectOwner() internal verifyProjectState(ProjectState.successful) returns(bool){
        uint256 raisedAmount = currentBalance;
        currentBalance = 0;

        if(projectOwner.send(raisedAmount)){
            emit ProjectOwnerPaid(projectOwner);
            return true;
        }
        else{
            currentBalance = raisedAmount;
            currentState = ProjectState.successful;
            return false;
        }
    }

    function getRefund() public verifyProjectState(ProjectState.expired) returns(bool){
        require(contributions[msg.sender]>0);
        
        uint refundAmount = contributions[msg.sender];
        contributions[msg.sender] = 0;

        if(msg.sender.send(refundAmount)){
            currentBalance = currentBalance - refundAmount;
        }
        else{  
            contributions[msg.sender] = refundAmount;
            return false;   
        }
    }

    function getProjectDetails() public view returns(
        address projOwner,
        string memory title,
        string memory description,
        uint amtGoal,
        uint currBalance,
        uint deadline,
        ProjectState currState
    ){
        projOwner = projectOwner;
        title = projectTitle;
        description = projectDescription;
        amtGoal = amountGoal;
        currBalance = currentBalance;
        deadline = deadLine;
        currState = currentState;
    }
}

