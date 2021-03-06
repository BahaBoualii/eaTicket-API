import {Body, Controller, Post} from '@nestjs/common';
import {TransactionService} from "./transaction.service";
import {CreateTransactionDto} from "./dto/create-transaction.dto";

@Controller('transaction')
export class TransactionController {
    constructor(private transactionService : TransactionService) {
    }
    @Post()
    async createTransaction(@Body() createTransactionDto : CreateTransactionDto){
        return this.transactionService.createTransaction(createTransactionDto)
    }
}
