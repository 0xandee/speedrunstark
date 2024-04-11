"use client";

import { useState } from "react";
import { InheritanceTooltip } from "./InheritanceTooltip";
import { Abi } from "abi-wan-kanabi";
import { Address } from "@starknet-react/chains";
import {
  //   ContractInput,
  displayTxResult,
  getFunctionInputKey,
  getInitialFormState,
  getParsedContractFunctionArgs,
  transformAbiFunction,
} from "~~/app/debug/_components/contract";
import { notification } from "~~/utils/scaffold-stark";
import { AbiFunction } from "~~/utils/scaffold-stark/contract";
import { BlockNumber } from "starknet";
import { useContractRead } from "@starknet-react/core";
import { ContractInput } from "./ContractInput";

type ReadOnlyFunctionFormProps = {
  contractAddress: Address;
  abiFunction: AbiFunction;
  //   inheritedFrom?: string;
  abi: Abi;
};

export const ReadOnlyFunctionForm = ({
  contractAddress,
  abiFunction,
  //   inheritedFrom,
  abi,
}: ReadOnlyFunctionFormProps) => {
  const [form, setForm] = useState<Record<string, any>>(() =>
    getInitialFormState(abiFunction)
  );
  const [result, setResult] = useState<unknown>();

  const { isFetching, refetch } = useContractRead({
    address: contractAddress,
    functionName: abiFunction.name,
    abi: [...abi],
    args: getParsedContractFunctionArgs(form),
    enabled: false, // TODO : notify when failed - add error
    blockIdentifier: "pending" as BlockNumber,
  });
  const transformedFunction = transformAbiFunction(abiFunction);
  const inputElements = transformedFunction.inputs.map((input, inputIndex) => {
    const key = getFunctionInputKey(abiFunction.name, input, inputIndex);
    return (
      <ContractInput
        key={key}
        setForm={(updatedFormValue) => {
          setResult(undefined);
          setForm(updatedFormValue);
        }}
        form={form}
        stateObjectKey={key}
        paramType={input}
      />
    );
  });

  return (
    <div className="flex flex-col gap-3 py-5 first:pt-0 last:pb-1">
      <p className="font-medium my-0 break-words">
        {abiFunction.name}
        {/* <InheritanceTooltip inheritedFrom={inheritedFrom} /> */}
      </p>
      {inputElements}
      <div className="flex justify-between gap-2 flex-wrap">
        <div className="flex-grow w-4/5">
          {result !== null && result !== undefined && (
            <div className="bg-secondary rounded-3xl text-sm px-4 py-1.5 break-words">
              <p className="font-bold m-0 mb-1">Result:</p>
              <pre className="whitespace-pre-wrap break-words">
                {displayTxResult(result, false, abiFunction?.outputs)}
              </pre>
            </div>
          )}
        </div>
        <button
          className="btn btn-secondary btn-sm"
          onClick={async () => {
            const { data } = await refetch();
            setResult(data);
          }}
          disabled={isFetching}
        >
          {isFetching && (
            <span className="loading loading-spinner loading-xs"></span>
          )}
          Read 📡
        </button>
      </div>
    </div>
  );
};
