/**
 * This file is autogenerated by Scaffold-Stark.
 * You should not edit it manually or your changes might be overwritten.
 */

const deployedContracts = {
  devnet: {
    YourCollectible: {
      address:
        "0x0400593e4800557be24b1fbcd22e48d957169bf8be5133db11ade317e9b37e9f",
      abi: [
        {
          type: "impl",
          name: "YourCollectibleImpl",
          interface_name: "contracts::YourCollectible::IYourCollectible",
        },
        {
          type: "struct",
          name: "core::byte_array::ByteArray",
          members: [
            {
              name: "data",
              type: "core::array::Array::<core::bytes_31::bytes31>",
            },
            {
              name: "pending_word",
              type: "core::felt252",
            },
            {
              name: "pending_word_len",
              type: "core::integer::u32",
            },
          ],
        },
        {
          type: "struct",
          name: "core::integer::u256",
          members: [
            {
              name: "low",
              type: "core::integer::u128",
            },
            {
              name: "high",
              type: "core::integer::u128",
            },
          ],
        },
        {
          type: "interface",
          name: "contracts::YourCollectible::IYourCollectible",
          items: [
            {
              type: "function",
              name: "mint_item",
              inputs: [
                {
                  name: "recipient",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "uri",
                  type: "core::byte_array::ByteArray",
                },
              ],
              outputs: [
                {
                  type: "core::integer::u256",
                },
              ],
              state_mutability: "external",
            },
          ],
        },
        {
          type: "impl",
          name: "ICounterImpl",
          interface_name: "contracts::YourCollectible::ICounter",
        },
        {
          type: "interface",
          name: "contracts::YourCollectible::ICounter",
          items: [
            {
              type: "function",
              name: "token_id_counter",
              inputs: [],
              outputs: [
                {
                  type: "core::integer::u256",
                },
              ],
              state_mutability: "view",
            },
          ],
        },
        {
          type: "impl",
          name: "WrappedIERC721MetadataImpl",
          interface_name:
            "openzeppelin::token::erc721::interface::IERC721Metadata",
        },
        {
          type: "interface",
          name: "openzeppelin::token::erc721::interface::IERC721Metadata",
          items: [
            {
              type: "function",
              name: "name",
              inputs: [],
              outputs: [
                {
                  type: "core::byte_array::ByteArray",
                },
              ],
              state_mutability: "view",
            },
            {
              type: "function",
              name: "symbol",
              inputs: [],
              outputs: [
                {
                  type: "core::byte_array::ByteArray",
                },
              ],
              state_mutability: "view",
            },
            {
              type: "function",
              name: "token_uri",
              inputs: [
                {
                  name: "token_id",
                  type: "core::integer::u256",
                },
              ],
              outputs: [
                {
                  type: "core::byte_array::ByteArray",
                },
              ],
              state_mutability: "view",
            },
          ],
        },
        {
          type: "impl",
          name: "WrappedIERC721Impl",
          interface_name: "openzeppelin::token::erc721::interface::IERC721",
        },
        {
          type: "struct",
          name: "core::array::Span::<core::felt252>",
          members: [
            {
              name: "snapshot",
              type: "@core::array::Array::<core::felt252>",
            },
          ],
        },
        {
          type: "enum",
          name: "core::bool",
          variants: [
            {
              name: "False",
              type: "()",
            },
            {
              name: "True",
              type: "()",
            },
          ],
        },
        {
          type: "interface",
          name: "openzeppelin::token::erc721::interface::IERC721",
          items: [
            {
              type: "function",
              name: "balance_of",
              inputs: [
                {
                  name: "account",
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
              outputs: [
                {
                  type: "core::integer::u256",
                },
              ],
              state_mutability: "view",
            },
            {
              type: "function",
              name: "owner_of",
              inputs: [
                {
                  name: "token_id",
                  type: "core::integer::u256",
                },
              ],
              outputs: [
                {
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
              state_mutability: "view",
            },
            {
              type: "function",
              name: "safe_transfer_from",
              inputs: [
                {
                  name: "from",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "to",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "token_id",
                  type: "core::integer::u256",
                },
                {
                  name: "data",
                  type: "core::array::Span::<core::felt252>",
                },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "transfer_from",
              inputs: [
                {
                  name: "from",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "to",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "token_id",
                  type: "core::integer::u256",
                },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "approve",
              inputs: [
                {
                  name: "to",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "token_id",
                  type: "core::integer::u256",
                },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "set_approval_for_all",
              inputs: [
                {
                  name: "operator",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "approved",
                  type: "core::bool",
                },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "get_approved",
              inputs: [
                {
                  name: "token_id",
                  type: "core::integer::u256",
                },
              ],
              outputs: [
                {
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
              state_mutability: "view",
            },
            {
              type: "function",
              name: "is_approved_for_all",
              inputs: [
                {
                  name: "owner",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "operator",
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
              outputs: [
                {
                  type: "core::bool",
                },
              ],
              state_mutability: "view",
            },
          ],
        },
        {
          type: "impl",
          name: "IERC721EnumerableImpl",
          interface_name: "contracts::YourCollectible::IERC721Enumerable",
        },
        {
          type: "interface",
          name: "contracts::YourCollectible::IERC721Enumerable",
          items: [
            {
              type: "function",
              name: "token_of_owner_by_index",
              inputs: [
                {
                  name: "owner",
                  type: "core::starknet::contract_address::ContractAddress",
                },
                {
                  name: "index",
                  type: "core::integer::u256",
                },
              ],
              outputs: [
                {
                  type: "core::integer::u256",
                },
              ],
              state_mutability: "view",
            },
            {
              type: "function",
              name: "total_supply",
              inputs: [],
              outputs: [
                {
                  type: "core::integer::u256",
                },
              ],
              state_mutability: "view",
            },
          ],
        },
        {
          type: "impl",
          name: "OwnableImpl",
          interface_name: "openzeppelin::access::ownable::interface::IOwnable",
        },
        {
          type: "interface",
          name: "openzeppelin::access::ownable::interface::IOwnable",
          items: [
            {
              type: "function",
              name: "owner",
              inputs: [],
              outputs: [
                {
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
              state_mutability: "view",
            },
            {
              type: "function",
              name: "transfer_ownership",
              inputs: [
                {
                  name: "new_owner",
                  type: "core::starknet::contract_address::ContractAddress",
                },
              ],
              outputs: [],
              state_mutability: "external",
            },
            {
              type: "function",
              name: "renounce_ownership",
              inputs: [],
              outputs: [],
              state_mutability: "external",
            },
          ],
        },
        {
          type: "constructor",
          name: "constructor",
          inputs: [
            {
              name: "owner",
              type: "core::starknet::contract_address::ContractAddress",
            },
          ],
        },
        {
          type: "event",
          name: "openzeppelin::token::erc721::erc721::ERC721Component::Transfer",
          kind: "struct",
          members: [
            {
              name: "from",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "key",
            },
            {
              name: "to",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "key",
            },
            {
              name: "token_id",
              type: "core::integer::u256",
              kind: "key",
            },
          ],
        },
        {
          type: "event",
          name: "openzeppelin::token::erc721::erc721::ERC721Component::Approval",
          kind: "struct",
          members: [
            {
              name: "owner",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "key",
            },
            {
              name: "approved",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "key",
            },
            {
              name: "token_id",
              type: "core::integer::u256",
              kind: "key",
            },
          ],
        },
        {
          type: "event",
          name: "openzeppelin::token::erc721::erc721::ERC721Component::ApprovalForAll",
          kind: "struct",
          members: [
            {
              name: "owner",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "key",
            },
            {
              name: "operator",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "key",
            },
            {
              name: "approved",
              type: "core::bool",
              kind: "data",
            },
          ],
        },
        {
          type: "event",
          name: "openzeppelin::token::erc721::erc721::ERC721Component::Event",
          kind: "enum",
          variants: [
            {
              name: "Transfer",
              type: "openzeppelin::token::erc721::erc721::ERC721Component::Transfer",
              kind: "nested",
            },
            {
              name: "Approval",
              type: "openzeppelin::token::erc721::erc721::ERC721Component::Approval",
              kind: "nested",
            },
            {
              name: "ApprovalForAll",
              type: "openzeppelin::token::erc721::erc721::ERC721Component::ApprovalForAll",
              kind: "nested",
            },
          ],
        },
        {
          type: "event",
          name: "openzeppelin::introspection::src5::SRC5Component::Event",
          kind: "enum",
          variants: [],
        },
        {
          type: "event",
          name: "openzeppelin::access::ownable::ownable::OwnableComponent::OwnershipTransferred",
          kind: "struct",
          members: [
            {
              name: "previous_owner",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "key",
            },
            {
              name: "new_owner",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "key",
            },
          ],
        },
        {
          type: "event",
          name: "openzeppelin::access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
          kind: "struct",
          members: [
            {
              name: "previous_owner",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "key",
            },
            {
              name: "new_owner",
              type: "core::starknet::contract_address::ContractAddress",
              kind: "key",
            },
          ],
        },
        {
          type: "event",
          name: "openzeppelin::access::ownable::ownable::OwnableComponent::Event",
          kind: "enum",
          variants: [
            {
              name: "OwnershipTransferred",
              type: "openzeppelin::access::ownable::ownable::OwnableComponent::OwnershipTransferred",
              kind: "nested",
            },
            {
              name: "OwnershipTransferStarted",
              type: "openzeppelin::access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
              kind: "nested",
            },
          ],
        },
        {
          type: "event",
          name: "contracts::YourCollectible::YourCollectible::Event",
          kind: "enum",
          variants: [
            {
              name: "ERC721Event",
              type: "openzeppelin::token::erc721::erc721::ERC721Component::Event",
              kind: "flat",
            },
            {
              name: "SRC5Event",
              type: "openzeppelin::introspection::src5::SRC5Component::Event",
              kind: "flat",
            },
            {
              name: "OwnableEvent",
              type: "openzeppelin::access::ownable::ownable::OwnableComponent::Event",
              kind: "flat",
            },
          ],
        },
      ],
    },
  },
} as const;

export default deployedContracts;
