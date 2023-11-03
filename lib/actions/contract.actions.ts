"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";

import Contract from "../models/contract.model";
import User from "../models/user.model";

import { connectToDB } from "../mongoose";

export async function fetchContracts(pageNumber = 1, pageSize = 20) {
    connectToDB();

    // Calculate the number of posts to skip based on the page number and page size.
    const skipAmount = (pageNumber - 1) * pageSize;

    const contractsQuery = Contract.find({ name: { $in: [null,undefined]}})
    .sort({ createdAt: "desc"})
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
        path:"author",
        model:User
    })
    
    const totalContractsCount = await Contract.countDocuments();

    const contracts = await contractsQuery.exec();

    const isNext = totalContractsCount > skipAmount + contracts.length;

    return {contracts , isNext};

}
interface Params{
    name:string,
    author:string,
    dateStart:string,
    dateEnd:string,
    note:string | undefined,
    stages:object | undefined,
    

}
export async function createContract({name,author,dateStart,dateEnd,note,stages}:Params){
   try {
    const createContract = await Contract.create({
        name,
        author,
        note,
        dateStart,
        dateEnd,
        stages,
        
    })

    await User.findByIdAndUpdate(author, {
        $push: { threads: createContract._id },
      });



   } catch (error: any) {
    throw new Error(`Failed to create contract: ${error.message}`);
   }
    
    

}