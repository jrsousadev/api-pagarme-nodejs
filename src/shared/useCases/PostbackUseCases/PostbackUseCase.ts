import { inject, injectable } from "tsyringe";
import { AppError } from "../../errors/AppError";
import { TransactionRepository } from "../../../repositories/TransactionRepository";
import { PagarMeProvider } from "../../../providers/PagarMeProvider";

interface PostbackRequest {
  id: string | number;
  object: string;
  current_status: string;
  tokenAccess: string;
}

interface PostbackUpdateStatus {
  code: string;
  providerStatus: string;
}

@injectable()
export class PostbackUseCase {
  constructor(
    @inject("TransactionRepository")
    private transactionRepository: TransactionRepository,

    @inject("PagarMeProvider")
    private pagarMeProvider: PagarMeProvider,
  ) {}

  updateStatus = async ({ code, providerStatus }: PostbackUpdateStatus) => {
    const transaction = await this.transactionRepository.readOne({ code })

    if (!transaction) throw new AppError("Transaction not found");

    const status = this.pagarMeProvider.translateStatus(providerStatus);

    if (!status) throw new AppError("Status is empty")

    await this.transactionRepository.update({
      id: transaction.id,
      status,
    })
  };

  execute = async ({ id, object, current_status, tokenAccess }: PostbackRequest) => {
    if (tokenAccess !== process.env.PAGARME_URL_TOKEN_ACCESS) throw new AppError("Token not authorized", 400);

    if (object === "transaction") {
      const transaction = await this.transactionRepository.readOne({
        transactionId: String(id),
      });

      if (!transaction) throw new AppError("Transaction not found", 404);

      await this.updateStatus({
        code: String(transaction.code),
        providerStatus: current_status,
      });

      return {
        message: "Postback success!",
        statusCode: 200,
      }
    }

    throw new AppError("Internal server error", 400);
  };
}
