use contracts::YourToken::{IYourTokenDispatcher, IYourTokenDispatcherTrait};
use contracts::Vendor::{IVendorDispatcher, IVendorDispatcherTrait};
use contracts::mock_contracts::MockETHToken;
use openzeppelin::tests::utils::constants::{RECIPIENT, OTHER};
use openzeppelin::token::erc20::interface::{IERC20CamelDispatcher, IERC20CamelDispatcherTrait};
use openzeppelin::utils::serde::SerializedAppend;
use snforge_std::{
    declare, ContractClassTrait, cheat_caller_address, cheat_block_timestamp_global, CheatSpan
};
use starknet::{ContractAddress, contract_address_const, get_block_timestamp};

// Should deploy the MockETHToken contract
fn deploy_mock_eth_token() -> ContractAddress {
    let erc20_class_hash = declare("MockETHToken").unwrap();
    let INITIAL_SUPPLY: u256 = 100000000000000000000; // 100_ETH_IN_WEI
    let mut calldata = array![];
    calldata.append_serde(INITIAL_SUPPLY);
    calldata.append_serde(RECIPIENT());
    let (eth_token_address, _) = erc20_class_hash.deploy(@calldata).unwrap();
    eth_token_address
}

// Should deploy the YourToken contract
fn deploy_your_token_token() -> ContractAddress {
    let erc20_class_hash = declare("YourToken").unwrap();
    let NAME: ByteArray = "Gold";
    let SYMBOL: ByteArray = "GLD";
    let INITIAL_SUPPLY: u256 = 2000000000000000000000; // 2000_GLD_IN_WEI
    let mut calldata = array![];
    calldata.append_serde(NAME);
    calldata.append_serde(SYMBOL);
    calldata.append_serde(INITIAL_SUPPLY);
    calldata.append_serde(RECIPIENT());
    let (your_token_address, _) = erc20_class_hash.deploy(@calldata).unwrap();
    println!("-- YourToken contract deployed on: {:?}", your_token_address);
    your_token_address
}

// Should deploy the Vendor contract
fn deploy_vendor_contract() -> ContractAddress {
    let eth_token_address = deploy_mock_eth_token();
    let your_token_address = deploy_your_token_token();
    let vendor_class_hash = declare("Vendor").unwrap();
    let mut calldata = array![];
    calldata.append_serde(eth_token_address);
    calldata.append_serde(your_token_address);
    calldata.append_serde(RECIPIENT());
    let (vendor_contract_address, _) = vendor_class_hash.deploy(@calldata).unwrap();
    println!("-- Vendor contract deployed on: {:?}", vendor_contract_address);
    // sent eth to vendor contract
    // change the caller address of the eth_token_address to be recepient
    cheat_caller_address(eth_token_address, RECIPIENT(), CheatSpan::TargetCalls(1));
    let eth_token_dispatcher = IERC20CamelDispatcher { contract_address: eth_token_address };
    let eth_amount_wei: u256 = 1000000000000000000; // 1_ETH_IN_WEI
    eth_token_dispatcher.transfer(vendor_contract_address, eth_amount_wei);
    let vendor_eth_balance = eth_token_dispatcher.balanceOf(vendor_contract_address);
    println!("-- Vendor contract eth balance: {:?}", vendor_eth_balance);
    vendor_contract_address
}

#[test]
fn test_deploy_mock_eth_token() {
    let INITIAL_BALANCE: u256 = 10000000000000000000; // 10_ETH_IN_WEI
    let contract_address = deploy_mock_eth_token();
    let eth_token_dispatcher = IERC20CamelDispatcher { contract_address };
    assert(eth_token_dispatcher.balanceOf(RECIPIENT()) == INITIAL_BALANCE, 'Balance should be > 0');
}

#[test]
fn test_deploy_your_token() {
    let MINIMUN_SUPPLY: u256 = 1000000000000000000000; // 1000_GLD_IN_WEI
    let contract_address = deploy_your_token_token();
    let your_token_dispatcher = IYourTokenDispatcher { contract_address };
    let total_supply = your_token_dispatcher.total_supply();
    println!("-- Total supply: {:?}", total_supply);
    assert(total_supply >= MINIMUN_SUPPLY, 'supply should be at least 1000');
}
//Staker contract balance should go up by the staked amount
#[test]
fn test_deploy_vendor() {
    let vendor_contract_address = deploy_vendor_contract();
    let vendor_dispatcher = IVendorDispatcher { contract_address: vendor_contract_address };
    let your_token_address = vendor_dispatcher.your_token();
    println!("-- Vendor contract address: {:?}", vendor_contract_address);
    let your_token_dispatcher = IYourTokenDispatcher { contract_address: your_token_address };
    let INITIAL_BALANCE: u256 = 1000000000000000000000; // 1000_GLD_IN_WEI
    let vendor_token_balance = your_token_dispatcher.balance_of(vendor_contract_address);
    println!("-- Vendor token balance: {:?} GLD", vendor_token_balance);
    let tester_address = RECIPIENT();
    println!("-- Tester address: {:?}", tester_address);

    // Change the caller address of the your_token_address to be itself
    cheat_caller_address(your_token_address, tester_address, CheatSpan::TargetCalls(1));
    assert(
        your_token_dispatcher.transfer(vendor_contract_address, INITIAL_BALANCE), 'Transfer failed'
    );
    println!("-- Transfered 1000 GLD tokens to Vendor contract");
    let vendor_token_balance = your_token_dispatcher.balance_of(vendor_contract_address);
    println!("-- Vendor token balance: {:?}", vendor_token_balance);
}

//Should let us buy tokens and our balance should go up...
#[test]
fn test_buy_tokens() {
    let vendor_contract_address = deploy_vendor_contract();
    let vendor_dispatcher = IVendorDispatcher { contract_address: vendor_contract_address };
    let your_token_address = vendor_dispatcher.your_token();
    let eth_token_address = vendor_dispatcher.eth_token();
    let your_token_dispatcher = IYourTokenDispatcher { contract_address: your_token_address };
    let eth_token_dispatcher = IERC20CamelDispatcher { contract_address: eth_token_address };
    let INITIAL_BALANCE: u256 = 1000000000000000000000; // 1000_GLD_IN_WEI

    let tester_address = RECIPIENT();

    // Change the caller address of the your_token_address to be itself
    cheat_caller_address(your_token_address, tester_address, CheatSpan::TargetCalls(1));
    println!("-- Transfering 1000 GLD tokens to Vendor contract ...");
    assert(
        your_token_dispatcher.transfer(vendor_contract_address, INITIAL_BALANCE), 'Transfer failed'
    );
    let vendor_token_balance = your_token_dispatcher.balance_of(vendor_contract_address);
    println!(
        "-- Vendor contract token balance: {:?} GLD in wei", vendor_token_balance
    ); // 1000 GLD_IN_WEI

    println!("-- Tester address: {:?}", tester_address);
    let starting_balance = your_token_dispatcher.balance_of(tester_address); // 1000 GLD_IN_WEI
    println!("---- Starting token balance: {:?} GLD in wei", starting_balance);

    println!("-- Buying 0.001 ETH worth of tokens ...");
    let eth_amount_wei: u256 = 1000000000000000; // 0.001_ETH_IN_WEI
    // Change the caller address of the ETH_token_contract to the tester_address
    cheat_caller_address(eth_token_address, tester_address, CheatSpan::TargetCalls(1));
    eth_token_dispatcher.approve(vendor_contract_address, eth_amount_wei);
    // check allowance
    let allowance = eth_token_dispatcher.allowance(tester_address, vendor_contract_address);
    assert_eq!(allowance, eth_amount_wei, "Allowance should be equal to the bought amount");

    // Change the caller address of the your_token_address to the tester_address
    cheat_caller_address(vendor_contract_address, tester_address, CheatSpan::TargetCalls(1));
    vendor_dispatcher.buy_tokens(eth_amount_wei);
    println!("-- Bought 0.001 ETH worth of tokens");
    let tokens_per_eth: u256 = vendor_dispatcher.tokens_per_eth(); // 100 tokens per ETH
    let expected_tokens = eth_amount_wei * tokens_per_eth; // 0.1_GLD_IN_WEI ;
    println!("---- Expect to receive: {:?} GLD in wei", expected_tokens);
    let expected_balance = starting_balance + expected_tokens; // 1000 + 0.1 = 1000.1_GLD_IN_WEI
    let new_balance = your_token_dispatcher.balance_of(tester_address);
    println!("---- New token balance: {:?} GLD in wei", new_balance);
    assert_eq!(new_balance, expected_balance, "Balance should be increased by the bought amount");
}

// Should let us sell tokens and we should get the appropriate amount eth back...
#[test]
fn test_sell_tokens() {
    let vendor_contract_address = deploy_vendor_contract();
    let vendor_dispatcher = IVendorDispatcher { contract_address: vendor_contract_address };
    let your_token_address = vendor_dispatcher.your_token();
    let eth_token_address = vendor_dispatcher.eth_token();
    let your_token_dispatcher = IYourTokenDispatcher { contract_address: your_token_address };
    let eth_token_dispatcher = IERC20CamelDispatcher { contract_address: eth_token_address };

    let tester_address = RECIPIENT();

    println!("-- Tester address: {:?}", tester_address);
    let starting_balance = your_token_dispatcher.balance_of(tester_address); // 2000 GLD_IN_WEI
    println!("---- Starting token balance: {:?} GLD in wei", starting_balance);

    println!("-- Selling back 0.1 GLD tokens ...");
    let gld_token_amount_wei: u256 = 100000000000000000; // 0.1_GLD_IN_WEI
    // Change the caller address of the your_token_contract to the tester_address
    cheat_caller_address(your_token_address, tester_address, CheatSpan::TargetCalls(1));
    your_token_dispatcher.approve(vendor_contract_address, gld_token_amount_wei);
    // check allowance
    let allowance = your_token_dispatcher.allowance(tester_address, vendor_contract_address);
    assert_eq!(allowance, gld_token_amount_wei, "Allowance should be equal to the sold amount");

    // check vendor eth balance
    let vendor_eth_balance = eth_token_dispatcher.balanceOf(vendor_contract_address);
    println!("---- Vendor contract eth balance: {:?} ETH in wei", vendor_eth_balance);

    // Change the caller address of the your_token_address to the tester_address
    cheat_caller_address(vendor_contract_address, tester_address, CheatSpan::TargetCalls(1));
    vendor_dispatcher.sell_tokens(gld_token_amount_wei);
    println!("-- Sold 0.1 GLD tokens");
    let new_balance = your_token_dispatcher.balance_of(tester_address);
    println!("---- New token balance: {:?} GLD in wei", new_balance);
    let expected_balance = starting_balance
        - gld_token_amount_wei; // 2000 - 0.1 = 1999.9_GLD_IN_WEI
    assert_eq!(new_balance, expected_balance, "Balance should be decreased by the sold amount");
}
//Should let the owner (and nobody else) withdraw the eth from the contract...
#[test]
#[should_panic(expected: ('Caller is not the owner',))]
fn test_failing_wirhdraw_tokens() {
    let vendor_contract_address = deploy_vendor_contract();
    let vendor_dispatcher = IVendorDispatcher { contract_address: vendor_contract_address };
    let your_token_address = vendor_dispatcher.your_token();
    let eth_token_address = vendor_dispatcher.eth_token();
    let your_token_dispatcher = IYourTokenDispatcher { contract_address: your_token_address };
    let eth_token_dispatcher = IERC20CamelDispatcher { contract_address: eth_token_address };
    let INITIAL_BALANCE: u256 = 1000000000000000000000; // 1000_GLD_IN_WEI

    let tester_address = RECIPIENT();

    // Change the caller address of the your_token_address to be itself
    cheat_caller_address(your_token_address, tester_address, CheatSpan::TargetCalls(1));
    println!("-- Transfering 1000 GLD tokens to Vendor contract ...");
    assert(
        your_token_dispatcher.transfer(vendor_contract_address, INITIAL_BALANCE), 'Transfer failed'
    );
    let vendor_token_balance = your_token_dispatcher.balance_of(vendor_contract_address);
    println!(
        "-- Vendor contract token balance: {:?} GLD in wei", vendor_token_balance
    ); // 1000 GLD_IN_WEI

    println!("-- Tester address: {:?}", tester_address);
    let starting_balance = your_token_dispatcher.balance_of(tester_address); // 1000 GLD_IN_WEI
    println!("---- Starting token balance: {:?} GLD in wei", starting_balance);

    println!("-- Buying 0.1 ETH worth of tokens ...");
    let eth_amount_wei: u256 = 100000000000000000; // 0.1_ETH_IN_WEI
    // Change the caller address of the ETH_token_contract to the tester_address
    cheat_caller_address(eth_token_address, tester_address, CheatSpan::TargetCalls(1));
    eth_token_dispatcher.approve(vendor_contract_address, eth_amount_wei);
    // check allowance
    let allowance = eth_token_dispatcher.allowance(tester_address, vendor_contract_address);
    assert_eq!(allowance, eth_amount_wei, "Allowance should be equal to the bought amount");

    // Change the caller address of the your_token_address to the tester_address
    cheat_caller_address(vendor_contract_address, tester_address, CheatSpan::TargetCalls(1));
    vendor_dispatcher.buy_tokens(eth_amount_wei);
    println!("-- Bought 0.1 ETH worth of tokens");
    let tokens_per_eth: u256 = vendor_dispatcher.tokens_per_eth(); // 100 tokens per ETH
    let expected_tokens = eth_amount_wei * tokens_per_eth; // 10_GLD_IN_WEI ;
    println!("---- Expect to receive: {:?} GLD in wei", expected_tokens);
    let expected_balance = starting_balance + expected_tokens; // 1000 + 0.1 = 1000.1_GLD_IN_WEI
    let new_balance = your_token_dispatcher.balance_of(tester_address);
    println!("---- New token balance: {:?} GLD in wei", new_balance);
    assert_eq!(new_balance, expected_balance, "Balance should be increased by the bought amount");

    let vendor_eth_balance = eth_token_dispatcher.balanceOf(vendor_contract_address);
    println!("---- Vendor contract eth balance: {:?} ETH in wei", vendor_eth_balance);

    let other_address = OTHER();
    // Change the caller address of the vendor_contract_address to the other_address
    cheat_caller_address(vendor_contract_address, other_address, CheatSpan::TargetCalls(1));
    vendor_dispatcher.withdraw();
}

