import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {WalletEntity} from "./entity/wallet.entity";
import {UserService} from "../user/user.service";

@Injectable()
export class WalletService {

    constructor(@InjectRepository(WalletEntity) private walletRepository : Repository<WalletEntity>,
                private userService: UserService) {
    }

    async findWalletByUserId(userId: number) : Promise<WalletEntity> {
        const user = await this.userService.findUserById(userId)
        return await this.walletRepository.findOneBy({
            "id": user.walletId
        })
    }

    async buyTicket (id : number, ticketNumber : number) {
        // here we gonna use the api of paying
        return this.updateBalance(id,ticketNumber,true)
    }

    verifyWalletBalance (wallet : WalletEntity, amount : number): boolean{
        return wallet.balance>=amount ;
    }

    async updateBalance(userId: number , amount: number , transactionType : boolean ){
        const wallet=await this.findWalletByUserId(userId)
        if (!transactionType){
            if (this.verifyWalletBalance(wallet,amount)){
                wallet.balance-=amount
                return this.walletRepository.save(wallet)
            }else {
                throw new NotFoundException("hahahah")
            }
        }else {
            wallet.balance+=amount
            return this.walletRepository.save(wallet)
        }
    }

}
