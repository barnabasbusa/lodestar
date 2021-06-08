/* eslint-disable @typescript-eslint/naming-convention */
import {fromHexString} from "@chainsafe/ssz";
import {PresetName} from "@chainsafe/lodestar-params";
import {IChainConfig} from "../types";

export const chainConfig: IChainConfig = {
  // Extends the minimal preset
  PRESET_BASE: PresetName.minimal,

  // Genesis
  // ---------------------------------------------------------------
  // [customized]
  MIN_GENESIS_ACTIVE_VALIDATOR_COUNT: 64,
  // Jan 3, 2020
  MIN_GENESIS_TIME: 1578009600,
  // Highest byte set to 0x01 to avoid collisions with mainnet versioning
  GENESIS_FORK_VERSION: fromHexString("0x00000001"),
  // [customized] Faster to spin up testnets, but does not give validator reasonable warning time for genesis
  GENESIS_DELAY: 300,

  // Forking
  // ---------------------------------------------------------------
  // Values provided for illustrative purposes.
  // Individual tests/testnets may set different values.

  // Altair
  ALTAIR_FORK_VERSION: fromHexString("0x01000001"),
  ALTAIR_FORK_EPOCH: Infinity,
  // Merge
  MERGE_FORK_VERSION: fromHexString("0x02000001"),
  MERGE_FORK_EPOCH: Infinity,
  // Sharding
  SHARDING_FORK_VERSION: fromHexString("0x03000001"),
  SHARDING_FORK_EPOCH: Infinity,

  // TBD, 2**32 is a placeholder. Merge transition approach is in active R&D.
  TRANSITION_TOTAL_DIFFICULTY: 4294967296,

  // Time parameters
  // ---------------------------------------------------------------
  // [customized] Faster for testing purposes
  SECONDS_PER_SLOT: 6,
  // 14 (estimate from Eth1 mainnet)
  SECONDS_PER_ETH1_BLOCK: 14,
  // 2**8 (= 256) epochs
  MIN_VALIDATOR_WITHDRAWABILITY_DELAY: 256,
  // [customized] higher frequency of committee turnover and faster time to acceptable voluntary exit
  SHARD_COMMITTEE_PERIOD: 64,
  // [customized] process deposits more quickly, but insecure
  ETH1_FOLLOW_DISTANCE: 16,

  // Validator cycle
  // ---------------------------------------------------------------
  // 2**2 (= 4)
  INACTIVITY_SCORE_BIAS: BigInt(4),
  // 2**4 (= 16)
  INACTIVITY_SCORE_RECOVERY_RATE: 16,
  // 2**4 * 10**9 (= 16,000,000,000) Gwei
  EJECTION_BALANCE: 16000000000,
  // 2**2 (= 4)
  MIN_PER_EPOCH_CHURN_LIMIT: 4,
  // 2**16 (= 65,536)
  CHURN_LIMIT_QUOTIENT: 65536,

  // Deposit contract
  // ---------------------------------------------------------------
  // Ethereum Goerli testnet
  DEPOSIT_CHAIN_ID: 5,
  DEPOSIT_NETWORK_ID: 5,
  // Configured on a per testnet basis
  DEPOSIT_CONTRACT_ADDRESS: fromHexString("0x1234567890123456789012345678901234567890"),
};