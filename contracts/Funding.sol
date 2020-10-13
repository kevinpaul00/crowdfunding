pragma solidity ^0.5.16;

import "./Project.sol";

contract Funding{
    Project[] private projects;
    event ProjectStarted(
        address contractAddress,
        address projectStarter,
        string projectTitle,
        string projectDesc,
        uint256 deadline,
        uint256 goalAmount
    );


    constructor()public{}
    
    function startProject(
        string calldata title,
        string calldata description,
        uint durationInDays,
        uint amountToRaise
    ) external {
        uint raiseUntil = block.timestamp + (durationInDays * (1 days));
        
        Project newProject = new Project(msg.sender, amountToRaise, raiseUntil, title, description);
        
        projects.push(newProject);
        emit ProjectStarted(
            address(newProject),
            msg.sender,
            title,
            description,
            raiseUntil,
            amountToRaise
        );
    }                                                                                                                                   

    function returnAllProjects() external view returns(Project[] memory){
        return projects;
    }

    function display() external returns(string memory){
        return "Hello Solidity";
    }
}